import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import RestaurantDataService from "../services/restaurant.services";
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase-config';

const RestaurantsList = ({ getRestaurantId }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  const restaurantCollectionRef = collection(db, "restaurants");
  const getRestaurants = async () => {
    onSnapshot(restaurantCollectionRef, snapshot => {
      setRestaurants(snapshot.docs.map(doc => {
          return {
              id: doc.id,
              ...doc.data()
          }
      }))
  })   
  };

  const deleteHandler = async (id) => {
    await RestaurantDataService.deleteRestaurant(id);
    getRestaurants();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getRestaurants}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(restaurants, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Restaurant Name</th>
            <th>Restaurant Phone</th>
            <th>Restaurant Address</th>
            <th>Restaurant Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.phone}</td>
                <td>{doc.address}</td>
                <td>
                  <img src={doc.image} alt="" style={{height:180, width:180}} />
                </td>

              
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getRestaurantId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default RestaurantsList;