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


There needs to be some better way to incorperate layer drawing individually and give more access
to the draw_edges commands in order to shift things or turn things off as needed

I feel like i am writing two disjointed things that really should be together I just havn't found a
simple way to incorperate things elegantly yet.

I will try to do this after my exam, but for now i will need to stop.