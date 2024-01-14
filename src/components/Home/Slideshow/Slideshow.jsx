import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import "./Slideshow.scss";
const Slideshow = ({ slide }) => {
  useEffect(() => {
    const swiper = new Swiper(".blog-slider", {
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      mousewheel: {
        invert: false,
      },
      // autoHeight: true,
      pagination: {
        el: ".blog-slider__pagination",
        clickable: true,
      },
    });

    return () => {
      swiper.destroy(); // Clean up Swiper instance when component unmounts
    };
  }, []);

  return (
    <React.Fragment>
      <div className="blog-slider">
        <div className="blog-slider__wrp swiper-wrapper">
          <div className="blog-slider__item swiper-slide">
            <div class="blog-slider__img">
              <img
                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                alt=""
              />
            </div>
            <div className="blog-slider__content">
              <span className="blog-slider__code">{slide.date}</span>
              <div className="blog-slider__title">{slide.name}</div>
              <div className="blog-slider__text">{slide.desc}</div>
              <a href="#" class="blog-slider__button">
                READ MORE
              </a>
            </div>
          </div>
        </div>
        <div className="blog-slider__pagination"></div>
      </div>
    </React.Fragment>
  );
};

export default Slideshow;
