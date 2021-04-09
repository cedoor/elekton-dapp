import React from "react"

export default function useBooleanCondition(state: boolean = false): [boolean, () => void] {
    const [_condition, setCondition] = React.useState<boolean>(state)

    function toggleCondition() {
        setCondition(!_condition)
    }

    return [_condition, toggleCondition]
}
