import Sprite from '../base/sprite'
import BitMapData from '../display/bitmapdata'
import BitMap from '../display/bitmap'
import Button from '../display/button'
import DEvent from '../events/DEvent'
import DtouchEvent from '../events/DtouchEvent'
import TweenLite from '../transition/TweenLite'
// import Tween from '../transition/Tween'
export default class NoOneDie {
    constructor() {
        this.type = 'NoOneDie'
        this.backLayer = null
        this.titleLayer = null
        this.lineLayer0 = null
        this.lineLayer1 = null
        this.btnLayer = null
        this.tweenLite = null
        this._init()
    }
    _init() {
        this.initTweenLite()
        this.test()
        this.initGame()
    }

    initTweenLite() {
        this.tweenLite = new TweenLite()
        DGlobal.addChild(this.tweenLite)
    }
    initGame() {
        this.backLayer = new Sprite()
        DGlobal.addChild(this.backLayer)
        this.drawTitle()
        this.drawBtnLayer()
        this.drawLine()

        this.initEvent()
    }
    initEvent() {
        const self = this
        this.btnLayer.addEventListener(DtouchEvent.TOUCHEND, function (e) {
            if (self.btnTween.stop) {
                self.btnTween.resume()
            } else {
                self.btnTween.pause()
            }
            switch (e.currentTarget.id) {
                case 0:
                    console.log('普通')
                    break
                case 1:
                    console.log('噩梦')
                    break
                case 2:
                    console.log('地狱')
                    break
                case 3:
                    console.log('炼狱')
                    break
            }
        })
    }
    drawBtnLayer() {
        this.btnLayer = new Sprite()
        this.btnLayer.y = this.titleLayer.y + this.titleLayer.height + 40
        this.btnLayer.height = 264
        this.backLayer.addChild(this.btnLayer)

        let btns = ['tubiao00_cn', 'tubiao01_cn', 'tubiao02_cn', 'tubiao03_cn']
        btns.forEach((btn, index) => {
            let btnMap = new BitMap(new BitMapData(resultList[btn]))
            btnMap.id = index
            btnMap.width = 120
            btnMap.height = 36
            btnMap.x = (WINDOWWIDTH - btnMap.width) * 0.5
            btnMap.y = (btnMap.height + 20) * index
            this.btnLayer.addChild(btnMap)
        })
    }
    drawTitle() {
        this.titleLayer = new BitMap(new BitMapData(resultList['title_cn']))
        let titleLayer = this.titleLayer
        let _w = WINDOWWIDTH * 0.8
        let _h = _w / titleLayer.width * titleLayer.height
        titleLayer.width = _w
        titleLayer.height = _h
        titleLayer.x = (WINDOWWIDTH - _w) * 0.5
        titleLayer.y = 40
        this.backLayer.addChild(titleLayer)
    }
    drawLine() {
        for (let i = 0; i < 2; i++) {
            this['lineLayer' + i] = _drawLine()
            this.backLayer.addChild(this['lineLayer' + i])
        }
        this.lineLayer0.y = this.titleLayer.y + this.titleLayer.height
        this.lineLayer1.y = this.btnLayer.y + this.btnLayer.height
        function _drawLine() {
            let lineLayer = new BitMap(new BitMapData(resultList['xian']))
            let _w = WINDOWWIDTH
            let _h = _w / lineLayer.width * lineLayer.height
            lineLayer.width = _w
            lineLayer.height = _h
            lineLayer.x = 0
            lineLayer.y = 0
            return lineLayer
        }
    }


    test() {
        let test = new Sprite
        test.alpha = 0.8
        DGlobal.addChild(test)
        let btn = new Button()
        btn.width = 100
        btn.height = 100
        btn.roundeRect.radius = 20;
        test.addChild(btn)
        test.addEventListener(DtouchEvent.TOUCHEND, (e) => {
            let p = e.changedTouches[0]
            console.log(p.pageY)
        })

        btn.run = () => {
            this.btnTween = this.tweenLite.to(btn, 500, {
                x: 275,
                ease: TweenLite.Tween.Circ.easeIn
            })
                .to(btn, 500,
                {
                    y: 560,
                    ease: TweenLite.Tween.Sine.easeIn,
                })
                .to(btn, 100, { x: 0 })
                .to(btn, 500, {
                    y: 0,
                    onComplete: () => {
                        btn.run()
                    }
                })
        }
        btn.run()
    }
}