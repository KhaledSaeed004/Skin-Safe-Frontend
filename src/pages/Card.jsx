import React from "react";

const cardData = [
  {
    id: 1,
    title: "Card Sun Exposure and Skin Cancer 1",
    description:
      "Exposure to ultraviolet (UV) radiation from the sun is a well-established risk factor for developing skin cancer. UV radiation damages the DNA in skin cells leading to mutations that can result in cancerous growths. Both cumulative sun exposure and intermittent intense exposure, such as sunburns, contribute to this risk.",
    imageUrl: "/beautiful-photo-sea-sky 1.png",
  },
  {
    id: 2,
    title: "New Vaccination to Prevent Skin Cancer",
    description:
      "Recent advancements in medical research have led to the development of personalized mRNA vaccines aimed at preventing the recurrence of melanoma, the most serious form of skin cancer. These vaccines work by training the immune system to recognize and attack specific proteins unique to an individual's tumor.",
    imageUrl: "/yellow-fever-vaccine-concept 1.png",
  },
  {
    id: 3,
    title: "New Vaccination to Prevent Skin Cancer",
    description:
      "Recent advancements in medical research have led to the development of personalized mRNA vaccines aimed at preventing the recurrence of melanoma, the most serious form of skin cancer. These vaccines work by training the immune system to recognize and attack specific proteins unique to an individual's tumor.",
    imageUrl: "/yellow-fever-vaccine-concept 1.png",
  },
];

const Card = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="group relative flex flex-col justify-between rounded-xl bg-white p-6 shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
        >
          <div>
            <div className="overflow-hidden rounded-lg">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="h-auto w-full transform transition duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-1 group-hover:brightness-110"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-gray-600">
                {card.description.split(" ").slice(0, 15).join(" ")}...
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-start">
            <button className="border-primary text-primary hover:bg-primary relative rounded-2xl border bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:text-white">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 inline h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
