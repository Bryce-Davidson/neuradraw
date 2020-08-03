// new p5();

class DeepNeuralNetwork {
    constructor() {
        this.layers = [];
        this.colors = [];
    }

    /**
    * Adds a layer to the fully connected deep neural network
    * 
    * @param{Number} size - the size of the layer
    * @param{String} color - the color of the layer 
    * @param{String} name - the name of the layer
    * @returns nothing
    */
    add_layer(size, color, name) {
        // Do i need this here or should i make it so that the layers are added exlipcit
        let new_layer = new DeepNeuralNetworkLayer(size, color, name);
        this.layers.push(new_layer);
    }

    /**
    * Adds an annotation config object to the specified layer
    * 
    * @param{Number} layer_index - the index of the layer to recieve annotations
    * @param{Object} annotations - the annotation config object
    * @example
    *   nn.add_annotations(0, {
    *       layer: {
    *           above: {
    *               dimensions: [20, 40], 
    *               type: "latex",
    *               text: "\\int{x^2}"
    *           }
    *       } 
    *   })
    * 
    * @returns nothing
    */
    add_annotations(layer_index, annotations) {
        if(layer_index == undefined)
            throw new Error("Need to include a layer index to add annotations")

        // console.log(layer_index, annotations);
        var layer = this.layers[layer_index];
        layer.add_annotations(annotations);
    }


    /**
    * Draw a neural network using layers object
    * 
    * @param{Number} x - the x position of the graph (from left)
    * @param{Number} y - the y position of the graph (from top)
    * @param{Number} radius - the radii of the nodes in the graph
    * @param{Number} layer_spacing - the spacing between each layer in the graph
    * @param{Number} node_spacing - the spacing between each node in a layer
    */
    draw(x, y, radius, layer_spacing, node_spacing) {

        let vertical_spacing = radius + node_spacing
        let horizontal_spacing = radius + layer_spacing

        var sizes = [];
        for(var i=0; i < this.layers.length; i++)
            sizes.push(this.layers[i].size);
        
        // TODO:
            // Need to implement the randomize weights function

        // draw the edges for the particular layer
        this._draw_edges(x, y, sizes, vertical_spacing, horizontal_spacing, radius);

        for(var i=0; i < this.layers.length; i++) {
            // get the layer from the layers array
            var layer = this.layers[i];
            // console.log(layer);
            let layer_top = vertical_spacing*(layer.size+max(sizes))/2 + y;

            var annotations = layer.annotations || NaN;
            // console.log(annotations);
            // For each node
            for(var j=0; j < layer.size; j++) {
                let center_x = x + 1+radius/2 + i*horizontal_spacing;
                let center_y = layer_top - j*vertical_spacing;
                
                // Push a new drawing stack
                push();
                fill(layer.color || "white")
                stroke(layer.color || "black")
                circle(center_x, center_y, radius)
                pop();
            }
        }
    }


    /**
    * Quickly draw a fully connected neural network.
    * 
    * @param{Number} x - the x position of the graph (from left)
    * @param{Number} y - the y position of the graph (from top)
    * @param{[Number]} layers - an array containing the layer sizes
    * @param{[String]} colors - an array containging the the layer colors
    */
    quick_draw(x, y, layers, colors, radius, layer_spacing, node_spacing) {
        var vertical_spacing = radius + node_spacing
        var horizontal_spacing = radius + layer_spacing

        this._draw_edges(x, y, layers, vertical_spacing, horizontal_spacing, radius);
        
        for(var i=0; i < layers.length; i++) {
            var layer_size = layers[i];
            var layer_top = vertical_spacing*(layer_size+max(layers))/2 + y;
            for(var j=0; j < layer_size; j++) {
                if(colors!=0) {
                    fill(colors[i])
                }
                let center_x = x + 1+radius/2 + i*horizontal_spacing;
                let center_y = layer_top - j*vertical_spacing;
                circle(center_x, center_y, radius)
            }
        }
    }

    _draw_edges(x, y, layers, vertical_spacing, horizontal_spacing, radius) {
        // Gather layers sizes
        var a = layers.slice(0,-1);
        var b = layers.slice(1);
        var c = a.map(function(e, i) {
            return [e, b[i]];
        });
        
        // For each pair of layers
        for(var n=0; n < c.length; n++) {
            var layer_size_a = c[n][0];
            var layer_size_b = c[n][1];
        
            var layer_top_a = vertical_spacing*(layer_size_a+max(layers))/2 + y + vertical_spacing;
            var layer_top_b = vertical_spacing*(layer_size_b+max(layers))/2 + y + vertical_spacing;
        
            // for each node in layer a
            for(var m=0; m < layer_size_a; m++) {  
            let a_center_x = x + 1+radius/2 + (n)*horizontal_spacing + radius/2;
            let a_center_y = layer_top_a - (m+1)*vertical_spacing;
                // for each node in layer b
                for(var o=0; o < layer_size_b; o++) {
                    let b_center_x = x + 1+radius/2 + (n+1)*horizontal_spacing - radius/2;
                    let b_center_y = layer_top_b - (o+1)*vertical_spacing;
                    line(a_center_x, a_center_y, b_center_x,b_center_y)
                }
            }
        }
    }
}

class DeepNeuralNetworkLayer {
    constructor(size, color, name) {
        this.size = size;
        this.color = color;
        this.annotations = {};
    }

    /**
    * @param {Object} annotations - the annotations to be provided to the layer
    */
    add_annotations(annotations) {
        this.annotations = annotations;
    }
    // Maybe draws the layer upon calling. 
    // Don't know what i need yet for the layer to be drawn correctly
    draw() {}
}