import React from "react";
import Image from "next/image";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface IMapProps {
  lat?: number;
  lng?: number;
}

const MapComponent = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZnJhbmNvbWQiLCJhIjoiY2tvbml6eXFxMDFtZzJwbW9kZnMxb3l4aCJ9.dSVHZAF_E18d16kb7J_uNQ",
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
        <Image src="/point.svg" alt="Picture of the author" width={24} height={24} />
      </Marker>
    </MapComponent>
  );
};

export default Map;
