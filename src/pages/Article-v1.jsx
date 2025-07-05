// src/components/Article.js
import React from "react";
import Container from "../components/ui/Container";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Article = () => {
  return (
    <>
      <div className="bg-primary relative w-full rounded-4xl py-4">
        <Container>
          <div className="flex flex-row items-center justify-between"></div>
        </Container>

        <div className="bg-primary absolute top-1/2 -left-20 flex aspect-square h-full w-lg -translate-y-1/2 items-center justify-center rounded-full pl-12 text-white shadow-lg">
          <span className="text-3xl font-bold"> Home \ Article </span>
        </div>
      </div>

      <div className="flex w-full justify-center p-4 sm:p-8">
        <div className="sm:max-w-l max-w-full rounded-lg bg-white p-4 shadow-lg sm:p-6">
          <img
            src="/beautiful-photo-sea-sky 1.png" // Adjusted path for React's public folder
            alt="Sun Exposure"
            className="mb-4 h-48 w-full rounded-lg object-cover sm:h-64"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"; // Fallback image
            }}
          />
          <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
            Sun Exposure and Skin Cancer
          </h1>
          <p className="mb-4 text-sm text-gray-500 sm:text-base">14/04/2023</p>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="./public/female-doctor-avatar.png"
                alt="Author"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm text-gray-600 sm:text-base">
                {" "}
                fadya & kenz Team
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="text-primary hover:bg-primary rounded-full bg-white p-2 transition-colors duration-200 hover:text-white">
                <FaFacebookF className="h-4 w-4" />
              </button>
              <button className="text-primary hover:bg-primary rounded-full bg-white p-2 transition-colors duration-200 hover:text-white">
                <FaTwitter className="h-4 w-4" />
              </button>
              <button className="text-primary hover:bg-primary rounded-full bg-white p-2 transition-colors duration-200 hover:text-white">
                <FaLinkedinIn className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mb-4 text-sm text-gray-600 sm:text-base">
            Exposure to ultraviolet (UV) radiation from the sun is a
            well-established risk factor for developing skin cancer. UV
            radiation damages the DNA in skin cells, leading to mutations that
            can result in cancerous growth. Cumulative sun exposure and
            intermittent intense exposure, such as sunburns, contribute to this
            risk.
          </p>
          <h2 className="mb-2 text-lg font-semibold text-gray-800 sm:text-xl">
            Types of Skin Cancer Linked to Sun Exposure:
          </h2>
          <ul className="mb-4 list-inside list-disc text-sm text-gray-600 sm:text-base">
            <li>
              <strong>Basal Cell Carcinoma (BCC):</strong> The most common form
              of skin cancer, BCC often develops on sun-exposed areas like the
              face and neck. It is primarily associated with cumulative sun
              exposure over time.
            </li>
            <li>
              <strong>Squamous Cell Carcinoma (SCC):</strong> SCC also typically
              appears on sun-exposed regions and is linked to long-term
              cumulative sun exposure.
            </li>
            <li>
              <strong>Melanoma:</strong> Although less common, melanoma is the
              most serious type of skin cancer. It is associated with both
              intermittent intense sun exposure leading to sunburns and
              cumulative exposure. Recurrent sun exposure and sunburns are
              strong predictors of melanoma risk.
            </li>
          </ul>
          <h2 className="mb-2 text-lg font-semibold text-gray-800 sm:text-xl">
            Preventive Measures:
          </h2>
          <ul className="mb-4 list-inside list-disc text-sm text-gray-600 sm:text-base">
            <li>
              <strong>Use Sunscreen:</strong> Apply a broad-spectrum sunscreen
              with at least SPF 30 to all exposed skin, reapplying every two
              hours and after swimming or sweating.
            </li>
            <li>
              <strong>Seek Shade:</strong> Limit direct sun exposure, especially
              between 10 a.m. and 4 p.m., when UV rays are strongest.
            </li>
            <li>
              <strong>Wear Protective Clothing:</strong> Opt for long sleeves,
              wide-brimmed hats, and sunglasses to shield your skin.
            </li>
            <li>
              <strong>Avoid Tanning Beds:</strong> Artificial sources of UV
              radiation can increase the risk of skin cancer.
            </li>
            <li>
              <strong>Regular Skin Examinations:</strong> Monitor your skin for
              new growths or changes in existing moles and consult a healthcare
              professional with any concerns.
            </li>
          </ul>
          <p className="text-sm text-gray-600 sm:text-base">
            By adopting these protective measures, individuals can significantly
            reduce their risk of developing skin cancer related to sun exposure.
          </p>
        </div>
      </div>
    </>
  );
};

export default Article;
