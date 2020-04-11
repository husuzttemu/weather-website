fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
})


const getWeather =  (address, callback) =>  {
    
    const pageLink = `http://localhost:5000/weather?address=${address}`;

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
const weatherText = document.getElementById('weatherText');
const errorText = document.getElementById('errorText');

//errorText.textContent = "aaaa";
//weatherText.textContent = "bbbb";

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault(); //Ekranda yazılan text in silinmesini engeller...
    const address = searchText.value.replace('İ','I').replace('ı','i');

    //address
    console.log(address);

    messageText1.textContent = "";
    messageText2.textContent = "";

    getWeather(address, (error,data) => {
        //console.log(error, data);
        if(error) {
            return messageText1.textContent = error.code;
        }

        messageText1.textContent = data.location;
        messageText2.textContent = data.summary;
        
        
    });

})

