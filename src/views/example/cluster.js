import mapboxgl from 'mapbox-gl'
import data from './clusters.json'


export function addCluster (map) {
      const colors =['#EF5B56','#61FFA1','#C7D5DC'];

        map.addSource('dian', {
          'type': 'geojson',
          'data':data,
          'cluster': true,
          'clusterRadius': 80,
          'clusterProperties': {
            'mag0': ['+',['get',"LEIJI"]],
            'mag1': ['+',['get',"NOW"]],
            'mag2': ['+', ['get', "OK"]],
            'mag3': ['+', ['get', "DEATH"]],
          }
        });

        map.addLayer({
          'id': 'cluster_circle',
          'type': 'circle',
          'source': 'dian',
          'filter': ['!=', 'cluster', true],
          'paint': {
          },
          "layout": {
            'visibility':"none"
          },
        });

        map.addLayer({
          'id': 'cluster_label',
          'type': 'symbol',
          'source': 'dian',
          'filter': ['!=', 'cluster', true],
          'layout': {
            'visibility':"none"
          },
          'paint': {
          }
        });

        let markers = {};
        let markersOnScreen = {};

        function updateMarkers() {
          const newMarkers = {};
          const features = map.querySourceFeatures('dian');
          let id;
          for (let i = 0; i < features.length; i++) {
            let coords = features[i].geometry.coordinates;
            const props = features[i].properties;
            if (!props.cluster) continue;
             id = props.cluster_id;

            let marker = markers[id];
            if (!marker) {
              const el = createDonutChart(props);
              marker = markers[id] = new mapboxgl.Marker({
                element: el
              }).setLngLat(coords);
            }
            newMarkers[id] = marker;

            if (!markersOnScreen[id]) marker.addTo(map);
          }
          for ( id in markersOnScreen) {
            if (!newMarkers[id]) markersOnScreen[id].remove();
          }
          markersOnScreen = newMarkers;
        }

        map.on('data', function(e) {
          if (e.sourceId !== 'dian' || !e.isSourceLoaded) return;
          map.on('move', updateMarkers);
          map.on('moveend', updateMarkers);
          updateMarkers();
        });

      function createDonutChart(props) {
        let offsets = [];
        let counts = [
          props.mag1,
          props.mag2,
          props.mag3
        ];
        let total = 0;
        for (let i = 0; i < counts.length; i++) {
          offsets.push(total);
          total += counts[i];
        }
        let fontSize =
          total >= 600000 ? 22 : total >= 400000 ? 20 : total >= 60000 ? 18 : 16;
        let r = total >= 600000 ? 50 : total >= 400000 ? 45 : total >= 60000 ? 40 : 35;
        let r0 = Math.round(r * 0.6);
        let w = r * 2;

        let html =
          '<div><svg width="' +
          w +
          '" height="' +
          w +
          '" viewbox="0 0 ' +
          w +
          ' ' +
          w +
          '" text-anchor="middle" style="font: ' +
          fontSize +
          'px sans-serif; display: block">';

        for (let i = 0; i < counts.length; i++) {
          html += donutSegment(
            offsets[i] / total,
            (offsets[i] + counts[i]) / total,
            r,
            r0,
            colors[i]
          );
        }
        html +=
          '<circle cx="' +
          r +
          '" cy="' +
          r +
          '" r="' +
          r0 +
          '" fill="white" /><text dominant-baseline="central" transform="translate(' +
          r +
          ', ' +
          r +
          ')">' +
          numZ(total)+
          '</text></svg></div>';

        let el = document.createElement('div');
        el.innerHTML = html;
        return el.firstChild;
      }

      function donutSegment(start, end, r, r0, color) {
        if (end - start === 1) end -= 0.00001;
        let a0 = 2 * Math.PI * (start - 0.25);
        let a1 = 2 * Math.PI * (end - 0.25);
        let x0 = Math.cos(a0),
          y0 = Math.sin(a0);
        let x1 = Math.cos(a1),
          y1 = Math.sin(a1);
        let largeArc = end - start > 0.5 ? 1 : 0;

        return [
          '<path d="M',
          r + r0 * x0,
          r + r0 * y0,
          'L',
          r + r * x0,
          r + r * y0,
          'A',
          r,
          r,
          0,
          largeArc,
          1,
          r + r * x1,
          r + r * y1,
          'L',
          r + r0 * x1,
          r + r0 * y1,
          'A',
          r0,
          r0,
          0,
          largeArc,
          0,
          r + r0 * x0,
          r + r0 * y0,
          '" fill="' + color + '" />'
        ].join(' ');
      }

      function numZ (num) {
         if(num>10000){
           let mun1 = num/10000
          let shu = mun1.toFixed(2);
          return shu.toLocaleString()+"万"
         }
        if(num<10000){
           return num.toLocaleString()
         }
       }
    }
