/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "2ce0b9ed74673bc52166c2445931ed4f";
const beforeApi = ",&appid=";
// to get the temperature in Celsius
const afterApi = "&units=metric";
const server = "http://localhost:3000"

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// we can replace the ubove code with this simple line
let newDate = d.toDateString();

// Main function
const Weather = () => { 
    // getting the values entered by the user for the zip and feelings
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
  
    // getWeather return promise
    getWeather(zip).then((data) => {
      //checking the data received and taking whats needed through destructuring the "data" object recieved
      if (data) {
        const {
          main: {temp},
          name: city,
        } = data;
  
        const allInfoToDisplay = {
          newDate,
          city,
          temp: Math.round(temp), // making it an integer
          feelings,
        };
  
        postData(server + "/add", allInfoToDisplay);
  
        updateUI();
        document.getElementById('entryHolder').style.opacity = 1;
      }
    });
};

// getting the data from the weather api
const getWeather = async (zip) => {
    try {
      const res = await fetch(baseURL + zip + beforeApi + apiKey + afterApi);
      const data = await res.json();
  
    //   if (data.cod != 200) {
    //     // display the error message on UI
    //     error.innerHTML = data.message;
    //     setTimeout(_=> error.innerHTML = '', 2000)
    //     throw `${data.message}`;
    //   }
  
      return data;
    } catch (error) {
      console.log(error);
    }
};

// to check if the button is clicked
document.getElementById("generate").addEventListener("click", Weather);

// posting the data to server
const postData = async (url = "", allInfoToDisplay = {}) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allInfoToDisplay),
    });
  
    try {
      const newData = await res.json();
      console.log(`You just saved`, newData);
      return newData;
    } catch (error) {
      console.log(error);
    }
  };

// retreiving weather data from the server and updating the UI
const updateUI = async () => {
    const res = await fetch(server + "/all");
    try {
      const savedData = await res.json();
  
      document.getElementById("date").innerHTML = savedData.newDate;
      document.getElementById("city").innerHTML = savedData.city;
      document.getElementById("temp").innerHTML = savedData.temp + '&degC';
      document.getElementById("content").innerHTML = savedData.feelings;
    } catch (error) {
      console.log(error);
    }
  };
