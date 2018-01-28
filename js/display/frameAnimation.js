import BitMap from './bitmap'
import Sprite from '../base/sprite'
export default class FrameAnimation extends Sprite {
    constructor(player, bitmapdata, rows, cols, width = null, height = null) {
        super()
        this.player = player
        this.src = bitmapdata
        this.bitmapdata = bitmapdata.data
        this.imgwidth = this.bitmapdata.width
        this.imgheight = this.bitmapdata.height
        this.rows = rows
        this.cols = cols

        this.width = width || this.imgwidth / this.cols
        this.height = height || this.imgheight / this.rows

        this.actions = []

        this.stepIndex = 0
        this.step = 20

        this.init()
    }
    init() {
        this.actions = this.divideCoordinate(this.imgwidth, this.imgheight, this.rows, this.cols)
        this.currentBitMap = new BitMap(
            this.src,
            0,
            0,
            this.imgwidth / this.cols,
            this.imgheight / this.rows,
            0,
            0,
            this.width,
            this.height
        )
        this.addChild(this.currentBitMap)
        this.player.addChild(this)

        let _i = 0
        this.addEventListener('onframe', () => {
            if (++this.stepIndex < this.step) {
                return
            }
            this.stepIndex = 0
            if (++_i > 2) {
                _i = 0
            }
            let frame = this.actions[0][_i]
            this.currentBitMap.sx = frame.x
            this.currentBitMap.sy = frame.y
        })
    }
    // show() {
    //     let frame = this.actions[0][1]
    //     // console.log(frame)
    //     this.currentBitMap.sx = frame.x
    //     this.currentBitMap.sy = frame.y
    // }
    drawImage(img, o) {
        ctx.drawImage(img, o.sx, o.sy, o.sw, o.sh, o.x, o.y, o.width, o.height)
    }
    divideCoordinate(w, h, rows, cols) {
        let i,
            j,
            cw = w / cols,
            ch = h / rows,
            r = [],
            c
        for (i = 0; i < rows; i++) {
            c = []
            for (j = 0; j < cols; j++) {
                c.push({ x: cw * j, y: ch * i, width: cw, height: ch })
            }
            r.push(c)
        }
        return r
    }
}
