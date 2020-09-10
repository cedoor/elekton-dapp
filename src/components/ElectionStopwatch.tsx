import { Colors, ProgressBar } from "react-native-paper"
import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"

type Props = {
    startDate: number
    endDate: number
}

export default function ElectionStopwatch ({ startDate, endDate }: Props) {
    const [_stopwatch, setStopwatch] = useState<number>(Date.now() - startDate)
    const now = Date.now()

    useEffect(() => {
        if (now < startDate || now > endDate) {
            return
        }

        const timerID = setTimeout(() => {
            setStopwatch(now - startDate)
        }, 1000)

        // Clear timeout if the component is unmounted.
        return () => clearTimeout(timerID)
    })

    return now < startDate || now > endDate ? null : (
        <ProgressBar
            style={styles.timer}
            progress={_stopwatch / (endDate - startDate)}
            color={_stopwatch / (endDate - startDate) < 0.8 ? Colors.green800 : Colors.red800}
        />
    )
}

const styles = StyleSheet.create({
    timer: {
        marginHorizontal: 16,
        marginBottom: 16
    }
})
