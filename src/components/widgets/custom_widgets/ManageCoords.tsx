import { useContext } from "react";
import AvatarMedium from "../../avatar/AvatarMedium";
import { ModalContext } from "../../../contexts/modalContext";
import ButtonIcon from "../../ui/button/ButtonIcon";
import { ArrowPathIcon, ArrowUturnLeftIcon, DevicePhoneMobileIcon, FlagIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ManageCoords } from "../../actions/AddCoords";
import AttackPlanet from "../../actions/AttackPlanet";
import RestorePlanet from "../../actions/RestorePlanet";
import AvatarSmall from "../../avatar/AvatarSmall";
import { UserContext } from "../../../contexts/userContext";
import ButtonTextIcon from "../../ui/button/ButtonTextIcon";
import MarkOnOffline from "../../actions/MarkOnOffline";
import DeleteCoords from "../../actions/DeleteCoords";

interface TableCoordinatesParams {
    x: number | null;
    y: number | null;
}

interface TablePlayerParams {
    'enemy_level'?: number;
    'enemy_id'?: number;
    name: string;
    avatar: string;
    online: boolean;
}

interface AddedByParams {
    create_user: string;
    create_avatar: string;
}

interface WrittenByParams {
    write_user: string;
    write_avatar: string;
}

interface AttackedByParams {
    attack_user: string;
    attack_avatar: string;
}

interface StarBaseParams {
    'starbase_level': 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    planet: number;
}

interface XPLevelParams {
    level: number;
}

interface SolarSystemParams {
    color: 'white' | 'red' | 'green' | 'blue' | 'blue' | 'purple' | 'yellow' | null;
}

export const TableCoordinates: (config: TableCoordinatesParams) => (React.JSX.Element) = ({
    x,
    y,
}) => {

    let coords = ""

    if ( x !== null && y !== null )

        coords = `${x},${y}`

    return (
        <span className="group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_cyan] font-mono transition-all duration-300">{coords}</span>
    )
}


export const PlayerWidget: (config: TablePlayerParams) => (React.JSX.Element) = ({
    name,
    avatar,
    online,
    enemy_id,
    enemy_level,
}) => {

    const { setModalContent } = useContext(ModalContext)

    return (
        <div className="flex flex-col justify-center items-start gap-2 h-24 group player-cell">

            <TablePlayer name={name} avatar={avatar} online={online} />

            <div className="group-[.player-cell]:group-hover:h-10 flex flex-row justify-start items-center gap-2 opacity-0 group-[.player-cell]:group-hover:opacity-100 group-[.coords-cell]:group-hover:opacity-100 h-0 transition-[opacity_0.15s_0.3s,_height_0.3s] duration-300">
                <ButtonTextIcon
                    icon={DevicePhoneMobileIcon}
                    type={online ? "primary" : "secondary"}
                    onClick={() => {
                        setModalContent(
                            <MarkOnOffline
                                enemyId={enemy_id as number}
                                enemyName={name}
                                enemyAvatar={avatar}
                                online={online}
                                enemyLevel={enemy_level as number}
                            />
                        )
                    }}
                >
                    {`${online ? "desconectado" : "conectado"}`}
                </ButtonTextIcon>
            </div>
        </div>
    )
}


export const TablePlayer: (config: TablePlayerParams) => (React.JSX.Element) = ({
    name,
    avatar,
    online,
}) => {

    return (
        <div className="flex flex-row justify-start items-center gap-2 w-min select-none">
            <AvatarMedium data={avatar} online={online} />
            <span className="text-ellipsis">{name}</span>
        </div>
    )
}

export const StarBase: (config: StarBaseParams) => (React.JSX.Element) = ({
    starbase_level: starbaseLevel,
    planet,
}) => {

    let sbImage

    if ( planet === 0 ) {

        sbImage = `/msb${starbaseLevel}.png`
    } else {

        const templateLevel = {
            1: 3,
            2: 3,
            3: 3,
            4: 5,
            5: 5,
            6: 9,
            7: 9,
            8: 9,
            9: 9,
        }

        sbImage = `/csb${templateLevel[starbaseLevel]}.png`
    }

    return (
        <div className="flex flex-row justify-start items-center gap-2 group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_cyan] w-min h-8 transition-all duration-300">
            <img src={sbImage} alt={`Base estelar nivel ${starbaseLevel}`} className="min-w-8 h-full" />
            <span>{starbaseLevel}</span>
        </div>
    )
}

export const XPLevel: (config: XPLevelParams) => (React.JSX.Element) = ({
    level
}) => {

    return (
        <div className="flex flex-row justify-start items-center gap-2 w-min h-8">
            <img src="/xp.png" alt={`Nivel de experiencia: ${level}`} className="min-w-8 h-full" />
            <span>{level}</span>
        </div>
    )
}

export const SolarSystem: (config: SolarSystemParams) => (React.JSX.Element | null) = ({
    color,
}) => {

    const solarSystemColor = {
        'white': 'blanco',
        'red': 'rojo',
        'green': 'verde',
        'blue': 'azul',
        'purple': 'morado',
        'yellow': 'amarillo'
    }

    const dropShadowColor = {
        'white': '#c3f9ff',
        'red': '#ff6c6c',
        'green': '#76ffd1',
        'blue': '#6cccff',
        'purple': '#e459fc',
        'yellow': '#fffa6c'
    }

    if ( color ) {
        return (
            <img src={`/ss${color}.png`} alt={`Sistema solar ${solarSystemColor[color]}`} className={`group-[.coords-cell]:group-hover:!animation-running min-w-10 h-10 animate-star-spin animation-paused group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_${dropShadowColor[color]}80] transition-all duration-300`} />
        )
    } else {
        return null;
    }
}

export const TableAddedBy: (config: AddedByParams) => (React.JSX.Element) = ({
    create_user,
    create_avatar,
}) => {

    return (
        <div className="flex flex-row justify-start items-center gap-2 group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_cyan] w-min transition-all duration-300 select-none">
            <AvatarMedium data={create_avatar} online={false} />
            <span className="text-ellipsis">{create_user}</span>
        </div>
    )
}

export const TableWrittenBy: (config: WrittenByParams) => (React.JSX.Element) = ({
    write_user,
    write_avatar,
}) => {

    return (
        <div className="flex flex-row justify-start items-center gap-2 w-min select-none">
            <AvatarMedium data={write_avatar} online={false} />
            <span className="text-ellipsis">{write_user}</span>
        </div>
    )
}

export const TableAttackedBy: (config: AttackedByParams) => (React.JSX.Element | null) = ({
    attack_user,
    attack_avatar,
}) => {

    if ( !attack_user ) return null;

    return (
        <div className="flex flex-row justify-start items-center gap-2 w-min select-none">
            <AvatarMedium data={attack_avatar} online={false} />
            <span className="text-ellipsis">{attack_user}</span>
        </div>
    )
}

export const CoordsCell = (planet: string) => {

    // Obtención de estado y función de cambio de estado de contenido de modal
    const { setModalContent } = useContext(ModalContext);

    const { user} = useContext(UserContext)

    // Creación de componente dinámico
    const ComponentCallback = ({
        [ planet ]: nthPlanet,
        name,
        avatar,
        online,
    }: Record<string, any>) => {

        // Si no existe planeta se retorna indicador de nulidad de éste
        if ( !nthPlanet ) {
            return (
                <div className="flex flex-row justify-center h-full text-white/30">{"[NA]"}</div>
            )

        // Si existe planeta...
        } else {

            // Si existen coordenadas
            if ( (nthPlanet['x'] !== null && nthPlanet['y'] !== null) || (nthPlanet['planet'] === 0) ) {

                // Se retorna interfaz para manejo de datos
                return (
                    <div className="flex flex-col justify-center items-center gap-2 px-2 h-24 transition-height duration-300 coords-cell group">

                        {/* Vista previa de los datos */}
                        <div className="flex flex-row justify-start items-center gap-2">
                            <SolarSystem {...nthPlanet} />
                            <StarBase {...nthPlanet} />
                            <TableCoordinates {...nthPlanet} />
                        </div>

                        {/* Botones de interacción con los datos */}
                        {!nthPlanet['restores_at'] && !nthPlanet['under_attack_since'] &&
                            <div className="group-[.coords-cell]:group-hover:h-10 flex flex-row justify-start items-center gap-2 opacity-0 group-[.coords-cell]:group-hover:opacity-100 h-0 transition-[opacity_0.15s_0.3s,_height_0.3s] duration-300 ui-cell-cords">

                                {/* Marcar como ocupado */}
                                <ButtonIcon
                                    icon={FlagIcon}
                                    type="primary"
                                    onClick={() => setModalContent(
                                        <AttackPlanet
                                            colonyId={nthPlanet['id']}
                                            enemyName={name}
                                            x={nthPlanet['x']}
                                            y={nthPlanet['y']}
                                            sscolor={nthPlanet['color']}
                                            enemyAvatar={avatar}
                                            starbase_level={nthPlanet['starbase_level']}
                                            planet={nthPlanet['planet']}
                                        />
                                    )}
                                    disabled={online}
                                />

                                {/* Editar información */}
                                <ButtonIcon
                                    icon={PencilIcon}
                                    onClick={
                                        () => setModalContent(
                                            <ManageCoords
                                                colonyId={nthPlanet['id']}
                                                enemyName={name}
                                                x={nthPlanet['x']}
                                                y={nthPlanet['y']}
                                                sscolor={nthPlanet['color']}
                                                enemyAvatar={avatar}
                                                starbase_level={nthPlanet['starbase_level']}
                                                planet={nthPlanet['planet']}
                                            />
                                        )
                                    }
                                />

                                {/* Eliminar coordenadas */}
                                {nthPlanet['x'] !== null && nthPlanet['y'] !== null &&
                                    <ButtonIcon
                                        icon={TrashIcon}
                                        onClick={() => {
                                            setModalContent(
                                                <DeleteCoords
                                                    colonyId={nthPlanet['id']}
                                                    enemyName={name}
                                                    sscolor={nthPlanet['color']}
                                                    enemyAvatar={avatar}
                                                    starbase_level={nthPlanet['starbase_level']}
                                                    planet={nthPlanet['planet']}
                                                />
                                            )
                                        }}
                                        type="danger"
                                    />
                                }

                            </div>
                        }

                        {!nthPlanet['restores_at'] && nthPlanet['under_attack_since'] &&
                            <div className="flex flex-row justify-start items-center gap-2">
                                <img src="/gun.png" alt="" />
                                <AvatarSmall data={nthPlanet['attacker_avatar']} alt="Atacante" online />
                                {nthPlanet['attacker_user'] === user &&
                                    <ButtonIcon
                                        icon={ArrowUturnLeftIcon}
                                        onClick={() => setModalContent(
                                            <AttackPlanet
                                                colonyId={nthPlanet['id']}
                                                enemyName={name}
                                                x={nthPlanet['x']}
                                                y={nthPlanet['y']}
                                                sscolor={nthPlanet['color']}
                                                enemyAvatar={avatar}
                                                starbase_level={nthPlanet['starbase_level']}
                                                planet={nthPlanet['planet']}
                                            />
                                        )}
                                    />
                                }
                            </div>
                        }

                        {nthPlanet['restores_at'] &&
                            <div className="flex flex-row justify-start items-center gap-2 w-max">

                                <RestoresAt restoresAt={nthPlanet['restores_at']} />

                                {/* Reconstrucción manual */}
                                <ButtonIcon
                                    icon={ArrowPathIcon}
                                    type="success"
                                    onClick={() => setModalContent(
                                        <RestorePlanet
                                            colonyId={nthPlanet['id']}
                                            enemyName={name}
                                            x={nthPlanet['x']}
                                            y={nthPlanet['y']}
                                            sscolor={nthPlanet['color']}
                                            enemyAvatar={avatar}
                                            starbase_level={nthPlanet['starbase_level']}
                                            planet={nthPlanet['planet']}
                                        />
                                    )}
                                />
                            </div>
                        }
                    </div>
                )

            // Si no existen coordendas del planeta...
            } else {

                // Se retorna interfaz para añadir coordenadas
                return (
                    <div className="flex flex-row justify-start items-center gap-2 h-24 coords-cell group">

                        {/* Nivel de base estelar */}
                        <StarBase
                            starbase_level={nthPlanet['starbase_level']}
                            planet={nthPlanet['planet']}
                        />

                        {/* Botón para añadir coordenadas */}
                        <ButtonIcon
                            icon={PlusIcon}
                            onClick={
                                () => {
                                    setModalContent(
                                        <ManageCoords
                                            colonyId={nthPlanet['id']}
                                            enemyName={name}
                                            enemyAvatar={avatar}
                                            starbase_level={nthPlanet['starbase_level']}
                                            planet={nthPlanet['planet']}
                                        />
                                    )
                                }
                            }
                        />
                    </div>
                )
            }

        }
    }

    // Retorno del componente dinámico
    return ComponentCallback;
}

interface RestoresAtParams {
    restoresAt: string;
}

const RestoresAt: (config: RestoresAtParams) =>  (React.JSX.Element) = ({
    restoresAt,
}) => {

    const [ hour, minute, second ] = restoresAt.split(" ")[1].split(".")[0].split(":")

    const mer = Number(hour) <= 12 ? "AM" : "PM"

    return (
        <div className="flex flex-row items-center gap-2 group-[.coords-cell]:group-hover:drop-shadow-[0_0_4px_cyan] font-mono transition-all duration-300">
            <img src="/clock.png" alt="" />
            {`${Number(hour) > 12 ? Number(hour) - 12 : (Number(hour) === 0 ? 12 : Number(hour))}:${minute}:${second} ${mer}`}
        </div>
    )
}
