const BackgroundSyle =
  "relative bg-blue-300 h-screen flex flex-col items-center justify-center z-10";
const HeaderStyle = "text-center";
const TitleSyle = "text-7xl font-bold";
const SubTitleSyle = "mt-2 text-3xl";
const FooterStyle = "absolute bottom-4 hover:text-gray-600";

const IndexPage = (): React.ReactElement => {
  return (
    <div className={BackgroundSyle}>
      <header className={HeaderStyle}>
        <h1 className={TitleSyle}>Crypto Shops</h1>
        <h2 className={SubTitleSyle}>Negocios que aceptan cryptos</h2>
        {/* {isValidating && <strong>Loading</strong>} */}
      </header>
      <span className={FooterStyle}>
        <a href="https://github.com/francomd/crypto-shops" target="_blank" rel="noreferrer">
          CryptoShops v0.0.1 - GitHub
        </a>
      </span>
    </div>
  );
};

export default IndexPage;
