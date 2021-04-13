import jsQR, { QRCode } from "jsqr"

export default function decodeQRcode(video: HTMLVideoElement): QRCode | null {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d") as CanvasRenderingContext2D

        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

        return jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert"
        })
    }

    return null
}
