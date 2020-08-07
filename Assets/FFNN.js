class FNN {
    constructor(name) {
        this.name = name;
        this.config = {}
        // Asset specific attributes
        this.layers = []
    }
    
    // the compile object will store all the necessary information in the class
    compile(config) {
        // Calculate node coordinates
        
    }

    // The draw object will draw the object to the screen once from computed results
    draw() {
        // Draw the edges on the 
    }

    // The update function will update the config object and call compile
    update(config_changes) {
        this.compile();
        this.draw();
    }

    // Asset specific methods


}