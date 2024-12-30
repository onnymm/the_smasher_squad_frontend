import AvatarMedium from "../../avatar/AvatarMedium";

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
