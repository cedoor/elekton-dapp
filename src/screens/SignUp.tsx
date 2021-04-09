import React from "react"
import Container from "@material-ui/core/Container"
import AuthContext from "../context/AuthContext"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import createStyles from "@material-ui/core/styles/createStyles"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Theme } from "@material-ui/core"

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

    return (
        <Container className={classes.container} maxWidth="sm">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField id="user-name" label="Name" />
                <TextField id="user-surname" label="Surname" />
                <Button className={classes.button} onClick={() => auth?.signUp()} variant="outlined">
                    Create
                </Button>
            </form>
        </Container>
    )
}
