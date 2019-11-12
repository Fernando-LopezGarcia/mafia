import React, {Component} from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import logo from './mafia.png';
import axios from 'axios';

//function handleClick() {
//  axios.post('http://127.0.0.1:5000/create', {playername: "Ferny"});
//}

class Home extends React.Component {
  render() {
    return (
      <Tab.Container id="home-options" defaultActiveKey="join">
        <Card.Header>
          <Nav fill variant="tabs" defaultActiveKey="join">
            <Nav.Item>
              <Nav.Link eventKey="join">Join</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="create">Create</Nav.Link>
            </Nav.Item>
          </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              <Tab.Pane eventKey="join">
                <Form>
                  <Form.Group controlID='formJoinGame'>
                    <Form.Control type="text" placeholder="Enter Room ID" />
                    <Form.Control type="text" placeholder="Choose Player Name" />
                  </Form.Group>
                  <Button variant="primary" type='submit'>
                    Go
                  </Button>
                  {this.props.roomID}
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="create">
                <Form>
                    <Form.Group controlID='formCreateGame'>
                    <Form.Control type="number" placeholder="Enter Number of Players" />
                      <Form.Control type="text" placeholder="Choose Player Name" />
                    </Form.Group>
                    <Button variant="primary" type='submit' onClick={this.props.onGo}>
                      Go
                    </Button>
                    {this.props.roomID}
                  </Form>
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
      </Tab.Container>
    );
  }
}

class Room extends React.Component {
  render() {
    return (
      <Card.Body>
        <Card.Title>{this.props.roomID}</Card.Title>
      </Card.Body>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: "",
    }
  }

  handleNext() {
    axios.post('http://127.0.0.1:5000/create', {playername: "Ferny"});
  }
/*
  renderHome(onGo) {
    return (
      <Home onGo={onGo}/>
    )
  }

  renderRoom(roomID) {
    return (
      <Room roomID={roomID}/>
    )
  }
*/
  handleClick() {
    axios.post('http://127.0.0.1:5000/create', {playername: "BigChungus"})
    .then((response) => {
      this.setState({roomID: response})
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  renderBody(roomID) {
    if (roomID != "") {
      return (<Home onGo={this.handleClick} roomID={roomID}/>);
    }
    else {
      return(<Home onGo={this.handleClick} roomID={roomID} />);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-home">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={logo} />
          {this.renderBody(this.state['roomID'])}
        </Card>
        </div>
      </div>
    );
  }
}

export default App;
