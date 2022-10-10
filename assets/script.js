let weatherData = []; //empty array for weather data
let buttonList = $("#city-list") //what we append on page load and submit

let getWeather = function (input) {
    let cityCoord = "https://api.openweathermap.org/geo/1.0/direct?q=%22" + input + "%22&appid=0b2d7b88e4b40f17049aa4aac12a4c03"
    fetch(cityCoord)
        .then(function (latLon) {
            return latLon.json();
        }).then(function (data) {   //to access weather information via city name, we first needed to fetch the coordinates of that city, then fetch the weather for the given coordinates. thats specific to the openweather API
            let lat = data[0].lat
            let lon = data[0].lon
            var citiLoco = "https://api.openweathermap.org/data/2.5/forecast?lat="
                + lat + "&lon=" + lon + "&appid=0b2d7b88e4b40f17049aa4aac12a4c03&units=imperial" //units=imperial had to be added to return sane, normal numbers
            fetch(citiLoco).then(function (targetWeather) {
                return targetWeather.json()
            }).then(function (weatherData) {
                $("#today").show(); //we are showing the weather pages after the data has been retrieved
                $("#main-row").show();
                $("#today-city-date").text(weatherData.city.name + " " + moment().format("M/D/Y")) //using weather data and moment JS to show the city and time
                $("#today-icon").attr("src", "https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png") //this populates the icon
                $("#today").children().eq(1).text("Temperature: " + weatherData.list[0].main.temp)
                $("#today").children().eq(2).text("Wind speeds: " + weatherData.list[0].wind.speed)
                $("#today").children().eq(3).text("Humidity: " + weatherData.list[0].main.humidity)
                for (x = 1; x < 6; x++) { //x had to be 1 here because we are going to multiply in this loop. we cant multiply by 0
                    $("#" + x).children().eq(0).text(moment().add(x, "d").format("M/D/Y")) //using a for loop with some simple math and dom navigation to populate all cards with relevant data
                    $("#" + x).children().eq(1).attr("src", "https://openweathermap.org/img/wn/" + weatherData.list[8 * x - 1].weather[0].icon + "@2x.png")
                    $("#" + x).children().eq(2).text("Temperature: " + weatherData.list[8 * x - 1].main.temp) //8 times X because every 8th item in the index of weather data is the next day, minus 1 to get the daytime
                    $("#" + x).children().eq(3).text("Wind speeds: " + weatherData.list[8 * x - 1].wind.speed) 
                    $("#" + x).children().eq(4).text("Humidity: " + weatherData.list[8 * x - 1].main.humidity)
                }
            })
        })
}

$("#searchBtn").on("click" || "submit", function (event) { //with this event listener we are:
    event.preventDefault();                                                     //preventing default
    let userInput = $("#user-input").val();                     //retrieving text from user as a string, giving it a variable
    let buttonString = JSON.parse(localStorage.getItem("buttonString")) || [];  //pulling an object from local storage to put something in soon
    if (!userInput) {           //making sure the user entered something in the text box, otherwise we arent doing the rest of the work
        alert("invalid input")
    } else {
        let appendedButton = $(("<li></li>"))   //must be locally defined within our function because we are using this to create an element
        appendedButton.text(userInput)  
        appendedButton.attr("id", userInput)
        appendedButton.addClass("weather btn btn-block")
        buttonList.append(appendedButton);
        buttonString.push(userInput) //making a button identical to user input
        localStorage.setItem("buttonString", JSON.stringify(buttonString)); //saving that data
        getWeather(userInput); //pushes user input into our fetch request
    }
})

$(".btn").on("click", function (event) {  //this allows appended buttons to be clicked, we are searching w/ the ID tat matches city name. 
    let buttonValue = $(event.target).attr("id")
    getWeather(buttonValue)
})

let pageLoad = function () { //hides main panels on page load, parses local storage and creates buttons for every string within
    $("#today").hide()
    $("#main-row").hide()
    let buttonString = JSON.parse(localStorage.getItem("buttonString")) || [];
    buttonString.forEach(function (city) {
        let appendedButton = $(("<li></li>"))
        appendedButton.text(city)
        appendedButton.attr("id", city)
        appendedButton.addClass("weather btn btn-block")
        buttonList.append(appendedButton)
    })
}
pageLoad();