const request = require('axios').default;
const fs = require('fs');

const forecast = ((url, callback) => {

    console.log(url + ' forecast');
    request.get(url)
        .then(function (response) {
            const responseJSON = response.data;
            const data = {
                latitude: responseJSON.latitude,
                longitude: responseJSON.longitude,
                timezone: responseJSON.timezone,
                temperature: responseJSON.currently.temperature,
                precipProbability: responseJSON.currently.precipProbability,
                summary:  responseJSON.hourly.summary
            }
            console.log(data + ' forecast');
            //console.log(data);
            callback(undefined, data);
            //console.log(`It is currently ${data.temperature} out. There is a ${data.precipProbability}% chance of rain ` );
        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            console.log(error, 2);
            callback(error, undefined);
            
        })
        .finally(function () {
            // always executed
        });
}) 

module.exports = forecast