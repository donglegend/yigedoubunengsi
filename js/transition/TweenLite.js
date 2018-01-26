import Tween from './Tween'
import TweenAnimation from './TweenAnimation'
/**
 * TweenAnimation管理类
 */
export default class TweenLite {
    static Tween = Tween
    static Easing = Tween
    constructor() {
        this.type = 'TweenLite'
        this.tweens = []
    }
    /**
     * 维护每个 TweenAnimation 实例的 运行和循环
     */
    show() {
        let i, length = this.tweens.length, t
        for (i = 0; i < length; i++) {
            t = this.tweens[i]
            if (t && t.tween()) {
                this.tweens.splice(i, 1)
                i--
                length = this.tweens.length
                // 是否需要 循环运动,需要的话，加入下一次 循环队列
                if (t.keep()) {
                    this._add(t)
                }
            }
        }
    }
    /**
     * 直接添加动画
     */
    to(_target, _duration, _vars) {
        let tween = new TweenAnimation(null, 1, {})
        this.tweens.push(tween)
        tween.to(_target, _duration, _vars)
        return tween
    }
    /**
     * 添加循环的 TweenAnimation 实例，不对外提供 
     * @param {*} tween 
     */
    _add(tween) {
        this.tweens.push(tween)
    }
    /**
     * 移除 TweenAnimation 实例
     * @param {*} tween 
     */
    remove(tween) {
        if (!tween) {
            return null
        }
        for (let [i, t] of this.tweens.entries()) {
            if (t.tweenId === tween.tweenId) {
                return this.tweens.splice(i, 1)
            }
        }
        return null
    }
}