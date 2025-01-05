import { TrashIcon } from "@heroicons/react/24/solid";
import Group from "../layout/Group";
import ButtonTextIcon from "../ui/button/ButtonTextIcon";
import { SolarSystem, StarBase, TablePlayer } from "../widgets/custom_widgets/ManageCoords";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/modalContext";
import mobiusAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendUrl";

interface DeleteCoordsParams {
    enemyName: string;
    enemyAvatar: string;
    sscolor?: SolarColorOption;
    colonyId: number;
    planet: number;
    'starbase_level': 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

const DeleteCoords: (config: DeleteCoordsParams) => (React.JSX.Element) = ({
    enemyName,
    enemyAvatar,
    sscolor,
    colonyId,
    planet,
    starbase_level,
}) => {

    const [ sent, setSent ] = useState<boolean>(false);

    const { closeModal } = useContext(ModalContext)

    const deleteCoords = async () => {
        setSent(true);
        await mobiusAxios.delete(getBackendUrl("/alliances/delete_coords"), {params: {'planet_id': colonyId}, authenticate: true});
        closeModal();
    }

    return (
        <Group title="Eliminar coordenadas">

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

            <ButtonTextIcon
                icon={TrashIcon}
                onClick={deleteCoords}
                type="danger"
                disabled={sent}
            >
                Eliminar
            </ButtonTextIcon>
        </Group>
    )
}

export default DeleteCoords;
