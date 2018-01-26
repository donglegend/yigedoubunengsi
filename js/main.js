import './global/global'
import DtouchEvent from './events/DtouchEvent'
import LoadImg from './load/loadImg'
import { imgs } from './game/source'
import NoOneDie from './game/noonedie'
window.resultList = null
export default class Main {
    constructor() {
        this._loadSource()
    }
    _loadSource() {
        let loadTask = new LoadImg(imgs, (index) => {
        }, (res) => {
            resultList = res
            loadTask = null
            this._init()
        })
        loadTask.load()
    }
    _init() {
        DGlobal.screen()
        DGlobal.loop()
        DtouchEvent.init()
        new NoOneDie()
    }
}


