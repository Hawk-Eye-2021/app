import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import PropTypes from 'prop-types';


function MyDialog({open, onClose, onSubmit, title, children, width}) {

    return (
        <Dialog onClose={onClose}
                fullWidth
                maxWidth={width}
                open={open}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent style={{padding: "20px 40px"}}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color={"secondary"}>
                    Cancelar
                </Button>
                <Button onClick={onSubmit}>
                    Agregar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

MyDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.oneOf(['xm', 'sm', "md", "lg", "xl"]).isRequired
}
export default MyDialog