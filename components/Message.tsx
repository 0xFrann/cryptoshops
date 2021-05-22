import SuccessIcon from "../assets/success-icon.svg";
import WarningIcon from "../assets/warning-icon.svg";
import ErrorIcon from "../assets/error-icon.svg";
import InfoIcon from "../assets/info-icon.svg";

const WrapperStyle = "flex flex-col justify-center items-center p-6 text-center";
const TextStyle = "text-2xl font-bold mt-4";

export type TMessageState = "success" | "warning" | "error" | "info";

interface ImessageProps {
  state: TMessageState;
  text: string;
}

const ColorList = {
  success: "green-400",
  warning: "yellow-400",
  error: "red-400",
  info: "yellow-400",
};

const Icon = ({
  state,
  ...rest
}: React.SVGAttributes<SVGElement> & { state: string }): React.ReactElement => {
  if (state === "success") return <SuccessIcon {...rest} />;
  if (state === "warning") return <WarningIcon {...rest} />;
  if (state === "error") return <ErrorIcon {...rest} />;
  if (state === "info") return <InfoIcon {...rest} />;
};

const Message = ({ state, text }: ImessageProps): React.ReactElement => {
  return (
    <div className={WrapperStyle}>
      <Icon
        state={state}
        width={96}
        height={96}
        className={`fill-current text-${ColorList[state]}`}
      />
      <span className={`${TextStyle} text-${ColorList[state]}`}>{text}</span>
    </div>
  );
};

export default Message;
