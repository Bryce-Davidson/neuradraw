var nn = new DNN("DNN_1");

nn.add_layer(2, "green", "input", input_annotations)
nn.add_layer(3, "blue", "h_1", input_annotations)
nn.add_layer(6, "blue", "h_2", input_annotations)
nn.add_layer(7, "blue", "h_3", input_annotations)
nn.add_layer(3, "red", "output", input_annotations)


function setup() {
    createCanvas(2000, 2000);
    circle(100,100,100)
    frameRate(30);
    noLoop();
}

function draw() {
    clear();
    nn.draw({
        node_spacing: 60 + 60*Math.sin(frameCount/100),
        layer_spacing: Math.abs(300*Math.sin(frameCount/100)),
        weight_thicknesses: 1
    });
}