import Grid from "@mui/material/Grid";
import "./ThemeDetail.scss"
import Contents from "./Contents";
import {Helmet} from "react-helmet-async";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";

function ThemeDetail() {

    const selectedTheme = useSelector((state: RootState) => state.theme.selectedTheme);

    return (
        <>
            <Helmet>
                <title>Detalle tema</title>
            </Helmet>
            <Grid
                display={"flex"}
                direction="row"
                spacing={3}
                padding={3}
                className={"gridContainer"}
            >
                <Grid sm={12} md={8}>
                    <div className={"gridItem"}>
                        <Contents themeId={selectedTheme.id} themeName={selectedTheme.name}/>
                    </div>
                </Grid>
                <Grid sm={12} md={4}>
                    <div className={"gridItem"}>
                        <iframe
                            src={`https://hawk-eye-metabase.herokuapp.com/public/question/39949d2b-f27b-4013-a9c8-aeb5a33ddc25?theme_id=${selectedTheme.id}`}
                            frameBorder="0"
                            height={"50%"}
                            width={"100%"}
                            allowTransparency
                        />
                        <iframe
                            src={`https://hawk-eye-metabase.herokuapp.com/public/question/39949d2b-f27b-4013-a9c8-aeb5a33ddc25?theme_id=${selectedTheme.id}`}
                            frameBorder="0"
                            height={"50%"}
                            width={"100%"}
                            allowTransparency
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}


export default ThemeDetail