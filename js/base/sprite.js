import TouchEvent from "../events/DtouchEvent"
/**
 * 游戏基础的精灵类
 * 此类本身是不可见的，也不会做任何显示操作，可见的是里面的 bitmap 或者 graphracis
 */
export default class Sprite extends TouchEvent {
  constructor(width = 0, height = 0, x = 0, y = 0) {
    super()
    this.type = "Sprite"
    this.childList = []
    this.width = width
    this.height = height

    this.x = x
    this.y = y

    this.alpha = 1

    this.visible = true

    this.parent = null

    this.scaleX = 1
    this.scaleY = 1
    this.translateX = 0
    this.translateY = 0
    this.rotate = 0
    // 坐标偏移量，即设定了x，y，需要translate的坐标系统，一层嵌套一层偏移
    this.dx = 0
    this.dy = 0
    this.matrix = {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: 0
    }
  }

  setCoordinateOrigin() {
    let _parent = this.parent
    this.dx = _parent ? _parent.dx + this.x : this.x
    this.dy = _parent ? _parent.dy + this.y : this.y
    let radian = Math.PI * this.rotate / 180
    this.matrix = {
      a: this.scaleX * Math.cos(radian),
      b: Math.sin(radian),
      c: -Math.sin(radian),
      d: this.scaleY * Math.cos(radian),
      e: this.dx,
      f: this.dy
    }
    ctx.save()
    // ctx.translate(this.dx, this.dy)
    ctx.transform(
      this.matrix.a,
      this.matrix.b,
      this.matrix.c,
      this.matrix.d,
      this.matrix.e,
      this.matrix.f
    )
  }
  resetCoordinateOrigin() {
    ctx.restore()
  }
  show() {
    this.setCoordinateOrigin()
    if (this.visible) {
      if (this.alpha < 1) {
        ctx.globalAlpha *= this.alpha
      }
      this.childList.forEach((child, index) => {
        child.show()
      })
    }
    this.resetCoordinateOrigin()
    this.loopframe()
  }
  loopframe() {
    for (let frame of this.frameList) {
      frame.listener()
    }
  }
  addChild(sprite) {
    if (sprite.parent) {
      throw Error("对象已经存在")
      return
    }
    sprite.parent = this
    this.childList.push(sprite)
  }

  removeChild(index) {
    this.childList.splice(index, 1)
  }

  /**
   * 每个sprite维持一个 touchEvent函数
   * 最终判断是否调用就会 循环运行到 判断 bitmap 或者 graphics
   */
  touchEvent(event, type) {
    /**
     * 自身没有添加事件，循环判断 子容器list
     */
    if (!this.visible) return
    if (this.touchEventList.length === 0) {
      this.childList.forEach((child, index) => {
        if (typeof child.touchEvent === "function") {
          child.touchEvent(event, type)
        }
      })
    }

    if (this.childList.length === 0) return
    let isTouch = false,
      _target = null
    for (let child of this.childList) {
      isTouch = child.istouchon(event, type)
      _target = child
      if (isTouch) break
    }
    if (isTouch) {
      for (let obj of this.touchEventList) {
        if (obj.type == type) {
          event.currentTarget = _target
          obj.listener(event)
        }
      }
      return
    }
  }
  /**
   * 是否被点击
   * @param {*} event
   */
  istouchon(event) {
    let isclick = false
    for (let child of this.childList) {
      isclick = child.istouchon(event)
      if (isclick) break
    }
    return isclick
  }
  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    if (!this.visible || !sp.visible) return false

    return !!(
      spX >= this.x &&
      spX <= this.x + this.width &&
      spY >= this.y &&
      spY <= this.y + this.height
    )
  }
}
