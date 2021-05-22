export type TShop = {
  id: string;
  name: string;
  ownerId?: string;
  location: {
    latLng: {
      lat: number;
      lng: number;
    };
    address: string;
  };
  logo?: string;
  category: string;
};
