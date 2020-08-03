var nn =  new DeepNeuralNetwork();

var input_annotations = {
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
nn.add_layer(2, "green", "input", input_annotations)
nn.add_layer(3, "blue", "h_1")
nn.add_layer(2, "red", "output")

console.log(nn);

function setup() {
    createCanvas(2000, 2000);
    noLoop();
    
    nn.draw(x=90, y=30, radius=60, layer_spacing=100, node_spacing=40)


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
  
}