import React from "react";

const RightSideImage = () => {
  return (
    <div className="hidden md:block">
      <img
        src="/women.png" // ✅ Don't include "/public" in the path
        alt="Skin Check"
        className="h-full w-full object-cover opacity-50"
      />
    </div>
  );
};

export default RightSideImage;
