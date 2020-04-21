class Fruit {
    constructor(p5, boundary, gravity, vyRandomFactor, fImgActive, fImgExplode) {
        this.diameter = 80
        this.x = Math.random() * ( (boundary - 50) - 50 ) + 50
        this.y = p5.height + this.diameter
        this.vy = Math.random() * (vyRandomFactor+3 - vyRandomFactor-3) + vyRandomFactor-3
        this.vx = Math.random() * (2 - (-2)) + (-2)
        this.gravity = gravity
        this.isShown = true
        this.isDestroyed = false
        this.p5 = p5
        this.boundary = boundary
        this.fImgActive = fImgActive
        this.fImgExplode = fImgExplode
    }

    move() {
        if(!this.isDestroyed){
            this.y -= this.vy
            this.vy -= this.gravity
        }
        // Memantulkan
        // if( Math.abs(this.boundary - this.x) <= this.diameter/2){
        //     this.vx *= -1
        // }
        // if( Math.abs(0 - this.x) <= this.diameter/2 ){
        //     this.vx *= -1
        // }
    }

    destroy(){
        this.isDestroyed = true
        setTimeout(() => {
            this.isShown = false
        }, 2000)
    }

    unShow(){
        this.isShown = false
    }

    show() {
        if(!this.isDestroyed && this.isShown){
            this.p5.image(this.fImgActive, this.x, this.y, this.diameter, this.diameter)
        }
        else if(this.isDestroyed && this.isShown){
            this.p5.image(this.fImgExplode, this.x, this.y, this.diameter, this.diameter)
        }
    }
}

export default Fruit