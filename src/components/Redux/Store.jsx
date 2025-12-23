import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import subscriptionReducer from "./slices/SubscriptionPlanSlice";
import homeList from "./slices/HomeSlice";
import movieList from "./slices/MovieSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
    home: homeList,
    movie: movieList
  },
});

export default Store;