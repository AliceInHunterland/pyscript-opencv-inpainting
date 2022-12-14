window.addEventListener('load', () => {

    const canvas_img = document.querySelector("#layer1")
    const ctx_img = canvas_img.getContext("2d");

    canvas_img.height = window.innerHeight;
    canvas_img.width = window.innerWidth;


    const canvas = document.querySelector("#layer2")
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishPosition() {
        painting = false;
        ctx.beginPath()
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = 15;
        ctx.lineCap = "round";
        ctx.strokeStyle = "yellow";

        ctx.lineTo(e.clientX, e.clientY - 450)
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY - 450)
    }



    document.getElementById('image-file').onchange = function (e) {
        console.log("e >> ", e.target.files[0]);

        make_base();

        function make_base() {
            let base_image = new Image();
            base_image.src = URL.createObjectURL(e.target.files[0]);
            base_image.onload = function () {
                canvas.width = base_image.width;
                canvas.height = base_image.height;
                canvas.style.width = `${base_image.innerWidth}px`;
                canvas.style.height = `${base_image.innerHeight}px`;

                // const context = canvas.getContext("2d")
                // // context.scale(2, 2);
                // context.lineCap = "round";

                // context.lineWidth = 5;


                canvas_img.width = base_image.width;
                canvas_img.height = base_image.height;
                canvas_img.style.width = `${base_image.innerWidth}px`;
                canvas_img.style.height = `${base_image.innerHeight}px`;
                ctx_img.drawImage(base_image, 0, 0);

                canvas.addEventListener('mousedown', startPosition);
                canvas.addEventListener('mouseup', finishPosition);
                canvas.addEventListener('mousemove', draw);
            }

        }


    };

})


function getCanvasSrc() {
    const canvas = document.getElementById("layer1")
    // console.log(canvas.toDataURL())
    return canvas.toDataURL()
}

function getMaskSrc() {
    const canvas = document.getElementById("layer2")
    // console.log(canvas.toDataURL())
    return canvas.toDataURL()
}


function setCanvasSrc(newSrc) {
    const canvas_paint = document.getElementById("layer2")
    const context_paint = canvas_paint.getContext('2d');
    context_paint.clearRect(0, 0, canvas_paint.width, canvas_paint.height);

    const canvas = document.getElementById("layer1")
    let base_image = new Image();
    base_image.src = newSrc;
    base_image.onload = function () {
        canvas.width = base_image.width;
        canvas.height = base_image.height;
        canvas.style.width = `${base_image.innerWidth}px`;
        canvas.style.height = `${base_image.innerHeight}px`;
        const context = canvas.getContext("2d")
        context.drawImage(base_image, 0, 0);

    }
}

