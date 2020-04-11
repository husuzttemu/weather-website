const request = require('axios').default;
const fs = require('fs');


const geocode = (url,callback) => {

    request.get(url)
      .then(function (response) {
        // handle success
        console.log(url  + ' geocode');
        const latitude = response.data.features[0].center[1];
        const longitude = response.data.features[0].center[0];
        const location = response.data.features[0].place_name;
        const data = {
          latitude : latitude,
          longitude: longitude,
          location
        }
        console.log(data + ' geocode');
        callback(undefined, data);
      })
      .catch(function (error) {
        // handle error
        console.log(error, 1);
        callback(error,undefined);
      })
      .finally(function () {
        // always executed
      });

  }

  module.exports =  geocode
  
