import { ListBulletIcon } from "@heroicons/react/24/solid"
import DataView from "../../components/data_visualizers/DataView"
import { SolarSystem, StarBase, TableAddedBy, TableAttackedBy, TableCoordinates, TablePlayer, TableWrittenBy, XPLevel } from "../../components/widgets/custom_widgets/StarBase"

const Coords: () => (React.JSX.Element) = () => {

    const viewConfig: ViewConfig[] = [
        {
            key: 'name',
            displayName: 'Jugador',
            type: TablePlayer,
        },
        {
            key: 'coords',
            displayName: 'Coordenadas',
            type: TableCoordinates,
            canSort: false,
        },
        {
            key: 'starbase_level',
            displayName: 'Base estelar',
            type: StarBase,
        },
        {
            key: 'level',
            displayName: 'Nivel',
            type: XPLevel,
            tableVisible: true,
        },
        {
            key: 'color',
            displayName: 'Color',
            type: SolarSystem,
            tableVisible: true,
        },
        {
            key: 'create_uid',
            displayName: 'Creado por',
            type: TableAddedBy,
            tableVisible: false,
            canSort: false,
        },
        {
            key: 'write_uid',
            displayName: 'Modificado por',
            type: TableWrittenBy,
            tableVisible: false,
            canSort: false,
        },
        {
            key: 'attack_uid',
            displayName: 'Último ataque por',
            type: TableAttackedBy,
            tableVisible: true,
            canSort: false,
        }
    ]

    const filters: DataViewFilters = {
        default: {
            'criteria': '[]',
        },
        available: []
    }

    return (
        <DataView
            backendPath="/alliances/coords"
            viewConfig={viewConfig}
            noRecordsIcon={ListBulletIcon}
            noRecordsMessage="No hay coordenadas"
            filters={filters}
        />
    )
}

export default Coords;
