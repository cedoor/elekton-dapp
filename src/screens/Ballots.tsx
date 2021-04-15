import React from "react"
import CreateIcon from "@material-ui/icons/Create"
import Skeleton from "@material-ui/lab/Skeleton"
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
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

export default function Ballots() {
    const classes = useStyles()
    const history = useHistory()
    const [_wait, setWait] = React.useState<boolean>(false)
    const [_ballots, setBallots] = React.useState<any[]>([])

    React.useEffect(() => {
        const ballots = JSON.parse(localStorage.getItem("ballots") || "[]")

        setBallots(ballots)

        const timer = setTimeout(() => {
            setWait(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <Container className={classes.container} maxWidth="md">
            {_wait ? (
                _ballots.length > 0 ? (
                    <List component="nav">
                        {_ballots.map((ballot, i) => (
                            <Box key={i}>
                                <ListItem onClick={() => history.push(`/ballots/${ballot.id}`)} button>
                                    <ListItemText primary={ballot.name} secondary={ballot.description} />
                                    <ListItemSecondaryAction style={{ textAlign: "right" }}>
                                        <Typography variant="body1">{format(ballot.startDate, "MMM dd")}</Typography>
                                        <Typography variant="caption">{format(ballot.startDate, "HH:mm")}</Typography>
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
                )
            ) : (
                <Box py={1}>
                    {_ballots.map((ballot, i) => (
                        <Box key={i}>
                            <Box style={{ display: "flex", justifyContent: "space-between" }} px={2} py={1}>
                                <Box>
                                    <Skeleton variant="text" width={120} height={30} />
                                    <Skeleton variant="text" width={250} height={26} />
                                </Box>
                                <Box style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                                    <Skeleton variant="text" width={40} height={30} />
                                    <Skeleton variant="text" width={25} height={26} />
                                </Box>
                            </Box>
                            {i < 2 && <Divider variant="middle" />}
                        </Box>
                    ))}
                </Box>
            )}
            <Fab className={classes.fab} onClick={() => history.push("/ballots/create")} variant="extended">
                <CreateIcon />
                Create
            </Fab>
        </Container>
    )
}
