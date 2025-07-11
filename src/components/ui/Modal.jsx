import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useLoseFocus } from "../../hooks/useLoseFocus";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalContext = createContext();

function Modal({ children }) {
  const [currOpenWindow, setCurrOpenWindow] = useState("");

  const closeWindow = () => setCurrOpenWindow("");
  const openWindow = (name) => setCurrOpenWindow(name);

  return (
    <ModalContext.Provider value={{ currOpenWindow, openWindow, closeWindow }}>
      {children}
    </ModalContext.Provider>
  );
}

function OpenBtn({ children, opens: windowName }) {
  const { openWindow } = useContext(ModalContext);

  if (Array.isArray(children)) {
    if (children.length > 1) {
      throw new Error("Modal.OpenBtn expects a single child element.");
    }

    children = children[0];
  }

  return cloneElement(children, { onClick: () => openWindow(windowName) });
}

function Window({ children, name }) {
  const { currOpenWindow, closeWindow } = useContext(ModalContext);
  const { ref } = useLoseFocus({ onClickAway: closeWindow });

  if (Array.isArray(children)) {
    if (children.length > 1) {
      throw new Error("Modal.Window expects a single child element.");
    }

    children = children[0];
  }

  if (currOpenWindow !== name) return null;

  return createPortal(
    <div className="bg-backdrop-color fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm transition-all">
      <div
        ref={ref}
        data-modal-root
        className="fixed top-1/2 left-1/2 w-auto -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-lg transition-all"
      >
        <button
          onClick={closeWindow}
          className="absolute top-5 right-5 size-7 rounded-sm p-1 transition-all hover:bg-gray-200"
        >
          <XMarkIcon />
        </button>

        <div>{cloneElement(children, { OnCloseModal: closeWindow })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.OpenBtn = OpenBtn;
Modal.Window = Window;

export default Modal;
