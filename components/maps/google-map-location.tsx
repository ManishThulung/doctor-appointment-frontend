import React, { FC } from "react";
interface IProps {
  lat: number;
  lng: number;
}
const GoogleMapLocation: FC<IProps> = ({ lat, lng }) => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1856608304897!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d0a0d0fbb%3A0x08e37c6bafe62f26!2sSan%20Francisco%2C%20CA%2094104!5e0!3m2!1sen!2sus!4v1649256017243!5m2!1sen!2sus`;

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 my-4">Our Location</h2>
      <iframe
        src={mapUrl}
        className="w-full h-[500px] border-0 rounded-lg shadow-lg"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </>
  );
};

export default GoogleMapLocation;
