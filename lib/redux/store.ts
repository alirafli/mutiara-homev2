import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfigUser = {
  key: "user",
  storage,
  whitelist: ["userId"],
};

const persistUserReducer = persistReducer(persistConfigUser, userReducer);

export const store = configureStore({
  reducer: { persistUserReducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
