var nn =  new DeepNeuralNetwork();

var input_annotations = {
    dotted: true,
    layer: {
        above: {
            dimensions: [40,40],
            type: "latex",
            text: "\\int{x^2}"
        },
        below: {
            dimensions: [40,40],
            type: "latex",
            text: "\\int{x^2}"
        }
    },
    nodes: [
        {
            nodes: [-1],

        }
    ]
}


nn.add_layer(4, "green", "input", input_annotations)
nn.add_layer(5, "blue", "h_1", {dotted: true})
nn.add_layer(3, "blue", "h_3", {dotted: true})
nn.add_layer(5, "blue", "h_2", {dotted: true})
nn.add_layer(1, "red", "output")

// console.log(nn);

function setup() {
    createCanvas(2000, 2000);
    frameRate(2);
    noLoop();
}
function draw() {
    clear();
    nn.draw({x:90, y:30, radius:60, layer_spacing:300, node_spacing:40, randomized:true, random_alpha:true})
}