import React, { Component } from "react";
import { url } from '../constants';
import CarouselMovies from "../components/CarouselMovies";
import Searchbar from "../containers/Searchbar";
import Listemovie from "../containers/Listemovie";
import Footer from "./Footer";

import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      test: '',
    };
  }

  componentDidMount() {
    fetch(`${url}/movies/carousel`)
      .then(res => res.json())
      .then(data => this.setState({ images: data }));
  }

  render() {
    console.log(this.state.test)
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
