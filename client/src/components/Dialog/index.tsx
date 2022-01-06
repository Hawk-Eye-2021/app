import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import PropTypes from 'prop-types';


function MyDialog({open, onClose, title, children, width, actions}) {

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
                {actions}
            </DialogActions>
        </Dialog>
    )
}

MyDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.oneOf(['xm', 'sm', "md", "lg", "xl"]).isRequired,
    actions: PropTypes.node
}
export default MyDialog