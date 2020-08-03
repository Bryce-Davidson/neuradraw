Layer annotations options
```javascript
var annotation = {
    layer: {
        dotted: true, false
        above: {
            dimensions: [x, y] 
            type: "latex", "text"
            text: "\\int{x^2}"
        },
        below: {
            dimensions: [x, y] 
            type: "latex", "text"
            text: "\\int{x^2}"
        },
        within: {
            type: "latex", "text"
            text: "\\int{x^2}"
        }
    }
    nodes: [ 
        {
            nodes: [Number]
                # only entering a -1 will execute the code below on each node
            above: {
                dimensions: [x, y], 
                type: "latex", "text",
                text: "\\int{x^2}"
            },
            below: {
                dimensions: [x, y] 
                type: "latex", "text"
                text: "\\int{x^2}"
            },
            before: {
                dimensions: [x, y] 
                type: "latex", "text"
                text: "\\int{x^2}"
            },
            after: {

            },
            within: {
                type: "latex", "text"
                text: "\\int{x^2}"
            }
        }
    ]
}
```