import React from "react"

export default function useBooleanCondition(state: boolean = false): [boolean, () => void, () => void] {
    const [_condition, setCondition] = React.useState<boolean>(state)

    function turnOnCondition() {
        setCondition(true)
    }

    function turnOffCondition() {
        setCondition(false)
    }

    return [_condition, turnOnCondition, turnOffCondition]
}
