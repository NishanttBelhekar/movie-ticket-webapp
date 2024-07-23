import React, { useEffect, useState } from "react";
import "./ImageSlider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ImageSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    const newIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div key={slide.id}>
            <div
              className={`slider ${
                index === activeIndex ? "active" : "inactive"
              }`}
            >
              <img src={slide.src} alt="img" />
              <span onClick={prevSlide} className="leftArrow">
                <FaChevronLeft />
              </span>
              <span onClick={nextSlide} className="rightArrow">
                <FaChevronRight />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="all-dots">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={`dot ${activeIndex === index ? "active-dot" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
