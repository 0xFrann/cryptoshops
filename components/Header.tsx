import Link from "next/link";
import MenuIcon from "../assets/menu-icon.svg";
import CloseIcon from "../assets/close-icon.svg";

const LogoStyle = "text-white text-2xl";
const HeaderStyle = "px-4 py-2 bg-yellow-500 w-full flex justify-between items-center";
const MenuButtonStyle = "text-gray-100 flex items-center cursor-pointer focus:outline-none";
const MenuIconStyle = "fill-current text-gray-100";

interface IHeaderProps {
  menuVisible: boolean;
  toggleMenuVisible: () => void;
}

const Header = ({ menuVisible, toggleMenuVisible }: IHeaderProps): React.ReactElement => {
  return (
    <header className={HeaderStyle}>
      <Link href="/">
        <span className={LogoStyle}>
          Crypto<strong>Shops</strong>
        </span>
      </Link>
      <button onClick={toggleMenuVisible} className={MenuButtonStyle}>
        {menuVisible ? (
          <CloseIcon width={20} height={20} className={MenuIconStyle} />
        ) : (
          <MenuIcon width={20} height={20} className={MenuIconStyle} />
        )}
      </button>
    </header>
  );
};

export default Header;
