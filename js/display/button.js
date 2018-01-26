// import Graphics from './graphics'
import BitMap from './bitmap'
import BitMapData from './bitmapdata'
/**
 * 简单的button类
 */
export default class Button extends BitMap {
    constructor() {
        super()
        this.type = 'Button'
        this.text = ''
        this.bgBitMapData = ''
        this.bg = null

        this.x = 0
        this.y = 0
        this.width = 100
        this.height = 40
        this.roundeRect = {
            radius: 20,
            fillStyle: 'black',
            strokeStyle: '',
            lineWidth: 2
        }
        this.disable = false

        this.visible = true
    }
    show() {
        if (!this.visible) return

        if (this.isBitMapData(this.bgBitMapData)) {
            this.bg = this.bgBitMapData.data
            this.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, this.x, this.y, this.width, this.height)
        } else {
            this.drawRoundeRect(this.x, this.y, this.width, this.height, this.roundeRect.radius, this.roundeRect.fillStyle, this.roundeRect.strokeStyle, this.roundeRect.lineWidth)
        }
    }

    isBitMapData(item) {
        return item instanceof BitMapData
    }
    istouchon(event, type) {
        if (!this.visible) {
            return false
        }
        let _point = event.changedTouches[0],
            _pageX = DGlobal.getScaleX(_point.pageX),
            _pageY = DGlobal.getScaleY(_point.pageY)
        let _parent = this.parent
        if (_pageX > _parent.dx + this.x && _pageX < _parent.dx + this.x + this.width && _pageY > _parent.dy + this.y && _pageY < _parent.dy + this.y + this.height) {
            return true
        }
        return false
    }
}