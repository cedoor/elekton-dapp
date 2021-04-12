export default function downloadSVG(svg: Element, options: Options) {
    const padding = options.padding || 0
    const backgroundColor = options.backgroundColor || "#ffffff"
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()

    img.onload = () => {
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        if (context) {
            canvas.width = img.width + padding * 2
            canvas.height = img.height + padding * 2
            context.drawImage(img, padding, padding)
            context.globalCompositeOperation = "destination-over"
            context.fillStyle = backgroundColor
            context.fillRect(0, 0, canvas.width, canvas.height)

            const pngFile = canvas.toDataURL("image/png")
            const downloadLink = document.createElement("a")

            downloadLink.download = options.fileName
            downloadLink.href = `${pngFile}`
            downloadLink.click()
            downloadLink.remove()
        }
    }

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
}

export interface Options {
    fileName: string
    backgroundColor?: string
    padding?: number
}
