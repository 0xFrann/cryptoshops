import { createContext, Dispatch, SetStateAction } from "react";

export interface ILocation {
  location: {
    address: string;
    latLng: {
      lat: number;
      lng: number;
    };
    setLocation: Dispatch<SetStateAction<ILocation>>;
  };
}

const AppContext = createContext<ILocation>(null);

export default AppContext;
