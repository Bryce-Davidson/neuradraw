class DNN {

    /**
     * 
     * @param {String} name - the name of the instance
     */
    constructor(name) {
        this.name = name;
        this.state = {};
        this.state.layer_configs = []
    }

    compile() {
        this.__compile_node_coordinates();
        this.__compile_edge_coordinates();

        this.__compile_edge_colors();
        this.__compile_edge_thicknesses();
    }

    update_drawing_config(updated_config) {
        var updated_configurations = this.get_updated_configurations(updated_config);
        if(utility.includes_any(updated_configurations, ["x", "y", "layer_spacing", "node_spacing"])) {
            this.__compile_node_coordinates();
            this.__compile_edge_coordinates();
            this.__compile_edge_colors();
            this.__compile_edge_thicknesses();
        }
        // if(updated_configurations.includes("weight_colors"))
        // if(updated_configurations.includes("weight_thicknesses"))
        console.log("before:", this.drawing_config)
        this.drawing_config = {
            ...this.drawing_config,
            ...updated_config
        }
        console.log("after", this.drawing_config)
    }

    draw({
        x=0, 
        y=0, 
        diameter=60,
        layer_spacing=200,
        node_spacing=60,
        weight_colors=0,
        weight_thicknesses=0.3,
        weight_alphas=1}={}) {

        if(!arguments[0])
            throw new Error("Please provide a drawing configuration object.")

        if(!this.drawing_config) {
            this.drawing_config = {x,y,diameter,layer_spacing,node_spacing,weight_colors,weight_thicknesses,weight_alphas};
            this.compile();
        }

        if(this.has_updates(arguments[0]))
            this.update_drawing_config(arguments[0]);

        this._draw_edges();
        this._draw_nodes() ;
        this._draw_annotations();
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
        let new_layer = new DNNLayer(size, color, name, annotations);
        this.state.layer_configs.push(new_layer);
    }

    __compile_node_coordinates() {
        const {x, y, diameter, layer_spacing, node_spacing} = this.drawing_config;

        const vertical_spacing = diameter + node_spacing
        const horizontal_spacing = diameter + layer_spacing
        var sizes = [];

        for(var i=0; i < this.state.layer_configs.length; i++)
            sizes.push(this.state.layer_configs[i].size);

        for(var i=0; i < this.state.layer_configs.length; i++) {
            const cur_layer = this.state.layer_configs[i];
            const layer_top = vertical_spacing*(cur_layer.size+max(sizes))/2 + y;

            this.state[cur_layer.name] = {}
            this.state[cur_layer.name]["node_coords"] = []

            for(var j=0; j < cur_layer.size; j++) {
                let center_x = x + 1+diameter/2 + i*horizontal_spacing;
                let center_y = layer_top - j*vertical_spacing;

                this.state[cur_layer.name]["node_coords"].push([center_x, center_y])
            }
        }
    }

    // I need a non invasive compilation here
    __compile_edge_coordinates() {
        this.state.edges = []
        // this is why we are reseting the edges each time we compile
        for(var i=0; i < this.state.layer_configs.length - 1; i++) {
            var cur_layer = this.state.layer_configs[i];
            var next_layer = this.state.layer_configs[i+1];
            for(var j=0; j < cur_layer.size; j++) {
                var cur_node = this.state[cur_layer.name].node_coords[j];
                for(var k=0; k < next_layer.size; k++) {
                    var next_node = this.state[next_layer.name].node_coords[k];
                    this.state.edges.push([
                        cur_node[0]+this.drawing_config.diameter/2, 
                        cur_node[1], 
                        next_node[0]-this.drawing_config.diameter/2, 
                        next_node[1]])
                }
            }
        }
    }

    __compile_edge_colors() {
        const { weight_colors } = this.drawing_config;
        for(var i=0; i < this.state.edges.length; i++) {
            let color = weight_colors[i] || weight_colors || "black";
            this.state.edges[i].push(color)
        }
    }

    __compile_edge_thicknesses() {
        const { weight_thicknesses } = this.drawing_config;
        for(var i=0; i < this.state.edges.length; i++) {
            const DEFAULT_EDGE_THICKNESS = 1.2;
            let color = weight_thicknesses[i] || weight_thicknesses || DEFAULT_EDGE_THICKNESS;
            this.state.edges[i].push(color)
        }
    }

    __compile_layer_annotations() {

    }

    _draw_edges() {
        for(var i=0; i < this.state.edges.length; i++) {
            let e = this.state.edges[i];
            push();
            stroke(e[4]);
            strokeWeight(e[5]);
            line(e[0], e[1], e[2], e[3])
            pop();
        }
    }

    _draw_nodes() {
        for(var i=0; i < this.state.layer_configs.length; i++) {
            var cur_layer = this.state.layer_configs[i];
            for(var j=0; j < cur_layer.size; j++) {
                var cur_node = this.state[cur_layer.name].node_coords[j];
                push()
                fill(cur_layer.color)
                circle(cur_node[0], cur_node[1], this.drawing_config.diameter);
                pop();
            }
        }
    }

    _draw_annotations() {

    }

    get num_edges() {
        var edges = 0;
        for(var i=0; i < this.state.layer_configs.length-1; i++) {
            var cur_layer = this.state.layer_configs[i];
            var next_layer = this.state.layer_configs[i+1];
            edges += cur_layer.size * next_layer.size;
        }
        return edges;
    }

    // the update checker isn't complex enough because it isn't doing a deep comparison
    // for the array paramaters

    get_updated_configurations(updated_config) {
        var updated_config_paramaters = [];
        const keys = Object.keys(this.drawing_config);
        for(var i=0; i< keys.length; i++) {
            if(updated_config[keys[i]] && this.drawing_config[keys[i]] != updated_config[keys[i]])
                updated_config_paramaters.push(keys[i]);
        }
        return updated_config_paramaters;
    }

    has_updates(new_config) {
        const keys = Object.keys(this.drawing_config);
        for(var i=0; i< keys.length; i++) {
            if(new_config[keys[i]] && this.drawing_config[keys[i]] != new_config[keys[i]])
                return true
        }
        return false;
    }
}

class DNNLayer {
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