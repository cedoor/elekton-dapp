import React from "react"
import PersonIcon from "@material-ui/icons/Person"
import TodayIcon from "@material-ui/icons/Today"
import BallotIcon from "@material-ui/icons/Ballot"
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation"
import { format } from "date-fns"
import { useParams } from "react-router-dom"
import {
    Button,
    Card,
    Typography,
    Divider,
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
import { Ballot } from "elekton/dist/types/Ballot"
import ElektonContext, { ElektonContextType } from "../context/ElektonContext"
import ScrollableContainer from "../components/ScrollableContainer"
import BackdropProgress from "../components/BackdropProgress"
import useBooleanCondition from "../hooks/useBooleanCondition"
import delay from "../utils/delay"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            textAlign: "center",
            [theme.breakpoints.up("sm")]: {
                justifyContent: "center",
                paddingBottom: theme.spacing(8)
            }
        },
        ballotName: {
            marginBottom: theme.spacing(2)
        },
        listItem: {
            paddingTop: theme.spacing(0.5),
            paddingBottom: theme.spacing(0.5)
        },
        card: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2)
        },
        ballotDescription: {
            paddingBottom: theme.spacing(1)
        },
        ballotProposals: {
            paddingLeft: theme.spacing(2),
            display: "flex"
        },
        button: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
        }
    })
)

export default function BallotPage() {
    const classes = useStyles()
    const elekton = React.useContext(ElektonContext) as ElektonContextType
    const { id } = useParams<any>()
    const [_ballot, setBallot] = React.useState<Ballot>()
    const [_proposal, setProposal] = React.useState<number>(-1)
    const [_progress, openProgress, closeProgress] = useBooleanCondition()

    React.useEffect(() => {
        const ballot = elekton._ballots.find((ballot) => ballot.index === Number(id))

        setBallot(ballot)
    }, [])

    async function vote() {
        if (_proposal !== -1) {
            console.log(_progress)
            openProgress()

            await elekton.vote(_ballot as Ballot, _proposal)

            closeProgress()
        }
    }

    return _ballot ? (
        <ScrollableContainer className={classes.container}>
            <Typography className={classes.ballotName} variant="h5">
                {_ballot.name}
            </Typography>

            <Divider />

            <List component="nav">
                <ListItem className={classes.listItem}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                        secondaryTypographyProps={{ noWrap: true }}
                        primary="Admin"
                        secondary={_ballot.adminAddress}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon>
                        <TodayIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Start date"
                        secondary={format(_ballot.startDate * 1000, "MMM dd yyyy - HH:mm")}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon>
                        <InsertInvitationIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="End date"
                        secondary={format(_ballot.endDate * 1000, "MMM dd yyyy - HH:mm")}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemIcon>
                        <BallotIcon />
                    </ListItemIcon>
                    <ListItemText primary="Votes" secondary={_ballot.votes.length} />
                </ListItem>
            </List>

            <Divider />

            <Card elevation={0} square={true} className={classes.card}>
                <CardHeader
                    className={classes.ballotDescription}
                    titleTypographyProps={{ variant: "subtitle1" }}
                    title={_ballot.description}
                />
                <FormControl className={classes.ballotProposals} component="fieldset">
                    <RadioGroup value={_proposal} onChange={(event) => setProposal(Number(event.target.value))}>
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

            <Divider />

            {elekton._user && _ballot.voterPublicKeys.indexOf(elekton._user.voterPublicKey) !== -1 && (
                <Button className={classes.button} onClick={vote} variant="outlined">
                    Vote
                </Button>
            )}

            <BackdropProgress open={_progress} />
        </ScrollableContainer>
    ) : null
}
