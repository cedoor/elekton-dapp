import {
    createStyles,
    makeStyles,
    Drawer,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    Button,
    useTheme
} from "@material-ui/core"
import React from "react"
import ElektonContext, { ElektonContextType } from "../context/ElektonContext"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import useBooleanCondition from "../hooks/useBooleanCondition"
import QRCodeViewer from "./QRCodeViewer"
import downloadSVG from "../utils/downloadSVG"

export interface SidebarProps {
    open: boolean
    onClose?: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250
        },
        userInformation: {
            padding: theme.spacing(2)
        }
    })
)

export default function Sidebar({ open, onClose }: SidebarProps) {
    const classes = useStyles()
    const theme = useTheme()
    const elekton = React.useContext(ElektonContext) as ElektonContextType
    const [_QRCodeViewer, openQRCodeViewer, closeQRCodeViewer] = useBooleanCondition()

    function downloadQRCode() {
        const svg = document.querySelector("#qr-code > svg") as Element

        downloadSVG(svg, {
            fileName: "AccessKey",
            padding: 15,
            backgroundColor: theme.palette.background.paper
        })

        closeQRCodeViewer()
    }

    function signOut() {
        elekton.signOut()

        onClose && onClose()
    }

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <div className={classes.list} role="presentation">
                <div className={classes.userInformation}>
                    <Typography variant="body1">{elekton._user?.name + " " + elekton._user?.surname}</Typography>
                    <Typography variant="caption">{elekton._user?.address.substr(0, 20)}...</Typography>
                </div>
                <Divider />
                <List>
                    <ListItem onClick={openQRCodeViewer} button>
                        <ListItemIcon>
                            <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Access key" />
                    </ListItem>
                    <ListItem onClick={signOut} button>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign out" />
                    </ListItem>
                </List>
            </div>

            <QRCodeViewer
                open={_QRCodeViewer}
                onClose={closeQRCodeViewer}
                title="Access key"
                message="Download the QR code of your access key!"
                value={elekton._user?.privateKey + "," + elekton._user?.voterPrivateKey}
            >
                <Button onClick={downloadQRCode}>Download</Button>
            </QRCodeViewer>
        </Drawer>
    )
}
