import { ArrowPathIcon } from "@heroicons/react/24/solid";
import mobiusAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendUrl";
import Group from "../layout/Group";
import ButtonTextIcon from "../ui/button/ButtonTextIcon";
import { SolarSystem, StarBase, TableCoordinates, TablePlayer } from "../widgets/custom_widgets/ManageCoords";
import { useContext } from "react";
import { ModalContext } from "../../contexts/modalContext";

interface RestorePlanetParams {
    enemyName: string;
    enemyAvatar: string;
    x: number;
    y: number;
    sscolor?: SolarColorOption;
    colonyId: number;
    planet: number;
    'starbase_level': 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

const RestorePlanet: (config: RestorePlanetParams) => (React.JSX.Element) = ({
    enemyName,
    enemyAvatar,
    x,
    y,
    sscolor,
    colonyId,
    planet,
    starbase_level,
}) => {

    const { closeModal } = useContext(ModalContext)

    const restorePlanet = async () => {

        await mobiusAxios.post(getBackendUrl("/alliances/restore_planet"), colonyId, {authenticate: true})
        closeModal()
    }

    return (
        <Group title="Regenerar planeta">

            {/* Nombre ordinal de la colonia o leyenda de planeta principal */}
            <div className="flex flex-row justify-center">{planet ? `${planet}a colonia` : "Planeta principal"}</div>

            {/* Descripción visual de los datos del planeta/colonia */}
            <div className="flex flex-row justify-between">
                {/* Jugador */}
                <TablePlayer name={enemyName} avatar={enemyAvatar} online={false} />
                {/* Color del sistema solar */}
                {sscolor &&
                    <SolarSystem color={sscolor as SolarColorOption} />
                }
                {/* Nivel de base estelar */}
                <StarBase planet={planet} starbase_level={starbase_level} />
            </div>

            <div className="flex flex-row justify-center">
                <TableCoordinates x={x} y={y} />
            </div>

            <ButtonTextIcon icon={ArrowPathIcon} onClick={restorePlanet} type="success">
                Regenerar
            </ButtonTextIcon>

        </Group>
    )
}

export default RestorePlanet;
