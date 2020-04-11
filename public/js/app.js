fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
})


const getWeather =  (address, callback) =>  {
    
    //const pageLink = `http://localhost:3000/weather?address=${address}`;
    const pageLink = `/weather?address=${address}`;

    fetch(pageLink).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                callback(data.error, undefined);
            }
            callback(undefined, data);
        })
    })

}

const weatherForm = document.querySelector('form');
const searchText = document.getElementById('txtLocation');
const messageText1 = document.getElementById('messageText1');
const messageText2 = document.getElementById('messageText2');
const messageText3 = document.getElementById('messageText3');
const messageText4 = document.getElementById('messageText4');

//errorText.textContent = "aaaa";
//weatherText.textContent = "bbbb";

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault(); //Ekranda yazılan text in silinmesini engeller...
    const address = searchText.value.replace('İ','I').replace('ı','i');

    //address
    console.log(address);

    messageText1.textContent = "";
    messageText2.textContent = "";
    messageText3.textContent = "";
    messageText4.textContent = "";

    getWeather(address, (error,data) => {
        //console.log(error, data);
        if(error) {
            return messageText1.textContent = error.code;
        }

        messageText1.textContent = data.location;
        messageText2.textContent = "Coordinates: " + data.latitude + "," + data.longitude;
        messageText3.textContent = data.summary;
        messageText4.textContent = data.prediction;
        
        
    });

})

