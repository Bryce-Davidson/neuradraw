// new p5();
var nn =  new DeepNeuralNetwork();

nn.add_layer(2, "green", "input")
nn.add_layer(3, "blue", "h_1")
nn.add_layer(2, "red", "output")

console.log(nn);
nn.add_annotations()

console.log(nn);

function setup() {
    createCanvas(1300, 1300);
    noLoop();
    
    // nn.draw(x=90, y=30, radius=60, layer_spacing=100, node_spacing=40)


    // var col = color(255,0,244);
    // tex = createP();
    // tex = createElement
    // tex.style('font-size', '20px');
    // tex.position(135, 165);
    // katex.render('', tex.elt);

    var layers = [2,4,5,5,5,3,2]
    // var colors = ["green", "blue", "blue", "red"]
    nn.quick_draw(x=90, y=30, layers, 0, radius=60, layer_spacing=100, node_spacing=40);
}
function draw() {
  
}