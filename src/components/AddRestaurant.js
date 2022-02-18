import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import RestaurantDataService from "../services/restaurant.services";

const AddRestaurant = ({ id, setRestaurantId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
 
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || phone === "" || address === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newRestaurant = {
      name,
      phone,
      address,
     
    };
    console.log(newRestaurant);

    try {
      if (id !== undefined && id !== "") {
        await RestaurantDataService.updateRestaurant(id, newRestaurant);
        setRestaurantId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await RestaurantDataService.addRestaurants(newRestaurant);
        setMessage({ error: false, msg: "New Restaurant added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setPhone("");
    setAddress("");
   
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await RestaurantDataService.getRestaurant(id);
      console.log("The record is :", docSnap.data());
      setName(docSnap.data().name);
      setPhone(docSnap.data().phone);
      setAddress(docSnap.data().address);
     
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRestaurantName">
            <InputGroup>
              <InputGroup.Text id="formRestaurantName">N</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Restaurant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRestaurantPhone">
            <InputGroup>
              <InputGroup.Text id="formRestaurantPhone">P</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Restaurant Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRestaurantAddress">
            <InputGroup>
              <InputGroup.Text id="formRestaurantAddress">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Restaurant Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

     
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddRestaurant;