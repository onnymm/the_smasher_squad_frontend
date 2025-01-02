import { useContext } from "react";
import AvatarMedium from "../../avatar/AvatarMedium";
import { ModalContext } from "../../../contexts/modalContext";
import ButtonIcon from "../../ui/button/ButtonIcon";
import { ArrowPathIcon, FlagIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { ManageCoords } from "../../actions/AddCoords";
import AttackPlanet from "../../actions/AttackPlanet";
import RestorePlanet from "../../actions/RestorePlanet";

interface TableCoordinatesParams {
    x: number | null;
    y: number | null;
}

interface TablePlayerParams {
    name: string;
    avatar: string;
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
        <span className="font-mono">{coords}</span>
    )
}

export const TablePlayer: (config: TablePlayerParams) => (React.JSX.Element) = ({
    name,
    avatar,
}) => {

    return (
        <div className="flex flex-row justify-start items-center gap-2 w-min select-none">
            <AvatarMedium data={avatar} online={false} />
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
        <div className="flex flex-row justify-start items-center gap-2 w-min h-8">
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

    if ( color ) {
        return (
            <img src={`/ss${color}.png`} alt={`Sistema solar ${solarSystemColor[color]}`} className="min-w-10 h-10" />
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
        <div className="flex flex-row justify-start items-center gap-2 w-min select-none">
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

    // Creación de componente dinámico
    const ComponentCallback = ({
        [ planet ]: nthPlanet,
        name,
        avatar,
    }: Record<string, any>) => {

        // Si no existe planeta se retorna indicador de nulidad de éste
        if ( !nthPlanet ) {
            return (
                <div className="flex flex-row justify-center h-full text-white/30">{"[NA]"}</div>
            )

        // Si existe planeta...
        } else {

            // Si existen coordenadas
            if ( (nthPlanet['x'] && nthPlanet['y']) || (nthPlanet['planet'] === 0) ) {

                // Se retorna interfaz para manejo de datos
                return (
                    <div className="flex flex-col justify-center items-center gap-2 h-24 coords-cell group">

                        {/* Vista previa de los datos */}
                        <div className="flex flex-row justify-start items-center gap-2">
                            <SolarSystem {...nthPlanet} />
                            <StarBase {...nthPlanet} />
                            <TableCoordinates {...nthPlanet} />
                        </div>

                        {/* Botones de interacción con los datos */}
                        {!nthPlanet['restores_at'] &&
                            <div className="group-[.coords-cell]:group-hover:h-10 flex flex-row justify-start items-center gap-2 opacity-0 group-[.coords-cell]:group-hover:opacity-100 h-0 ui-cell-cords">

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
                    <div className="flex flex-row justify-start items-center gap-2">

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
        <div className="flex flex-row items-center gap-2 font-mono">
            <img src="/clock.png" alt="" />
            {`${Number(hour) > 12 ? Number(hour) - 12 : (Number(hour) === 0 ? 12 : Number(hour))}:${minute}:${second} ${mer}`}
        </div>
    )
}
