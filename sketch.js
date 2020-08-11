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



function setup() {
    createCanvas(2000, 2000);
    circle(100,100,100)
    noLoop();
}

function draw() {
    clear();

    nn.draw({
        node_spacing: 60,
        weight_thicknesses: 1
    });
}