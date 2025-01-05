import { useContext, useState } from "react";
import mobiusAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendUrl";
import Group from "../layout/Group";
import { TablePlayer, XPLevel } from "../widgets/custom_widgets/ManageCoords";
import ButtonTextIcon from "../ui/button/ButtonTextIcon";
import { CheckIcon } from "@heroicons/react/24/solid";
import { ModalContext } from "../../contexts/modalContext";

interface MarkOnOfflineParams {
    enemyId: number;
    enemyName: string;
    enemyAvatar: string;
    enemyLevel: number;
    online: boolean;
}

const MarkOnOffline: (config: MarkOnOfflineParams) => (React.JSX.Element) = ({
    enemyId,
    enemyName,
    enemyAvatar,
    enemyLevel,
    online,
}) => {

    const status: string = !online ? 'conectado' : 'desconectado'
    const [ sent, setSent ] = useState<boolean>(false);
    const { closeModal } = useContext(ModalContext)

    const markOnlineStatus = async () => {
        setSent(false);
        await mobiusAxios.post(getBackendUrl(`/alliances/mark_${online ? 'off' : 'on'}line`), enemyId, { authenticate: true});
        closeModal();
    }

    return (
        <Group title={`Marcar como ${status}`}>

            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                    <TablePlayer name={enemyName} avatar={enemyAvatar} online={online} />
                    <XPLevel level={enemyLevel} />
                </div>

                <div className="text-center text-sm">{`¿Estás seguro(a) que deseas marcar al jugador como ${status}?`}</div>

                <ButtonTextIcon icon={CheckIcon} onClick={markOnlineStatus} disabled={sent} type="primary">
                    Confirmar
                </ButtonTextIcon>
            </div>
        </Group>
    )
}

export default MarkOnOffline;
