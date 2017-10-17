textureCrop = (sprite, winx, winy) => {
    
    let winRatio = winx / winy
    let spriteRatio = sprite.width / sprite.height
    let pos = new PIXI.Point(0,0)

    if (winRatio > spriteRatio) {
        scale = (winx+200)/sprite.width
        pos.y = -((sprite.height*scale)-winy)/2
        pos.x = -100
    } else {
        scale = (winy+200)/sprite.height
        pos.x = -((sprite.width*scale)-winx)/2
        pos.y = -100
    }

    sprite.scale = new PIXI.Point(scale, scale)
    sprite.position = pos
}

export default textureCrop