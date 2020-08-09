var nn = new DNN("DNN_1");

input_annotations = {
    layer: {
        top: {
            type: "text",
            text: "hello world"
        }
    }
}

nn.add_layer(5, "green", "input", input_annotations)
nn.add_layer(6, "purple", "h_1", input_annotations)
nn.add_layer(10, "purple", "h_2", input_annotations)
nn.add_layer(15, "purple", "h_3", input_annotations)
nn.add_layer(4, "red", "h_4", input_annotations)


console.log(nn);
console.log(nn.num_edges);


function setup() {

    createCanvas(2000, 2000);
    frameRate(60);
    // noLoop();
}

function draw() {
    clear();
    
    nn.draw({
        layer_spacing: 200,
        node_spacing: 60,
    })
}