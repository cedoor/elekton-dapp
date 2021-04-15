import React from "react"
import {
    Box,
    Chip,
    createStyles,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    makeStyles,
    Theme
} from "@material-ui/core"
import ListAltIcon from "@material-ui/icons/ListAlt"
import AddIcon from "@material-ui/icons/Add"

export interface DynamicListProps {
    label: string
    items?: string[]
    onChange?: (proposals: string[]) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        items: {
            textAlign: "left"
        },
        item: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    })
)

export default function DynamicList({ label, items, onChange }: DynamicListProps) {
    const classes = useStyles()
    const [_inputValue, setInputValue] = React.useState<string>("")
    const [_items, setItems] = React.useState<string[]>(items || [])

    function addItem(item: string) {
        if (item) {
            const newItems = [..._items, item]

            setItems(newItems)
            setInputValue("")
            onChange && onChange(newItems)
        }
    }

    function deleteItem(item: string) {
        const newItems = _items.slice()

        newItems.splice(newItems.indexOf(item), 1)

        setItems(newItems)
        onChange && onChange(newItems)
    }

    return (
        <FormControl margin="dense">
            <InputLabel>{label}</InputLabel>
            <Input
                value={_inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyPress={(event) => event.code === "Enter" && addItem(_inputValue)}
                startAdornment={
                    <InputAdornment position="start">
                        <ListAltIcon color="action" />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => addItem(_inputValue)}
                            onMouseDown={(event) => event.preventDefault()}
                        >
                            <AddIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
            <Box className={classes.items}>
                {_items.map((item: string, i: number) => (
                    <Chip
                        className={classes.item}
                        key={i}
                        onDelete={() => deleteItem(item)}
                        size="small"
                        label={item}
                        variant="outlined"
                    />
                ))}
            </Box>
        </FormControl>
    )
}
