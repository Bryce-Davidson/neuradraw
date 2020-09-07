class DNN {

    /**
     * 
     * @param {String} name - the name of the instance
     */
    constructor(name) {
        this.name = name;
        this.drawing_config = {};
        this.state = {};
        this.__num_draws = 0;

        this.state.layer_configs = []
        this.state.edges = [];
    }

    draw({
            x=0, 
            y=0, 
            diameter=60,
            layer_spacing=120,
            node_spacing=60,
            weight_colors=0,
            weight_thicknesses=0.3
        }={}) {

        const new_config = {
            x,
            y,
            diameter,
            layer_spacing,
            node_spacing,
            weight_colors,
            weight_thicknesses
        }

        if(!arguments[0])
            throw new Error("Please provide a drawing configuration object.")

        if(this.__num_draws==0) {
            this.__update_drawing_config(new_config);
            this.compile(Object.keys(new_config));
        }
        else if(this.__has_changed(new_config)) {
            let compile_keys = this.__get_updated_configurations(arguments[0]);
            this.__update_drawing_config(new_config);
            this.compile(compile_keys);
        }

        this._draw_edges();
        this._draw_nodes() ;
        this._draw_annotations();

        this.__num_draws++;
    }

    compile(compile_keys) {
        if(utility.includes_any(compile_keys, ["x", "y", "layer_spacing", "node_spacing"])) {
            this.__compile_node_coordinates();
            this.__compile_edge_coordinates();
        }
        if(compile_keys.includes("weight_colors"))
            this.__compile_edge_colors();
        if(compile_keys.includes("weight_thicknesses"))
            this.__compile_edge_thicknesses();
    }

    __update_drawing_config(updated_config) {
        this.drawing_config = {
            ...this.drawing_config,
            ...updated_config
        }
    }

    /**
     * 
     * @param {Number} size - The number of nodes in the layer.
     * @param {String} color - The color of the layer in english || hex || RGB.
     * @param {String} name - The name of the neural newtork layer.
     */
    add_layer(size, color, name) {
        for(var i in this.state.layer_configs)
            if(this.state.layer_configs[i].name == name)
                throw new Error(`"${name}" is already a layer in the network`)

        let new_layer = new DNNLayer(size, color, name);
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

    __compile_edge_coordinates() {
        var cur_edge_idx = 0;
        for(var i=0; i < this.state.layer_configs.length - 1; i++) {
            var cur_layer = this.state.layer_configs[i];
            var next_layer = this.state.layer_configs[i+1];
            for(var j=0; j < cur_layer.size; j++) {
                var cur_node = this.state[cur_layer.name].node_coords[j];
                for(var k=0; k < next_layer.size; k++) {
                    var next_node = this.state[next_layer.name].node_coords[k];
                    
                    var edge_coords = [
                        cur_node[0]+this.drawing_config.diameter/2, 
                        cur_node[1], 
                        next_node[0]-this.drawing_config.diameter/2, 
                        next_node[1],
                    ]

                    if(this.state.edges[cur_edge_idx]) {
                        for(var p=0; p < edge_coords.length; p++)
                            this.state.edges[cur_edge_idx][p] = edge_coords[p];
                    } else
                        this.state.edges.push(edge_coords);
                    cur_edge_idx++;
                }
            }
        }
    }

    __compile_edge_colors() {
        const { weight_colors } = this.drawing_config;
        const EDGE_COLOR_IDX = 4;
        
        for(var i=0; i < this.state.edges.length; i++) {
            let color = weight_colors[i] || weight_colors || "black";
            
            if(this.state.edges[i][EDGE_COLOR_IDX])
                this.state.edges[i][EDGE_COLOR_IDX] = color;
            else
                this.state.edges[i].push(color)
        }
    }

    __compile_edge_thicknesses() {
        const { weight_thicknesses } = this.drawing_config;   
        const EDGE_THICKNESS_IDX = 5;
        for(var i=0; i < this.state.edges.length; i++) {
            let thickness = weight_thicknesses[i] || weight_thicknesses;
            if(this.state.edges[i][EDGE_THICKNESS_IDX])
                this.state.edges[i][EDGE_THICKNESS_IDX] = thickness;
            else
                this.state.edges[i].push(thickness)
        }
    }

    __compile_layer_annotations() {

    }

    _draw_edges() {
        const X_1_IDX = 0;
        const Y_1_IDX = 1;
        const X_2_IDX = 2;
        const Y_2_IDX = 3;
        const COLOR_IDK = 4;
        const EDGE_THICKNESS_IDX = 5;

        for(var i=0; i < this.state.edges.length; i++) {
            let e = this.state.edges[i];
            push();
            stroke(e[COLOR_IDK]);
            strokeWeight(e[EDGE_THICKNESS_IDX]);
            line(e[X_1_IDX], e[Y_1_IDX], e[X_2_IDX], e[Y_2_IDX])
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
                stroke(cur_layer.color)
                circle(cur_node[0], cur_node[1], this.drawing_config.diameter);
                pop();
            }
        }
    }

    _draw_annotations() {

    }

    
    __has_changed(new_config) {
        var is_equal = _.isEqual(this.drawing_config, new_config);
        return !is_equal;
    }

    __get_updated_configurations(new_config) {
        // return the keys that are different from the configuration object
        var compile_keys = [];
        const keys = Object.keys(new_config);
        for(var i=0; i < keys.length; i++)
            if(!_.isEqual(new_config[keys[i]], this.drawing_config[keys[i]]))
                compile_keys.push(keys[i]);
        return compile_keys;
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
}

class DNNLayer {
    constructor(size, color, name) {
        this.size = size;
        this.name = name;
        this.color = color;
    }
}