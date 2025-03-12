let particleCanvasDOM = document.getElementById("particleCanvas")
let pCtx = particleCanvasDOM.getContext("2d")

//image aspect ratio: 1:1, if this changes if we get nameless logo / aspect ratio changes multipy by this
particleCanvasDOM.width = this.document.body.getBoundingClientRect().width;
particleCanvasDOM.height = this.document.body.getBoundingClientRect().width;
let docWidth = this.document.body.getBoundingClientRect().width

let image = new Image()

image.src = "static/img/full-logo.png"
document.addEventListener("DOMContentLoaded", (e) => {
    image.onload = function () {
        pCtx.drawImage(image, 0, 0, docWidth,docWidth)
    }
    
  });

window.addEventListener("resize",function(e)
{
    particleCanvasDOM.width = this.document.body.getBoundingClientRect().width;
    particleCanvasDOM.height = this.document.body.getBoundingClientRect().width;
    pCtx.drawImage(image, 0, 0, this.document.body.getBoundingClientRect().width, this.document.body.getBoundingClientRect().width)
})