import React, { Component } from "react";

import { deepOrange500, grey300, grey500 } from "material-ui/styles/colors";

import RatingElement from "./RatingElement";

const nameSectionStyle = {
  backgroundColor: "#F3F3F3",
  borderRadius: "25px",
  padding: "10px 15px",
  position: "relative"
};

const nameStyle = {
  color: "#666",
  fontSize: "14px"
};

const closeIconStyle = {
  color: "#72C4CC",
  cursor: "pointer",
  fontSize: "16px",
  position: "absolute",
  top: "12px",
  right: "10px",
  textAlign: "right"
};

const ratingSectionStyle = {
  paddingTop: "10px"
};

const controlButtonStyle = {
  color: "#72C4CC",
  cursor: "pointer",
  fontSize: "20px",
  float: "right",
  padding: "5px 10px"
};

class RatedInput extends Component {
  constructor(props) {
    super(props);

    // reset login status

    this.state = {
      rating: parseInt(this.props.number),
      ratingArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };

    this.addRating = this.addRating.bind(this);
    this.removeRating = this.removeRating.bind(this);
    this.ratingHandler = this.ratingHandler.bind(this);
    this.controlButtonOnMouseOver = this.controlButtonOnMouseOver.bind(this);
    this.controlButtonOnMouseOut = this.controlButtonOnMouseOut.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  returnInfo() {
    return this.state.rating;
  }

  addRating(evt) {
    let rating = this.state.rating + 1;
    if (rating > 10) rating = 10;
    this.setState({
      rating
    });
  }

  removeRating(evt) {
    let rating = this.state.rating - 1;
    if (rating < 1) rating = 1;
    this.setState({
      rating
    });
  }

  ratingHandler(rating) {
    this.setState({
      rating
    });
  }

  controlButtonOnMouseOver(evt) {
    evt.target.innerHTML += "_circle";
    evt.target.style.color = deepOrange500;
  }

  controlButtonOnMouseOut(evt) {
    evt.target.innerHTML = evt.target.innerHTML.split("_")[0];
    evt.target.style.color = grey500;
  }

  render() {
    return (
      <div>
        <section style={nameSectionStyle}>
          <span style={nameStyle}>{this.props.name}</span>
          <i
            style={closeIconStyle}
            className="material-icons"
            onClick={() =>
              this.props.removeHandler(this.props.name, this.props.index)
            }
          >
            close
          </i>
        </section>
        <section style={ratingSectionStyle}>
          {this.state.ratingArray.map(value => (
            <RatingElement
              key={value}
              ratingHandler={this.ratingHandler}
              ratingValue={value}
              active={value <= this.state.rating ? true : false}
            />
          ))}
          <i
            style={controlButtonStyle}
            onClick={this.addRating}
            className="material-icons"
            onMouseOver={this.controlButtonOnMouseOver}
            onMouseOut={this.controlButtonOnMouseOut}
          >
            add
          </i>
          <i
            style={controlButtonStyle}
            onClick={this.removeRating}
            className="material-icons"
            onMouseOver={this.controlButtonOnMouseOver}
            onMouseOut={this.controlButtonOnMouseOut}
          >
            remove
          </i>
        </section>
      </div>
    );
  }
}

export default RatedInput;
