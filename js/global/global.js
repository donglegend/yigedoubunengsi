window.ctx = canvas.getContext('2d')
window.systemInfo = wx.getSystemInfoSync()
window.WINDOWWIDTH = systemInfo.windowWidth
window.WINDOWHEIGHT = systemInfo.windowHeight

class DGlobal {

    static requestAnimationFrameId = null

    static width = 375
    static height = 667
    static scaleX = WINDOWWIDTH / DGlobal.width
    static scaleY = WINDOWHEIGHT / DGlobal.height

    static speed = 1000 / 60
    static stepIndex = 0
    static step = 0

    static childList = []

    static screen() {
        canvas.width = DGlobal.width
        canvas.height = DGlobal.height
    }
    static getScaleX(v) {
        return v / DGlobal.scaleX
    }
    static getScaleY(v) {
        return v / DGlobal.scaleY
    }
    static loop() {
        if (DGlobal.stepIndex++ >= DGlobal.step) {
            DGlobal._render()
            DGlobal.stepIndex = 0
        }
        DGlobal.requestAnimationFrameId = window.requestAnimationFrame(DGlobal.loop)
    }
    static addChild(sprite) {
        DGlobal.childList.push(sprite)
    }
    static _render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        DGlobal.childList.forEach((item, index) => {
            item.show()
        })
    }
    static getUniqueId(len) {
        let idStr = Date.now().toString(36)
        idStr += Math.random().toString(36).substr(2, len || 5)
        return idStr
    }
    static setFrameRate(number) {
        wx.setPreferredFramesPerSecond(number)
        DGlobal.speed = 1000 / number
    }
    static pause() {
        window.cancelAnimationFrame(DGlobal.requestAnimationFrameId)
    }
    static resume() {
        DGlobal.loop()
    }
}
window.DGlobal = DGlobal

export default DGlobal