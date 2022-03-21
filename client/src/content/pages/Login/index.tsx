import React, { useState } from 'react'
import {Helmet} from "react-helmet-async";
import {Card, CardHeader, Grid} from "@mui/material";
import http from "src/http/http"
import SnackbarUtils from 'src/utils/SnackbarUtils'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {login} from "../../../store/slice/user";

function Login() {

    const [showLogin, setShowLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if(showLogin) {
            dispatch(login(username, password, () => navigate("/app/themes")))
        } else {
            http.post("/users", {name: username, password, email})
                .then(() => {
                    setShowLogin(true);
                    SnackbarUtils.success("El usuario se ha creado exitosamente")
                })
                .catch((err) => {
                    const errResponse = err.response;
                    if(errResponse.status === 400) {
                        SnackbarUtils.error(errResponse.data.message)
                    } else {
                        SnackbarUtils.error("Ocurrió un error al crear el usuario")
                    }
                })
        }
    }
    return (
        <>
            <Helmet>
                <title>{showLogin ? "Login" : "Crear cuenta"}</title>
            </Helmet>
            <Grid container className={"container"}>
                <Grid xs={12} sm={12} md={3} className={"card-container"}>
                    <Card>
                        <CardHeader title={"HawkEye"}
                                    classes={{
                                        title: "card-title"
                                    }}
                                    subheader={showLogin ? "Introduzca sus credenciales para ingresar" : "Complete los campos para crear su propia cuenta"}/>
                        <form onSubmit={handleFormSubmit}>
                            {
                                showLogin ?
                                    <LoginForm password={password}
                                               setPassword={setPassword}
                                               setUsername={setUsername}
                                               setShowLogin={setShowLogin}
                                               username={username}/> :
                                    <RegisterForm password={password}
                                                  setPassword={setPassword}
                                                  setUsername={setUsername}
                                                  setShowLogin={setShowLogin}
                                                  username={username}
                                                  email={email}
                                                  setEmail={setEmail}
                                    />
                            }
                        </form>
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={3} />
                <Grid xs={12} sm={12} md={3} />
            </Grid>
        </>
    )
}

export default Login