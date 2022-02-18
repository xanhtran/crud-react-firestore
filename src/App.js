
import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddRestaurant from "./components/AddRestaurant";
import RestaurantsList from "./components/RestaurantsList";
import "./App.css";

function App() {
  const [RestaurantId, setRestaurantId] = useState("");

  const getRestaurantIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setRestaurantId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Restaurant - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddRestaurant id={RestaurantId} setRestaurantId={setRestaurantId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <RestaurantsList getRestaurantId={getRestaurantIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;