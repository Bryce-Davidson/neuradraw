var nn = new DNN("name_of_dnn")

nn.add_layer(2, "green", "input")
nn.add_layer(3, "blue", "h_1")
nn.add_layer(2, "red", "output")

function setup() {
    createCanvas(2000, 2000);
    frameRate(30);
    noLoop();
}

function draw() {
    clear();
    // DNN Options
    nn.draw({
        x:0,
        y:0,
        diameter:65,
        layer_spacing:200,
        node_spacing: 120,
        weight_colors: 0 || 'black',
        weight_thicknesses: 1.3
    });
}