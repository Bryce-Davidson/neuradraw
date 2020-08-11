class Asset {
    constructor(name) {
        this.name = name;
        this.drawing_config = {};
        this.state = {};
        this.__num_draws = 0;
    }

    __update_drawing_config(updated_config) {
        this.drawing_config = {
            ...this.drawing_config,
            ...updated_config
        }
    }

    __get_compile_keys(new_config) {
        var compile_keys = [];
        const keys = Object.keys(new_config);
        for(var i=0; i < keys.length; i++)
            if(!_.isEqual(new_config[keys[i]], this.drawing_config[keys[i]]))
                compile_keys.push(keys[i]);
        return compile_keys;
    }
}
