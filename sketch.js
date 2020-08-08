var nn = new DNN();

input_annotations = {
    layer: {
        top: {
            type: "text",
            text: "hello world"
        }
    }
}
nn.add_layer(4, "green", "input", input_annotations)
nn.add_layer(4, "green", "h_1", input_annotations)
console.log(nn);


function setup() {
    createCanvas(2000, 2000);
    // frameRate(2);
    noLoop();
}
function draw() {
    // clear();
    nn.draw({x:3})
}