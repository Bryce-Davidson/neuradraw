var nn =  new DeepNeuralNetwork();

function setup() {
    createCanvas(900, 1000);
    noLoop();
    var layers = [2,3,3,3,1]
    // var colors = ["green", "blue", "blue", "red"]
    nn.quick_draw(x=90, y=30, layers, 0, radius=60, layer_spacing=100, node_spacing=40);
}
function draw() {
  
}