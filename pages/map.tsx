import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Map from "../components/Map";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchMenu from "../components/SearchMenu";

const BackgroundSyle = "bg-blue-300 h-screen flex flex-col items-center justify-center";
const ContentStyle = "relative h-full w-full";

const categories = ["Autos", "Telefonos"];

const MapPage = (): React.ReactElement => {
  const [isSearchMenuVisible, setSearchMenuVisible] = useState(false);
  const [selectedCategory, selectCategory] = useState(null);
  const { query } = useRouter();

  const lat = isNaN(Number(query?.lat)) ? null : Number(query?.lat);
  const lng = isNaN(Number(query?.lng)) ? null : Number(query?.lng);

  const onClickSearchBar = (): void => {
    setSearchMenuVisible((prev) => !prev);
  };

  return (
    <div className={BackgroundSyle}>
      <Header />
      <div className="relative w-full h-full flex flex-col">
        <SearchBar category={selectedCategory} onClick={onClickSearchBar} />
        <main className={ContentStyle}>
          <Map lat={lat} lng={lng} />
        </main>
        <SearchMenu
          visible={isSearchMenuVisible}
          categories={categories}
          selectedCategory={selectedCategory}
          selectCategory={selectCategory}
          closeMenu={onClickSearchBar}
        />
      </div>
    </div>
  );
};

export default MapPage;
