export default function delay(milliseconds = 100): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds)
    })
}
