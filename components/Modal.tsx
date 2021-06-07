import { PropsWithChildren } from "react";
import CloseIcon from "../assets/close-icon.svg";

const ModalStyle =
  "absolute top-0 bottom-0 w-screen h-screen overflow-hidden bg-yellow-900 bg-opacity-90 flex justify-center items-center z-50";
const ModalCardStyle = "max-w-screen-sm w-10/12 bg-white p-6 rounded-xl";
const ModalHeaderStyle = "flex justify-between mb-4";
const ModalTitleStyle = "text-lg font-bold";

export interface IModalProps extends PropsWithChildren<unknown> {
  visible: boolean;
  onClose: () => void;
  closable?: boolean;
  title?: string;
}

const Modal = ({
  visible,
  onClose,
  closable = true,
  title = "",
  children,
}: IModalProps): React.ReactElement => {
  return (
    <span className={`${ModalStyle} ${visible ? "block" : "hidden"}`}>
      <span className={ModalCardStyle}>
        <div className={ModalHeaderStyle}>
          <span className={ModalTitleStyle}>{title}</span>
          {closable && <CloseIcon width={20} height={20} onClick={onClose} />}
        </div>
        {children}
      </span>
    </span>
  );
};

export default Modal;
