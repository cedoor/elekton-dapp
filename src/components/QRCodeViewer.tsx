import QRCode from "react-qr-code"
import {
    createStyles,
    makeStyles,
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
    Theme,
    IconButton,
    useTheme,
    useMediaQuery,
    DialogTitle
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

export interface QRCodeViewerProps {
    title: string
    message: string
    value: string
    open: boolean
    onClose?: () => void
    children: React.ReactElement[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        closeButton: {
            position: "absolute",
            right: theme.spacing(2),
            top: theme.spacing(1)
        },
        dialogTitle: {
            textAlign: "center"
        },
        dialogContent: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.up("sm")]: {
                width: "300px"
            }
        },
        dialogMessage: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            textAlign: "center",
            width: "256px"
        }
    })
)

export default function QRCodeViewer({ title, message, value, open, onClose, children }: QRCodeViewerProps) {
    const fullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))
    const theme = useTheme()
    const classes = useStyles()

    return (
        <Dialog open={open} fullScreen={fullScreen} onClose={onClose}>
            <DialogTitle className={classes.dialogTitle} disableTypography>
                <Typography variant="h6">{title}</Typography>
                {onClose ? (
                    <IconButton className={classes.closeButton} edge="end" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <span id="qr-code">
                    <QRCode
                        bgColor="transparent"
                        fgColor={theme.palette.type === "dark" ? "white" : "black "}
                        value={value}
                    />
                </span>
                <Typography className={classes.dialogMessage} variant="body1">
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>{children}</DialogActions>
        </Dialog>
    )
}
