import Graphics from './graphics'
import BitMapData from './bitmapdata'
/**
 * bitmap 图片显示类
 */
export default class BitMap extends Graphics {
    constructor(src = '', sx = 0, sy = 0, sw = 0, sh = 0, width = 0, height = 0, x = 0, y = 0) {
        super()
        this.type = 'BitMap'
        if (!(src instanceof BitMapData)) {
            this.img = new Image()
            this.img.src = src
        } else {
            this.img = src.data
        }
        this.bitMapData = src.data
        this.width = width === 0 ? this.img.width : width
        this.height = height === 0 ? this.img.height : height

        this.x = x
        this.y = y

        this.sx = sx
        this.sy = sy

        this.sw = sw === 0 ? this.img.width : sw
        this.sh = sh === 0 ? this.img.height : sh

        this.dx = 0
        this.dy = 0

        this.visible = true
    }
    show() {
        if (!this.visible) {
            return
        }
        this.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height)
        // let _parent = this.parent, list = [], dx = 0, dy = 0
        // while (_parent) {
        //     list.push(_parent)
        //     _parent = _parent.parent
        // }
        // list.forEach((item, index) => {
        //     dy += item.y
        //     dx += item.x
        // })
        // this.dx = dx
        // this.dy = dy
        // ctx.save()
        // ctx.translate(dx, dy)
        // ctx.restore()
    }
    drawImage(img, sx, sy, sw, sh, x, y, width, height) {
        ctx.drawImage(
            img,
            sx,
            sy,
            sw,
            sh,
            x,
            y,
            width,
            height
        )
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