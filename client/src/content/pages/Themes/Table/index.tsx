import {useState} from "react";
import {Helmet} from "react-helmet-async";
import {Container, Grid} from "@mui/material";
import MyTable from "../../../../components/Table";
import MyDialog from "../../../../components/Dialog";
import ThemeAutocomplete from "./ThemeAutocomplete";

function ThemesTable() {

    const [openAddThemeModal, setOpenAddThemeModal] = useState<boolean>(false);

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
                <MyDialog title={"Agregar Tema"}
                          onSubmit={() => console.log("Agregado")}
                          onClose={() => setOpenAddThemeModal(false)}
                          open={openAddThemeModal}
                          width={"sm"}
                          >
                    <ThemeAutocomplete/>
                </MyDialog>
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
                                 addAction={() => setOpenAddThemeModal(true)}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ThemesTable