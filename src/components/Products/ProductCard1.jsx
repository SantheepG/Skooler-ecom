import React from "react";
import "./ProductCard.css";
import { CiHeart, CiStar } from "react-icons/ci";
const ProductCard1 = () => {
  return (
    <React.Fragment>
      <div class="card ">
        <div class="head-card shimmer">
          <span class="rate">
            <i class="far fa-star" aria-hidden="true">
              <CiStar />
            </i>{" "}
            4.5/5 (50)
          </span>
          <a href="#" class="like">
            <i class="far fa-heart">
              <CiHeart />
            </i>
          </a>
        </div>
        <div class="img-mask">
          <img
            src="https://www.visitdubai.com/-/media/gathercontent/poi/k/kite-beach/fallback-image/kite-beach-by-meraas-poi-shutterstock-v4.jpg"
            alt=""
          />
        </div>
        <div class="card-content">
          <div class="card-header">
            <h2 class="title">Lorem ipsumss</h2>
            <span class="price">
              <b>$</b> 4000
            </span>
          </div>
          <p class="description">
            Lorem ipsum dolor sit, amet consectetur adip{" "}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCard1;
