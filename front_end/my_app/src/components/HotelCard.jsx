import React from "react";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <div className="block rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden max-w-sm mx-auto">
      <div className="relative mb-2">
        <img
          src={room.images[0]}
          alt={`${room.hotel.name} image`}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {index % 2 === 0 && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold text-gray-800 px-2 py-1 rounded-full">
            Best Seller
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {room.hotel.name}
          </h3>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="rating" className="w-5 h-5" />
            <span className="text-sm text-gray-600">
              {room.rating || "4.5"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={assets.locationIcon}
            alt="location"
            className="w-4 h-4 text-gray-600"
          />
          <span className="text-sm text-gray-600 truncate">
            {room.hotel.address}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-gray-900">
            <span>${room.pricePerNight}</span>
            <span className="text-sm text-gray-500">/night</span>
          </p>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
