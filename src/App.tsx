import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from './contexts/darkModeContext';
import useDarkMode from './hooks/useDarkMode';
import Login from './routes/Login';
import { TokenContext } from './contexts/tokenContext';
import { AppContext } from './contexts/appContext';
import Root from './components/common/Root';
import { ModalContext } from './contexts/modalContext';
import Modal from './components/modal/Modal';
import { useNavigate } from 'react-router-dom';

const App: () => (React.JSX.Element) = () => {

    // Obtención del hook de modo oscuro para contexto
    const { darkMode, setDarkMode } = useDarkMode();

    // Obtención del token de autenticación por medio del valor del contexto
    const { token } = useContext(TokenContext);

    const navigateTo = useNavigate();

    const [ modalContent, setModalContent ] = useState<string | React.JSX.Element | Array<React.JSX.Element | string | boolean> | undefined>(undefined);

    const { closeModal, addOnCloseModalCallback, removeOnCloseModalCallback } = useModalContent(setModalContent);

    // Inicialización de barra lateral siempre activa
    const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>(false);
    const [ isSidebarLocked, setIsSidebarLocked ] = useState<boolean>(false);

    useEffect(
        () => {
            if ( !token ) {
                navigateTo("/")
            }
        }, [token, navigateTo]
    )

    return (
        // Proveedor de contexto de modo oscuro
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <ModalContext.Provider value={{ modalContent, setModalContent, closeModal, addOnCloseModalCallback, removeOnCloseModalCallback }} >

                <AppContext.Provider value={{ isSidebarLocked, setIsSidebarLocked, isSidebarOpen, setIsSidebarOpen }} >
                    <div className='relative z-0 flex flex-col h-svh transition'>
                        {!token
                            ? <Login />
                            : <Root/>
                        }
                    </div>
                    <Modal />
                </AppContext.Provider>
            </ModalContext.Provider>
        </DarkModeContext.Provider>
    )
};

export default App;

const useModalContent = (setModalContent: React.Dispatch<React.SetStateAction<string | React.JSX.Element | Array<React.JSX.Element | string | boolean> | undefined>>) => {

    const modalCallbacks: Record<string, () => void> = {}

    const closeModal = () => {

        // Ejecución de todas las funciones 
        Object.values(modalCallbacks).forEach(
            ( f ) => f()
        );

        // Ejecución de eliminación de contenido del modal
        setModalContent(undefined)
    }

    const addOnCloseModalCallback = (key: string, callback: () => void) => {

        modalCallbacks[key] = callback;
    }

    const removeOnCloseModalCallback = (key: string) => {

        modalCallbacks[key] = () => null;
    }

    return { closeModal, addOnCloseModalCallback, removeOnCloseModalCallback }
}
