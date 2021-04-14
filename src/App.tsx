import { Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom"
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded"
import MenuIcon from "@material-ui/icons/Menu"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import {
    IconButton,
    Typography,
    Divider,
    List,
    Drawer,
    Toolbar,
    AppBar,
    makeStyles,
    Theme,
    ListItem,
    Paper,
    createStyles,
    ThemeProvider
} from "@material-ui/core"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Entry from "./screens/Entry"
import AuthContext from "./context/AuthContext"
import useAuth from "./hooks/useAuth"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Ballots from "./screens/Ballots"
import SignUp from "./screens/SignUp"
import useBooleanCondition from "./hooks/useBooleanCondition"
import Ballot from "./screens/Ballot"
import CreateBallot from "./screens/CreateBallot"
import ThemeTypeContext from "./context/ThemeTypeContext"
import useThemeType from "./hooks/useThemeType"

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
    const themeType = useThemeType()
    const location = useLocation()
    const history = useHistory()
    const [_drawer, toggleDrawer] = useBooleanCondition()
    const { _theme, toggleTheme } = themeType

    return (
        <ThemeTypeContext.Provider value={themeType}>
            <ThemeProvider theme={_theme}>
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
                                                    <Typography variant="body1">{auth._user}</Typography>
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
                                    {location.pathname === "/ballots" && "Ballots"}
                                </Typography>

                                <IconButton edge="end" onClick={toggleTheme}>
                                    {_theme.palette.type !== "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Switch>
                            <Route path="/ballots/create">
                                {auth._user ? <CreateBallot /> : <Redirect to={{ pathname: "/" }} />}
                            </Route>
                            <Route path="/ballots/:id">
                                {auth._user ? <Ballot /> : <Redirect to={{ pathname: "/" }} />}
                            </Route>
                            <Route path="/ballots">
                                {auth._user ? <Ballots /> : <Redirect to={{ pathname: "/" }} />}
                            </Route>
                            <Route path="/sign-up">
                                {auth._user ? <Redirect to={{ pathname: "/ballots" }} /> : <SignUp />}
                            </Route>
                            <Route path="/">
                                {auth._user ? <Redirect to={{ pathname: "/ballots" }} /> : <Entry />}
                            </Route>
                        </Switch>
                    </Paper>
                </AuthContext.Provider>
            </ThemeProvider>
        </ThemeTypeContext.Provider>
    )
}
