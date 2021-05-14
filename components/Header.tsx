import Link from "next/link";

const LogoStyle = "text-2xl";
const HeaderStyle = "px-4 py-2 bg-white w-full";

const Header = (): React.ReactElement => {
  return (
    <header className={HeaderStyle}>
      <Link href="/">
        <span className={LogoStyle}>
          Crypto <strong>Shops</strong>
        </span>
      </Link>
    </header>
  );
};

export default Header;
