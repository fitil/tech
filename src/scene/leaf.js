import * as PIXI from 'pixi.js'

class Leaf {
    constructor(frames) {
        console.log(frames)
        
        let item = PIXI.extras.AnimatedSprite(frames)
        item.x = 200
        item.y = 100
        item.anchor.set(0.5)
        item.scale.set(0.2)
        item.animationSpeed = 0.5
        item.play()
    }

    update(delta) {

    }
}

export default Leaf