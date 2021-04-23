import { Box, Container, createStyles, makeStyles } from "@material-ui/core"
import { ReactNode } from "react"

export interface ScrollableContainerProps {
    children?: ReactNode
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
            flexDirection: "column",
            flex: 1
        }
    })
)

export default function ScrollableContainer({ children, className, maxWidth }: ScrollableContainerProps) {
    const classes = useStyles()

    return (
        <Box className={classes.box}>
            <Container className={classes.container + " " + className} maxWidth={maxWidth || "sm"}>
                {children || false}
            </Container>
        </Box>
    )
}
