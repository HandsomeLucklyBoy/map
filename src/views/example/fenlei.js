const states = require('./dd.json')

export function addFLMap(map) {
  map.addSource('state1', {
    'type': 'geojson',
    'data': states
  });
  map.addLayer(
    {
      'id': '3d-buildings',
      'source': 'state1',
      'type': 'fill-extrusion',
      'paint': {
        'fill-extrusion-color': 'red',
        'fill-extrusion-height':  ['get', 'LEIJI'],
        'fill-extrusion-base': 0
        ,
        'fill-extrusion-opacity': 0.6
      },
      "layout": {
        'visibility':"none"
      },
    }
  );
}