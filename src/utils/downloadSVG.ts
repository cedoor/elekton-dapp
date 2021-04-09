export default function downloadSVG(svg: Element) {
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (ctx) {
        const img = new Image()
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            const pngFile = canvas.toDataURL("image/png")
            const downloadLink = document.createElement("a")
            downloadLink.download = "QRCode"
            downloadLink.href = `${pngFile}`
            downloadLink.click()
            downloadLink.remove()
        }
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
    }
}
