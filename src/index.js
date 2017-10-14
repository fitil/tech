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

const loader = new PIXI.loaders.Loader()
loader.add('./img/experience_png_1600_0.json')
    .add('./img/experience_png_1600_1.json')

var anim

loader.load((loader, res) => {
    
    var frames = []
    for (var i = 0; i < 75; i++) {
        var val = i < 10 ? '0' + i : i;
        frames.push(PIXI.Texture.fromFrame('sprite-leaf-000' + val));
    }
    anim = new PIXI.extras.AnimatedSprite(frames)
    anim.x = renderer.width / 2
    anim.y = renderer.height / 2
    anim.anchor.set(0.5)
    anim.scale.set(0.2)
    anim.animationSpeed = 0.5
    anim.play()
    
    // const ticker = new PIXI.ticker.Ticker();
    // ticker.add(function() {
    //     anim.rotation += 0.01;
    // })

    stage.addChild(anim)
    animate()
})

function animate() {
    anim.rotation += 0.01
    renderer.render(stage)
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize)
function resize() {
    let ratio = Math.min(window.innerWidth/resolution.x, window.innerHeight/resolution.y)
    stage.scale.x = stage.scale.y = ratio
    renderer.resize(Math.ceil(resolution.x*ratio), Math.ceil(resolution.y*ratio))
}

