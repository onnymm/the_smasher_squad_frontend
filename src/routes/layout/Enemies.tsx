import { ListBulletIcon } from "@heroicons/react/24/solid"
import DataView from "../../components/data_visualizers/DataView"
import {  CoordsCell, TablePlayer, XPLevel } from "../../components/widgets/custom_widgets/ManageCoords"
const Enemies: () => (React.JSX.Element) = () => {

    const viewConfig: ViewConfig[] = [
        {
            key: 'name',
            displayName: 'Jugador',
            type: TablePlayer,
            canSort: false,
        },
        {
            key: 'level',
            displayName: 'Nivel',
            type: XPLevel,
            tableVisible: true,
            canSort: false,
        },
        {
            key: 'mp',
            displayName: 'PP',
            type: CoordsCell('mp'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '1th',
            displayName: '1a',
            type: CoordsCell('1th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '2th',
            displayName: '2a',
            type: CoordsCell('2th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '3th',
            displayName: '3a',
            type: CoordsCell('3th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '4th',
            displayName: '4a',
            type: CoordsCell('4th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '5th',
            displayName: '5a',
            type: CoordsCell('5th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '6th',
            displayName: '6a',
            type: CoordsCell('6th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '7th',
            displayName: '7a',
            type: CoordsCell('7th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '8th',
            displayName: '8a',
            type: CoordsCell('8th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '9th',
            displayName: '9a',
            type: CoordsCell('9th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '10th',
            displayName: '10a',
            type: CoordsCell('10th'),
            canSort: false,
            tableVisible: true,
        },
        {
            key: '11th',
            displayName: '11a',
            type: CoordsCell('11th'),
            canSort: false,
            tableVisible: true,
        },
    ]

    return (
        <DataView
            backendPath="/alliances/enemies"
            viewConfig={viewConfig}
            noRecordsIcon={ListBulletIcon}
            noRecordsMessage="No hay coordenadas"
            showPagination={false}
        />
    )
}

export default Enemies;
