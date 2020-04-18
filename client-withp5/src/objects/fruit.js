class Fruit {
    constructor(p5, video, img) {
        this.diameter = 75
        this.x = Math.random() * (video.width - 50 - 50) + 50
        this.y = video.height + this.diameter
        this.vy = Math.random() * (12 - 9) + 9
        this.vx = Math.random() * (2 - (-2)) + (-2)
        this.gravity = 0.2
        this.isShown = true
        this.p5 = p5
        this.img = img
    }

    move() {
        this.y -= this.vy
        this.x += this.vx
        this.vy -= this.gravity
    }

    unShow(){
        this.isShown = false
    }

    show() {
        if(this.isShown){
            this.p5.image(this.img, this.x, this.y, this.diameter, this.diameter)
            this.p5.fill(255, 50)
            this.p5.ellipseMode(this.p5.CORNER)
            this.p5.ellipse(this.x, this.y, this.diameter, this.diameter)
        }
    }
}

export default Fruit