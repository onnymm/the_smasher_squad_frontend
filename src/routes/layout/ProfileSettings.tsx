import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { UserContext } from "../../contexts/userContext";
import InputUser from "../../components/ui/input/InputUser";
import Group from "../../components/layout/Group";
import MiniGrapper from "../../components/layout/MiniGrapper";
import Alert from "../../components/ui/alert/Alert";
import ButtonTextIcon from "../../components/ui/button/ButtonTextIcon";
import { CheckIcon } from "@heroicons/react/24/solid";
import mobiusAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendUrl";
import InputPassword from "../../components/ui/input/InputPassword";
import PasswordChecker from "../../components/ui/alert/PasswordChecker";

const ProfileSettings: () => (React.JSX.Element) = () => {

    // Obtención de función de cambio de estado de token de usuario
    const { setToken } = useContext(TokenContext);
    // Obtención de usuario y nombre del usuario
    const { user, name } = useContext(UserContext)

    // Estados de usuario y nombre
    const [ inputUser, setInputUser ] = useState<string>(user);
    const [ inputName, setInputName ] = useState<string>(name);

    // Estado de nombre guardado
    const [ savedName, setSavedName ] = useState<boolean>(false);

    // Estados de contraseña
    const [ inputPassword, setInputPassword ] = useState<string>("");
    const [ inputConfirmPassword, setInputConfirmPassword ] = useState<string>("");
    const [ inputNewPassword, setInputNewPassword ] = useState<string>("");

    // Estado de si la nueva contraseña es válida
    const [ isValidPassword, setIsValidPassword ] = useState<boolean>(false);

    // Es contraseña incorrecta
    const [ isWrongPassword, setIsWrongPassword ] = useState<boolean>(false);

    // Actualización de los datos por si el usuario recarga la página
    useEffect(
        () => {
            setInputUser(user);
            setInputName(name);
        }, [name, user]
    )

    return (
        <div className="flex justify-center items-center h-min min-h-full">
            <MiniGrapper>

                <Group title="Nombre de usuario">
                    {/* Nombre de usuario en modo lectura */}
                    <InputUser value={inputUser} setValue={setInputUser} visiblePlaceholder="Usuario" disabled={true} />
                    <Alert type="warning">
                        Actualmente los nombres de usuario están ligados a Galaxy Life, por lo que no pueden ser modificados.
                    </Alert>
                    {/* Cambio de nombre */}
                    <InputUser value={inputName} setValue={setInputName} visiblePlaceholder="Nombre" />
                    {savedName &&
                        <Alert type="success">
                            Cambios realizados exitosamente. Para reflejar los cambios, recarga la página.
                        </Alert>
                    }
                    {/* Botónd de guardar cambios */}
                    <ButtonTextIcon icon={CheckIcon} onClick={() => saveName(inputName, setSavedName)} disabled={inputName === name || inputName === ''} type="primary">
                        Guardar
                    </ButtonTextIcon>
                </Group>

                <Group title="Contraseña">

                    {/* Campos de contraseña actual, confirmar contraseña y nueva contraseña */}
                    <InputPassword value={inputPassword} setValue={setInputPassword} visiblePlaceholder="Contraseña actual" />
                    <InputPassword value={inputConfirmPassword} setValue={setInputConfirmPassword} visiblePlaceholder="Confirma la contraseña" />
                    <InputPassword value={inputNewPassword} setValue={setInputNewPassword} visiblePlaceholder="Nueva contraseña" />

                    {/* Indicador de requisitos faltantes de contraseña */}
                    <PasswordChecker password={inputNewPassword} setIsValidPassword={setIsValidPassword} />

                    {/* Botón de cambiar contraseña */}
                    <ButtonTextIcon icon={CheckIcon} onClick={() => changePassword(inputPassword, inputNewPassword, setIsWrongPassword, setToken)} disabled={(inputPassword === "" || inputConfirmPassword === "" || inputPassword !== inputConfirmPassword) || isValidPassword} type="primary">
                        Cambiar contraseña
                    </ButtonTextIcon>
                    {/* Indicador de que la contraseña actual es incorrecta */}
                    {isWrongPassword &&
                        <Alert type="error">
                            Contraseña actual incorrecta.
                        </Alert>
                    }
                </Group>

            </MiniGrapper>

        </div>
    );
};

export default ProfileSettings;

const saveName = async (name: string, setSavedName: React.Dispatch<React.SetStateAction<boolean>>) => {

    setSavedName(false);

    const response = await mobiusAxios.post(getBackendUrl("/account/change_display_name"), name, {authenticate: true});
    
    if ( response.data === true ) {
        setSavedName(true);
    };
}

const changePassword = async (password: string, newPassword: string, setIsWrongPassword: React.Dispatch<React.SetStateAction<boolean>>, setToken: React.Dispatch<React.SetStateAction<string | null>>) => {

    setIsWrongPassword(false);

    const response = await mobiusAxios.post(getBackendUrl("/account/change_password"), { 'current_password': password, 'new_password': newPassword }, {authenticate: true});

    if ( response.data === true ) {
        setToken(null);
    } else if ( response.data === false ) {
        setIsWrongPassword(true);
    }
}
