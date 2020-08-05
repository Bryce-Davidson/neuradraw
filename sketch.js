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
nn.add_layer(6, "blue", "h_1", {dotted: true})
nn.add_layer(4, "red", "output")

// console.log(nn);

function setup() {
    createCanvas(2000, 2000);
    // frameRate(2);
    noLoop();

    // var col = color(255,0,244);
    // tex = createP();
    // tex = createElement
    // tex.style('font-size', '20px');
    // tex.position(135, 165);
    // katex.render('', tex.elt);

    // var layers = [4,6,7,7,4,3]
    // var colors = ["green", "blue", "blue", "red"]
    // nn.quick_draw(x=90, y=30, layers, 0, radius=60, layer_spacing=200, node_spacing=40);
}
function draw() {
    clear();
    nn.draw(x=90, y=30, radius=60, layer_spacing=300, node_spacing=40, randomized=true, random_alpha=true)
    // compute points
    // draw edges
    // draw nodes
    // draw annotations
}