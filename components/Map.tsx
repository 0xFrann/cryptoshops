import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PointIcon from "../assets/point-icon.svg";

interface IMapProps {
  lat?: number;
  lng?: number;
}

const MapComponent = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZnJhbmNvbWQiLCJhIjoiY2tvbml6eXFxMDFtZzJwbW9kZnMxb3l4aCJ9.dSVHZAF_E18d16kb7J_uNQ",
  attributionControl: false,
});

const Map = ({ lat = -31.4173391, lng = -64.183319 }: IMapProps): React.ReactElement => {
  return (
    <MapComponent
      center={[lng, lat]}
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
      zoom={[13]}
    >
      <Marker coordinates={[lng, lat]}>
        <PointIcon width={32} height={32} className="fill-current text-yellow-600" />
      </Marker>
    </MapComponent>
  );
};

export default Map;
