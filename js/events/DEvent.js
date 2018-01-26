/**
 * 事件基类
 */
export default class DEvent {

    static OPSTYPE = {
        ADD: 1,
        REMOVE: 2
    }

    static TOUCHSTART = 'touchstart'
    static TOUCHMOVE = 'touchmove'
    static TOUCHEND = 'touchend'

    static ONFRAME = 'onframe'
    constructor() {
        this.type = 'DEvent'
        /**
         * 循环帧事件列表
         */
        this.frameList = []
        /**
         * touch事件列表
         */
        this.touchEventList = []
    }
    addEventListener(type, listener) {
        this.handleEvent(type, listener, DEvent.OPSTYPE.ADD)
    }
    removeEventListener(type, listener) {
        this.handleEvent(type, listener, DEvent.OPSTYPE.REMOVE)

    }
    handleEvent(type, listener, opstype) {
        let list
        switch (type) {
            case DEvent.TOUCHSTART:
            case DEvent.TOUCHMOVE:
            case DEvent.TOUCHEND:
                list = this.touchEventList
                break
            case DEvent.ONFRAME:
                list = this.frameList
                break
        }
        switch (opstype) {
            case DEvent.OPSTYPE.ADD:
                this._addEvent(type, listener, list)
                break
            case DEvent.OPSTYPE.REMOVE:
                this._removeEvent(type, listener, list)
                break
        }
    }
    _addEvent(type, listener, list) {
        list.push({
            listener: listener,
            type: type
        })
    }
    _removeEvent(type, listener, list) {
        for (let [index, obj] of list.entries()) {
            if (obj.type === type && obj.listener === listener) {
                list.splice(index, 1)
                return
            }
        }
    }
}