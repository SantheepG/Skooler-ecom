import React, { useEffect } from "react";
import { Rating, initTE } from "tw-elements";

const RatingStar = () => {
  useEffect(() => {
    // Initialize the Rating component
    initTE({ Rating });
  }, []);

  return (
    <ul className="my-1 flex list-none gap-1 p-0" data-te-rating-init>
      <li>
        <span
          className="text-primary [&>svg]:h-5 [&>svg]:w-5"
          title="Bad"
          data-te-rating-icon-ref
        ></span>
      </li>
      <li>
        <span
          className="text-primary [&>svg]:h-5 [&>svg]:w-5"
          title="Poor"
          data-te-rating-icon-ref
        ></span>
      </li>
      <li>
        <span
          className="text-primary [&>svg]:h-5 [&>svg]:w-5"
          title="OK"
          data-te-rating-icon-ref
        ></span>
      </li>
      <li>
        <span
          className="text-primary [&>svg]:h-5 [&>svg]:w-5"
          title="Good"
          data-te-rating-icon-ref
        ></span>
      </li>
      <li>
        <span
          className="text-primary [&>svg]:h-5 [&>svg]:w-5"
          title="Excellent"
          data-te-rating-icon-ref
        ></span>
      </li>
    </ul>
  );
};

export default RatingStar;
