import { useEffect, useState } from "react";
import mobiusAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendUrl";
import ButtonTextIcon from "../../components/ui/button/ButtonTextIcon";
import { ArrowPathIcon, FlagIcon } from "@heroicons/react/24/solid";
import Table from "../../components/table/Table";
import { TablePlayer, XPLevel } from "../../components/widgets/custom_widgets/ManageCoords";

interface DataFromAPI {
    'enemy_alliance_name': string;
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
        <div id="page" className="flex flex-col items-center gap-4 h-full overflow-y-hidden">
            <div className="h-10">

                <ButtonTextIcon type="primary" icon={ArrowPathIcon} onClick={getAllianceStats} disabled={loading}>
                    Refrescar
                </ButtonTextIcon>
            </div>
            {data &&
                <div className="flex flex-row items-center">
                </div>
            }
            {data &&
                <div className="flex flex-col gap-2 pb-4 w-min h-[calc(100%_-_2.5rem)]">
                    <div className="flex flex-row justify-center items-center gap-2 w-full">
                    <img className="size-12" src={`https://cdn.galaxylifegame.net/content/img/alliance_flag/AllianceLogos/flag_${data['enemy_alliance_logo']['shape']}_${data['enemy_alliance_logo']['pattern']}_${data['enemy_alliance_logo']['icon']}.png`} alt="" />
                        <span className="text-2xl">{data['enemy_alliance_name']}</span>
                    </div>
                    <div className="w-full h-[calc(100%_-_5rem)]">
                        <Table data={data['enemy_alliance_members']} loading={loading} viewConfig={viewConfig} noRecordsIcon={FlagIcon} noRecordsMessage="No estamos en guerra" />
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
