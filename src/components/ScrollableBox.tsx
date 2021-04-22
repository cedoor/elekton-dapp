import { createStyles, makeStyles, Box } from "@material-ui/core"

export interface ScrallableBoxProps {
    children: React.ReactElement
}

const useStyles = makeStyles(() =>
    createStyles({
        box: {
            overflowY: "auto",
            height: "100vh"
        }
    })
)

export default function ScrollableBox({ children }: ScrallableBoxProps) {
    const classes = useStyles()

    return <Box className={classes.box}>{children}</Box>
}
