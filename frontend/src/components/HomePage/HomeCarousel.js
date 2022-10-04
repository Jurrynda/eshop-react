import React from "react";

// bootstrap
import Carousel from "react-bootstrap/Carousel";

// assets & styles
import "./HomeCarousel.scss";
// import firstImage from "../../assets/HomeCarousel/img-1.jpg";
// import secondImage from "../../assets/HomeCarousel/img-2.jpg";

const HomeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item className="carousel-content-wraper">
        <div className="background-image-1"></div>
        <Carousel.Caption>
          <h3>Nice coats</h3>
          <p>Get one for yourself and be prepared for the autumn.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="carousel-content-wraper">
        <div className="background-image-2"></div>
        <Carousel.Caption>
          <h3>Nice coats</h3>
          <p>Get one for yourself and be prepared for the autumn.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="carousel-content-wraper">
        <div className="background-image-3"></div>
        <Carousel.Caption>
          <h3>Nice shoes</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
