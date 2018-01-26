/**
 * 图片加载器
 */
export default class LoadImg {
    constructor(source = [], progress = () => { }, complete = () => { }) {
        this.type = 'LoadImg'
        this.source = source
        this.__loadList = {}
        this.progress = progress
        this.complete = complete
    }
    __loadImage(item, callback) {
        let image = new Image()
        image.onload = () => {
            this.__loadList[item.id] = image
            callback()
        }
        image.src = item.src;
    }
    load(index) {
        let __index = index || 0
        const self = this
        if (this.source[__index]) {
            this.__loadImage(this.source[__index], () => {
                this.progress(__index)
                self.load(__index + 1)
            })
        } else {
            this.complete(this.__loadList)
        }

    }
}