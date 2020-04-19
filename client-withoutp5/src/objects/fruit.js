class Fruit {
    constructor(p5) {
        this.diameter = 50
        this.x = Math.random() * (p5.width - 50 - 50) + 50
        this.y = p5.height + this.diameter
        this.vy = Math.random() * (18 - 12) + 12
        this.vx = Math.random() * (2 - (-2)) + (-2)
        this.gravity = 0.2
        this.isShown = true
        this.p5 = p5
    }

    move() {
        this.y -= this.vy
        this.x += this.vx
        this.vy -= this.gravity
    }

    show() {
        this.p5.ellipse(this.x, this.y, this.diameter, this.diameter)
    }
}

export default Fruit