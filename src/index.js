import style from './sass/style.sass'
import * as PIXI from "pixi.js"
import { textureCrop } from './utils'

let resolution = { x: window.innerWidth, y: window.innerHeight }

const renderer = new PIXI.autoDetectRenderer(
    resolution.x,
    resolution.y,
    {
        resolution: window.devicePixelRatio,
        transparent: true,
        autoResize: true
    }
)
document.getElementById("pixi").appendChild(renderer.view)
let stage = new PIXI.Container()

PIXI.loader.add('img/nature.jpg').load(function () {
    let bSprite = new PIXI.Sprite.fromImage('img/nature.jpg')
    textureCrop(bSprite, resolution.x, resolution.y)
    stage.addChild(bSprite)
    renderer.render(stage)
})


window.addEventListener('resize', resize)
function resize() {
    let ratio = Math.min(window.innerWidth/resolution.x, window.innerHeight/resolution.y)
    stage.scale.x = stage.scale.y = ratio
    renderer.resize(Math.ceil(resolution.x*ratio), Math.ceil(resolution.y*ratio))
}

