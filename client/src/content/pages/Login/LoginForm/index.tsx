import React from 'react';
import PropTypes from 'prop-types';
import {CardActions, CardContent, FormControl, TextField} from "@mui/material";
import "../Login.scss";
import Button from "@mui/material/Button";

function LoginForm({username, password, setUsername, setPassword, setShowLogin}) {

    const buttonDisabled = !username || !password;

    return (
        <>
            <CardContent className={"form-wrapper"}>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        label="Usuario"
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        label="Contraseña"
                        type={"password"}
                    >
                    </TextField>
                </FormControl>
            </CardContent>
            <CardActions className={"footer"}>
                <Button type={"submit"} disabled={buttonDisabled}>
                    Login
                </Button>
                <small className={"footer-text"}
                       onClick={() => setShowLogin(false)}>
                    Registrarme
                </small>
            </CardActions>
        </>

    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setShowLogin: PropTypes.func.isRequired,
}

export default LoginForm