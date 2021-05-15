import Image from "next/image";
import React from "react";

const BarStyle = "px-4 py-2 bg-gray-200 w-full focus:outline-none shadow-lg z-10";
const CategoryStyle = "flex text-md text-gray-600 cursor-pointer";
const SearchStyle = "flex text-md text-gray-800 cursor-pointer";

interface ISearchBar {
  category: string;
  onClick: () => void;
}

const SearchBar = ({ category, onClick }: ISearchBar): React.ReactElement => {
  return (
    <button className={BarStyle} onClick={onClick}>
      {category && category.length ? (
        <div className={CategoryStyle}>
          <Image src="/tune-icon.svg" width={12} height={12} alt="Icono de cerrar" />
          <span className="ml-2 capitalize">{category}</span>
        </div>
      ) : (
        <div className={SearchStyle}>
          <Image src="/search-icon.svg" width={14} height={14} alt="Icono de buscar" />
          <span className="ml-2">Buscar</span>
        </div>
      )}
    </button>
  );
};

export default SearchBar;
