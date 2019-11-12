import React, {Component} from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import logo from './mafia.png';

function App() {
  return (
    <div className="App">
      <div className="App-home">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={logo} />
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
                    </Form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="create">
                    <Form>
                        <Form.Group controlID='formCreateGame'>
                        <Form.Control type="number" placeholder="Enter Number of Players" />
                          <Form.Control type="text" placeholder="Choose Player Name" />
                        </Form.Group>
                        <Button variant="primary" type='submit'>
                          Go
                        </Button>
                      </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
          </Tab.Container>
      </Card>
      </div>
    </div>
  );
}

export default App;
