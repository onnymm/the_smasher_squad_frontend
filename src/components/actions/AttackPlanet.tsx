import { useCallback, useContext, useEffect, useState } from "react";
import Group from "../layout/Group";
import mobiusAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendUrl";
import { SolarSystem, StarBase, TableCoordinates, TablePlayer } from "../widgets/custom_widgets/ManageCoords";
import { ModalContext } from "../../contexts/modalContext";
import Alert from "../ui/alert/Alert";
import ButtonTextIcon from "../ui/button/ButtonTextIcon";
import { ArrowUturnLeftIcon, CheckIcon } from "@heroicons/react/24/solid";

interface AttackPlanetParams {
    enemyName: string;
    enemyAvatar: string;
    x: number;
    y: number;
    sscolor?: SolarColorOption;
    colonyId: number;
    planet: number;
    'starbase_level': 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

const AttackPlanet: (config: AttackPlanetParams) => (React.JSX.Element) = ({
    enemyName,
    enemyAvatar,
    x,
    y,
    sscolor,
    colonyId,
    planet,
    starbase_level,
}) => {

    const { closeModal, addOnCloseModalCallback, removeOnCloseModalCallback } = useContext(ModalContext);

    const [ claimed, setClaimed ] = useState<boolean | undefined>(undefined);

    const claimPlanet = useCallback(
        async () => {

            const response = await mobiusAxios.post(getBackendUrl("/alliances/take_planet"), colonyId, {authenticate: true});
        
            if ( response.data === true ) {
                setClaimed(true);
            } else if ( response.data === false ) {
                setClaimed(false)
            }
        }, [colonyId]
    )

    const leavePlanet = async () => {

        await mobiusAxios.post(getBackendUrl("/alliances/leave_planet"), colonyId, {authenticate: true})
        closeModal()
    }

    const markAttackedPlanet = async () => {

        await mobiusAxios.post(getBackendUrl("/alliances/mark_attacked"), colonyId, {authenticate: true})
        closeModal()
    }

    useEffect(
        () => {
            claimPlanet()
        }, [claimPlanet]
    )

    useEffect(
        () => {
            addOnCloseModalCallback('claim', leavePlanet)

            return (
                () => {
                    removeOnCloseModalCallback('claim')
                }
            )
        }
    )

    return (
        <Group title="Atacando planeta">

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

            {claimed === true &&
                <Alert type="success">
                    ¡Planeta reclamado!
                </Alert>
            }

            {claimed === false &&
                <Alert type="warning">
                    Este planeta ya está siendo atacado por alguien más
                </Alert>
            }

            <ButtonTextIcon icon={CheckIcon} onClick={markAttackedPlanet} disabled={!claimed} type="primary">
                Planeta destruido
            </ButtonTextIcon>
            <ButtonTextIcon icon={ArrowUturnLeftIcon} onClick={leavePlanet} disabled={claimed === undefined}>
                Abandonar
            </ButtonTextIcon>

        </Group>
    )
}

export default AttackPlanet;
