import React, { Component } from "react";
import { url } from '../actions/fetch';
import CarouselMovies from "../components/CarouselMovies";
import Searchbar from "../containers/Searchbar";
import Listemovie from "../containers/Listemovie";
import Footer from "./Footer";

import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    fetch(`${url}/movies/carousel`)
      .then(res => res.json())
      .then(data => this.setState({ images: data }));
  }

  render() {
    const { images } = this.state;
    return (
      <div className="Home">
        <CarouselMovies images={images} />
        <Searchbar />
        <Listemovie />
        <Footer />
      </div>
    );
  }
}
export default Home;
