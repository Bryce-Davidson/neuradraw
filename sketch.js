var nn = new DNN("DNN_1");

input_annotations = {
    layer: {
        top: {
            type: "text",
            text: "hello world"
        }
    }
}

nn.add_layer(1, "green", "input", input_annotations)
nn.add_layer(2, "blue", "h_1", input_annotations)


console.log(nn);


function setup() {

    createCanvas(2000, 2000);
    frameRate(60);
    // noLoop();
}

function draw() {
    clear();
    
    nn.draw({
        node_spacing: 60,
        weight_thicknesses: 1*frameCount*3
    });

    if(frameCount==2)
        noLoop();
}