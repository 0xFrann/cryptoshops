import React from "react";
import { useRouter } from "next/router";
import Map from "../components/Map";

const BackgroundSyle = "bg-blue-300 h-screen flex flex-col items-center justify-center p-6";
const ContentStyle = "h-full w-full";

const MapPage = (): React.ReactElement => {
  const { query } = useRouter();

  const lat = isNaN(Number(query?.lat)) ? null : Number(query?.lat);
  const lng = isNaN(Number(query?.lng)) ? null : Number(query?.lng);

  return (
    <div className={BackgroundSyle}>
      <main className={ContentStyle}>
        <Map lat={lat} lng={lng} />
      </main>
    </div>
  );
};

export default MapPage;
