var nn = new DNN("DNN_1");

input_annotations = {
    layer: {
        top: {
            type: "text",
            text: "hello world"
        }
    }
}
nn.add_layer(2, "green", "input", input_annotations)
nn.add_layer(2, "red", "output", input_annotations)
console.log(nn);
console.log(nn.num_edges);


function setup() {

    createCanvas(2000, 2000);
    frameRate(1);
    // noLoop();
}

function draw() {
    clear();
    console.log(frameCount)
    
    var edge_colors = [];
    if(frameCount < 2 ) {
        var colors = [color(255,0,0), color(0,0,255)];
        for(var i=0; i < nn.num_edges; i++) {
            edge_colors.push(colors[Math.floor(Math.random() * colors.length)])
        }
    } else {
        edge_colors = 'green';
    }
    
    nn.draw({
        layer_spacing: 200,
        node_spacing: 20,
        weight_colors: edge_colors
    })

    if(frameCount==4)
        noLoop();
}