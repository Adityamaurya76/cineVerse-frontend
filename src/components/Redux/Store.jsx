import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import subscriptionReducer from "./slices/SubscriptionPlanSlice";
import homeList from "./slices/HomeSlice";
import movieList from "./slices/MovieSlice";
import browseList from "./slices/browseSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
    home: homeList,
    movie: movieList,
    browse: browseList
  },
});

export default Store;