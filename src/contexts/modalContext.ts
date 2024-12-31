import { createContext } from "react";

interface ModalContentContext {
    modalContent: string | React.JSX.Element | Array<React.JSX.Element | string | boolean> | undefined
    setModalContent: React.Dispatch<React.SetStateAction<string | React.JSX.Element | Array<React.JSX.Element | string | boolean> | undefined>>
} 

export const ModalContext = createContext<ModalContentContext>({
    modalContent: undefined,
    setModalContent: () => null,
});
