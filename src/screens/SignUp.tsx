import React from "react"
import Container from "@material-ui/core/Container"
import AuthContext from "../context/AuthContext"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import createStyles from "@material-ui/core/styles/createStyles"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Theme } from "@material-ui/core"
import useBooleanCondition from "../hooks/useBooleanCondition"
import QRCodeDialog from "../components/QRCodeDialog"
import downloadSVG from "../utils/downloadSVG"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flex: 1,
            paddingBottom: theme.spacing(8)
        },
        form: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.up("sm")]: {
                justifyContent: "center"
            }
        },
        button: {
            marginTop: theme.spacing(5)
        }
    })
)

export default function SignUp() {
    const classes = useStyles()
    const auth = React.useContext(AuthContext)
    const [_QRCode, toggleQRCode] = useBooleanCondition()
    const [_name, setName] = React.useState<string>("")
    const [_surname, setSurname] = React.useState<string>("")

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function updateSurname(event: React.ChangeEvent<HTMLInputElement>) {
        setSurname(event.target.value)
    }

    function downloadQRCode() {
        const svg = document.querySelector("#qr-code > svg") as Element

        downloadSVG(svg, "AccessKey")
    }

    function signUp() {
        toggleQRCode()
        auth?.signUp(_name + " " + _surname)
    }

    return (
        <Container className={classes.container} maxWidth="sm">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField id="user-name" value={_name} onChange={updateName} label="Name" />
                <TextField id="user-surname" value={_surname} onChange={updateSurname} label="Surname" />
                <Button className={classes.button} onClick={toggleQRCode} variant="outlined">
                    Create
                </Button>
            </form>
            <QRCodeDialog
                open={_QRCode}
                title="Access key"
                message="Download the QR code of your access key and sign up!"
                value={_name + " " + _surname}
            >
                <Button onClick={downloadQRCode}>Download</Button>
                <Button onClick={signUp}>Sign Up</Button>
            </QRCodeDialog>
        </Container>
    )
}
