import { configureStore } from "@reduxjs/toolkit";
import pcBuilderSlice from "./pc-builder/pc-builder.slice";

export const store = configureStore({
  reducer: {
    // TODO
    pcBuilder: pcBuilderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
