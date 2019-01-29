import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { url } from '../constants';
import { withRouter } from 'react-router-dom';
import EditContent from '../components/EditContent';
import { connect } from 'react-redux';
import { editStart } from '../actions';
import { fetchMoviesSearch } from '../actions/fetch';
import { bindActionCreators } from 'redux';
import "./Cardmovie.scss";

class Cardmovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFileName: '',
      title: '',
      descript: '',
      picture: '',
      likes: 0,
      disableLike: false,
    };
    this.sendEdit = this.sendEdit.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.onChangeEdit = this.onChangeEdit.bind(this);
    this.fetchBody = this.fetchBody.bind(this);
  }

  componentDidMount() {
    const { title, descript, picture, likes, imageFileName } = this.props.movie;
    this.setState({
      imageFileName,
      likes,
      title,
      descript,
      picture,
      disableLike: false,
    })
  }

  sendEdit() {
    const { title, descript, picture } = this.state;
    const dataSend = {
      title,
      descript,
      picture,
    };
    const conf = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    };
    this.fetchBody(conf)
  }

  deleteCard() {
    const conf = {
      method: 'DELETE',
    };
    this.fetchBody(conf)
  }

  fetchBody(confFetch) {
    const { id } = this.props.movie;
    const { history, editStartRedux, fetchMoviesSearchReux } = this.props;
    fetch(`${url}/movies/${id}`, confFetch)
      .then(res => res.json())
      .then(conf => {
        if (conf) {
          history.push('./conf');
          editStartRedux();
          fetchMoviesSearchReux();
          ;
        }
      })
      .catch();
  }

  onChangeEdit(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  addLike() {
    const { id } = this.props.movie;
    const { disableLike } = this.state;
    if (!disableLike) {
      const conf = {
        method: 'PUT',
      }
      fetch(`${url}/movies/like/${id}`, conf)
      this.setState(prevState => ({
        likes: prevState.likes + 1,
        disableLike: true,
      }))
    }
  }

  render() {
    const { title, descript, picture, likes, imageFileName } = this.state;
    const { edit } = this.props;
    return (
      <div className="Cardmovie">
        <Card>
          <CardImg top width="100%" src={picture === null ? `${url}/movies/images/${imageFileName}` : picture } alt="Card image cap" />
          <CardBody>
            <EditContent
              title="title"
              editContent={title}
              content={<CardTitle><h3>{title.length < 17 ? title : `${title.slice(0, 13)} ... `}</h3></CardTitle>}
              onChange={this.onChangeEdit}
              bolleanToEdit={edit}
            />
            <EditContent
              title="descript"
              editContent={descript}
              content={<CardText className="descrit_card">{descript.length < 175 ? descript : `${descript.slice(0, 171)} ... `}</CardText>}
              onChange={this.onChangeEdit}
              bolleanToEdit={edit}
            />
            <EditContent
              title="picture"
              editContent={picture}
              content=''
              onChange={this.onChangeEdit}
              bolleanToEdit={edit}
            />
            {edit ?
              <Row>
                <Col xs='6'>
                  <Button onClick={() => this.sendEdit()} color='success'>Submit</Button>
                </Col>
                <Col xs='6'>
                  <Button onClick={() => this.deleteCard()} color='danger'>Delete</Button>
                </Col>
              </Row> :
              <Row>
                <Col xs='6'>
                  {likes} 👍
                  </Col>
                <Col xs='6'>
                  <Button color='warning' onClick={() => this.addLike()}>Like</Button>
                </Col>
              </Row>
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mdtp = (dispatch) => bindActionCreators({
  editStartRedux: editStart,
  fetchMoviesSearchReux: fetchMoviesSearch,
}, dispatch);

export default withRouter(connect(null, mdtp)(Cardmovie));
