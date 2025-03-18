let particleCanvasDOM = document.getElementById("particleCanvas")
let pCtx = particleCanvasDOM.getContext("2d", { willReadFrequently: true })
const particleDiameter = 9;
let repelRadius = 40
const repelSpeed = 5
const returnSpeed = 0.1
let hasDrawnImage = false

//image aspect ratio: 1:1, if this changes if we get nameless logo / aspect ratio changes multipy by this
let docWidth = this.document.body.getBoundingClientRect().width / 2
particleCanvasDOM.width = docWidth
particleCanvasDOM.height = docWidth
document.getElementById("pageContent").style.marginTop = `${68 + docWidth}px`

let image = new Image()
let particles = []
let mouseX = Infinity
let mouseY = Infinity

function resetBoard() {
    hasDrawnImage = true
    pCtx.clearRect(0,0,docWidth,docWidth)
    particles = []
    docWidth = this.document.body.getBoundingClientRect().width / 2
    particleCanvasDOM.width = docWidth;
    particleCanvasDOM.height = docWidth;
    document.getElementById("pageContent").style.marginTop = `${59 + docWidth}px`
    pCtx.drawImage(image, 0, 0, docWidth, docWidth)
    let imageData = pCtx.getImageData(0, 0, image.width, image.width).data
    let rowCount = Math.round(image.height / particleDiameter)
    let colCount = Math.round(image.width / particleDiameter)
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            let pixelIndex = (row * particleDiameter * image.width + col * particleDiameter) * 4
            particles.push({
                x: Math.floor(Math.random()*colCount*particleDiameter),
                y: Math.floor(Math.random()*rowCount*particleDiameter),
                ogX: col * particleDiameter + particleDiameter / 2,
                ogY: row * particleDiameter + particleDiameter / 2,
                color: `rgba(${imageData[pixelIndex]},${imageData[pixelIndex + 1]},${imageData[pixelIndex + 2]},${imageData[pixelIndex + 3] / 255})`
            })
        }
    }
}

function drawParticles() {
    pCtx.clearRect(0, 0, docWidth, docWidth)
    particles.forEach((particle) => {
        let distanceFromMouse = Math.hypot(mouseX - particle.x, mouseY - particle.y)
        if (distanceFromMouse < repelRadius) {
            theta = Math.atan2(mouseY - particle.y, mouseX - particle.x)
            force = (repelRadius - distanceFromMouse) / repelRadius
            particle.x -= Math.cos(theta) * force * repelSpeed
            particle.y -= Math.sin(theta) * force * repelSpeed
        }
        else if (particle.x != particle.ogX || particle.y != particle.ogY) {
            theta = Math.atan2(particle.ogY - particle.y, particle.ogX - particle.x)
            distance = Math.hypot(particle.ogX - particle.x, particle.ogY - particle.y)
            particle.x += Math.cos(theta) * distance * returnSpeed
            particle.y += Math.sin(theta) * distance * returnSpeed
        }
        pCtx.beginPath()
        pCtx.arc(particle.x, particle.y, particleDiameter / 2, 0, 2 * Math.PI)
        pCtx.fillStyle = particle.color
        pCtx.fill()
    })
    requestAnimationFrame(drawParticles)
}
drawParticles()

image.crossOrigin = "anonymous";
image.src = "static/img/logo/darkbloom.png"
document.addEventListener("DOMContentLoaded", (e) => {
    image.onload = function () {
        resetBoard()
    }
});

window.addEventListener("resize", function (e) {
    resetBoard()
})

window.addEventListener("scroll",function(e)
{
    if(!hasDrawnImage)
    {
        resetBoard()
    }
})

particleCanvasDOM.addEventListener("mousemove", function (e) {
    mouseX = e.offsetX
    mouseY = e.offsetY
})

particleCanvasDOM.addEventListener("mouseleave",function(e)
{
    mouseX = Infinity
    mouseY = Infinity
})

particleCanvasDOM.addEventListener("mousedown",function(e)
{
    e.preventDefault()
    if(e.button == 0)
    {
        repelRadius = 70;
        return
    }
    repelRadius = 20;

})

particleCanvasDOM.addEventListener("mouseup",function(e)
{
    repelRadius = 40;
})
