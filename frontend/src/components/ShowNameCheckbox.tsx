import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowName } from '../redux/showNameSlice';
import { RootState } from "../redux/configureStore";

const ShowNameCheckbox = () => {
  const dispatch = useDispatch();
  const showName = useSelector((state: RootState) => state.showName.value);

  const handleChecked = () => {
    dispatch(toggleShowName());
  }

  return (
    <FormControlLabel
      control={<Checkbox onClick={handleChecked} checked={showName} color="error" />}
      label="Show carname"
    />
  );
}

export default ShowNameCheckbox;