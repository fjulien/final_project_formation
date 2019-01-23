import React, { Component } from "react";
import { fetchMoviesSearch } from '../actions/fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Input, Button, Container } from 'reactstrap';
import "./Searchbar.scss";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  onChangeSearch(event) {
    this.setState({
      search: event.target.value
    })
  }

  submitSearch(event) {
    event.preventDefault();
    const { search } = this.state;
    const { fetchMoviesSearchRedux } = this.props;
    fetchMoviesSearchRedux(search);
  }

  render() {
    const { search } = this.state
    return (
      <div className="Searchbar">
        <Container>
          <form className="content_align_search" onSubmit={this.submitSearch}>
            <Input className="input_search" type="text" value={search} onChange={this.onChangeSearch} name="search" id="search" placeholder="Search movies" />
            <Button className="button_send_search" color="warning" type="submit">Find it !</Button>
          </form>
        </Container>
      </div>
    );
  }
}

const mdtp = (dispatch) => bindActionCreators({ fetchMoviesSearchRedux: fetchMoviesSearch }, dispatch);

export default connect(null, mdtp)(Searchbar);
