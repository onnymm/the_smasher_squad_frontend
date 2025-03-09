import { FlagIcon } from "@heroicons/react/24/solid"
import DataView from "../../components/data_visualizers/DataView"
import { PlayerWidget, SolarSystem, StarBase, TableCoordinates, XPLevel } from "../../components/widgets/custom_widgets/ManageCoords"
import { ModalContext } from "../../contexts/modalContext"
import React, { useContext } from "react"
import AttackPlanet from "../../components/actions/AttackPlanet"
import ButtonTextIcon from "../../components/ui/button/ButtonTextIcon"

interface PlanetParams {
    id: number;
    name: string;
    x: number;
    y: number;
    color: SolarColorOption;
    avatar: string;
    'starbase_level': 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    planet: number
}

const AvailableCoords: () => (React.JSX.Element) = () => {

    const { setModalContent } = useContext(ModalContext)

    const attackPlanet: (config: PlanetParams) => (React.JSX.Element) = ({
        id,
        name,
        x,
        y,
        color,
        avatar,
        starbase_level,
        planet
    }) => {
        return (
            <ButtonTextIcon
                icon={FlagIcon}
                type="primary"
                onClick={
                    () => setModalContent(
                        <AttackPlanet
                            colonyId={id}
                            enemyName={name}
                            x={x}
                            y={y}
                            sscolor={color}
                            enemyAvatar={avatar}
                            starbase_level={starbase_level as 3 | 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9}
                            planet={planet}
                        />
                    )
                }
            >
                Atacar
            </ButtonTextIcon>
        )
    }

    const viewConfig: ViewConfig[] = [
        {
            key: 'player',
            displayName: 'Jugador',
            type: PlayerWidget,
        },
        {
            key: 'xp_level',
            displayName: 'Nivel',
            type: XPLevel,
        },
        {
            key: 'coords',
            displayName: 'Coordenadas',
            type: TableCoordinates,
        },
        {
            key: 'sb',
            displayName: 'Nivel de base estelar',
            type: StarBase,
        },
        {
            key: 'color',
            displayName: 'Sistema solar',
            type: SolarSystem,
        },
        {
            key: 'attack',
            displayName: '',
            type: attackPlanet,
        }
    ]

    const filters: DataViewFilters = {
        default: {
            criteria: []
        },
        available: []
    }

    return (
        <DataView
            backendPath="/alliances/available/"
            viewConfig={viewConfig}
            filters={filters}
            noRecordsIcon={FlagIcon}
            noRecordsMessage="No hay planetas disponibles para ser atacados"
        />
    )
}

export default AvailableCoords;
