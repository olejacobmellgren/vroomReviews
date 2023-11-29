import {
  Checkbox,
  FormControlLabel,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowName } from '../redux/showNameSlice';
import { RootState } from '../redux/configureStore';

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'silver', // Border color
          '&.Mui-checked': {
            color: 'red', // Background color when checked
          },
        },
      },
    },
  },
});

// Checkbox to show car name
const ShowNameCheckbox = () => {
  const dispatch = useDispatch();
  const showName = useSelector((state: RootState) => state.showName.value);

  const handleChecked = () => {
    dispatch(toggleShowName());
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={<Checkbox onClick={handleChecked} checked={showName} />}
        label="Show carname"
      />
    </ThemeProvider>
  );
};

export default ShowNameCheckbox;
