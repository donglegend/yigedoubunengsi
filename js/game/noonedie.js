import Sprite from '../base/sprite'
import BitMapData from '../display/bitmapdata'
import BitMap from '../display/bitmap'
import Button from '../display/button'
import DEvent from '../events/DEvent'
import DtouchEvent from '../events/DtouchEvent'
import TweenLite from '../transition/TweenLite'
// import Tween from '../transition/Tween'
import Text from '../display/text'
import FrameAnimation from '../display/frameAnimation'
export default class NoOneDie {
    constructor() {
        this.type = 'NoOneDie'
        /**
         * 游戏准备
         */
        this.backLayer = null // 初始页面层
        this.titleLayer = null
        this.lineLayer0 = null
        this.lineLayer1 = null
        this.btnLayer = null
        this.tweenLite = null

        /**
         * 开始游戏
         */
        this.startLayer = null

        this._init()
    }
    _init() {
        this.initGame()
    }
    /**
     * 初始化 Tweenlite动画类
     */
    initTweenLite() {
        this.tweenLite = new TweenLite()
        DGlobal.addChild(this.tweenLite)
    }
    /**
     * 初始化游戏
     */
    initGame() {
        this.initTweenLite()
        // this.gameReady()
        this.gameStart()
        // this.initEvent()
    }
    /**
     * 初始化事件
     */
    initEvent() {
        const self = this
        this.btnLayer.addEventListener(DtouchEvent.TOUCHEND, this.selectGameLevel.bind(this))
    }
    /**
     * 选择游戏难度开始游戏
     */
    selectGameLevel(e) {
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
        this.tweenLite.to(this.backLayer, 600, {
            x: WINDOWWIDTH,
            ease: TweenLite.Tween.Back.easeInOut,
            onComplete: () => {
                this.backLayer.visible = false
                this.gameStart()
            }
        })
    }

    /**
     * 游戏主体部分
     */
    gameStart() {
        this.startLayer = new Sprite()
        DGlobal.addChild(this.startLayer)

        this.pathLayer = new Sprite()
        this.startLayer.addChild(this.pathLayer)

        let a = new FrameAnimation(this.pathLayer, new BitMapData(resultList['Animation']), 2, 3)
        console.log(a)
    }

    /**
     * 游戏准备
     */
    gameReady() {
        this.backLayer = new Sprite()
        DGlobal.addChild(this.backLayer)
        this.drawTitle()
        this.drawBtnLayer()
        this.drawLine()

        this.backLayer.x = -WINDOWWIDTH
        this.tweenLite.to(this.backLayer, 600, {
            x: 0,
            ease: TweenLite.Tween.Back.easeInOut
        })
    }
    /**
     * 开始页面组件
     */
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
    /**
     * 初始页面title
     */
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
    /**
     * 初始页面线条
     */
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
        let test = new Sprite()
        test.alpha = 0.8
        DGlobal.addChild(test)
        let btn = new Button()
        btn.width = 100
        btn.height = 100
        btn.roundeRect.radius = 20
        test.addChild(btn)
        test.addEventListener(DtouchEvent.TOUCHEND, e => {
            let p = e.changedTouches[0]
            console.log(p.pageY)
        })

        btn.run = () => {
            this.btnTween = this.tweenLite
                .to(btn, 500, {
                    x: 275,
                    ease: TweenLite.Tween.Circ.easeIn
                })
                .to(btn, 500, {
                    y: 560,
                    ease: TweenLite.Tween.Sine.easeIn
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
