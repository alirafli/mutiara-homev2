import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  userId: string | null;
};

const initialState = {
  userId: null,
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId, reset } = user.actions;
export default user.reducer;
