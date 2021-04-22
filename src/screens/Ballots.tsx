import React from "react"
import CreateIcon from "@material-ui/icons/Create"
import { format } from "date-fns"
import {
    createStyles,
    makeStyles,
    Theme,
    List,
    ListItem,
    ListItemText,
    Container,
    Box,
    Divider,
    ListItemSecondaryAction,
    Typography,
    Fab
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import ElektonContext, { ElektonContextType } from "../context/ElektonContext"
import ScrollableBox from "../components/ScrollableBox"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down("xs")]: {
                padding: 0
            }
        },
        fab: {
            position: "absolute",
            right: theme.spacing(2),
            bottom: theme.spacing(2)
        },
        emptyListBox: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: theme.spacing(8)
        },
        emptyListText: {
            color: theme.palette.text.hint
        }
    })
)

export default function BallotsPage() {
    const classes = useStyles()
    const history = useHistory()
    const { _ballots } = React.useContext(ElektonContext) as ElektonContextType

    return (
        <ScrollableBox>
            <Container className={classes.container} maxWidth="md">
                {_ballots.length > 0 ? (
                    <List component="nav">
                        {_ballots
                            .sort((a, b) => a.startDate - b.startDate)
                            .map((ballot, i) => (
                                <Box key={i}>
                                    <ListItem onClick={() => history.push(`/ballots/${ballot.index}`)} button>
                                        <ListItemText primary={ballot.name} secondary={ballot.description} />
                                        <ListItemSecondaryAction style={{ textAlign: "right" }}>
                                            <Typography variant="body1">
                                                {format(ballot.startDate * 1000, "MMM dd")}
                                            </Typography>
                                            <Typography variant="caption">
                                                {format(ballot.startDate * 1000, "HH:mm")}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {i < _ballots.length - 1 && <Divider variant="middle" />}
                                </Box>
                            ))}
                    </List>
                ) : (
                    <Box className={classes.emptyListBox}>
                        <Typography className={classes.emptyListText} variant="h4">
                            No ballot
                        </Typography>
                        <Typography className={classes.emptyListText} variant="subtitle1">
                            Create your own ballot!
                        </Typography>
                    </Box>
                )}
                <Fab className={classes.fab} onClick={() => history.push("/ballots/create")} variant="extended">
                    <CreateIcon />
                    Create
                </Fab>
            </Container>
        </ScrollableBox>
    )
}
