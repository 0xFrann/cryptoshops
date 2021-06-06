import router from "next/router";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import PlacesAutocomplete from "./PlacesAutocomplete";
import CloseIcon from "../assets/close-icon.svg";

const SearchMenuStyle =
  "absolute top-12 transition-all duration-300 z-50 bg-gray-200 p-6 w-full h-full";
const FormStyle = "flex flex-col text-center w-full";
const SelectStyle = "m-2 py-2 px-4 h-12 rounded-full outline-none focus:shadow-md bg-white";
const MenuTitleStyle = "text-lg";
const MenuHeaderStyle = "flex justify-between mb-4";

interface ISearchMenuProps {
  visible: boolean;
  categories: string[];
  selectedCategory: string;
  selectCategory: (val: string) => void;
  closeMenu: () => void;
}

const SearchMenu = ({
  visible,
  categories,
  selectedCategory,
  selectCategory,
  closeMenu,
}: ISearchMenuProps): React.ReactElement => {
  const context = useContext(AppContext);

  const onSelectCategory = (e): void => {
    if (e.target.value === "null") {
      selectCategory(null);
    } else {
      selectCategory(e.target.value);
    }
  };

  const searchShops = (location: {
    address: string;
    latLng: { lat: number; lng: number };
  }): void => {
    localStorage.setItem("location", JSON.stringify(location));
    context.location.setLocation({ ...context.location, ...location });
    router.push(`/map?lat=${location.latLng.lat}&lng=${location.latLng.lng}`);
  };

  return (
    <div
      className={`${SearchMenuStyle} ${visible ? "opacity-100 left-0" : "opacity-0 -left-full"}`}
    >
      <div className={MenuHeaderStyle}>
        <span className={MenuTitleStyle}>Filtrar negocios</span>
        <CloseIcon width={20} height={20} onClick={closeMenu} />
      </div>
      <div className={FormStyle}>
        {categories && categories.length && (
          <select
            className={SelectStyle}
            placeholder="Categoría"
            defaultValue={selectedCategory}
            onBlur={onSelectCategory}
          >
            <option value="null">Todo</option>
            {categories.map((category, i) => (
              <option value={category} className="capitalize" key={i}>
                {category}
              </option>
            ))}
          </select>
        )}
        <PlacesAutocomplete onSelect={searchShops} defaultValue={context?.location?.address} />
      </div>
    </div>
  );
};

export default SearchMenu;
