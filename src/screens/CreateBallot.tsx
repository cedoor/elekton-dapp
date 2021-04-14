import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
    Button,
    Checkbox,
    Container,
    createStyles,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Theme,
    Typography
} from "@material-ui/core"
import TodayIcon from "@material-ui/icons/Today"
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation"
import DescriptionIcon from "@material-ui/icons/Description"
import PeopleIcon from "@material-ui/icons/People"
import SubjectIcon from "@material-ui/icons/Subject"
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DynamicList from "../components/DynamicList"
import users from "../data/users"
import AuthContext from "../context/AuthContext"
import { useHistory } from "react-router-dom"

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
        button: {
            marginTop: theme.spacing(2)
        }
    })
)

export default function CreateBallot(): JSX.Element {
    const classes = useStyles()
    const auth = React.useContext(AuthContext)
    const history = useHistory()
    const [_name, setName] = React.useState<string>("")
    const [_description, setDescription] = React.useState<string>("")
    const [_startDate, setStartDate] = React.useState<Date | null>(new Date())
    const [_endDate, setEndDate] = React.useState<Date | null>(new Date())
    const [_voters, setVoters] = React.useState<string[]>([])
    const [_proposals, setProposals] = React.useState<string[]>([])

    function createBallot() {
        const ballots = JSON.parse(localStorage.getItem("ballots") || "[]")

        ballots.push({
            id: ballots.length,
            admin: auth?._user,
            name: _name,
            description: _description,
            voters: _voters,
            startDate: +(_startDate as Date),
            endDate: +(_endDate as Date),
            proposals: _proposals
        })

        localStorage.setItem("ballots", JSON.stringify(ballots))

        history.goBack()
    }

    return (
        <Container className={classes.container} maxWidth="sm">
            <Typography variant="h5">Create ballot</Typography>

            <TextField
                value={_name}
                onChange={(event) => setName(event.target.value)}
                margin="dense"
                label="Name"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SubjectIcon color="action" />
                        </InputAdornment>
                    )
                }}
            />
            <TextField
                value={_description}
                onChange={(event) => setDescription(event.target.value)}
                margin="dense"
                label="Description"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <DescriptionIcon color="action" />
                        </InputAdornment>
                    )
                }}
            />

            <FormControl margin="dense">
                <InputLabel>Voters</InputLabel>
                <Select
                    multiple
                    value={_voters}
                    onChange={(event) => setVoters(event.target.value as string[])}
                    input={
                        <Input
                            style={{ textAlign: "left" }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PeopleIcon color="action" />
                                </InputAdornment>
                            }
                        />
                    }
                    renderValue={(selected) => (selected as string[]).join(", ")}
                    MenuProps={{
                        getContentAnchorEl: null,
                        PaperProps: { style: { maxHeight: 440 } }
                    }}
                >
                    {users.map((user, i: number) => (
                        <MenuItem key={i} value={user.name}>
                            <Checkbox color="primary" checked={_voters.indexOf(user.name) > -1} />
                            <ListItemText primary={user.name + " " + user.surname} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    margin="dense"
                    label="Start date"
                    format="MMM dd yyyy - HH:mm"
                    value={_startDate}
                    onChange={setStartDate}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TodayIcon color="action" />
                            </InputAdornment>
                        )
                    }}
                />
                <DateTimePicker
                    margin="dense"
                    label="End date"
                    format="MMM dd yyyy - HH:mm"
                    value={_endDate}
                    onChange={setEndDate}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <InsertInvitationIcon color="action" />
                            </InputAdornment>
                        )
                    }}
                />
            </MuiPickersUtilsProvider>

            <DynamicList label="Proposals" items={_proposals} onChange={setProposals} />

            <Button className={classes.button} onClick={createBallot} variant="outlined">
                Create
            </Button>
        </Container>
    )
}
