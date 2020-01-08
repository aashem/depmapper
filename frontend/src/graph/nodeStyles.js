
export const shapeList = () => {
const shapeList = [
    'ellipse',
    'triangle',
    'rectangle',
    'round-rectangle',
    'bottom-round-rectangle',
    'cut-rectangle',
    'barrel',
    'rhomboid',
    'diamond',
    'pentagon',
    'hexagon',
    'concave-hexagon',
    'heptagon',
    'octagon',
    'star',
    'tag',
    'vee'
]
 
    return shapeList.map(s => s = {value: s, label: s})
}

export const colorList = () =>{
const colorList = [
    'blue',
    'red',
    'green',
    'teal',
    'yellow',
    'white',
    'black',
    'gray',
    'brown',
]
    return colorList.map(c => c = {value: c, label: c})
}

export const edgeArrowTypes = () => {
    const edgeList = [
        'triangle',
        'tee',
        'none',
        'circle',
        'diamond',
        'square',
        'triangle-cross',
        'triangle-backcurve',
        'triangle-tee',
    ]
    return edgeList.map(c => c = {value: c, label: c})
}
