import {Card, CardContent, CardHeader, Divider, Tooltip} from "@mui/material"
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {ContentDTO, ContentSentiments} from "../../../../dto/ContentDTO";
import "./ThemeDetail.scss";
import Label from "../../../../components/Label";

const dummyContents: ContentDTO[] = [
    {
        id: "1",
        title: "Argentina es el mejor pais del mundo segun el FMI",
        url: "Arial 12",
        sourceId: "1",
        sentiments: [{themeId: "1", sentiment: "positive"}]
    },
    {
        id: "2",
        title: "Argentina figura en el top 3 de paises con mejores paisajes del mundo",
        url: "www.florayfauna.com",
        sourceId: "1",
        sentiments: [{themeId: "1", sentiment: "positive"}]
    },
    {
        id: "3",
        title: "Argentina es el peor pais del mundo para vivir en pandemia",
        url: "Cualquier medio oficialista",
        sourceId: "1",
        sentiments: [{themeId: "1", sentiment: "negative"}]
    },
    {
        id: "4",
        title: "Argentina es un pais con muchas provincias",
        url: "Blog de Mati",
        sourceId: "1",
        sentiments: [{themeId: "1", sentiment: "neutral"}]
    },
]
function Contents({themeId, themeName}) {

    const getSentimentLabel = (sentiments: ContentSentiments[]): JSX.Element => {
        const themeSentiment = sentiments.find(contentSentiments => contentSentiments.themeId === themeId);

        if(!sentiments.length || !themeSentiment) return null;

        const map = {
            negative: {
                text: 'Negativo',
                color: 'error'
            },
            positive: {
                text: 'Positivo',
                color: 'success'
            },
            neutral: {
                text: 'Neutral',
                color: 'warning'
            }
        };

        const {text, color}: any = map[themeSentiment.sentiment];

        return <Label color={color}>{text}</Label>;
    };

    return (
        <Card className={"contents-card"}>
            <CardHeader title={`Contenidos del tema - ${themeName}`} />
            <Divider />
            <CardContent className={"card-body"}>
                {
                    dummyContents.concat(dummyContents).concat(dummyContents).concat(dummyContents).concat(dummyContents).concat(dummyContents).map((content, index) => {
                        return (
                            <>
                                <Accordion key={`accordion-${index}`}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-content-${content.id}`}
                                        id={`panel-content-${content.id}`}
                                    >
                                        <div className={"contentTitle"}>
                                            <div className={"title"}>
                                                <Tooltip title={content.title}>
                                                    <Typography className={"truncate"}>
                                                        {content.title}
                                                    </Typography>
                                                </Tooltip>
                                            </div>
                                            <div className={"sentiment"}>
                                                <Typography>
                                                    {getSentimentLabel(content.sentiments)}
                                                </Typography>
                                            </div>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {content.url}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Divider />
                            </>
                        )
                    })
                }
            </CardContent>
        </Card>
    )
}

Contents.propTypes = {
    themeId: PropTypes.string.isRequired,
    themeName: PropTypes.string.isRequired
}
export default Contents