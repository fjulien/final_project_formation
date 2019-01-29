import React, { Component } from 'react';
import { url } from '../constants';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CarouselMovies.scss'

class CarouselMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {    }
  }

  render() {
    const { images } = this.props;
    return (
      <Carousel
      className="CarouselMovies"
      showStatus={false}
      transitionTime={1500}
      infiniteLoop={true} autoPlay={true}
      dynamicHeight={true}
      showThumbs={false}>

      {(images.length !== 0)?
        images.map(element => 
        <div>
          <img className="poster_movie" src={element.picture === null ? `${url}/movies/images/${element.imageFileName}` : element.picture } alt="Picture to movie" />

        </div>
        ):
        <p>. . .</p>
        }
      </Carousel>
    );
  }
}

export default CarouselMovies;
