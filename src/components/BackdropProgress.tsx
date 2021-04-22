import { createStyles, makeStyles, Theme, Backdrop, CircularProgress } from "@material-ui/core"

export interface BackdropProgressProps {
    open: boolean
    onClose?: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff"
        }
    })
)

export default function BackdropProgress({ open, onClose }: BackdropProgressProps) {
    const classes = useStyles()

    return (
        <Backdrop className={classes.backdrop} open={open} onClick={onClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
