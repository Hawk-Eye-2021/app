import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Container, Grid} from "@mui/material";
import MyTable from "../../../../components/Table";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import AddThemeDialog from "./AddThemeDialog";
import {deleteTheme, getThemesFromUser} from "../../../../store/slice/theme";
function ThemesTable() {

    const [openAddThemeModal, setOpenAddThemeModal] = useState<boolean>(false);

    const user = useSelector((state: RootState) => state.user.user);
    const themeState = useSelector((state: RootState) => state.theme);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getThemesFromUser(user.id))
    }, [])

    const deleteThemeFromUser = (theme) => {
        dispatch(deleteTheme(user.id, theme))
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
                                 rows={themeState.userThemes}
                                 addAction={() => setOpenAddThemeModal(true)}
                                 deleteAction={deleteThemeFromUser}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ThemesTable