import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Drawer from "@material-ui/core/Drawer"
import MenuIcon from "@material-ui/icons/Menu"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme, createStyles, useMediaQuery, createMuiTheme, ThemeProvider } from "@material-ui/core"
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex"
        },
        menuButton: {
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
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    const [_drawer, toggleDrawer] = React.useState<boolean>(false)
    const [_darkTheme, setDarkTheme] = React.useState<boolean | null>(null)

    const theme = React.useMemo(() => {
        const dark = _darkTheme !== null ? _darkTheme : prefersDarkMode

        return createMuiTheme({
            palette: {
                type: dark ? "dark" : "light",
                primary: {
                    main: "#33691E"
                },
                secondary: {
                    main: "#dcedc8"
                }
            }
        })
    }, [prefersDarkMode, _darkTheme])

    return (
        <AuthContext.Provider value={auth}>
            <ThemeProvider theme={theme}>
                <Paper className={classes.container} elevation={0} square={true}>
                    <AppBar color="inherit" elevation={0} position="static">
                        <Toolbar>
                            {auth._user && (
                                <div>
                                    <IconButton
                                        edge="start"
                                        className={classes.menuButton}
                                        onClick={() => toggleDrawer(true)}
                                    >
                                        <MenuIcon />
                                    </IconButton>

                                    <Drawer anchor="left" open={_drawer} onClose={() => toggleDrawer(false)}>
                                        <div
                                            className={classes.list}
                                            role="presentation"
                                            onClick={() => toggleDrawer(false)}
                                            onKeyDown={() => toggleDrawer(false)}
                                        >
                                            <div className={classes.userInformation}>
                                                <Typography variant="body1">Pinco Pallino</Typography>
                                                <Typography variant="caption">@Pinco</Typography>
                                            </div>
                                            <Divider />
                                            <List>
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
                            )}

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
                        <Route path="/">
                            <Entry />
                        </Route>
                    </Switch>
                </Paper>
            </ThemeProvider>
        </AuthContext.Provider>
    )
}
