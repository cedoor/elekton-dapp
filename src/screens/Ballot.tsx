import React from "react"
import ballots from "../data/ballots"
import PersonIcon from "@material-ui/icons/Person"
import TodayIcon from "@material-ui/icons/Today"
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation"
import { format } from "date-fns"
import { useParams } from "react-router-dom"
import {
    Button,
    Card,
    Typography,
    Divider,
    Box,
    Container,
    ListItemText,
    ListItem,
    List,
    CardHeader,
    createStyles,
    FormControl,
    FormControlLabel,
    makeStyles,
    Theme,
    ListItemIcon,
    RadioGroup,
    Radio
} from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingBottom: theme.spacing(8),
            textAlign: "center",
            [theme.breakpoints.up("sm")]: {
                justifyContent: "center"
            }
        },
        ballotName: {
            marginBottom: theme.spacing(2)
        },
        listItem: {
            paddingBottom: 0
        },
        card: {
            marginTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            marginBottom: theme.spacing(3)
        },
        ballotProposals: {
            paddingLeft: theme.spacing(3),
            display: "flex"
        }
    })
)

export default function Ballot(): JSX.Element {
    const classes = useStyles()
    const { id } = useParams<any>()
    const [_ballot, setBallot] = React.useState<any>()
    const [_proposal, setProposal] = React.useState<number>(-1)

    React.useEffect(() => {
        const ballot = ballots.find((ballot) => ballot.id === Number(id))

        setBallot(ballot)
    }, [id])

    function selectProposal(event: React.ChangeEvent<HTMLInputElement>) {
        setProposal(Number((event.target as HTMLInputElement).value))
    }

    function vote() {
        console.log(_proposal)
    }

    return _ballot ? (
        <Container className={classes.container} maxWidth="sm">
            <Typography className={classes.ballotName} variant="h5">
                {_ballot.name}
            </Typography>

            <Divider />

            <List component="nav">
                <ListItem className={classes.listItem}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin" secondary={_ballot.admin} />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon>
                        <TodayIcon />
                    </ListItemIcon>
                    <ListItemText primary="Start date" secondary={format(_ballot.startDate, "MMM dd yyyy - HH:mm")} />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon>
                        <InsertInvitationIcon />
                    </ListItemIcon>
                    <ListItemText primary="End date" secondary={format(_ballot.endDate, "MMM dd yyyy - HH:mm")} />
                </ListItem>
            </List>

            <Card className={classes.card}>
                <CardHeader titleTypographyProps={{ variant: "subtitle1" }} title={_ballot.description} />
                <FormControl className={classes.ballotProposals} component="fieldset">
                    <RadioGroup value={_proposal} onChange={selectProposal}>
                        <FormControlLabel
                            style={{ display: "none" }}
                            value={-1}
                            control={<Radio color="primary" />}
                            label=""
                        />
                        {_ballot.proposals.map((proposal: string, i: number) => (
                            <FormControlLabel key={i} value={i} control={<Radio color="primary" />} label={proposal} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>

            <Button onClick={vote} variant="outlined">
                Vote
            </Button>
        </Container>
    ) : (
        <Box />
    )
}
