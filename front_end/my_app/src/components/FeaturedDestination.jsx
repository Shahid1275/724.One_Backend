import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";

const FeaturedDestination = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Title
          title="Featured Destinations"
          subTitle="Discover our handpicked selection of exceptional properties offering unparalleled comfort and unforgettable experiences."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {roomsDummyData.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} index={index} room={room} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-white text-sm font-medium rounded-lg hover:bg-gray-50 transition-all cursor-pointer border border-gray-200 duration-200 ">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestination;
