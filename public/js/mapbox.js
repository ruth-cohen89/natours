/* eslint-disable */
exports.uppercase = str => str.toUpperCase()
exports.a = 1
export const displayMap = (locations) => {
mapboxgl.accessToken = 
'pk.eyJ1IjoicnV0aC1jb2hlbjg5IiwiYSI6ImNsMDhicHYwZTAxeWUza3F1aHpqcGp4djYifQ.aKSKkgyvvrMIEveBJu_w4g';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ruth-cohen89/cl08eix4s003d14qt3890mgto',
  scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  }).setLngLat(loc.coordinates).addTo(map);

  new mapboxgl.Popup({
      offset: 30
  })
  .setLngLat(loc.coordinates)
  .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
  .addTo(map);

  bounds.extend(loc.coordinates);
});

  map.fitBounds(bounds,  {
    padding: {
      top: 200,
      buttom: 150,
      left: 100,
      right: 100
    }
  });
};
