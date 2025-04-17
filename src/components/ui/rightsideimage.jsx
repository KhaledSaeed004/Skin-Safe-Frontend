import React from "react";

const RightSideImage = () => {
  return (
    <div className="hidden md:block md:w-1/2">
      <img
        src="/women.png" // ✅ Don't include "/public" in the path
        alt="Skin Check"
        className="w-full h-full object-cover opacity-50"
      />
    </div>
  );
};

export default RightSideImage;
