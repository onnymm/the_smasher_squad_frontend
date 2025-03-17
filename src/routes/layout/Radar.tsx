import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Page from "../../components/layout/Page"
import Header from "../../components/layout/Header";
import { ArrowUturnLeftIcon, FlagIcon, PlusIcon, SignalIcon, TableCellsIcon, TrashIcon } from "@heroicons/react/24/solid";
import ButtonTextIcon from "../../components/ui/button/ButtonTextIcon";
import Grapper from "../../components/layout/Grapper";
import Table from "../../components/table/Table";
import Fallback from "../../components/misc/Fallback";
import { createAllianceLogoURL } from "../../utils/common";
import Radar from "../../api/actions/radar";
import ButtonIcon from "../../components/ui/button/ButtonIcon";
import { ModalContext } from "../../contexts/modalContext";
import Alert from "../../components/ui/alert/Alert";
import Group from "../../components/layout/Group";
import InputText from "../../components/ui/input/InputText";

// Interfaces

interface LocalModalAction {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
} 

interface DataModalAction extends LocalModalAction {
    data: Mobius.API.AllianceData
}

interface RadarInterface {
    Context: {
        loading: boolean;
        setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    };
    AlliancesListParams: {
        data: Mobius.API.AllianceData[] | undefined; 
    };
};

// Contexto
const RadarContext = createContext<RadarInterface['Context']>({
    loading: false,
    setLoading: () => null,
})

// Componentes de widget para tabla
const widgetTypes: Record<string, ((data: Mobius.API.AllianceData) => React.JSX.Element)> = {

    allianceLogo: (data) => {
        // Creación de URL para logo
        const allianceLogo = createAllianceLogoURL(
            data['Emblem']['Shape'],
            data['Emblem']['Pattern'],
            data['Emblem']['Icon']
        )

        return (
            <div className="flex flex-row items-center gap-4">
                <img
                    className="size-10"
                    src={allianceLogo}
                    alt={data['Name']}
                    />
                <p>{data['Name']}</p>
            </div>
        )
    },

    Actions: (data) => {

        // Obtención de función para crear contenido en el modal
        const { setModalContent } = useContext(ModalContext);
        // Obtención de función de estado de carga del radar
        const { setLoading } = useContext(RadarContext);

        // Función que crea el contenido del modal
        const openModal = () => {
            setModalContent(
                <ModalDeleteAction data={data} setLoading={setLoading} />
            )
        }

        return (
            <div className="flex flex-row justify-end w-full">
                <ButtonIcon icon={TrashIcon} type="danger" onClick={openModal} />
            </div>
        )
    }
}

// Componente principal

const RadarRoute = (): (React.JSX.Element) => {

    const { setModalContent } = useContext(ModalContext);

    // Alianzas registradas
    const [ registeredAlliances, setRegisteredAlliances ] = useState<Mobius.API.AllianceData[] | undefined>(undefined);
    // Estado de carga
    const [ loading, setLoading ] = useState<boolean>(true);

    // Funciones de botones
    const actions = {
        addAlliance: useCallback(
            () => {
                setModalContent(
                    <ModalAddAction setLoading={setLoading} />
                )
            }, [setModalContent]
        ),
        scan: useCallback(
            () => {
                setModalContent(
                    <ModalScanAction />
                )
            }, [setModalContent]
        )
    }

    // Función de carga inicial
    const getRegisteredAlliances = useCallback(
        async () => {
            // Obtención de las alianzas registradas en el radar
            const data = await Radar.get();
            // Se establece el valor en el estado
            setRegisteredAlliances(data);
            // Se establece el estado de carga a falso
            setLoading(false);
        }, []
    )
    useEffect(
        () => {
            if ( !loading ) return;
            getRegisteredAlliances();
        }, [getRegisteredAlliances, loading]
    )

    return (
        <RadarContext.Provider value={{ loading, setLoading }}>
            <Page>

                <Header>
                    <ButtonTextIcon onClick={actions.scan} icon={SignalIcon} type="success">
                        Escanear
                    </ButtonTextIcon>
                    <ButtonTextIcon icon={PlusIcon} disabled={loading || (registeredAlliances && registeredAlliances.length >= 30)} onClick={actions.addAlliance}>
                        Añadir
                    </ButtonTextIcon>
                </Header>
                {registeredAlliances && registeredAlliances.length >= 30 &&
                    <Alert type="warning">
                        Se ha alcanzado el límite máximo de alianzas a escanear. Para evitar saturar la API de Galaxy Life se recomienda no exceder la cantidad máxima de alianzas. Para añadir una nueva alianza, elimina alguna de las alianzas ya registradas.
                    </Alert>
                }
                <Grapper justify="center">
                    <div className="flex flex-row justify-center max-w-full h-full">
                        <AlliancesList data={registeredAlliances} />
                    </div>
                </Grapper>

            </Page>
        </RadarContext.Provider>
    )
}

export default RadarRoute;

// ----------------------------------------------------------------------------

const AlliancesList = ({
    data,
}: RadarInterface['AlliancesListParams']
): React.JSX.Element => {

    // Obtención del estado de carga desde el contexto
    const { loading } = useContext(RadarContext)

    // Vista de la tabla
    const viewConfig: ViewConfig[] = [
        {
            key: 'alliance',
            displayName: 'Nombre',
            type: widgetTypes.allianceLogo,
        },
        {
            key: 'actions',
            displayName: 'Acciones',
            type: widgetTypes.Actions,
        }
    ]

    // Si existen datos...
    if ( data ) {

        // Acondicionamiento de los datos para ser mostrados
        const dataForTable: ResponseDataStructure<Mobius.API.AllianceData> = {
            data: data,
            count: data.length,
            fields: [],
        }

        // Retorno de la tabla
        return (
            <Table
                viewConfig={viewConfig}
                data={dataForTable}
                noRecordsIcon={FlagIcon}
                noRecordsMessage="No hay alianzas registradas"
                loading={loading}
            />
        )
    } else {

        // Se muestra un fallback si los datos se están cargando aún
        return (
            <Fallback icon={TableCellsIcon} />
        )
    }
}

const ModalAddAction = ({
    setLoading,
}: LocalModalAction
): React.JSX.Element => {

    // Obtención de función para cerrar el modal
    const { closeModal } = useContext(ModalContext)

    // Nombre de la alianza
    const [ name, setName ] = useState<string>('')
    // Nombre de alianza no encontrada
    const [ errorName, setErrorName ] = useState<string>('');
    // Estado de error
    const [ error, setError ] = useState<boolean>(false);

    // Acción a ejecutar por el botón
    const addAliance = async () => {
        // Obtención de la respuesta del backend
        const response = await Radar.register(name);
        // Si la alianza no existe...
        if ( response === false ) {
            // Se cambia el estado de error a verdadero
            setError(true);
        // Si la alianza existe
        } else {
            // Se cambia el estado de carga a falso
            setLoading(true);
            // Se cierra el modal
            closeModal();
        }
    }

    // Si existe un error se establece el nombre de la alianza no encontrada
    useEffect(
        () => {
            if ( error ) {
                setErrorName(name)
            }
        }, [name, error]
    )

    // En el cambio de nombre se cambia el estado de error a falso
    useEffect(
        () => {
            if ( name !== errorName ) {
                setError(false)
            }
        }, [name, errorName]
    )

    return (
        <div className="flex flex-col">
            <Group title="Añadir alianza">
                {error &&
                    <Alert type="error">
                        No existe una alianza con este nombre.
                    </Alert>
                }
                <InputText value={name} setValue={setName} visiblePlaceholder="Nombre de la alianza" />
                <ButtonTextIcon icon={PlusIcon} onClick={addAliance} type="primary">
                    Añadir
                </ButtonTextIcon>
            </Group>
        </div>
    )
}

const ModalDeleteAction = ({
    data,
    setLoading
}: DataModalAction): React.JSX.Element => {

    // Obtención de función para cerrar el modal
    const { closeModal } = useContext(ModalContext)

    // Función a ejecutar por el botón
    const deleteAlliance = async () => {
        // Ejecución de la función del backend
        await Radar.delete(data['Id']);
        // Se establece el estado de carga a verdadero
        setLoading(true);
        // Se cierra el modal
        closeModal();
    }

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            {widgetTypes.allianceLogo(data)}
            ¿Deseas remover la alianza del radar?
            <div className="flex flex-row gap-2">
                <ButtonTextIcon icon={TrashIcon} onClick={deleteAlliance} type="danger">
                    Eliminar
                </ButtonTextIcon>
                <ButtonTextIcon icon={ArrowUturnLeftIcon} onClick={() => closeModal()}>
                    Cancelar
                </ButtonTextIcon>
            </div>
        </div>
    )
}

const ModalScanAction = () => {

    // Inicialización de estado de alianzas escaneadas
    const [ scannedAlliances, setScannedAlliances ] = useState<Mobius.API.AllianceData[] | undefined>(undefined);

    // Función de carga inicial
    const scanAlliances = async () => {
        // Obtención de los datos desde el backend
        const data = await Radar.scan();
        // Se establecen los datos en el estado
        setScannedAlliances(data);
    }
    useEffect(
        () => {
            scanAlliances();
        }, []
    )

    return (
        <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-col gap-4 p-4 max-h-[500px] overflow-y-scroll">
                {
                    scannedAlliances
                        ? (
                            scannedAlliances.map(
                                (alliance, index) => (
                                    <div key={index} className="flex flex-row gap-4">
                                        <div className="flex flex-row items-center gap-2">
                                            <img
                                                className="size-10"
                                                src={createAllianceLogoURL(alliance['Emblem']['Shape'], alliance['Emblem']['Pattern'], alliance['Emblem']['Icon'])}
                                                alt={alliance['Id']}
                                            />
                                            <p className="w-32">{alliance['Name']}</p>
                                        </div>
                                        {
                                            <div className={`${alliance['InWar'] ? 'text-yellow-400' : 'text-green-400'} flex items-center flex-row gap-2`}>
                                                <FlagIcon className="fill-current min-w-4 h-4" />
                                                {
                                                    alliance['InWar']
                                                    ? 'En guerra'
                                                    : 'Sin guerra'
                                                }
                                            </div>
                                        }
                                    </div>
                                )
                            )
                        )
                        : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="size-24">
                                    <Fallback icon={SignalIcon} />
                                </div>
                                <Alert type="success">
                                    Esto puede demorar entre 2 y 45 segundos dependiendo de la cantidad de alianzas a escanear.
                                </Alert>
                            </div>
                        )
                }
            </div>
        </div>
    )
}
