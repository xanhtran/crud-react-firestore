import { db } from "../firebase-config";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const restaurantCollectionRef = collection(db, "restaurants");
class RestaurantDataService {
  addRestaurants = (newRestaurant) => {
    return addDoc(restaurantCollectionRef, newRestaurant);
  };

  updateRestaurant = (id, updatedRestaurant) => {
    const restauDoc = doc(db, "restaurants", id);
    return updateDoc(restauDoc, updatedRestaurant);
  };

  deleteRestaurant= (id) => {
    const restauDoc = doc(db, "restaurants", id);
    return deleteDoc(restauDoc);
  };


  getRestaurant= (id) => {
    const restauDoc = doc(db, "restaurants", id);
    return getDoc(restauDoc);
  };
}

export default new RestaurantDataService();