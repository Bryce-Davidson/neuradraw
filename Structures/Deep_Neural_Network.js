class DeepNeuralNetwork {
    constructor() {
        this.layers = [];
        this.coords = {};
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
    *               text: "\\int{x^2}dx=\\frac{x^3}{3}"
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
    *               text: "\\int{x^2}dx"
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
    * Draws the deep neural network
    * 
    * @param{Number} x - the x position of the graph (from left)
    * @param{Number} y - the y position of the graph (from top)
    * @param{Number} diameter - the diameter of the nodes in the graph
    * @param{Number} layer_spacing - the spacing between each layer in the graph
    * @param{Number} node_spacing - the spacing between each node in a layer
    * @param{Boolean} randomized - randomize the color of the weights between red and blue
    * @param{Boolean} random_alpha - randomize the slpha of the weights
    * @returns nothing
    */
    draw(x, y, diameter, layer_spacing, node_spacing, randomized=false, random_alpha=false) {
        if(Object.keys(this.coords).length == 0)
            this._compute_and_store_coordinates_of_nodes(x, y, diameter, layer_spacing, node_spacing)
        

        // somehow I need to connect the draw_edges and the circles to work with the annotations

        // draw edges
        this._draw_edges(randomized, random_alpha);
        // draw circles
        // draw annotations
    }

    /**
    * @param{Number} x - the x position of the graph (from left)
    * @param{Number} y - the y position of the graph (from top)
    * @param{Number} diameter - the diameter of the nodes in the graph
    * @param{Number} layer_spacing - the spacing between each layer in the graph
    * @param{Number} node_spacing - the spacing between each node in a layer
    * @returns nothing
    */
    _compute_and_store_coordinates_of_nodes(x, y, diameter, layer_spacing, node_spacing) {
        const vertical_spacing = diameter + node_spacing
        const horizontal_spacing = diameter + layer_spacing
        var sizes = [];

        for(var i=0; i < this.layers.length; i++)
            sizes.push(this.layers[i].size);

        for(var i=0; i < this.layers.length; i++) {
            const cur_layer = this.layers[i];
            const layer_top = vertical_spacing*(cur_layer.size+max(sizes))/2 + y;

            this.coords[cur_layer.name] = {}
            this.coords[cur_layer.name]["coords"] = []

            for(var j=0; j < cur_layer.size; j++) {
                let center_x = x + 1+diameter/2 + i*horizontal_spacing;
                let center_y = layer_top - j*vertical_spacing;
                
                this.coords[cur_layer.name]["coords"].push([center_x, center_y])
            }
        }
    }

    /**
     * @param {Boolean} randomized - whether to randomize edge colors
     * @param {Boolean} alpha - whether to randomize edge alphas
     */
    _draw_edges(randomized, random_alpha) {
        var colors = [color(255,0,0), color(0,0,255)];
        for(var i=0; i < this.layers.length - 1; i++) {
            var cur_layer = this.layers[i];
            var next_layer = this.layers[i+1];
            for(var j=0; j < cur_layer.size; j++) {
                var cur_node = this.coords[cur_layer.name].coords[j];
                for(var k=0; k < next_layer.size; k++) {
                    var next_node = this.coords[next_layer.name].coords[k];

                    push();
                    var line_color = color(0,0,0);
                    if(randomized) {
                        line_color = colors[Math.floor(Math.random() * colors.length)]
                        stroke(line_color);
                    }
                    if(random_alpha)
                        line_color.setAlpha(Math.floor(random(200)));
                    line(cur_node[0], cur_node[1], next_node[0], next_node[1]);
                    pop();
                }
            }
        }
    }

    _draw_nodes() {

    }

    _draw_annotations() {

    }
}

class DeepNeuralNetworkLayer {
    constructor(size, color, name, annotations) {
        this.size = size;
        this.name = name;
        this.color = color;
        this.annotations = annotations || {};
    }

    /**
    * @param {Object} annotations - the annotations to be provided to the layer
    */
    add_annotations(annotations) {
        this.annotations = annotations;
    }
}