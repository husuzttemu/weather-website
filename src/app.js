const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

let searchAddress = "";

const TOKENDARKSKY = '27daed0d0eb1eb18801e8a5c67fa7676';
const TOKENMAPBOX = 'pk.eyJ1IjoiaHV6dGV0aWsiLCJhIjoiY2s4M2ljczJuMHZhcjNvbXdqN3RjYWJuYiJ9.mMBtggYYk1-GyxyckH7GsQ';



const path = require('path');
const express = require('express');
const hbs = require('hbs');


const app = express()
const port = 5000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and view location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//Setup static directory to use
app.use(express.static(publicDirectoryPath));


//console.log(__dirname)
//console.log(path.join(__dirname,'../public'));

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Hüseyin'
    });
    
})

app.get('/help', (req, res) => {

    res.render('help', {
        helpText: "I can help you",
        title: "Help",
        name: "Hüseyin"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Hüseyin"
    })
});

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: "404",
        messageText: "Hahaha ! Surpriseeee"
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send('Please enter address!')
    }

    const searchAddress = req.query.address;
    const ADDRESS = `encodeURIComponent("${searchAddress}").json`;
    const URLMAPBOX = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ADDRESS}?access_token=${TOKENMAPBOX}`;

    console.log(URLMAPBOX);
    console.log("1");

    geocode(URLMAPBOX, (error, {latitude, longitude, location} = {}) =>  { 
        console.log("2");
            if (error) {
                console.log("3 : ", error);
                if (error.code === "404") {
                    return res.send({
                        status: error.code 
                     })
                }
                else {
                    return res.send({
                        error: error
                     })
                }
            }
            
            const coordinates = `${latitude},${longitude}`;
            const url = `https://api.darksky.net/forecast/${TOKENDARKSKY}/${coordinates}?units=si`;
            console.log(url, "forecast");
            
            forecast(url, (error, response) => {
                if (error) {
                    if (error.response.status === "404") {
                        return res.send({
                            status: error.response.status,
                            statusText:  error.response.statusText
                        })
                    }

                    else {
                        return res.send({
                            error: error
                        })
                    }
                }
                else {
                    return res.send({
                        summary: response.summary,
                        timezone: response.timezone,
                        temperature: response.temperature,
                        address: searchAddress,
                        location: location
                    });
                }
            })
          });

})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send('You must search criteria!')
    }

    console.log(req.query.search);
    res.send(
        {
            products : []
        }
    );
})


app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        messageText: "No page found"
    });
})


app.listen(port, () => {});