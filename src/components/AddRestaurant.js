import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import RestaurantDataService from "../services/restaurant.services";
import {storage } from '../firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddRestaurant = ({ id, setRestaurantId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleChange = e => {
    if(e.target.files[0]) { 
      setImage(e.target.files[0]);
      console.log(image);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || phone === "" || address === "" || image === null) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
  
        // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg'
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'images/' + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                
            console.log(imgURL);
            console.log('File available at', downloadURL);
            setImgURL(downloadURL);
          });
        }
      );

      const newRestaurant = {
        name:name,
        phone:phone,
        address:address,
        image: imgURL,
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
    setImgURL("");
  };


  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await RestaurantDataService.getRestaurant(id);
      console.log("The record is :", docSnap.data());
      setName(docSnap.data().name);
      setPhone(docSnap.data().phone);
      setAddress(docSnap.data().address);
      setImage(docSnap.data().imgURL);  
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

          <Form.Group className="mb-3" controlId="formRestaurantAddress">
            <InputGroup>
              <InputGroup.Text id="formRestaurantImage">I</InputGroup.Text>
              <Form.Control
                type="file"
                onChange={handleChange}
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