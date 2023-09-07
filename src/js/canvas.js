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

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
function Ball(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    this.update = function () {
        this.draw()
    }
}

const getDistance = (x1, x2, y1, y2) => {
    const xDist = x2 - x1
    const yDist = y2 - y1
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Implementation
let objects
let circle1
let circle2
function init() {
    circle1 = new Ball(canvas.width / 2, canvas.height / 2, 100, 'red')
    circle2 = new Ball(undefined, undefined, 20, 'blue')
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    circle1.update()
    circle2.x = mouse.x
    circle2.y = mouse.y
    circle2.update()

    if (getDistance(circle1.x, circle2.x, circle1.y, circle2.y) <= (circle1.radius + circle2.radius))
        circle2.color = "green"
    else circle2.color = "blue"

    console.log(getDistance(circle1.x, circle2.x, circle1.y, circle2.y));
}

init()
animate()
