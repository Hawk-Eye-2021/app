import {useRoutes} from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import {CssBaseline} from '@mui/material';
import {Provider} from "react-redux";
import store from "./store/store";

const App = () => {

    const content = useRoutes(routes);

    return (
        <Provider store={store}>
            <ThemeProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline/>
                    {content}
                </LocalizationProvider>
            </ThemeProvider>
        </Provider>
    );
}
export default App;
