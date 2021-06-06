import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Map from "../../components/Map";
import Header from "../../components/Header";
import HeaderMenu from "../../components/HeaderMenu";
import SearchBar from "../../components/SearchBar";
import SearchMenu from "../../components/SearchMenu";
import AppContext from "../../context/AppContext";
import AddShopButton from "../../components/AddShopButton";
import { TShop } from "../../types";
import axios from "axios";

const BackgroundSyle =
  "bg-yellow-500 relative h-screen overflow-hidden flex flex-col items-center justify-center";
const ContentStyle = "relative h-full w-full";

interface IMapPageProps {
  shops: TShop[];
}

const MapPage = ({ shops }: IMapPageProps): React.ReactElement => {
  const { query } = useRouter();
  const context = useContext(AppContext);
  const { categories } = context;
  const [isSearchMenuVisible, setSearchMenuVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [filteredShops, setFilteredShops] = useState(shops);

  const lat = isNaN(Number(query?.lat)) ? undefined : Number(query?.lat);
  const lng = isNaN(Number(query?.lng)) ? undefined : Number(query?.lng);

  useEffect(() => {
    if (categories.selected) {
      setFilteredShops(shops.filter((shop) => shop.category === categories.selected));
    } else {
      setFilteredShops(shops);
    }
  }, [categories.selected, shops]);

  const onClickSearchBar = (): void => {
    setSearchMenuVisible((prev) => !prev);
  };

  return (
    <div className={BackgroundSyle}>
      <Header
        menuVisible={isMenuVisible}
        toggleMenuVisible={() => setMenuVisible((prev) => !prev)}
      />
      <SearchBar category={categories.selected} onClick={onClickSearchBar} />
      <main className={ContentStyle}>
        <Map lat={lat} lng={lng} data={filteredShops} />
      </main>
      <SearchMenu
        visible={isSearchMenuVisible}
        categories={categories.list}
        selectedCategory={categories.selected}
        selectCategory={(newSelection) =>
          categories.setCategories({ ...categories, selected: newSelection })
        }
        closeMenu={onClickSearchBar}
      />
      <HeaderMenu visible={isMenuVisible} toggleVisible={() => setMenuVisible((prev) => !prev)} />
      <AddShopButton />
    </div>
  );
};

export const getServerSideProps = async (): Promise<{ props: IMapPageProps }> => {
  const shops = await axios.get(process.env.API_HOST + "/api/shops");
  return {
    props: { shops: [...shops.data] },
  };
};

export default MapPage;
