import { createSlice } from '@reduxjs/toolkit';

// Define the type for the state
interface ShowInfoState {
  value: boolean;
}

const initialState: ShowInfoState = {
  value: false,
};

export const showInfoSlice = createSlice({
  name: 'showInfo',
  initialState,
  reducers: {
    toggleShowInfo: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleShowInfo } = showInfoSlice.actions;

export default showInfoSlice.reducer;
