import Alert from "./Alert";

interface PasswordCheckerParams {
    password: string,
    setIsValidPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const PasswordChecker: (config: PasswordCheckerParams) => (React.JSX.Element | null) = ({
    password,
    setIsValidPassword,
}) => {

    // Longitud mínima de 8 caracteres
    const isMinLenght = password.length >= 8;

    // Contiene mayúsculas
    const containsUpper = /[A-Z]/.test(password)
    // Contiene mayúsculas

    const containsLower = /[a-z]/.test(password)

    // Contiene números
    const containsNumber = /\d/.test(password)

    if ( !isMinLenght || !containsUpper || !containsLower || !containsNumber ) {

        // Se indica que la contraseña nueva es válida
        setIsValidPassword(true)

        return (
            <Alert type="error">
                {!isMinLenght &&
                    <div>{" - Debe ser de al menos 8 caracteres."}</div>
                }
                {!containsUpper &&
                    <div>{" - Debe contener al menos una mayúscula."}</div>
                }
                {!containsLower &&
                    <div>{" - Debe contener minúsculas"}</div>
                }
                {!containsNumber &&
                    <div>{" - Debe contener al menos un número."}</div>
                }
                <div className="font-bold">{" - NO SE ACEPTAN ALCOHÓLICOS NI AMERICANISTAS."}</div>
            </Alert>
        )
    } else {

        // Se indica que la contraseña nueva es inválida
        setIsValidPassword(false);

        return null;
    }
}

export default PasswordChecker;
