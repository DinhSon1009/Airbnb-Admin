import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "dashboard/users",
  initialState: {
    isSelected: false,
  },
  reducers: {
    setIsSelected: (state, action) => {
      state.isSelected = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setIsSelected } = actions;
export default reducer;
