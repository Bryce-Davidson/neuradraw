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
    * @param{Object} annotations - the annotations to be added [see README.md for options and examples]
    * @example
    *   nn.add_layer(3, "white", "output", {
    *       layer: {
    *           dotted: true,
    *           above: {
    *               dimensions: [20, 30], // [width,height]
    *               type: "latex",
    *               text: "\\int{x^2}=\\frac{x^3}{3}"
    *           }
    *       }
    *   })
    * @returns nothing
    */
    add_layer(size, color, name, annotations) {
        // Do i need this here or should i make it so that the layers are added exlipcit
        let new_layer = new DeepNeuralNetworkLayer(size, color, name, annotations);
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
    * Draws the edges connecting the nodes of the graph
    * 
    * @param{Number} x - the x position of the graph (from left)
    * @param{Number} y - the y position of the graph (from top)
    * @param{Number} diameter - the diameter of the nodes in the graph
    * @param{Number} layer_spacing - the spacing between each layer in the graph
    * @param{Number} node_spacing - the spacing between each node in a layer
    * @returns nothing
    */
    draw(x, y, diameter, layer_spacing, node_spacing) {

        let vertical_spacing = diameter + node_spacing
        let horizontal_spacing = diameter + layer_spacing

        // gather all of the sizes to find max and for edges
        var sizes = [];
        for(var i=0; i < this.layers.length; i++)
            sizes.push(this.layers[i].size);

        // draw the edges for the particular layer before nodes
        this._draw_edges(x, y, sizes, vertical_spacing, horizontal_spacing, diameter);

        for(var i=0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            let layer_top = vertical_spacing*(layer.size+max(sizes))/2 + y;

            for(var j=0; j < layer.size; j++) {
                let center_x = x + 1+diameter/2 + i*horizontal_spacing;
                let center_y = layer_top - j*vertical_spacing;
                
                push();
                fill(layer.color || "white")
                stroke(layer.color || "black")
                circle(center_x, center_y, diameter)
                pop();
            }
        }
    }

    _draw_layer_annotations(annotation_config) {

    }

    /**
    * Quickly draw a fully connected neural network by only specifying layer sizes and colors.
    * 
    * @param{Number} x - the x position of the graph (from left)
    * @param{Number} y - the y position of the graph (from top)
    * @param{[Number]} layers - an array containing the layer sizes
    * @param{[String]} colors - an array containging the the layer colors
    * @returns nothing
    */
    quick_draw(x, y, layers, colors, diameter, layer_spacing, node_spacing) {
        var vertical_spacing = diameter + node_spacing
        var horizontal_spacing = diameter + layer_spacing

        this._draw_edges(x, y, layers, vertical_spacing, horizontal_spacing, diameter);
        
        for(var i=0; i < layers.length; i++) {
            var layer_size = layers[i];
            var layer_top = vertical_spacing*(layer_size+max(layers))/2 + y;
            for(var j=0; j < layer_size; j++) {
                if(colors!=0) {
                    fill(colors[i])
                }
                let center_x = x + 1+diameter/2 + i*horizontal_spacing;
                let center_y = layer_top - j*vertical_spacing;
                circle(center_x, center_y, diameter)
            }
        }
    }

    /**
     * 
     * @param {Number} x - the x offset provided by the draw function
     * @param {Number} y - the y offset provided by the draw function
     * @param {[Number]} layers - the layer sizes array provided by the draw function
     * @param {Number} vertical_spacing - the vertical spacing provided by the draw function
     * @param {Number} horizontal_spacing - the horizontal spacing provided by the draw function
     * @param {Number} diameter - the diameter of the nodes provided by the draw function
     * @returns nothing
     */
    _draw_edges(x, y, layers, vertical_spacing, horizontal_spacing, diameter) {
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
            for(var m=1; m <= layer_size_a; m++) {  
            let a_center_x = x + 1+diameter/2 + n*horizontal_spacing + diameter/2;
            let a_center_y = layer_top_a - m*vertical_spacing;
                // connect to each node in layer b
                for(var o=1; o <= layer_size_b; o++) {
                    let b_center_x = x + 1+diameter/2 + (n+1)*horizontal_spacing - diameter/2;
                    let b_center_y = layer_top_b - o*vertical_spacing;
                    line(a_center_x, a_center_y, b_center_x,b_center_y)
                }
            }
        }
    }
}

class DeepNeuralNetworkLayer {
    constructor(size, color, name, annotations) {
        this.size = size;
        this.color = color;
        this.annotations = annotations;
    }

    /**
    * @param {Object} annotations - the annotations to be provided to the layer
    */
    add_annotations(annotations) {
        this.annotations = annotations;
    }
}