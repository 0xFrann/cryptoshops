import React, { useContext } from "react";
import { useRouter } from "next/router";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Image from "next/image";
import Head from "next/head";
import AppContext from "../context/AppContext";
import { getGeocode } from "use-places-autocomplete";

const BackgroundSyle = "bg-blue-300 min-h-screen flex flex-col items-center px-6 py-10";
const HeaderStyle = "text-center";
const TitleSyle = "text-7xl";
const SubTitleSyle = "mt-4 text-xl";
const ContentStyle = "md:w-1/3 w-full flex flex-col flex-grow items-center justify-between";
const FormStyle = "flex flex-col p-6 text-center w-full";
const SelectStyle = "m-2 py-2 px-4 h-12 rounded-full outline-none focus:shadow-md bg-white";
const FooterStyle = "hover:text-gray-600 my-6";
const ButtonStyle = "focus:outline-none my-4 flex flex-col items-center content-center";
const ButtonExpandedTextStyle = "text-sm font-light uppercase tracking-widest mt-3";
const ButtonTextStyle = "text-base font-semibold";

const IndexPage = (): React.ReactElement => {
  const router = useRouter();
  const context = useContext(AppContext);
  const { location, categories } = context;

  const getCurrentLocation = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getGeocode({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }).then((results) => {
          searchShops({
            address: results[0].formatted_address,
            latLng: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      },
      function (error) {
        alert("Habilite el aceso a la ubicación");
        console.log(error);
      }
    );
  };

  const searchShops = (newLocation: {
    address: string;
    latLng: { lat: number; lng: number };
  }): void => {
    localStorage.setItem("location", JSON.stringify(newLocation));
    location.setLocation({ ...location, ...newLocation });
    router.push(`/map?lat=${newLocation.latLng.lat}&lng=${newLocation.latLng.lng}`);
  };

  const onSelectCategory = (e): void => {
    if (e.target.value === "null") {
      categories.setCategories({ ...categories, selected: null });
    } else {
      categories.setCategories({ ...categories, selected: e.target.value });
    }
  };

  return (
    <>
      <Head>
        <title>CryptoShops</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
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
              defaultValue={categories.selected}
              onBlur={(e) => onSelectCategory(e)}
            >
              <option value="null">Todo</option>
              {categories &&
                categories.list?.length &&
                categories.list?.map((category, i) => (
                  <option value={category} className="capitalize" key={i}>
                    {category}
                  </option>
                ))}
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
    </>
  );
};

export default IndexPage;
