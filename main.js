fetch('https://disease.sh/v3/covid-19/countries')
  .then(resp => resp.json())
  .then(data => {
    const covidData = remapCountries(data);
    document.querySelector('.loader').remove();

    const vectorLayer = getVectorLayer();
    const map = getMap(vectorLayer);   
    const featureOverlay = getFeatureOverlay(map);

    let highlight;
    const displayFeatureInfo = (e, isClick = false) => {
      const pixel = map.getEventPixel(e.originalEvent);

      vectorLayer.getFeatures(pixel).then(function (features) {
        const feature = features.length ? features[0] : undefined;
        if (feature && isClick) {
          const foundCountry = feature.get('name');
          const countryData = covidData.find(countryData => countryData.country === foundCountry);
          if (countryData) {
            showModal(foundCountry, countryData);
          } else {
            showModal(foundCountry);
          }
        }

        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature);
          }
          highlight = feature;
        }
      });
    };
  
    map.on('pointermove', function (e) {
      if (e.dragging) {
        return;
      }
      displayFeatureInfo(e);
    });

    map.on('click', function(e) {
      displayFeatureInfo(e, true);
    });
  })
  .catch(() => alert('Something went wrong, please try again later'));
