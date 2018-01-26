export default class Graphics {
    constructor() {
        this.type = 'Graphics'
        this.visible = true
        this.hasDrawRoundeRect = false
    }
    show() {
        if (!this.visible) {
            return
        }
        if (this.hasDrawRoundeRect) {
            this.drawRoundeRect()
        }
    }
    drawRoundeRect(cornerX, cornerY, width, height, cornerRadius, fillStyle, strokeStyle, lineWidth) {
        this.hasDrawRoundeRect = true
        ctx.beginPath()

        ctx.moveTo(cornerX + cornerRadius, cornerY)
        ctx.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius)
        ctx.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius)
        ctx.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius)
        ctx.arcTo(cornerX, cornerY, cornerX + width, cornerY, cornerRadius)

        ctx.fillStyle = fillStyle
        ctx.strokeStyle = strokeStyle
        ctx.lineWidth = lineWidth || 2
        strokeStyle && ctx.stroke()
        ctx.fill()
    }
}