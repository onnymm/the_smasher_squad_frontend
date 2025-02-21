import { useState } from "react";
import Grapper from "../../components/layout/Grapper";
import Group from "../../components/layout/Group";
import Header from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import Alert from "../../components/ui/alert/Alert";
import InputText from "../../components/ui/input/InputText";
import ButtonTextIcon from "../../components/ui/button/ButtonTextIcon";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import AvatarLarge from "../../components/avatar/AvatarLarge";
import mobiusAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendUrl";

interface PlayerFromAPI {
    name: string;
    avatar: string;
}

const EnemyRoute: () => (React.JSX.Element) = () => {

    const [ playerName, setPlayerName ] = useState<string>('');
    const [ playerInfo, setPlayerInfo ] = useState<PlayerFromAPI | undefined>(undefined)


    const requestInfo = async (): Promise<void> => {

        const response = await mobiusAxios.get(getBackendUrl('/players/search/'), {params: {name: playerName}, authenticate: true})
        setPlayerInfo(response.data)
    }

    return (
        <Page>
            <Header>
                <Alert type="warning">
                    Función en construcción
                </Alert>
            </Header>
            <Grapper justify="center">
                <Group title="Buscar jugador">
                    <InputText value={playerName} setValue={setPlayerName} visiblePlaceholder="Jugador" onEnter={requestInfo} />
                    <ButtonTextIcon icon={MagnifyingGlassIcon} onClick={requestInfo} type="primary" disabled={playerName == ''}>
                        Buscar
                    </ButtonTextIcon>
                </Group>
                {playerInfo &&
                    <AvatarLarge data={playerInfo.avatar} alt={playerInfo.name} online={false} />
                }
                {playerInfo &&
                    playerInfo?.name
                }
            </Grapper>
        </Page>
    )
}

export default EnemyRoute;