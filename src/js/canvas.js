import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)]
}

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

let friction = 0.9
let gravity = 1

// Objects
function Ball(x, y, radius, color, dx, dy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.dy = dy
    this.dx = dx
    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }

    this.update = function () {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction
        } else {
            this.dy += gravity
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
}

// Implementation
let objects
function init() {
    objects = []
    var radius = 20
    for (let i = 0; i < 400; i++) {

        let x = randomIntFromRange(radius, canvas.width - radius)
        let y = randomIntFromRange(radius, canvas.height - radius)
        let dx = randomIntFromRange(-2, 2)
        let dy = randomIntFromRange(-2, 2)
        let ball = new Ball(x, y, radius, randomColor(colors), dx, dy)
        objects.push(ball)
    }
}



// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    objects.forEach(object => {
        object.update()
    })

    // ball.update()
}

window.addEventListener('click', () => {
    init()
})

init()
animate()
