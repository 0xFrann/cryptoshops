import getConfig from "next/config";
import React, { useState } from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PointIcon from "../assets/point-icon.svg";
import CloseIcon from "../assets/close-icon.svg";
import WhatsAppIcon from "../assets/whatsapp-icon.svg";
import LinkIcon from "../assets/link-icon.svg";
import { TShop } from "../types";

const { publicRuntimeConfig } = getConfig();
const MAPBOX_GL_TOKEN = publicRuntimeConfig.MAPBOX_GL_TOKEN;

const MarkerStyle = "cursor-pointer filter drop-shadow-lg";
const PopupContentStyle = "relative flex flex-col y-3 px-2 pt-2 pr-6 rounded-md w-64";
const PopupCloseIconStyle = "absolute top-0 right-0 cursor-pointer";
const PopupTitleStyle = "font-bold text-base";
const PopupSubTitleStyle = "text-gray-500";
const AddressStyle = "text-blue-900 underline";
const LinksStyle = "flex space-x-4 mt-3";
const WhatsAppIconStyle = "fill-current text-green-600";
const LinkIconStyle = "fill-current text-blue-600";
const ShopPointStyle = "fill-current text-yellow-600";
const UserPointStyle = "fill-current text-purple-600";

interface IMapProps {
  lat?: number;
  lng?: number;
  data?: TShop[];
}

const MapComponent = ReactMapboxGl({
  accessToken: MAPBOX_GL_TOKEN,
  attributionControl: false,
});

const Map = ({ lat = -31.4173391, lng = -64.183319, data = [] }: IMapProps): React.ReactElement => {
  const [selectedShop, setSelectedShop] = useState<TShop>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClickMarker = (shop: TShop): void => {
    setIsPopupVisible(true);
    setSelectedShop(shop);
  };

  const handleClosePopup = (): void => {
    setIsPopupVisible(false);
    setSelectedShop(null);
  };

  return (
    <MapComponent
      center={
        selectedShop
          ? [selectedShop.location.latLng.lng, selectedShop.location.latLng.lat]
          : [lng, lat]
      }
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
      zoom={[13]}
    >
      <>
        {data?.length &&
          data.map((shop) => {
            return (
              <Marker
                coordinates={[shop?.location.latLng?.lng, shop?.location.latLng?.lat]}
                key={shop?.id}
                onClick={() => handleClickMarker(shop)}
                className={MarkerStyle}
              >
                <PointIcon width={32} height={32} className={ShopPointStyle} />
              </Marker>
            );
          })}
        <Marker coordinates={[lng, lat]}>
          <PointIcon width={24} height={24} className={UserPointStyle} />
        </Marker>
        {isPopupVisible && selectedShop && (
          <Popup
            coordinates={[selectedShop?.location.latLng.lng, selectedShop?.location.latLng.lat]}
            offset={40}
          >
            <div className={PopupContentStyle}>
              <CloseIcon
                width={16}
                height={16}
                onClick={handleClosePopup}
                className={PopupCloseIconStyle}
              />
              <span className={PopupTitleStyle}>{selectedShop?.name}</span>
              <span className={PopupSubTitleStyle}>{selectedShop?.category}</span>
              <a
                href={`https://maps.google.com/?q=${selectedShop?.location?.latLng.lat},${selectedShop?.location?.latLng.lng}`}
                target="_blank"
                rel="noreferrer"
                className={AddressStyle}
              >
                {selectedShop?.location?.address}
              </a>
              <span className={LinksStyle}>
                {selectedShop?.contact?.whatsapp && (
                  <a
                    href={`https://wa.me/54${selectedShop.contact.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon width={16} height={16} className={WhatsAppIconStyle} />
                  </a>
                )}
                {selectedShop?.contact?.link && (
                  <a
                    href={
                      selectedShop.contact.link.startsWith("http")
                        ? selectedShop.contact.link
                        : `//${selectedShop.contact.link}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkIcon width={20} height={20} className={LinkIconStyle} />
                  </a>
                )}
              </span>
            </div>
          </Popup>
        )}
      </>
    </MapComponent>
  );
};

export default Map;
