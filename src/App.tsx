import { Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom"
import {
    IconButton,
    AppBar,
    Box,
    Toolbar,
    Typography,
    makeStyles,
    Theme,
    Paper,
    createStyles,
    ThemeProvider
} from "@material-ui/core"
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded"
import MenuIcon from "@material-ui/icons/Menu"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import EntryPage from "./screens/Entry"
import ElektonContext, { ElektonContextType } from "./context/ElektonContext"
import useElekton from "./hooks/useElekton"
import BallotsPage from "./screens/Ballots"
import SignUpPage from "./screens/SignUp"
import useBooleanCondition from "./hooks/useBooleanCondition"
import BallotPage from "./screens/Ballot"
import CreateBallotPage from "./screens/CreateBallot"
import ThemeTypeContext from "./context/ThemeTypeContext"
import useThemeType from "./hooks/useThemeType"
import Sidebar from "./components/Sidebar"
import BackdropProgress from "./components/BackdropProgress"
import { connect } from "elekton"
import elektonConfig from "./config"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            flex: 1
        },
        leftAppBarButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    })
)

export default function App() {
    const classes = useStyles()
    const elekton = useElekton(connect(elektonConfig)) as ElektonContextType
    const themeType = useThemeType()
    const location = useLocation()
    const history = useHistory()
    const [_sidebar, openSidebar, closeSidebar] = useBooleanCondition()
    const { _theme, toggleTheme } = themeType

    return (
        <ThemeTypeContext.Provider value={themeType}>
            <ThemeProvider theme={_theme}>
                <ElektonContext.Provider value={elekton}>
                    <Paper className={classes.container} elevation={0} square={true}>
                        {elekton._user !== undefined && (
                            <Box className={classes.container}>
                                <AppBar color="inherit" elevation={0} position="static">
                                    <Toolbar>
                                        {location.pathname === "/ballots" ? (
                                            <div>
                                                <IconButton
                                                    edge="start"
                                                    className={classes.leftAppBarButton}
                                                    onClick={openSidebar}
                                                >
                                                    <MenuIcon />
                                                </IconButton>

                                                <Sidebar open={_sidebar} onClose={closeSidebar} />
                                            </div>
                                        ) : location.pathname !== "/" ? (
                                            <IconButton
                                                edge="start"
                                                className={classes.leftAppBarButton}
                                                onClick={() => history.replace(elekton._user ? "/ballots" : "/")}
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
                                        {elekton._user ? <CreateBallotPage /> : <Redirect to={{ pathname: "/" }} />}
                                    </Route>
                                    <Route path="/ballots/:id">
                                        {elekton._user ? <BallotPage /> : <Redirect to={{ pathname: "/" }} />}
                                    </Route>
                                    <Route path="/ballots">
                                        {elekton._user ? <BallotsPage /> : <Redirect to={{ pathname: "/" }} />}
                                    </Route>
                                    <Route path="/sign-up">
                                        {elekton._user ? <Redirect to={{ pathname: "/ballots" }} /> : <SignUpPage />}
                                    </Route>
                                    <Route path="/">
                                        {elekton._user ? <Redirect to={{ pathname: "/ballots" }} /> : <EntryPage />}
                                    </Route>
                                </Switch>
                            </Box>
                        )}
                    </Paper>

                    <BackdropProgress open={elekton._user === undefined} />
                </ElektonContext.Provider>
            </ThemeProvider>
        </ThemeTypeContext.Provider>
    )
}
