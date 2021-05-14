import React, { useState } from "react";
import { useRouter } from "next/router";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Image from "next/image";

const BackgroundSyle = "bg-blue-300 min-h-screen flex flex-col items-center px-6 py-10";
const HeaderStyle = "text-center";
const TitleSyle = "text-7xl";
const SubTitleSyle = "mt-4 text-xl";
const ContentStyle = "md:w-1/3 w-full flex flex-col flex-grow items-center justify-between";
const FormStyle = "flex flex-col p-6 text-center w-full";
const SelectStyle = "m-2 py-2 px-4 h-12 rounded-full outline-none focus:shadow-md";
const FooterStyle = "hover:text-gray-600 my-6";
const ButtonStyle = "focus:outline-none my-4 flex flex-col items-center content-center";
const ButtonExpandedTextStyle = "text-sm font-light uppercase tracking-widest mt-3";
const ButtonTextStyle = "text-base font-semibold";

const IndexPage = (): React.ReactElement => {
  const [category, setCategory] = useState(null);
  const router = useRouter();

  const getCurrentLocation = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        searchShops({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function (error) {
        alert("Habilite el aceso a la ubicación");
        console.log(error);
      }
    );
  };

  const searchShops = ({ lat, lng }): void => {
    router.push(`/map?lat=${lat}&lng=${lng}`);
  };

  return (
    <div className={BackgroundSyle}>
      <header className={HeaderStyle}>
        <h1 className={TitleSyle}>
          Crypto <strong>Shops</strong>
        </h1>
        <h2 className={SubTitleSyle}>Encontrá negocios que aceptan criptomonedas</h2>
      </header>
      <main className={ContentStyle}>
        <div className={FormStyle}>
          <select
            className={SelectStyle}
            placeholder="Categoría"
            defaultValue={category}
            onBlur={(e) => setCategory(e.target.value)}
          >
            <option value="all">Todo</option>
          </select>
          <PlacesAutocomplete onSelect={searchShops} />
        </div>
        <button onClick={getCurrentLocation} className={ButtonStyle}>
          <Image src="/place-icon.svg" height={72} width={72} alt="Icono marcador en mapa" />
          <span className={ButtonExpandedTextStyle}>Explorar</span>
          <span className={ButtonTextStyle}>Negocios Cercanos</span>
        </button>
      </main>
      <span className={FooterStyle}>
        <a href="https://github.com/francomd/crypto-shops" target="_blank" rel="noreferrer">
          CryptoShops v0.0.1 - GitHub
        </a>
      </span>
    </div>
  );
};

export default IndexPage;
