import React from "react"
import { createStyles, Dialog, makeStyles } from "@material-ui/core"
import decodeQRcode from "../utils/decodeQRcode"
import delay from "../utils/delay"

export interface QRCodeScannerProps {
    open: boolean
    onScan: (value: string) => void
    onClose?: () => void
}

const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            backgroundColor: "transparent",
            boxShadow: "none"
        }
    })
)

export default function QRCodeScanner({ open, onScan, onClose }: QRCodeScannerProps) {
    const classes = useStyles()
    const videoRef = React.createRef<HTMLVideoElement>()
    const streamRef = React.useRef<MediaStream>()

    async function scanQRCode() {
        const stream = (streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        }))

        if (videoRef.current) {
            let code = null

            videoRef.current.srcObject = stream
            videoRef.current.setAttribute("playsinline", "true")
            videoRef.current.play()

            while (stream.active && (!code || !code.data)) {
                code = decodeQRcode(videoRef.current)
                await delay()
            }

            if (code) {
                stopVideoStream()
                onScan(code.data)
            }
        } else {
            stopVideoStream()
        }
    }

    async function stopVideoStream() {
        if (streamRef.current) {
            for (const track of streamRef.current.getTracks()) {
                track.stop()
            }
        }
    }

    function stopScanning() {
        stopVideoStream()
        onClose && onClose()
    }

    return (
        <Dialog classes={{ paper: classes.paper }} open={open} onClose={stopScanning} onEntered={scanQRCode}>
            <video ref={videoRef} />
        </Dialog>
    )
}
