import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import Typography from "@material-ui/core/Typography"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import QRCode from "react-qr-code"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { createStyles, Theme, useMediaQuery } from "@material-ui/core"

export interface QRCodeProps {
    title: string
    message: string
    value: string
    open: boolean
    children: React.ReactElement[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogTitle: {
            textAlign: "center"
        },
        dialogContent: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "320px"
        },
        dialogMessage: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            width: "256px"
        }
    })
)

export default function QRCodeDialog({ title, message, value, open, children }: QRCodeProps) {
    const fullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))
    const classes = useStyles()

    return (
        <Dialog open={open} fullScreen={fullScreen}>
            <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <span id="qr-code">
                    <QRCode value={value} />
                </span>
                <Typography className={classes.dialogMessage} variant="body1">
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>{children}</DialogActions>
        </Dialog>
    )
}
