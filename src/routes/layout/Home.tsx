import { useEffect, useState } from "react";
import mobiusAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendUrl";
import ButtonTextIcon from "../../components/ui/button/ButtonTextIcon";
import { ArrowPathIcon, FlagIcon } from "@heroicons/react/24/solid";
import Table from "../../components/table/Table";
import { TablePlayer, XPLevel } from "../../components/widgets/custom_widgets/ManageCoords";

interface DataFromAPI {
    'enemy_alliance_name': string;
    'enemy_alliance_description': string;
    'enemy_alliance_level': string;
    'enemy_alliance_wars_won': number;
    'enemy_alliance_wars_lost': number;
    'enemy_alliance_farmeable_wp': number;
    'enemy_alliance_logo': {
        shape: string;
        pattern: string;
        icon: string;
    }
    'enemy_alliance_members': ResponseDataStructure,
}

const Home: () => (React.JSX.Element) = () => {

    const [ data, setData ] = useState<undefined | DataFromAPI>(undefined)
    const [ loading, setLoading ] = useState<boolean>(true)

    const getAllianceStats = async (): Promise<void> => {

        setLoading(true);

        const response = await mobiusAxios.get(getBackendUrl("/alliances/get_enemy_alliance_stats"), {authenticate: true})

        setData(response.data);
        setLoading(false)
    }

    const viewConfig: ViewConfig[] = [
        {
            key: 'name',
            displayName: 'Jugador',
            type: TablePlayer,
        },
        {
            key: 'level',
            displayName: 'Nivel',
            type: XPLevel,
        },
        {
            key: 'alliance_role',
            displayName: 'Puesto',
            type: AllianceRole,
        },
        {
            key: 'total_war_points',
            displayName: 'Puntos de guerra',
            type: WarPoints,
        }
    ]

    useEffect(
        () => {
            getAllianceStats()
        }, []
    )

    return (
        <div id="page" className="flex flex-col items-center gap-2 h-full overflow-y-hidden">
            <div className="h-10">

                {/* Botón para actualizar alianza en guerra */}
                <ButtonTextIcon type="primary" icon={ArrowPathIcon} onClick={getAllianceStats} disabled={loading}>
                    Actualizar
                </ButtonTextIcon>
            </div>

            {data &&
                <div className="flex flex-col items-center gap-2 pb-4 w-min h-[calc(100%_-_4.5rem)]">
                    <div className="flex flex-col justify-center items-center bg-slate-800/70 shadow-md px-6 py-2 border border-gray-500/30 rounded-xl w-max">

                        <div className="flex flex-row items-center gap-6 w-max">
                            {/* Nombre y logo de la alianza */}
                            <div className="flex items-center gap-2">
                                <img className="size-12" src={`https://cdn.galaxylifegame.net/content/img/alliance_flag/AllianceLogos/flag_${data['enemy_alliance_logo']['shape']}_${data['enemy_alliance_logo']['pattern']}_${data['enemy_alliance_logo']['icon']}.png`} alt="" />
                                <span className="text-2xl">{data['enemy_alliance_name']}</span>
                            </div>

                            {/* Guerras ganadas y perdidas */}
                            <div className="flex items-center gap-2">
                                <img src="/gun.png" alt="Guerras ganadas" className="size-6" />
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-2">
                                        Guerras ganadas: <span className="text-main-500">{data['enemy_alliance_wars_won']}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        Guerras perdidas: <span className="text-main-500">{data['enemy_alliance_wars_lost']}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ratio de guerra */}
                            <div className="flex items-center gap-2">
                                <img src="/target.png" alt="Ratio" className="size-6" />
                                Ratio: <span className="text-main-500">{(data['enemy_alliance_wars_won'] * 100 / (data['enemy_alliance_wars_lost'] + data['enemy_alliance_wars_won'])).toFixed(2)}%</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-6 w-max">
                            {/* Descripción de la alianza */}
                            <div className="flex justify-center w-full h-8">
                                <span className="text-gray-500">{`${data['enemy_alliance_description']}`}</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-6 w-max">

                            {/* Miembros */}
                            <div className="flex items-center h-8">
                                <img src="/alliance.png" alt="Miembros" className="size-6" />
                                <span>Miembros: <span className="text-main-500">{data['enemy_alliance_members']['count']}</span></span>
                            </div>

                            {/* Nivel */}
                            <div className="flex items-center gap-2">
                                <img src="/wpstar.png" alt="Nivel de alianza" className="size-6" />
                                Nivel <span className="text-main-500">{data['enemy_alliance_level']}</span>
                            </div>

                            {/* Estrellas recolectables */}
                            <div className="flex items-center gap-2">
                                <img src="/wpstar.png" alt="Puntos de guerra recolectables" className="size-6" />
                                Estrellas farmeables: <span className="text-main-500">~{data['enemy_alliance_farmeable_wp']}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de miembros */}
                    <div className="flex flex-col items-center w-full h-[calc(100%_-_6.25rem)]">
                        <div className="h-full">
                            <Table data={data['enemy_alliance_members']} loading={loading} viewConfig={viewConfig} noRecordsIcon={FlagIcon} noRecordsMessage="No estamos en guerra" />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;

interface AllianceRoleParams {
    'alliance_role': 0 | 1 | 2
}

const AllianceRole: (config: AllianceRoleParams) => (React.JSX.Element) = ({
    alliance_role
}) => {

    const allianceRoleName = {
        0: 'General',
        1: 'Capitán',
        2: 'Soldado'
    }

    return (
        <span>{allianceRoleName[alliance_role]}</span>
    )
}

interface WarPointsParams {
    'total_war_points': number;
}

const WarPoints: (config: WarPointsParams) => (React.JSX.Element) = ({
    total_war_points
}) => {

    return (
        <div className="flex flex-row items-center gap-2">
            <img src="/wpstar.png" alt="Puntos de guerra" />
            {total_war_points}
        </div>
    )
}
