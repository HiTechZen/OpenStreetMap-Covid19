/** Modal **/
const thousandSeparator = (val) => parseFloat(val).toLocaleString('en');

const isVisible = 'is-visible';

const showModal = (countryName, data) => {
  console.log(countryName, data);
  const modalElement = document.getElementById('modal');
  if (!data) {
    modalElement.querySelector('.modal-header__title').innerHTML = `No information found for "${countryName}"`;
    modalElement.querySelector('.modal-header__flag').style.display = 'none';
    modalElement.querySelector('.modal-content__cases-total').innerHTML = '';
    modalElement.querySelector('.modal-content__cases-change span').innerHTML = '';
    modalElement.querySelector('.modal-content__terminal-total').innerHTML = '';
    modalElement.querySelector('.modal-content__terminal-change span').innerHTML = '';
    modalElement.classList.add(isVisible);
    return;
  }
  modalElement.querySelector('.modal-header__title').innerHTML = countryName;
  modalElement.querySelector('.modal-header__flag').src = data.countryInfo.flag;
  modalElement.querySelector('.modal-header__flag').style.display = 'unset';
  modalElement.querySelector('.modal-content__cases-total').innerHTML = thousandSeparator(data.cases);
  modalElement.querySelector('.modal-content__cases-change span').innerHTML = `+${thousandSeparator(data.todayCases)}`;
  modalElement.querySelector('.modal-content__terminal-total').innerHTML = thousandSeparator(data.deaths);
  modalElement.querySelector('.modal-content__terminal-change span').innerHTML = `+${thousandSeparator(data.todayDeaths)}`;
  modalElement.classList.add(isVisible);
};

document.querySelector('[data-close]').addEventListener('click', () => {
  this.parentElement.parentElement.parentElement.classList.remove(isVisible);
});

document.addEventListener('click', e => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
  }
});

document.addEventListener('keyup', e => {
  if (e.key === 'Escape' && document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
  }
});

//** Map **/
const {
  format: { GeoJSON },
  layer: { Vector: VectorLayer },
  Map: OlMap,
  source: { Vector: VectorSource },
  style: { Fill, Stroke, Style, Text },
  View: OlView,
} = ol;

// Left side: name given by the fetched data
// Right side: name given when clicking on map
const countryMap = {
  'Congo': 'Democratic Republic of the Congo',
  'S. Korea': 'South Korea',
  'Libyan Arab Jamahiriya': 'Libya',
  'Syrian Arab Republic': 'Syria',
  'Tanzania': 'United Republic of Tanzania',
  'UAE': 'United Arab Emirates',
  'UK': 'United Kingdom',
  'USA': 'United States of America'
};

// Replace country name in fetched-data with mapped-name from map
const remapCountries = data => data.map((item) => {
  if (Object.keys(countryMap).includes(item.country)) {
    item.country = countryMap[item.country];
  }
  return item;
})

var style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new Stroke({
    color: '#319FD3',
    width: 1,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});

const getVectorLayer = () => new VectorLayer({
  source: new VectorSource({
    url: 'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/examples/data/geojson/countries.geojson',
    format: new GeoJSON(),
  }),
  style: (feature) => {
    style.getText().setText(feature.get('name'));
    return style;
  },
});

const getMap = (vectorLayer) => new OlMap({
  target: 'covid-map',
  layers: [vectorLayer],
  view: new OlView({
    center: [0, 0],
    zoom: 0
  })
});

const highlightStyle = new Style({
  stroke: new Stroke({
    color: '#08f',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(0,255,255,0.1)',
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#0df',
      width: 3,
    }),
  }),
});

const getFeatureOverlay = (map) => new VectorLayer({
  source: new VectorSource(),
  map: map,
  style: (feature) => {
    highlightStyle.getText().setText(feature.get('name'));
    return highlightStyle;
  },
});
