import React from "react"
import ElektonContext, { ElektonContextType } from "../context/ElektonContext"
import { Theme, Button, TextField, createStyles, makeStyles, useTheme, InputAdornment } from "@material-ui/core"
import useBooleanCondition from "../hooks/useBooleanCondition"
import NotesIcon from "@material-ui/icons/Notes"
import QRCodeViewer from "../components/QRCodeViewer"
import downloadSVG from "../utils/downloadSVG"
import { User } from "elekton/dist/types/User"
import BackdropProgress from "../components/BackdropProgress"
import ScrollableContainer from "../components/ScrollableContainer"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.up("sm")]: {
                justifyContent: "center",
                paddingBottom: theme.spacing(8)
            }
        },
        button: {
            marginTop: theme.spacing(5)
        }
    })
)

export default function SignUpPage() {
    const classes = useStyles()
    const elekton = React.useContext(ElektonContext) as ElektonContextType
    const theme = useTheme()
    const [_name, setName] = React.useState<string>("")
    const [_surname, setSurname] = React.useState<string>("")
    const [_user, setUser] = React.useState<User>()
    const [_QRCodeViewer, openQRCodeViewer, closeQRCodeViewer] = useBooleanCondition()
    const [_progress, openProgress, closeProgress] = useBooleanCondition()

    function downloadQRCode() {
        const svg = document.querySelector("#qr-code > svg") as Element

        downloadSVG(svg, {
            fileName: "AccessKey",
            padding: 15,
            backgroundColor: theme.palette.background.paper
        })
    }

    async function createUser() {
        openProgress()

        const user = await elekton.createUser({
            name: _name,
            surname: _surname
        })

        closeProgress()

        if (user) {
            setUser(user)

            openQRCodeViewer()
        }
    }

    function signUp() {
        closeQRCodeViewer()
        elekton.signUp(_user as User)
    }

    return (
        <ScrollableContainer className={classes.container}>
            <TextField
                value={_name}
                onChange={(event) => setName(event.target.value)}
                label="Name"
                margin="dense"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <NotesIcon color="action" />
                        </InputAdornment>
                    )
                }}
            />
            <TextField
                value={_surname}
                onChange={(event) => setSurname(event.target.value)}
                label="Surname"
                margin="dense"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <NotesIcon color="action" />
                        </InputAdornment>
                    )
                }}
            />

            <Button className={classes.button} onClick={createUser} variant="outlined">
                Create
            </Button>

            <QRCodeViewer
                open={_QRCodeViewer}
                title="Access key"
                message="Download the QR code of your access key and sign up!"
                value={_user?.privateKey + "," + _user?.voterPrivateKey}
            >
                <Button onClick={downloadQRCode}>Download</Button>
                <Button onClick={signUp}>Sign Up</Button>
            </QRCodeViewer>

            <BackdropProgress open={_progress} />
        </ScrollableContainer>
    )
}
