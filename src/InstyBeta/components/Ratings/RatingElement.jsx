import React from "react";

import { deepOrange500, grey300 } from "material-ui/styles/colors";

const iconStyle = {
  cursor: "pointer",
  display: "inline-block",
  fontSize: "14px",
  padding: "10px 5px"
};

const RatingElement = ({ active, ratingValue, ratingHandler }) => (
  <i
    style={
      active
        ? { ...iconStyle, color: "#72C4CC" }
        : { ...iconStyle, color: grey300 }
    }
    className="material-icons"
    onClick={() => ratingHandler(ratingValue)}
  >
    brightness_1
  </i>
);

export default RatingElement;
