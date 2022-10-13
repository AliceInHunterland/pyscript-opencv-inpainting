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
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "yellow";

        ctx.lineTo(e.clientX, e.clientY - 50)
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY - 50)
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
    const canvas = document.querySelector("#layer1")
    // console.log(canvas.toDataURL())
    return canvas.toDataURL()
}

function getMaskSrc() {
    const canvas = document.querySelector("#layer2")
    // console.log(canvas.toDataURL())
    return canvas.toDataURL()
}


function setCanvasSrc(newSrc) {
    const canvas = document.querySelector("#canvas")
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


// function getToken() {
//     return "pk.eyJ1IjoiZWt0bGFncmFuemgxIiwiYSI6ImNrczZkd3EwbzAwczkycW96b3ZpbGJuaTMifQ.hVA0mIakF4asjiJmh7gPEA";
// }

// function getMap() {
//     return map;
// }

// function updateCorners(jsonData) {
//     let data = JSON.parse(jsonData);
//     for (let i = 0; i < data.features.length; i++) {
//         let screenCoords = data.features[i].geometry.coordinates;
//         let point = new mapboxgl.Point(screenCoords[0], screenCoords[1]);
//         let geoCoords = map.unproject(point);
//         data.features[i].geometry.coordinates = [geoCoords.lng, geoCoords.lat];
//     }
//     map.getSource("corners").setData(data);
// }

// function updateImage(src) {
//     let bounds = map.getBounds();
//     map.getSource("edges").updateImage({
//         url: src,
//         coordinates: [
//             [bounds._sw.lng, bounds._ne.lat],
//             [bounds._ne.lng, bounds._ne.lat],
//             [bounds._ne.lng, bounds._sw.lat],
//             [bounds._sw.lng, bounds._sw.lat],
//         ],
//     });
// }

// mapboxgl.accessToken = getToken();
// const map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/satellite-streets-v9",
//     center: [-123, 45],
//     zoom: 10,
// });

// map.on("load", () => {
//     const layers = map.getStyle().layers;
//     // Find the index of the first symbol layer in the map style.
//     let firstSymbolId;
//     for (const layer of layers) {
//         if (layer.type === "symbol") {
//             firstSymbolId = layer.id;
//             break;
//         }
//     }

    // map.addSource("corners", {
    //     type: "geojson",
    //     data: {
    //         type: "FeatureCollection",
    //         features: [],
    //     },
    // });
    // map.addLayer(
    //     {
    //         id: "corners",
    //         type: "circle",
    //         source: "corners",
    //         paint: {
    //             "circle-radius": 4,
    //             "circle-color": "#ffaa00",
    //         },
    //     },
    //     firstSymbolId
    // );

    // map.addSource("edges", {
    //     type: "image",
    //     url: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
    //     coordinates: [
    //         [-80.425, 46.437],
    //         [-71.516, 46.437],
    //         [-71.516, 37.936],
    //         [-80.425, 37.936],
    //     ],
    // });
//     map.addLayer(
//         {
//             id: "edges",
//             type: "raster",
//             source: "edges",
//             paint: {
//                 "raster-fade-duration": 1000,
//             },
//         },
//         "corners"
//     );
// });
