function setup() {
    createCanvas(1200, 1000);
  }
  
  function draw() {
    clear();
    var layers = [4,3,3,3,2]
    draw_neural_net(90, 30, layers, colors=0, 60, 90, 10)
    // save("mySVG.svg");
    noLoop();
  }
  
  
  function draw_neural_net(x, y, layers, colors, radius, layer_spacing, node_spacing) {
    n_layers = layers.length
    
    vertical_spacing = radius + node_spacing
    horizontal_spacing = radius + layer_spacing
    
    draw_edges(x, y, layers, vertical_spacing, horizontal_spacing, radius);
    
    for(var i=0; i < layers.length; i++) {
      var layer_size = layers[i];
      
      layer_top = vertical_spacing*(layer_size+max(layers))/2 + y;
      
      var top_circle_center_for_layer = layer_top - layer_size*
          vertical_spacing;
      var bottom_circle_center_for_layer = layer_top;
      for(var j=0; j < layer_size; j++) {  
        let center_x = x + 1+radius/2 + i*horizontal_spacing;
        let center_y = layer_top - j*vertical_spacing;
        circle(center_x, center_y, radius)
        
        rectMode(CENTER);
        if(i==0) {
          rect(center_x-radius-20, center_y, radius+10, radius-10)
          line(center_x-radius/1.35, center_y, center_x-radius/2, center_y)
        }
  //       Annotations
        rect(center_x, top_circle_center_for_layer, radius+10, radius-10)
        rect(center_x, bottom_circle_center_for_layer + radius+10, radius+10, radius-10)
      }
    }
  }
  
  
  function draw_edges(x, y, layers, vertical_spacing, horizontal_spacing, radius) {
    // Gather layers sizes
    var a = layers.slice(0,-1);
    var b = layers.slice(1);
    var c = a.map(function(e, i) {
      return [e, b[i]];
    });
    
    // For each pair of layers
    for(var n=0; n < c.length; n++) {
      layer_size_a = c[n][0];
      layer_size_b = c[n][1];
    
    
      layer_top_a = vertical_spacing*(layer_size_a+max(layers))/2 + y + vertical_spacing;
      layer_top_b = vertical_spacing*(layer_size_b+max(layers))/2 + y + vertical_spacing;
  
      // for each node in layer a
      for(var m=0; m < layer_size_a; m++) {  
        let a_center_x = x + 1+radius/2 + (n)*horizontal_spacing + radius/2;
        let a_center_y = layer_top_a - (m+1)*vertical_spacing;
  
        // for each node in layer b
        for(var o=0; o < layer_size_b; o++) {
          let b_center_x = x + 1+radius/2 + (n+1)*horizontal_spacing - radius/2;
          let b_center_y = layer_top_b - (o+1)*vertical_spacing;
          
          // Pos Neg Values
          // let e_colors = ["blue", "red"]
          // stroke(e_colors[Math.floor(Math.random() * e_colors.length)])
          line(a_center_x, a_center_y, b_center_x,b_center_y)
        }
      }
    }
  }