import { createContext } from "react";

interface ModalContentContext {
    modalContent: string | React.JSX.Element | Array<React.JSX.Element | string | boolean> | undefined
    setModalContent: React.Dispatch<React.SetStateAction<string | React.JSX.Element | Array<React.JSX.Element | string | boolean> | undefined>>
    closeModal: () => void;
    addOnCloseModalCallback: (key: string, callback: () => void) => void;
    removeOnCloseModalCallback: (key: string) => void;
} 

export const ModalContext = createContext<ModalContentContext>({
    modalContent: undefined,
    setModalContent: () => null,
    closeModal: () => null,
    addOnCloseModalCallback: () => null,
    removeOnCloseModalCallback: () => null,
});
