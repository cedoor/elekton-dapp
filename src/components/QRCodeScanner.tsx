// @ts-ignore
import QrReader from "react-qr-scanner"
import { Dialog } from "@material-ui/core"

export interface QRCodeScannerProps {
    open: boolean
    onScan: (value: string) => void
    onClose?: () => void
}

export default function QRCodeScanner({ open, onScan, onClose }: QRCodeScannerProps) {
    function handleScan(data: any) {
        if (data) {
            onScan(data.text)
        }
    }

    function handleError(err: any) {
        console.error(err)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <QrReader delay={100} onScan={handleScan} onError={handleError} facingMode="rear" />
        </Dialog>
    )
}
