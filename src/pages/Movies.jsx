import React from "react";
import ImageSlider from "../components/ImageSlider";
import img1 from "../images/img1.avif";
import img2 from "../images/img2.avif";
import img3 from "../images/img3.avif";
import img4 from "../images/img4.avif";
import "@fontsource/poppins";
import MoviesList from "../components/MoviesList";

const slides = [
  {
    id: 1,
    src: img1,
  },
  {
    id: 2,
    src: img2,
  },
  {
    id: 3,
    src: img3,
  },
  {
    id: 4,
    src: img4,
  },
];

function Movies() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 w-full">
      {/* Header */}
      <div className="bg-purple-700 text-white text-center text-3xl font-bold py-4">
        Book Cinema
      </div>

      {/* Content */}
      <div className="flex-1 max-w-screen-xl mx-auto overflow-y-auto">
        <div className="mt-8">
          <ImageSlider slides={slides} />
        </div>
        <div className="mt-8">
          <MoviesList />
        </div>
      </div>
    </div>
  );
}

export default Movies;
