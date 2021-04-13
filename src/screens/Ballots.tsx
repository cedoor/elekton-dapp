import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Divider from "@material-ui/core/Divider"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Typography from "@material-ui/core/Typography"
import CreateIcon from "@material-ui/icons/Create"
import Skeleton from "@material-ui/lab/Skeleton"
import ballots from "../data/ballots"
import { format } from "date-fns"
import Fab from "@material-ui/core/Fab"
import { createStyles, makeStyles, Theme } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: 0
        },
        fab: {
            position: "absolute",
            right: theme.spacing(2),
            bottom: theme.spacing(2)
        }
    })
)

export default function Ballots() {
    const classes = useStyles()
    const history = useHistory()
    const [_wait, setWait] = React.useState<boolean>(false)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setWait(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <Container className={classes.container} maxWidth="md">
            {_wait ? (
                <List component="nav">
                    {ballots.map((ballot, i) => (
                        <Box key={i}>
                            <ListItem onClick={() => history.push(`/ballots/${ballot.id}`)} button>
                                <ListItemText primary={ballot.name} secondary={ballot.description} />
                                <ListItemSecondaryAction style={{ textAlign: "right" }}>
                                    <Typography variant="body1">{format(ballot.startDate, "MMM dd")}</Typography>
                                    <Typography variant="caption">{format(ballot.startDate, "HH:mm")}</Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {i < ballots.length - 1 && <Divider variant="middle" />}
                        </Box>
                    ))}
                </List>
            ) : (
                <Box py={1}>
                    {ballots.map((ballot, i) => (
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
                            {i < ballots.length - 1 && <Divider variant="middle" />}
                        </Box>
                    ))}
                </Box>
            )}
            <Fab className={classes.fab} variant="extended">
                <CreateIcon />
                Create
            </Fab>
        </Container>
    )
}
