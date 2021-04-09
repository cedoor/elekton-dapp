import React from "react"
import AuthContext from "../context/AuthContext"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import { Link as RouterLink } from "react-router-dom"
import createStyles from "@material-ui/core/styles/createStyles"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { useTheme, Theme } from "@material-ui/core"
import logo from "../logo/logo.svg"
import darkLogo from "../logo/dark-logo.svg"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingBottom: theme.spacing(8),
            flex: 1,
            height: "100vh"
        },
        logo: {
            height: "200px",
            pointerEvents: "none",
            marginBottom: theme.spacing(2)
        },
        appName: {
            marginBottom: theme.spacing(2)
        },
        buttons: {
            marginTop: theme.spacing(1),
            width: "200px"
        }
    })
)

export default function Entry() {
    const classes = useStyles()
    const auth = React.useContext(AuthContext)
    const theme = useTheme()

    return (
        <Container className={classes.container} maxWidth="md">
            <img className={classes.logo} src={theme.palette.type === "dark" ? darkLogo : logo} alt="logo" />
            <Typography className={classes.appName} variant="h5">
                Elekton
            </Typography>
            <Button className={classes.buttons} onClick={() => auth?.signIn("pinco")} variant="outlined">
                Sign In
            </Button>
            <Button className={classes.buttons} component={RouterLink} to="/sign-up" variant="outlined">
                Sign Up
            </Button>
        </Container>
    )
}
