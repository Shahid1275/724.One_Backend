import React from "react";

const Title = ({ title, subTitle, align = "center" }) => {
  return (
    <div
      className={`max-w-3xl mx-auto px-4 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white-900 mb-4 font-playfair">
        {title}
      </h1>
      {subTitle && (
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-sans">
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default Title;
