import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full mb-12">
        <div className="flex-1 max-w-2xl">
          <Title
            align="left"
            title="Exclusive Offers"
            subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
          />
        </div>

        <button className="group flex items-center gap-2 px-6 py-3 text-gray-900 hover:text-blue-600 font-medium rounded-lg transition-all duration-200">
          <span>View All Offers</span>
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
          />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative h-66 p-6 rounded-xl overflow-hidden bg-cover bg-center flex flex-col justify-between"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>

            {/* Discount Badge */}
            <div className="px-3 py-1 absolute top-4 left-4 text-xs font-bold bg-white text-gray-900 rounded-full z-10">
              {item.priceOff}% OFF
            </div>

            {/* Content */}
            <div className="relative z-10 mt-auto">
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>
              <p className="text-gray-300 text-xs mb-4">
                Expires {item.expiryDate}
              </p>

              <button className="flex items-center gap-2 font-medium text-white hover:text-blue-300 transition-colors">
                View Offer
                <img
                  className="w-4 h-4 invert group-hover:translate-x-1 transition-transform"
                  src={assets.arrowIcon}
                  alt="arrow"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
