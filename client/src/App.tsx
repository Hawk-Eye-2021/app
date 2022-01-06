import {useRoutes} from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { SnackbarProvider } from 'notistack';

import ThemeProvider from './theme/ThemeProvider';
import {CssBaseline} from '@mui/material';
import {Provider} from "react-redux";
import store from "./store/store";

import {SnackbarUtilsConfigurator} from "./utils/SnackbarUtils";

const App = () => {

    const content = useRoutes(routes);

    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={4}
                              autoHideDuration={3000}
                              anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right"
                              }}>
                <SnackbarUtilsConfigurator />
                <ThemeProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CssBaseline/>
                        {content}
                    </LocalizationProvider>
                </ThemeProvider>
            </SnackbarProvider>
        </Provider>
    );
}
export default App;
