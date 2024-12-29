import { useContext, useState } from 'react';
import { DarkModeContext } from './contexts/darkModeContext';
import useDarkMode from './hooks/useDarkMode';
import Login from './routes/Login';
import { TokenContext } from './contexts/tokenContext';
import { AppContext } from './contexts/appContext';
import Root from './components/common/Root';

const App: () => (React.JSX.Element) = () => {

    // Obtención del hook de modo oscuro para contexto
    const { darkMode, setDarkMode } = useDarkMode();

    // Obtención del token de autenticación por medio del valor del contexto
    const { token } = useContext(TokenContext);

    // Inicialización de barra lateral siempre activa
    const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>(false);
    const [ isSidebarLocked, setIsSidebarLocked ] = useState<boolean>(false);

    return (
        // Proveedor de contexto de modo oscuro
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <AppContext.Provider value={{ isSidebarLocked, setIsSidebarLocked, isSidebarOpen, setIsSidebarOpen }} >
                <div className='relative z-0 flex flex-col h-svh transition'>
                    {!token
                        ? <Login />
                        : <Root/>
                    }
                </div>
            </AppContext.Provider>
        </DarkModeContext.Provider>
    )
};

export default App;