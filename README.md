Layer annotations options
```javascript
var annotation = {
    layer: {
        dotted: true, false
        above: {
            dimensions: [x, y] 
            type: "latex", "text"
            text: "\\int{x^2}dx"
        },
        below: {
            dimensions: [x, y] 
            type: "latex", "text"
            text: "\\int{x^2}dx"
        },
        within: {
            type: "latex", "text"
            text: "\\int{x^2}dx"
        }
    }
    nodes: [ 
        {
            nodes: [Number]
                # only entering a -1 will execute the code below on each node
            above: {
                dimensions: [x, y], 
                type: "latex", "text",
                text: "\\int{x^2}dx"
            },
            below: {
                dimensions: [x, y] 
                type: "latex", "text"
                text: "\\int{x^2}dx"
            },
            before: {
                dimensions: [x, y] 
                type: "latex", "text"
                text: "\\int{x^2}dx"
            },
            after: {

            },
            within: {
                type: "latex", "text"
                text: "\\int{x^2}dx"
            }
        }
    ]
}
```