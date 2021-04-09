import React from "react"
import { Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded"
import Drawer from "@material-ui/core/Drawer"
import MenuIcon from "@material-ui/icons/Menu"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme, createStyles, createMuiTheme, ThemeProvider } from "@material-ui/core"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Entry from "./screens/Entry"
import AuthContext from "./context/AuthContext"
import useAuth from "./hooks/useAuth"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Ballots from "./screens/Ballots"
import Paper from "@material-ui/core/Paper"
import SignUp from "./screens/SignUp"
import useBooleanCondition from "./hooks/useBooleanCondition"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex"
        },
        leftAppBarButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        },
        list: {
            width: 250
        },
        userInformation: {
            padding: theme.spacing(2)
        }
    })
)

export default function App() {
    const classes = useStyles()
    const auth = useAuth()
    const location = useLocation()
    const history = useHistory()
    const [_drawer, toggleDrawer] = useBooleanCondition()
    const [_darkTheme, setDarkTheme] = React.useState<boolean>(false)

    const theme = React.useMemo(() => {
        return createMuiTheme({
            palette: {
                type: _darkTheme ? "dark" : "light",
                primary: {
                    main: "#729167"
                }
            }
        })
    }, [_darkTheme])

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={auth}>
                <Paper className={classes.container} elevation={0} square={true}>
                    <AppBar color="inherit" elevation={0} position="static">
                        <Toolbar>
                            {location.pathname === "/ballots" ? (
                                <div>
                                    <IconButton
                                        edge="start"
                                        className={classes.leftAppBarButton}
                                        onClick={toggleDrawer}
                                    >
                                        <MenuIcon />
                                    </IconButton>

                                    <Drawer anchor="left" open={_drawer} onClose={toggleDrawer}>
                                        <div className={classes.list} role="presentation">
                                            <div className={classes.userInformation}>
                                                <Typography variant="body1">Pinco Pallino</Typography>
                                                <Typography variant="caption">@Pinco</Typography>
                                            </div>
                                            <Divider />
                                            <List onClick={toggleDrawer}>
                                                <ListItem onClick={() => auth.signOut()} button>
                                                    <ListItemIcon>
                                                        <ExitToAppIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Sign out" />
                                                </ListItem>
                                            </List>
                                        </div>
                                    </Drawer>
                                </div>
                            ) : location.pathname !== "/" ? (
                                <IconButton
                                    edge="start"
                                    className={classes.leftAppBarButton}
                                    onClick={() => history.goBack()}
                                >
                                    <ArrowBackRoundedIcon />
                                </IconButton>
                            ) : null}

                            <Typography variant="h6" className={classes.title}>
                                {auth._user && "Ballots"}
                            </Typography>

                            <IconButton edge="end" onClick={() => setDarkTheme(theme.palette.type !== "dark")}>
                                {theme.palette.type !== "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route path="/ballots">{auth._user ? <Ballots /> : <Redirect to={{ pathname: "/" }} />}</Route>
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                        <Route path="/">
                            <Entry />
                        </Route>
                    </Switch>
                </Paper>
            </AuthContext.Provider>
        </ThemeProvider>
    )
}
