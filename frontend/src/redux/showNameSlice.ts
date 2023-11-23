import { createSlice } from '@reduxjs/toolkit';

// Define the type for the state
interface ShowNameState {
  value: boolean;
}

const initialState: ShowNameState = {
  value: true,
};

export const showNameSlice = createSlice({
  name: 'showName',
  initialState,
  reducers: {
    toggleShowName: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleShowName } = showNameSlice.actions;

export default showNameSlice.reducer;
