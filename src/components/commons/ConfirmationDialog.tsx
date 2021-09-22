import * as React from 'react';
import Button from '@material-ui/core/Button/Button';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Slide from '@material-ui/core/Slide/Slide';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children?: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ConfirmationDialog = () => {

    const customDialog = useSelector((state: RootState) => state.customDialog);
    const { status, title, body, onAccept, onCancel } = customDialog;

    const handleClickOpen = () => {
        onAccept();
    };

    const handleClose = () => {
        onCancel();
    };

    return (
        <div>
            <Dialog
                open={status}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClickOpen}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmationDialog;