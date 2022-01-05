import {Helmet} from "react-helmet-async";
import {Container, Grid} from "@mui/material";
import RecentOrders from "../../../applications/Transactions/RecentOrders";
import Footer from "../../../../components/Footer";
import MyTable from "../../../../components/Table";


function ThemesTable() {

    return (
        <>
            <Helmet>
                <title>Themes</title>
            </Helmet>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                    marginTop={3}
                >
                    <Grid item xs={12}>
                        <MyTable title={"Themes"}
                                 columns={[{title: "ID"}, {title: "Name"}]}
                                 rows={[
                                     {
                                         id: "1",
                                         name: "Theme 1"
                                     },
                                     {
                                         id: "2",
                                         name: "Theme 2"
                                     },
                                     {
                                         id: "3",
                                         name: "Theme 3"
                                     },
                                 ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ThemesTable