class DeepNeuralNetwork {
    constructor() {
        this.layers = [];
        this.colors = [];
    }

    add_layers(layers) {
        this.layers = layers;
    }

    add_colors(colors) {
        this.colors = colors;
    }

    add_layer(size, color) {
        let new_layer = new DeepNeuralNetworkLayer(size, color);
        this.layers.push(new_layer);
    }

    add_annotation() {

    }

    quick_draw(x, y, layers, colors, radius, layer_spacing, node_spacing) {
        var vertical_spacing = radius + node_spacing
        var horizontal_spacing = radius + layer_spacing

        this.draw_edges(x, y, layers, vertical_spacing, horizontal_spacing, radius);
        
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

    draw_edges(x, y, layers, vertical_spacing, horizontal_spacing, radius) {
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
    constructor(size, color) {
        this.size = size;
        this.color = color;
        this.above = "";
        this.below = "";
        this.input = "";
        this.output = "";
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}