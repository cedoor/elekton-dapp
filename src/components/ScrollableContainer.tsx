import { Box, Container, createStyles, makeStyles } from "@material-ui/core"

export interface ScrollableContainerProps {
    children?: React.ReactElement | React.ReactElement[]
    className?: string
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

const useStyles = makeStyles(() =>
    createStyles({
        box: {
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            height: "100vh",
            width: "100vw"
        },
        container: {
            display: "flex",
            flexDirection: "column"
        }
    })
)

export default function ScrollableContainer({ children, className, maxWidth }: ScrollableContainerProps) {
    const classes = useStyles()

    return (
        <Box className={classes.box + " " + className}>
            <Container className={classes.container} maxWidth={maxWidth || "sm"}>
                {children || false}
            </Container>
        </Box>
    )
}
