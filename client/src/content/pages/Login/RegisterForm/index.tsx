import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {CardActions, CardContent, FormControl, TextField} from "@mui/material";
import "../Login.scss";
import Button from "@mui/material/Button";

function RegisterForm({username, password, email, setEmail, setUsername, setPassword, setShowLogin}) {

    const [confirmPassword, setConfirmPassword] = useState("");

    const buttonDisabled = !password || !confirmPassword || password !== confirmPassword;

    const passwordInputError = confirmPassword && password !== confirmPassword;

    useEffect(() => {
        setUsername("")
        setPassword("")
        setEmail("")
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        label="Mail"
                        type={"email"}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth
                             variant="outlined" >
                    <TextField
                        value={password}
                        error={passwordInputError}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        label="Contraseña"
                        type={"password"}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth
                             variant="outlined">
                    <TextField
                        value={confirmPassword}
                        error={passwordInputError}
                        helperText={passwordInputError ? "Las contraseñas deben ser iguales" : ""}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                        label="Confirmar contraseña"
                        type={"password"}
                    >
                    </TextField>
                </FormControl>
            </CardContent>
            <CardActions className={"footer"}>
                <Button type={"submit"} disabled={buttonDisabled}>
                    Registrarme
                </Button>
                <small className={"footer-text"} onClick={() => setShowLogin(true)}>
                    Ya tengo una cuenta
                </small>
            </CardActions>
        </>

    )
}

RegisterForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setShowLogin: PropTypes.func.isRequired,
}

export default RegisterForm