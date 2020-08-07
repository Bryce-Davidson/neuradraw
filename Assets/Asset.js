class Asset {

    /**
     * 
     * @param {String} name - the name of the instance
     */
    constructor(name) {
        this.name = name;
        this.drawing_config = {};
        // The assets state
        this.state = {};
        this.state.layers = []
    }

    // Compile compiles all of necessary information into the state object
    compile(config) {
        this.__compile_node_coordinates();
        this.__compile_edge_colors();
        this.__compile_edge_thicknesses();
    }

    // set the assets drawing config
    // also used to check for compilations
    set_drawing_config(config) {
        if(this.Object.keys(this.drawing_config).length==0)
            this.compile();
        else {
            var updated_configurations = this.get_updated_configurations();

            if(this.includes_any(updated_configurations, ["x", "y", "layer_spacing", "node_spacing"]))
                this.__compile_node_coordinates();
            if(updated_configurations.includes("weight_colors"))
                this.__compile_edge_colors();
            if(updated_configurations.includes("weight_thicknesses"))
                this.__compile_edge_thicknesses();
        }
        this.drawing_config = config;
    }

    draw({
        x=0, 
        y=0, 
        diameter=60,
        layer_spacing=120,
        node_spacing=60,
        weight_colors=0,
        weight_thicknesses=0.3,
        weight_alphas=1}) {
        
        
        if(this.has_updates(arguments[0]))
            this.set_drawing_config(arguments[0]);

        this._draw_edges();
        this._draw_nodes() ;
        this._draw_annotations();
    }

    __compile_node_coordinates(x, y, diameter, layer_spacing, node_spacing) {
        const vertical_spacing = diameter + node_spacing
        const horizontal_spacing = diameter + layer_spacing
        var sizes = [];

        for(var i=0; i < this.state.layers.length; i++)
            sizes.push(this.state.layers[i].size);

        for(var i=0; i < this.state.layers.length; i++) {
            const cur_layer = this.state.layers[i];
            const layer_top = vertical_spacing*(cur_layer.size+max(sizes))/2 + y;

            this.state[cur_layer.name] = {}
            this.state[cur_layer.name]["coords"] = []

            for(var j=0; j < cur_layer.size; j++) {
                let center_x = x + 1+diameter/2 + i*horizontal_spacing;
                let center_y = layer_top - j*vertical_spacing;

                this.state[cur_layer.name]["coords"].push([center_x, center_y])
            }
        }
    }

    __compile_edges(weight_colors, weight_thicknesses, weight_alphas) {
        var colors = [color(255,0,0), color(0,0,255)];

        // for n-1 layers
        for(var i=0; i < this.state.layers.length - 1; i++) {
            // get the current layer and the next layer
            var cur_layer = this.state.layers[i];
            var next_layer = this.state.layers[i+1];
            for(var j=0; j < cur_layer.size; j++) {
                var cur_node = this.coords[cur_layer.name].coords[j];
                for(var k=0; k < next_layer.size; k++) {
                    var next_node = this.coords[next_layer.name].coords[k];
                }
            }
        }
    }

    __compile_edge_colors() {

    }

    __compile_edge_thicknesses() {

    }

    _draw_edges() {
        
    }
    // All drawing functions should be marked with a _ and should only be called by the draw function
    _draw_nodes() {

    }
    _draw_annotations() {

    }

    get_updated_configurations(config) {
        var updated_configurations = [];
        for(var key in Object.keys(config)) {
            if(this.drawing_config[key] != config[key])
                updated_configurations.append(key);
        }
        return updated_configurations;
    }

    has_updates() {
        for(var key in Object.keys(config)) {
            if(this.drawing_config[key] != config[key])
                return true
        }
        return false;
    }

    /**
     * If any element of arr2 is in arr1
     * 
     * @param {Array} arr1 - the array to search through
     * @param {Array} arr2 - the array that contains elements to look for
     */
    includes_any(arr1, arr2) {
        return arr2.some(k => arr1.includes(k));
    }
}

// The problem I'm having is that this is giong to change asset to asset and I'm trying to automate the process