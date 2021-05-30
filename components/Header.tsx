import Link from "next/link";
import FullscreenIcon from "../assets/fullscreen-icon.svg";

const LogoStyle = "text-white text-2xl";
const HeaderStyle = "px-4 py-2 bg-yellow-500 w-full flex justify-between items-center";
const StyledFullscreen = "text-gray-100 flex items-center cursor-pointer focus:outline-none";
const StyledFullscreenIcon = "fill-current text-gray-100 ml-1";

const Header = (): React.ReactElement => {
  const setFullscreen = (): Promise<void> | any => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.fullscreenEnabled &&
        document.documentElement
          .requestFullscreen()
          .catch((e) => console.log("Fullscreen error:", e));
    }
  };

  return (
    <header className={HeaderStyle}>
      <Link href="/">
        <span className={LogoStyle}>
          Crypto<strong>Shops</strong>
        </span>
      </Link>
      <button onClick={setFullscreen} className={StyledFullscreen}>
        Fullscreen
        <FullscreenIcon width={16} height={16} className={StyledFullscreenIcon} />
      </button>
    </header>
  );
};

export default Header;
