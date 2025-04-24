import React from 'react';
import ReadMore from './ReadMore'; // Adjust the import path as needed

const cardData = [
  {
    id: 1,
    title: 'Card Sun Exposure and Skin Cancer 1',
    description:
      'Exposure to ultraviolet (UV) radiation from the sun is a well-established risk factor for developing skin cancer. UV radiation damages the DNA in skin cells leading to mutations that can result in cancerous growths. Both cumulative sun exposure and intermittent intense exposure, such as sunburns, contribute to this risk.',
    imageUrl: '../../public/beautiful-photo-sea-sky 1.png',
  },
  {
    id: 2,
    title: 'New Vaccination to Prevent Skin Cancer',
    description:
      "Recent advancements in medical research have led to the development of personalized mRNA vaccines aimed at preventing the recurrence of melanoma, the most serious form of skin cancer. These vaccines work by training the immune system to recognize and attack specific proteins unique to an individual's tumor.",
    imageUrl: '../../public/yellow-fever-vaccine-concept 1.png',
  },
  // Add more cards as needed
];

const Card = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-6">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="group bg-white p-6 rounded-xl shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="overflow-hidden rounded-lg">
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-auto transition duration-300 ease-in-out group-hover:animate-blink"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <ReadMore text={card.description} lines={3} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
