import {Helmet} from "react-helmet-async";
import {Container, Grid} from "@mui/material";
import MyTable from "../../../../components/Table";


function ThemesTable() {

    const rows = [
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
    ];

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
                    paddingTop={3}
                    paddingBottom={3}
                >
                    <Grid item xs={12}>
                        <MyTable title={"Themes"}
                                 columns={[{title: "ID"}, {title: "Name"}]}
                                 rows={rows.concat(rows).concat(rows).concat(rows).concat(rows).concat(rows).concat(rows)}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ThemesTable