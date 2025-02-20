import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import "./Slideshow.scss";
const Slideshow = () => {
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
              <span className="blog-slider__code">26 December 2023</span>
              <div className="blog-slider__title">Lorem Ipsum Dolor</div>
              <div className="blog-slider__text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Recusandae voluptate repellendus magni illo ea animi?{" "}
              </div>
            </div>
          </div>
          <div className="blog-slider__item swiper-slide">
            <div className="blog-slider__content">
              <span className="blog-slider__code">26 December 2019</span>
              <div className="blog-slider__title">Lorem Ipsum Dolor2</div>
              <div className="blog-slider__text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Recusandae voluptate repellendus magni illo ea animi?
              </div>
            </div>
          </div>

          <div className="blog-slider__item swiper-slide">
            <div className="blog-slider__img">
              <img
                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp"
                alt=""
              />
            </div>
            <div className="blog-slider__content">
              <span className="blog-slider__code">26 December 2019</span>
              <div className="blog-slider__title">Lorem Ipsum Dolor</div>
              <div className="blog-slider__text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Recusandae voluptate repellendus magni illo ea animi?
              </div>
            </div>
          </div>
        </div>
        <div className="blog-slider__pagination"></div>
      </div>
    </React.Fragment>
  );
};

export default Slideshow;
