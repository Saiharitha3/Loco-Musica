import { useParams } from "react-router-dom";
import {  IMG_URL } from "../Constants";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";

const RestanurantMenu = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const { restaurant, menu } = useRestaurant(id);

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className=" flex justify-around ">
      <div className="mx-2 bg-pink-300 text-white p-4 rounded-lg mt-1" key={restaurant.id}>
        <h1 className="text-3xl font-bold mb-4">Restaurant id: {id}</h1>
        <h2 className="text-2xl mb-2">{restaurant?.name}</h2>
        <div className="w-72 h-72 rounded-md overflow-hidden ">
          <img src={IMG_URL + restaurant?.cloudinaryImageId} alt="restaurant" className="w-full h-auto rounded-lg" />
        </div>
        <p className="text-lg mb-2">{restaurant?.cuisines.join(", ")}</p>
        <p className="text-lg mb-2">{restaurant?.city}</p>
        <p className="text-lg mb-2">{restaurant?.areaName}</p>
        <p className="text-lg mb-2">{restaurant?.costForTwoMessage}</p>
          <p className="text-lg mb-2">⭐ {restaurant?.avgRating}</p>
          <p className="text-lg mb-2">{restaurant?.totalRatingsString}</p>
          <p className="text-lg mb-2">Close Time {restaurant?.availability?.nextCloseTime}</p>
          <p className="text-lg mb-2">Open Time {restaurant?.availability?.nextOpenTime}</p>
          <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={() => handleAddToCart(restaurant)}>
            Add to Cart
          </button>
      </div>

      {!menu ? (
        <Shimmer />
      ) : (
        <div className="mx-3 bg-gray-800 text-white p-4 rounded-lg mt-1">
          <h1 className="text-3xl font-bold mb-4">Menu</h1>
          <ul>
            {Object.values(menu).map((item) => (
              <li key={item?.card?.info?.id} className="mb-4">
                <h3 className="text-2xl mb-2">{item?.card?.info?.name}</h3>
                <p className="text-lg mb-2">{item?.card?.info?.description}</p>
                {!item?.card?.info?.defaultPrice ? (
                  <p className="text-lg mb-2">{item?.card?.info?.defaultPrice}</p>
                ) : (
                  <p className="text-lg mb-2">{item?.card?.info?.price}</p>
                )}

                <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RestanurantMenu;