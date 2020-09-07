var nn = new DNN("DNN_1");

nn.add_layer(2, "green", "input")
nn.add_layer(3, "blue", "h_1")
nn.add_layer(6, "blue", "h_2")
nn.add_layer(7, "blue", "h_3")
nn.add_layer(3, "red", "output")


function setup() {
    createCanvas(2000, 2000);
    frameRate(30);
    noLoop();
}

function draw() {
    // Stands as an easy example
    clear();
    nn.draw({
        node_spacing: 40 + 60*Math.sin(frameCount/100),
        layer_spacing: 120 + Math.abs(300*Math.sin(frameCount/100)),
        weight_thicknesses: 1
    });
}