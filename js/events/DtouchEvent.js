import DEvent from './DEvent'
/**
 * canvas 触摸事件
 */
export default class TouchEvent extends DEvent {
    constructor() {
        super()
        this.type = 'TouchEvent'
    }
    static init() {
        canvas.addEventListener(super.TOUCHSTART, ((e) => {
            e.preventDefault()
            TouchEvent.dispatchEvent(e, super.TOUCHSTART)
        }).bind(this))

        canvas.addEventListener(super.TOUCHMOVE, ((e) => {
            e.preventDefault()
            TouchEvent.dispatchEvent(e, super.TOUCHMOVE)
        }).bind(this))

        canvas.addEventListener(super.TOUCHEND, ((e) => {
            e.preventDefault()
            TouchEvent.dispatchEvent(e, super.TOUCHEND)
        }).bind(this))
    }
    static dispatchEvent(e, type) {
        for (let child of DGlobal.childList) {
            if (typeof child.touchEvent === 'function') {
                child.touchEvent(e, type)
            }
        }
    }
}