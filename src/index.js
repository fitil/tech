import style from './sass/style.sass'
import * as PIXI from "pixi.js"
import { textureCrop, perlinNoise } from './utils'

//import Leaf from './scene/leaf'

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
    .add('bg', './img/nature.jpg')

let anim, background, ticker, tree
let time = 0

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
    
    // Background Start
    background = new PIXI.Sprite(res.bg.texture)
    textureCrop(background, window.innerWidth, window.innerHeight)
    background.interactive = true
    background.on('mousemove',onMouseMove)
    // Background End

    // Tree 1 Start
    tree = new PIXI.Sprite(PIXI.Texture.fromFrame('slide-leaf-tree-1'))
    tree.height = background.height
    tree.scale.x = tree.scale.y
    tree.position.set(-370, -250)
    // Tree 1 End

    // Tree 2 Start
    tree1 = new PIXI.Sprite(PIXI.Texture.fromFrame('slide-leaf-tree-2'))
    // tree.height = background.height
    // tree.scale.x = tree.scale.y
    tree1.position.set(window.innerWidth-600, -350)
    // Tree 2 End

    stage.addChild(background)
    stage.addChild(tree1)
    stage.addChild(tree)
    stage.addChild(anim)
    //animate()
    console.log(background.position)
    ticker = new PIXI.ticker.Ticker()
    ticker.stop()
    ticker.add((deltaTime) => {
        time++
        anim.rotation += 0.01
        anim.position.x += 1
        renderer.render(stage)
    })
    ticker.start()
})

let oldX = renderer.plugins.interaction.mouse.global.x, oldY = renderer.plugins.interaction.mouse.global.y, offsetX=offsetY=100

function onMouseMove(event) {
    x = renderer.plugins.interaction.mouse.global.x
    y = renderer.plugins.interaction.mouse.global.y

    if(oldY>y) {
        if (offsetY<200) {
            background.position.y += 0.5
            offsetY++
        }
    } else {
        if (offsetY>0) {
            background.position.y -= 0.5
            offsetY--
        }
    }
    if(oldX>x) {
        if (offsetX<200) {
            background.position.x += 0.5
            offsetX++
        }
    } else {
        if (offsetX>0) {
            background.position.x -= 0.5
            offsetX--
        }
    }

    oldX = x
    oldY = y
    console.log(background.width)
}

// function animate() {
//     anim.rotation += 0.01
//     anim.position.x += 1
//     if(anim.position.x>window.innerWidth){
//         anim.position.x = 0
//     }
//     renderer.render(stage)
//     requestAnimationFrame(animate);
// }

window.addEventListener('resize', resize)
function resize() {
    let ratio = Math.min(window.innerWidth/resolution.x, window.innerHeight/resolution.y)
    stage.scale.x = stage.scale.y = ratio
    renderer.resize(Math.ceil(resolution.x*ratio), Math.ceil(resolution.y*ratio))
    //textureCrop(background, window.innerWidth, window.innerHeight)
}

