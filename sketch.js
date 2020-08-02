var nn =  new DeepNeuralNetwork();

function setup() {
    createCanvas(1200, 1000);
    noLoop();
    var layers = [2,3,3,2]
    var colors = ["green", "blue", "blue", "red"]
    nn.quick_draw(x=90, y=30, layers, colors, radius=60, layer_spacing=90, node_spacing=10);
}
  
function draw() {
  
}