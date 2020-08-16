export function addJiHe (map,statesD) {
  const soueces={
    "type": "geojson",
    "data": statesD,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
    'clusterProperties': {
      'mag0': ['+',['get',"LEIJI"]],
    }
  }

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: soueces,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "mag0"],
        "#9AF6FF",1000,
        '#00FFFF',8000,
        '#FFFF00',20000,
        '#F1F075',80000,
        '#F9B196',200000,
        '#F28CB1'
      ],
      "circle-radius": [
        "step",
        ["get", "mag0"],
        10,1000,
        20,8000,
        25,20000,
        30,80000,
        35,200000,
        40,
      ]
    },
    "layout": {
      'visibility':"none"
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source:soueces,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{mag0}",
      "text-size": [
        "step",
        ["get", "mag0"],
        8,1000,
        10,8000,
        12,20000,
        14,80000,
        16,200000,
        18,
      ],
      'visibility':"none"
    },
    paint:{
      'text-color':'red'
    }
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: soueces,
    filter: ["!", ["has", "point_count"]],
    paint: {
       "circle-color": "#11b4da",
       "circle-radius": 8,
    },
    "layout": {
      'visibility':"none"
    },

  });
}