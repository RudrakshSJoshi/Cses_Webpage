import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertContext = createContext();

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const showAlert = (newMessage, newSeverity = 'info') => {
        setMessage(newMessage);
        setSeverity(newSeverity);
        setOpen(true);
    };


    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant='filled'
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};