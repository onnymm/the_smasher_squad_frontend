import { useContext, useEffect, useState } from "react";
import useOptions from "../../hooks/useOptions";
import Group from "../layout/Group";
import { SolarSystem, StarBase, TablePlayer } from "../widgets/custom_widgets/ManageCoords";
import InputNumeric from "../ui/input/InputNumeric";
import Select from "../ui/select/Select";
import ButtonTextIcon from "../ui/button/ButtonTextIcon";
import { CheckIcon, ListBulletIcon } from "@heroicons/react/24/solid";
import getBackendUrl from "../../api/backendUrl";
import mobiusAxios from "../../api/axiosInstance";
import { ModalContext } from "../../contexts/modalContext";

interface AddCoordsParams {
    enemyName: string;
    enemyAvatar: string;
    x?: number | undefined;
    y?: number | undefined;
    sscolor?: SolarColorOption;
    enemyId: number;
    colonyId: number;
    planet: number;
    'starbase_level': 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export const ManageCoords: (config: AddCoordsParams) => (React.JSX.Element) = ({
    enemyName,
    enemyAvatar,
    x,
    y,
    sscolor,
    colonyId,
    planet,
    starbase_level,
}) => {

    // Obtención de función para agregar contenido al modal
    const { setModalContent } = useContext(ModalContext)

    // Declaración de opciones de color de sistema solar
    const solarSystemColors: SelectableOption<string>[] = [
        {
            key: 'white',
            displayName: 'Blanco'
        },
        {
            key: 'red',
            displayName: 'Rojo'
        },
        {
            key: 'green',
            displayName: 'Verde',
        },
        {
            key: 'blue',
            displayName: 'Azul',
        },
        {
            key: 'purple',
            displayName: 'Morado',
        },
        {
            key: 'yellow',
            displayName: 'Amarillo',
        }
    ]

    // Inicialización de estado para componente Option
    const [ solarSystemColorOptions, setSolarSystemColorOptions, solarSystemColorKey ] = useOptions(solarSystemColors, {mode: 'switch', initialActive: sscolor});

    // Valor de si se ha guardado la información en el API del backend
    const [ saved, setSaved ] = useState<boolean>(false);
    
    // Inicialización de valores X, Y
    const [ inputX, setInputX ] = useState<undefined | number>(x);
    const [ inputY, setInputY ] = useState<undefined | number>(y);

    // Función a ejecutar para envío de cambios al API
    const triggerSendCoords = () => {
        // Si existen valores en X y Y
        if ( inputX !== undefined && inputY !== undefined ) {
            sendCoords({x: inputX, y: inputY, sscolor: solarSystemColorKey, 'colony_id': colonyId}, setSaved)
        }
    }

    // Si la información fue guardada correctamente
    useEffect(
        () => {
            if ( saved ) {
                // Se borra el contenido del modal para que éste se cierre
                setModalContent(undefined);
            }
        }, [saved, setModalContent]
    )

    return (
        <Group title="Añade o edita coordenadas">

            {/* Nombre ordinal de la colonia o leyenda de planeta principal */}
            <div className="flex flex-row justify-center">{planet ? `${planet}a colonia` : "Planeta principal"}</div>

            {/* Descripción visual de los datos del planeta/colonia */}
            <div className="flex flex-row justify-between">
                {/* Jugador */}
                <TablePlayer name={enemyName} avatar={enemyAvatar} />
                {/* Color del sistema solar */}
                {solarSystemColorKey &&
                    <SolarSystem color={solarSystemColorKey as SolarColorOption} />
                }
                {/* Nivel de base estelar */}
                <StarBase planet={planet} starbase_level={starbase_level} />
            </div>

            {/* Campos de coordenadas */}
            <div className="flex flex-row gap-2">
                <InputNumeric value={inputX} setValue={setInputX} visiblePlaceholder="X" onEnter={triggerSendCoords} onChange={(_, event) => (setInputX(Number(event.target.value)))} min={0} max={2000} />
                <InputNumeric value={inputY} setValue={setInputY} visiblePlaceholder="Y" onEnter={triggerSendCoords} onChange={(_, event) => (setInputY(Number(event.target.value)))} min={0} max={2000} />
            </div>

            {/* Selección de color de sistema solar */}
            <Select options={solarSystemColorOptions} setOptions={setSolarSystemColorOptions} icon={ListBulletIcon} iconActive={CheckIcon} mode='switch'>
                Color de sistema solar
            </Select>

            {/* Botón de envío de datos */}
            <ButtonTextIcon
                icon={CheckIcon}
                onClick={triggerSendCoords}
                type="primary"
                disabled={ !inputX || !inputY }
            >
                Guardar
            </ButtonTextIcon>

        </Group>
    )
}

const sendCoords = async (props: Record<string, any>, setSent: React.Dispatch<React.SetStateAction<boolean>>) => {

    try {
        // Envío de datos al API
        const response = await mobiusAxios.post(getBackendUrl('/alliances/update_coords'), props, { authenticate: true})
        // Si los datos fueron guardados correctamente...
        if ( response.data === true ) {
            setSent(true);
        }

    } catch (error) {
        // Si no, se imprime el error en consola
        console.log(error);
    }

}
