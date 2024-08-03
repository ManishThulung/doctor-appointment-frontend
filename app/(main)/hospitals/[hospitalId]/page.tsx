import GoogleMapLocation from "@/components/maps/google-map-location";
import React from "react";

const page = () => {
  const lat = 85.33501135; // New Latitude
  const lng = 27.699110100000002; // New Longitude
  return (
    <div>
      this is a hospital
      <GoogleMapLocation lat={lat} lng={lng} />
    </div>
  );
};

export default page;
