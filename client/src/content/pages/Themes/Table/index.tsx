import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Container, Grid} from "@mui/material";
import MyTable from "../../../../components/Table";
import http from "../../../../http/http";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {ThemeDTO} from "../../../../dto/ThemeDTO";
import AddThemeDialog from "./AddThemeDialog";
function ThemesTable() {

    const [openAddThemeModal, setOpenAddThemeModal] = useState<boolean>(false);
    const [themes, setThemes] = useState<ThemeDTO[]>([]);

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        http.get(`/users/${user.id}/themes`)
            .then(res => {
                setThemes(res.data);
            })
    }, [])

    const deleteThemeFromUser = (themeId) => {
        http.delete(`/users/${user.id}/themes/${themeId}`)
            .then(() => console.log(`Borrado el tema ${themeId} del usuario ${user.name}`))
    }

    return (
        <>
            <Helmet>
                <title>Temas</title>
            </Helmet>
            <Container maxWidth="lg">
                <AddThemeDialog open={openAddThemeModal}
                                onClose={() => setOpenAddThemeModal(false)}/>
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
                        <MyTable title={"Temas"}
                                 columns={[{title: "ID", key: "id"}, {title: "Nombre", key: "name"}]}
                                 rows={themes}
                                 addAction={() => setOpenAddThemeModal(true)}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ThemesTable