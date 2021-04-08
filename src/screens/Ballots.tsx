import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Skeleton from "@material-ui/lab/Skeleton"
import ballots from "../data/ballots"
import { BallotInputData } from "elekton/dist/types/types"

export default function Ballots() {
    const [wait, setWait] = React.useState<boolean>(false)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setWait(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <Container maxWidth="md">
            {wait ? (
                <List component="nav">
                    {ballots.map((ballot: BallotInputData, i) => (
                        <ListItem key={i} button>
                            <ListItemText primary={ballot.name} secondary={ballot.description} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                ballots.map((ballot: BallotInputData, i) => (
                    <Box px={2} py={1} key={i}>
                        <Skeleton variant="text" width={120} height={30} />
                        <Skeleton variant="text" width={300} height={26} />
                    </Box>
                ))
            )}
        </Container>
    )
}
