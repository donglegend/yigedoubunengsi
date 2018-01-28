/**
 * 文本类
 */
export default class Text {
    constructor(txt) {
        this.text = txt || ''

        this.font = 'Arial'
        this.size = 14
        this.color = '#000000'
        this.weight = 'normal'
        this.style = 'normal'
        this.textAlign = 'left'
        this.textBaseline = 'top'

        this.linenums = 1
        this.linewords = Math.floor(this.width / this.size)

        this.width = 375
        this.height = this.size
        this.lineHeight = this.size * 1.2
    }
    /**
     * 设置文本样式
     */
    showBefore() {
        ctx.font = `${this.style} ${this.weight} ${this.size}px ${this.font}`
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline
        ctx.fillStyle = this.color

        // this.linewords = Math.floor(this.width / this.size)

        // this.linenums = Math.ceil(ctx.measureText(this.text).width / this.width)

        this.lineHeight = this.size * 1.2

        // this.height = this.linenums * this.lineHeight
    }
    /**
     * 每个显示类的 show函数
     */
    show() {
        const self = this
        this.showBefore()

        let r = this.breakLinesForCanvas(this.text, this.width, ctx)
        this.linenums = r.length
        this.height = this.linenums * this.lineHeight
        r.forEach(function(line, index) {
            ctx.fillText(line, 0, self.lineHeight * index)
        })

        // let i = 0,     j = 0 if (this.text.length <= this.linewords) {
        // ctx.fillText(this.text, 0, 0, this.width) } else {     while (i <
        // this.text.length) {         ctx.fillText(this.text.substr(i, this.linewords),
        // 0, this.lineHeight * j)         j++;         i += this.linewords     } }
    }

    breakLinesForCanvas(text, width, context) {
        let breakPoint = 0
        let result = []
        while ((breakPoint = this.findBreakPoint(text, width, context)) !== -1) {
            result.push(text.substr(0, breakPoint))
            text = text.substr(breakPoint)
        }

        if (text) {
            result.push(text)
        }
        return result
    }
    /**
     * 二分查找法
     */
    findBreakPoint(text, width, context) {
        let min = 0
        let max = text.length - 1

        while (min <= max) {
            var middle = Math.floor((min + max) / 2)
            var middleWidth = context.measureText(text.substr(0, middle)).width
            var oneCharWiderThanMiddleWidth = context.measureText(text.substr(0, middle + 1)).width
            if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
                return middle
            }
            if (middleWidth < width) {
                min = middle + 1
            } else {
                max = middle - 1
            }
        }

        return -1
    }
}
