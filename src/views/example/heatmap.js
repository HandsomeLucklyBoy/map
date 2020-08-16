const states = require('./dian1.json')

export  function addHeatMap(map,express2){
  map.addLayer({
    "id": "states-heat",
    "type": "heatmap",
    "source":{
      "type": "geojson",
      "data": states
    },
    "paint": {
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "NEW"],
        0, 0,
        2000, 1
      ],
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0, 1,
        9, 3
      ],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "#272B2B",
        0.25, "#927903",
        0.6, "#FFD403",
        1, "#FF0000"
      ],
      "heatmap-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        1, 8,
        9, 20
      ],
      "heatmap-opacity":
          [
          "interpolate",
          ["linear"],
          ["zoom"],
          2, 1,
          7, 0
        ],
    }
  });

  map.addLayer({
    "id": "states-point",
    "type": "circle",
    "source": {
      "type": "geojson",
      "data": states
    },
    "paint": {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        7, [
          "interpolate",
          ["linear"],
          ["get", "NEW"],
          1, 1,
          2000, 10
        ],
        16, [
          "interpolate",
          ["linear"],
          ["get", "NEW"],
          1, 10,
          2000, 80
        ]
      ],
      "circle-color":express2,
       "circle-opacity": [
         "interpolate",
         ["linear"],
         ["zoom"],
         3, 0,
         10, 1
       ]
    }
  });
}
