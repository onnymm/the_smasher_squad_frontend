import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import getPivotTableData from "../../api/dataVisualization";
import Header from "../layout/Header";
import Select from "../ui/select/Select";
import useOptions from "../../hooks/useOptions";
import { EyeIcon, FunnelIcon, ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import Pagination from "../pagination/Pagination";
import useSortingFields from "../../hooks/useSortingFields";
import Table from "../table/Table";
import { COMMON_LEGEND } from "../../settings/appSettings";
// import { ModalContext } from "../../contexts/modalContext";
import getBackendUrl from "../../api/backendUrl";

interface DataViewParams {
    backendPath: string;
    viewConfig: ViewConfig[];
    filters: DataViewFilters;
    itemsPerPage?: number;
    noRecordsIcon: IconType;
    noRecordsMessage: string;
    showPagination?: boolean;
    loadStatus?: boolean;
}

const DataView: (config: DataViewParams) => React.JSX.Element | undefined = ({
    backendPath,
    viewConfig,
    filters,
    itemsPerPage: _itemsPerPage = 40,
    noRecordsIcon: NoRecordsIcon = ListBulletIcon,
    noRecordsMessage = COMMON_LEGEND.NO_RECORDS_MESSAGE,
    showPagination = true,
    loadStatus = true,
}) => {

    // Función para crear o actualizar filtro
    const createOrUpdateFilter = useCallback<(activeFilter: number | undefined) => ({ criteria: CriteriaStructure } | DataFilter)>(
        (activeFilter: number | undefined) => {
            // Si hay un filtro, se establece éste
            if ( activeFilter !== undefined ) {
                return filters.available[activeFilter]
            // Si no existe un filtro, se establece el valor por defecto
            } else {
                return filters.default
            }
        }, [filters.available, filters.default]
    )

    const [ reload, setReload ] = useState<boolean>(false);

    // const { addOnCloseModalCallback, removeOnCloseModalCallback} = useContext(ModalContext);

    // // Estado de carga inicial
    // const [ initialLoad, setInitialLoad ] = useState<boolean>(false);
    // Estado temporal de carga
    const [ loading, setLoading ] = useState<boolean>(true);

    // Inicialización de estado de los datos
    const [ data, setData ] = useState<ResponseDataStructure<DataRecord> | undefined>(undefined);
    // Inicialización de la página a visualizar
    const [ page, setPage ] = useState<number | ((page: number) => number) | undefined>(0);
    // Inicialización de cantidad de registros por página
    const [ itemsPerPage ] = useState<number>(_itemsPerPage);

    // Referencia de la tabla
    const tableRef = useRef<HTMLDivElement>(null);

    // Inicialización de objeto de filtros para uso en componente Select
    const [ filterOptions, setFilterOptions, activeFilter ] = useOptions<DataFilter[]>(
        filters ? filters.available : [],
        {mode: 'switch'}
    );

    // Inicialización de indicador de filtro para solicitud de datos al backend
    const [ filter, setFilter ] = useState<{ criteria: CriteriaStructure } | DataFilter>( createOrUpdateFilter(activeFilter) )

    // Actualización de filtro cuando el componente Select cambia de llave
    useEffect(
        () => {
            setFilter( createOrUpdateFilter(activeFilter) )
        }, [createOrUpdateFilter, activeFilter]
    )

    // Estados para mostrar u ocultar columnas de la vista de la tabla
    const toggleableColumns = useMemo<ViewConfig[]>(
        () => (
            viewConfig.filter(
                (item) => (item.tableVisible !== undefined)
            )
        ), [viewConfig]
    );

    // Estado de columnas visibles para componente Select
    const [ visibleColumns, setVisibleColumns ] = useOptions<SelectableOption<string>[]>(
        toggleableColumns,
        {
            mode: 'multiOption',
            validateActive: (item: ViewConfig) => (item.tableVisible === true),
        },
    );

    // Estados para ordenamiento y dirección de ordenamiento de campos
    const {
        // sortingFields,
        // sortingDirections,
        sortingFieldKey,
        ascending,
        setTableSortingField,
        // setKanbanSortingField,
        // setKanbanAscending
    } = useSortingFields(viewConfig);

    // Solicitud al backend cada vez que la página o parámetros de filtro u ordenamiento cambien
    useEffect(
        () => {
            // Se establece el estado de carga a verdadero
            if ( loadStatus ) {
                setLoading(true);
            }

            // Solicitud de datos al backend
            getPivotTableData(
                backendPath,
                setData,
                {
                    'items_per_page': itemsPerPage,
                    'sortby': sortingFieldKey,
                    'page': page,
                    'ascending': ascending,
                    'search_criteria': filter.criteria
                },
            )
        }, [backendPath, itemsPerPage, sortingFieldKey, page, ascending, filter, reload, loadStatus]
    )

    // Establecer carga a falso después de recibir los datos tras nueva solicitud
    useEffect(
        () =>{
            if ( data ) {
                setLoading(false)
            }
        }, [data]
    )
    
    useEffect(
        () => {
            tableRef.current?.scrollTo(0, 0)
        }, [page]
    )

    // Cambio de página a 0 cada ver que los filtros cambien
    useEffect(
        () => {
            setPage(0);
        }, [activeFilter]
    )

    // useEffect(
    //     () => {
    //         // addOnCloseModalCallback('dataView', () => (setReload( prevState => !prevState )))

    //         // return (
    //         //     () => {
    //         //         removeOnCloseModalCallback('dataView');
    //         //     }
    //         // );
    //     }, [addOnCloseModalCallback, removeOnCloseModalCallback]
    // )

    useUpdateListener(setReload, getBackendUrl('/ws/update_coords'))

    if (data) {
        return (
            <div id="page" className="flex flex-col gap-4 h-full">
                <Header>
                    {filters &&
                        <Select options={filterOptions} setOptions={setFilterOptions} mode="switch" type="primary" icon={FunnelIcon} iconActive={FunnelIcon}>
                            Filtrar por
                        </Select>
                    }
                    <Select options={visibleColumns} setOptions={setVisibleColumns} mode="multiOption" icon={TableCellsIcon} iconActive={EyeIcon}>
                        Mostrar columnas
                    </Select>
                    {showPagination &&
                        <Pagination count={data?.count} itemsPerPage={itemsPerPage} disabled={false} page={page as number} setPage={setPage} />
                    }
                </Header>
                <Table tableRef={tableRef} loading={loading} data={data} viewConfig={viewConfig} sortingFieldKey={sortingFieldKey} ascending={ascending} visibleColumns={visibleColumns} setSortingColumn={setTableSortingField} noRecordsIcon={NoRecordsIcon} noRecordsMessage={noRecordsMessage} />
            </div>
        )
    }
}

export default DataView;

const useUpdateListener = (
    setLoad: React.Dispatch<React.SetStateAction<boolean>>,
    websocketURL: string,
): void => {

    useEffect(
        () => {

            const websocket = new WebSocket(websocketURL);

            // websocket.onopen = () => {
            //     console.log('Websocket abierto');
            // }

            websocket.onmessage = () => {
                setLoad( (prev) => !prev )
            }

            websocket.onerror = () => {
                console.log('Error en el websocket');
            }

            // websocket.onclose = () => {
            //     console.log('Conexión cerrada con el Websocket');
            // }

            return (
                () => {
                    websocket.close()
                }
            )
        }, [websocketURL, setLoad]
    )
}
