import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
    Button,
    Checkbox,
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
import NotesIcon from "@material-ui/icons/Notes"
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DynamicList from "../components/DynamicList"
import ElektonContext, { ElektonContextType } from "../context/ElektonContext"
import { useHistory } from "react-router-dom"
import useBooleanCondition from "../hooks/useBooleanCondition"
import BackdropProgress from "../components/BackdropProgress"
import ScrollableContainer from "../components/ScrollableContainer"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            textAlign: "center",
            [theme.breakpoints.up("sm")]: {
                justifyContent: "center",
                paddingBottom: theme.spacing(8)
            }
        },
        button: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
        }
    })
)

export default function CreateBallotPage(): JSX.Element {
    const classes = useStyles()
    const elekton = React.useContext(ElektonContext) as ElektonContextType
    const history = useHistory()
    const [_name, setName] = React.useState<string>("")
    const [_description, setDescription] = React.useState<string>("")
    const [_startDate, setStartDate] = React.useState<Date | null>(new Date())
    const [_endDate, setEndDate] = React.useState<Date | null>(new Date())
    const [_voterPublicKeys, setVoterPublicKeys] = React.useState<string[]>([])
    const [_proposals, setProposals] = React.useState<string[]>([])
    const [_progress, toggleProgress] = useBooleanCondition()

    async function createBallot() {
        toggleProgress()

        await elekton.createBallot({
            name: _name,
            description: _description,
            startDate: Math.floor(+(_startDate as Date) / 1000),
            endDate: Math.floor(+(_endDate as Date) / 1000),
            proposals: _proposals,
            voterPublicKeys: _voterPublicKeys
        })

        toggleProgress()

        history.replace("/ballots")
    }

    return (
        <ScrollableContainer className={classes.container}>
            <Typography variant="h5">Create ballot</Typography>

            <TextField
                value={_name}
                onChange={(event) => setName(event.target.value)}
                margin="dense"
                label="Name"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <NotesIcon color="action" />
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
                    value={_voterPublicKeys}
                    onChange={(event) => setVoterPublicKeys(event.target.value as string[])}
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
                    renderValue={(voterPublicKeys) =>
                        elekton._users
                            .filter((user) => (voterPublicKeys as string[]).includes(user.voterPublicKey))
                            .map((user) => user.name + " " + user.surname)
                            .join(", ")
                    }
                    MenuProps={{
                        getContentAnchorEl: null,
                        PaperProps: { style: { maxHeight: 440 } }
                    }}
                >
                    {elekton._users.map((user, i: number) => (
                        <MenuItem key={i} value={user.voterPublicKey}>
                            <Checkbox color="primary" checked={_voterPublicKeys.indexOf(user.voterPublicKey) > -1} />
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

            <BackdropProgress open={_progress} onClose={toggleProgress} />
        </ScrollableContainer>
    )
}
