import Tween from './Tween'
/**
 * 动画类,维护自身的动画 和 循环
 */
export default class TweenAnimation {
    static Tween = Tween
    static Easing = Tween
    constructor(_target, _duration, _vars) {
        this.tweenId = DGlobal.getUniqueId() // 实例id
        this.queues = [] // 待执行动画队列
        this.init()
    }
    /**
     * 初始化属性值,初始化队列里的值
     */
    init(_target = null, _duration = 1, _vars = {}) {
        /**
         * vars = {
         *      xx: xxx,
         *      delay: 0,
         *      onStart: () => {},
         *      onProgress: () => {},
         *      onComplete: () => {}
         * }
         */
        this.stop = false

        this.target = _target
        this.vars = _vars
        this.duration = _duration
        this.currentTime = 0
        this.delayTime = 0
        this.ease = Tween.Linear
        this.onStart = () => { }
        this.onProgress = () => { }
        this.onComplete = () => { }
        this.varsFrom = {}
        this.varsTo = {}
        this.varsChange = {}
        if (_vars.delay && _vars.delay > 0) {
            this.delay = _vars.delay
            this.currentTime = this.currentTime - this.delay
        }
        if (_vars.ease && isFn(_vars.ease)) {
            this.ease = _vars.ease
        }
        if (isFn(_vars.onStart)) {
            this.onStart = _vars.onStart
        }
        if (isFn(_vars.onProgress)) {
            this.onProgress = _vars.onProgress
        }
        if (isFn(_vars.onComplete)) {
            this.onComplete = _vars.onComplete
        }
        for (let key in _vars) {
            let p = this._filterTargetPropery(key)
            if (p) {
                this.varsFrom[p] = this.target[p]
                this.varsTo[p] = _vars[p]
                this.varsChange[p] = this.varsTo[p] - this.varsFrom[p]
            }
        }
        return this
    }

    _filterTargetPropery(p) {
        if (p !== 'delay' || p !== 'onStart' || p !== 'onProgress' || p !== 'onComplete' || p !== 'loop') {
            return p
        }
        return false
    }
    /**
     * 执行动画函数
     */
    tween() {
        /**
         * 停止播放
         */
        if (this.stop) {
            return
        }
        /**
         * 累计 时间轴刻度值
         */
        this.currentTime += DGlobal.speed
        if (this.currentTime > this.duration) {
            this.currentTime = this.duration
        }
        // 动画延迟，还没开始
        if (this.currentTime < 0) {
            return false
        }
        if (this.onStart) {
            this.onStart()
            this.onStart = null
        }
        for (let p in this.varsTo) {
            this.target[p] = this.ease(this.currentTime, this.varsFrom[p], this.varsChange[p], this.duration)
        }
        this.onProgress()
        /**
         * 一个动画运行结束返回true，进入keep队列
         */
        if (this.currentTime >= this.duration) {
            this.onComplete()
            return true
        }
        return false
    }
    /**
     * 循环队列函数
     */
    keep() {
        if (this.queues.length > 0) {
            let tween = this.queues.shift()
            if (tween.vars.loop) {
                let _d = {}
                for (let key in tween.vars) {
                    let p = this._filterTargetPropery(key)
                    if (p) {
                        if (tween.targetData) {
                            tween.target[p] = tween.targetData[p]
                            continue
                        }
                        _d[p] = tween.target[p]
                    }
                }
                if (!tween.targetData) {
                    tween.targetData = _d
                }
                this.to(tween.target, tween.duration, tween.vars, tween.targetData)
            }
            this.init(tween.target, tween.duration, tween.vars)
            return true
        }
        return false
    }
    /**
     * 添加动画到队列
     * @param {*} _target 
     * @param {*} _duration 
     * @param {*} _vars 
     */
    to(_target = null, _duration = 1, _vars = {}, _data = null) {
        if (_target) {
            this.queues.push({
                target: _target,
                duration: _duration,
                vars: _vars,
                targetData: _data
            })
        }
        return this
    }
    pause() {
        this.stop = true
        return this
    }
    resume() {
        this.stop = false
        return this
    }
}

function isFn(f) {
    return typeof f === 'function'
}