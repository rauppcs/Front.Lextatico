import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core';

const AlertDialog = ({ title, content, open, setOpen, hancleClickConfirmation }) => {
    const theme = useTheme();
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div style={{padding: theme.spacing(1.5)}}>
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={hancleClickConfirmation} variant="contained" color="secondary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default AlertDialog;
