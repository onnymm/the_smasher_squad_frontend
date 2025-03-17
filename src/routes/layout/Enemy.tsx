import { useContext, useEffect, useState } from "react";
import Grapper from "../../components/layout/Grapper";
import Group from "../../components/layout/Group";
import Header from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import Alert from "../../components/ui/alert/Alert";
import AvatarLarge from "../../components/avatar/AvatarLarge";
import InputSearch from "../../components/ui/input/InputSearch";
import searchPlayer from "../../api/actions/searchPlayer";
import Fallback from "../../components/misc/Fallback";
import { ArrowPathIcon, MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { SolarSystem, StarBase, TableCoordinates, XPLevel } from "../../components/widgets/custom_widgets/ManageCoords";
import ButtonIcon from "../../components/ui/button/ButtonIcon";
import { ManageCoords } from "../../components/actions/AddCoords";
import { ModalContext } from "../../contexts/modalContext";
import DeleteCoords from "../../components/actions/DeleteCoords";
import { CreateCoordsRecord } from "../../components/actions/CreateCoordsRecord";
import { createAllianceLogoURL } from "../../utils/common";

interface _DataFromAPI {
    player: PlayerDataFromAPI;
    coords: Mobius.Backend.BasePlayerCoords[];
    alliance: AllianceDataFromAPI;
}

const EnemyRoute: () => (React.JSX.Element) = () => {

    // Nombre del jugador
    const [ playerName, setPlayerName ] = useState<string>('');
    // Estado de carga
    const [ loading, setLoading ] = useState<boolean>(false);
    // Estado para actualización
    const [ update, setUpdate ] = useState<boolean>(false);
    // Datos del jugador desde la API
    const [ playerInfo, setPlayerInfo ] = useState<_DataFromAPI | undefined | boolean>(undefined)

    // Búsqueda del jugador
    useEffect(
        () => {
            // Si no hay un nombre de usuario no se realiza una búsqueda y termina función
            if ( playerName === '' ) return;
            // Búsqueda del jugador y obtención de los datos
            searchPlayer({ playerName, setPlayerInfo, setLoading })
        }, [playerName, setPlayerInfo, update]
    )

    return (
        <Page>

            <Header>
                {/* Mensaje temporal de la función en progreso */}
                <Alert type="warning">
                    La respuesta del servidor puede demorar debido a que los datos se obtienen directamente desde la API de Galaxy Life la cual se satura constantemente.
                </Alert>
            </Header>

            <Grapper justify="center">
                {/* Encabezado y búsqueda */}
                <Group title="Buscar jugador">
                    <div className="flex flex-row gap-2">
                        <InputSearch search={playerName} setSearch={setPlayerName} loading={loading}/>
                        <ButtonIcon icon={ArrowPathIcon} onClick={() => setUpdate((prevState) => !prevState)} disabled={playerName === '' || loading || playerInfo === false} />
                    </div>
                </Group>

                {/* Visualización de la información o del estado de carga */}
                {loading
                    // Estado de carga
                    ? (
                        <div className="size-full">
                            <Fallback icon={MagnifyingGlassIcon}/>
                        </div>
                    )
                    // Visualización de la información
                    : (
                        <Group>
                            {/* Si la API retornó un resultado */}
                            {typeof playerInfo === 'object' &&
                                <div className="flex flex-col items-center gap-8">
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="flex flex-col items-center gap-2 w-48">
                                            <AvatarLarge data={playerInfo.player['Avatar']} alt={playerInfo.player['Name']} online={false} />
                                            <p>{playerInfo.player['Name']}</p>
                                            <XPLevel level={playerInfo.player['Level']} />
                                        </div>
                                        {Object.keys(playerInfo.alliance).length > 0 &&
                                            <div className="flex flex-col items-center gap-2 w-48">
                                                <PlayerAlliance {...playerInfo.alliance} PlayerName={playerInfo.player['Name']} />
                                            </div>
                                        }
                                    </div>
                                    <PlanetsTable playerInfo={playerInfo.player} coords={playerInfo.coords} allianceInfo={playerInfo.alliance} />
                                </div>
                            }
                            {/* Si la API no retornó ningún resultado */}
                            {playerInfo === false &&
                                <Alert type="error">
                                    No existe ningún jugador con ese nombre de usuario.
                                </Alert>
                            }
                        </Group>
                    )
                }
            </Grapper>
        </Page>
    )
}

export default EnemyRoute;

interface PlanetsTableParams {
    playerInfo: PlayerDataFromAPI;
    coords: Mobius.Backend.BasePlayerCoords[];
    allianceInfo: AllianceDataFromAPI;
};

const PlanetsTable: (config: PlanetsTableParams) => (React.JSX.Element) = ({
    playerInfo,
    coords,
    allianceInfo,
}) => {

    const playerRecordInAlliance = allianceInfo.Members.find( (member) => member['Name'] === playerInfo['Name'] ) as AllianceMember
    const role = playerRecordInAlliance['AllianceRole']

    return (
        <Group>
            <div className="gap-2 grid grid-cols-4">
                {
                    coords.map(
                        (planet, i) => (
                            <CreatePlanetRecord
                                key={i}
                                avatar={playerInfo['Avatar']}
                                name={playerInfo['Name']}
                                level={playerInfo['Level']}
                                role={role}
                                planetInfo={planet}
                            />
                        )
                    )
                }
            </div>
        </Group>
    );
};

interface CreatePlanetRecordParams {
    name: string;
    avatar: string;
    level: number;
    role: RoleCode;
    planetInfo: Mobius.Backend.BasePlayerCoords;
};

const CreatePlanetRecord: (config: CreatePlanetRecordParams) => (React.JSX.Element) = ({
    name,
    avatar,
    level,
    role,
    planetInfo,
}) => {

    const { setModalContent } = useContext(ModalContext);

    return (
        <div className="group flex flex-col justify-start items-center gap-2 w-44 h-36 coords-cell">
            <div className="flex flex-row justify-center">{planetInfo.planet ? `${planetInfo.planet}a colonia` : "Planeta principal"}</div>

            {/* Botón para añadir coordenadas */}
            {
                planetInfo.id
                ? (
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <SolarSystem color={planetInfo.color} />
                            <StarBase
                                starbase_level={planetInfo.starbase_level}
                                planet={planetInfo.planet}
                            />
                            <TableCoordinates x={planetInfo.x as number} y={planetInfo.y as number} />
                        </div>
                        <div className="flex flex-row justify-center gap-2">
                            <ButtonIcon
                                icon={PencilIcon}
                                onClick={
                                    () => setModalContent(
                                        <ManageCoords
                                            enemyName={name}
                                            enemyAvatar={avatar}
                                            starbase_level={planetInfo.starbase_level}
                                            colonyId={planetInfo.id as number}
                                            sscolor={planetInfo.color as Mobius.Types.NonNullableSolarSystemColor}
                                            planet={planetInfo.planet}
                                            x={planetInfo.x}
                                            y={planetInfo.y}
                                        />
                                    )
                                }
                            />
                            <ButtonIcon
                                icon={TrashIcon}
                                onClick={
                                    () => setModalContent(
                                        <DeleteCoords
                                            enemyName={name}
                                            enemyAvatar={avatar}
                                            colonyId={planetInfo.id as number}
                                            starbase_level={planetInfo.starbase_level}
                                            planet={planetInfo.planet}
                                            sscolor={planetInfo.color as Mobius.Types.NonNullableSolarSystemColor}
                                        />
                                    )
                                }
                                type="danger"
                            />
                        </div>
                    </div>
                )
                : (
                        // {/* Nivel de base estelar */}
                        <div className="flex flex-col gap-2">
                            <StarBase
                                starbase_level={planetInfo.starbase_level}
                                planet={planetInfo.planet}
                            />
                            <ButtonIcon
                                icon={PlusIcon}
                                onClick={
                                    () => setModalContent(
                                        <CreateCoordsRecord
                                            enemyName={name}
                                            enemyAvatar={avatar}
                                            role={role}
                                            starbase_level={planetInfo.starbase_level}
                                            sscolor={planetInfo.color as Mobius.Types.NonNullableSolarSystemColor}
                                            planet={planetInfo.planet}
                                            level={level}
                                        />
                                    )
                                }
                                type="primary"
                            />
                        </div>
                    )
            }
        </div>
    );
};

interface PlayerAllianceParams extends AllianceDataFromAPI {
    PlayerName: string;
}

const PlayerAlliance: (config: PlayerAllianceParams) => (React.JSX.Element) = ({
    Name: name,
    Emblem: emblem,
    Members: members,
    PlayerName: playerName,
}) => {

    const roleCode = members.find( (member) => (member['Name'] === playerName) ) as AllianceMember

    const roleName = roleDescription(roleCode['AllianceRole']);

    return (
        <div className="flex flex-col items-center gap-1">
            <img className="size-10" src={createAllianceLogoURL(emblem['Shape'], emblem['Pattern'], emblem['Icon'])} alt="" />
            <p className="">{name}</p>
            <p className="text-main-500">{roleName}</p>
        </div>
    )
}

const roleDescription = (role: RoleCode): string => {

    const roleName = {
        0: 'General',
        1: 'Capitán',
        2: 'Soldado',
    }

    return roleName[role]
}

