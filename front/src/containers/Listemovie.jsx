import React, { Component } from "react";
import { connect } from 'react-redux';
import Cardmovie from "../containers/Cardmovie";
import { Container, Row, Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { fetchMoviesSearch } from '../actions/fetch';

import "./Listemovie.scss";

class Listemovie extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchMoviesSearchRedux } = this.props;
    fetchMoviesSearchRedux('');
  }

  render() {
    const { movies, editMode } = this.props;
    return (
      <div className="Listemovie">
        <Container>
          <Row className="row_card">
            {movies.lenght === 0 ?
            <Col xs='12'>
              <h2 className="message_no_found">. . .</h2>
              </Col>
              : movies.map(movie =>
                <Col sm='4'>
                  <Cardmovie key={movie.id} movie={movie} edit={editMode} />
                </Col>
              )
            }
          </Row>
        </Container>
      </div>
    );
  }
}

const mstp = (state) => ({
  movies: state.movies,
  editMode: state.editMode,
})

const mdtp = (dispatch) => bindActionCreators({ fetchMoviesSearchRedux: fetchMoviesSearch }, dispatch);

export default connect(mstp, mdtp)(Listemovie);
