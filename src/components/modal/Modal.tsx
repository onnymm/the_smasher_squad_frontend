import { createPortal } from "react-dom";
import MiniGrapper from "../layout/MiniGrapper";
import { useContext } from "react";
import { ModalContext } from "../../contexts/modalContext";

const Modal: () => (React.ReactPortal | undefined) = () => {

    const { modalContent, closeModal: onCloseModal } = useContext(ModalContext)

    // Si no hay contenido, no se renderiza
    if ( !modalContent ) return;

    return (
        createPortal(
            <div className="top-0 left-0 absolute flex justify-center items-center bg-black/50 backdrop-blur-sm h-full size-full">
                <div className="top-0 left-0 absolute size-full" onClick={onCloseModal} />
                <MiniGrapper>

                    {modalContent}

                </MiniGrapper>
            </div>,
            document.getElementById("modal") as HTMLElement
        )
    )
}

export default Modal;
