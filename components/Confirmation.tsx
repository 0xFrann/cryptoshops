import Modal, { IModalProps } from "./Modal";

const ConfirmationMessageStyle = "text-base";
const ConfirmationActionStyle = "flex flex-row justify-end space-x-6 mt-6";

interface IConfirmationProps extends Omit<IModalProps, "children"> {
  message: string;
  acceptLabel: string;
  rejectLabel: string;
  onAccept: () => void;
  onReject?: () => void;
}

const Confirmation = ({
  message,
  acceptLabel,
  rejectLabel,
  onAccept,
  onReject,
  ...rest
}: IConfirmationProps): React.ReactElement => {
  return (
    <Modal {...rest}>
      <>
        <span className={ConfirmationMessageStyle}>{message}</span>
        <span className={ConfirmationActionStyle}>
          <button
            className="focus:outline-none hover:underline focus:underline text-gray-600"
            onClick={onReject}
          >
            {rejectLabel}
          </button>
          <button
            className="focus:outline-none hover:underline focus:underline text-yellow-600 font-bold"
            onClick={onAccept}
          >
            {acceptLabel}
          </button>
        </span>
      </>
    </Modal>
  );
};

export default Confirmation;
