import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';


const AlertPopup = ({visible, message}: {visible: boolean, message: string}) => {

  const [alertVisible, setAlertVisible] = useState(visible);
  const alertMessage = message;
  const severity =
    alertMessage === 'Something went wrong!' ? 'error' : 'success';
    
  return (
    <div>
      <Snackbar
        open={alertVisible}
        autoHideDuration={2000}
        onClose={() => setAlertVisible(false)}
      >
        <Alert
          onClose={() => setAlertVisible(false)}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AlertPopup;