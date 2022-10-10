let weatherData = []; //empty array for weather data
let buttonList = $("#city-list") //what we append on page load and submit


let getWeather = function (input) {
    let cityCoord = "https://api.openweathermap.org/geo/1.0/direct?q=%22"+input+"%22&appid=0b2d7b88e4b40f17049aa4aac12a4c03"
    fetch(cityCoord)
    .then(function(latLon){
        return latLon.json();
    }).then(function(data){
        let lat = data[0].lat
        let lon = data[0].lon
        var citiLoco = "https://api.openweathermap.org/data/2.5/forecast?lat="
        + lat + "&lon="+ lon +"&appid=0b2d7b88e4b40f17049aa4aac12a4c03&units=imperial"
        console.log(data);
        fetch(citiLoco).then(function(targetWeather){
            return targetWeather.json()
        }).then(function(weatherData){
            $("#today").show(); //we are showing the weather pages after the data has been retrieved
            $("#main-row").show();
            $("#today-city-date").text(weatherData.city.name + " " + moment().format("M/D/Y")) //using weather data and moment JS to show the city and time
            $("#today-icon").attr("src", "https://openweathermap.org/img/wn/"+weatherData.list[0].weather[0].icon+"@2x.png") //this populates the icon
            $("#today").children().eq(1).text("Temperature: " + weatherData.list[0].main.temp) 
            $("#today").children().eq(2).text("Wind speeds: " + weatherData.list[0].wind.speed)
            $("#today").children().eq(3).text("Humidity: " + weatherData.list[0].main.humidity)
            for (x=1; x <  6; x++) {
                $("#" + x).children().eq(0).text(moment().add(x, "d").format("M/D/Y")) //using a for loop with some simple math
                $("#" + x).children().eq(1).attr("src", "https://openweathermap.org/img/wn/"+weatherData.list[8*x-1].weather[0].icon+"@2x.png")
                $("#" + x).children().eq(2).text("Temperature: " + weatherData.list[8*x-1].main.temp)
                $("#" + x).children().eq(3).text("Wind speeds: " + weatherData.list[8*x-1].wind.speed)
                $("#" + x).children().eq(4).text("Humidity: " + weatherData.list[8*x-1].main.humidity)
            }
        })
    }) 
}   





$("#searchBtn").on("click" || "submit", function(event){
    event.preventDefault();
    let userInput = $("#user-input").val();
    let buttonString = JSON.parse(localStorage.getItem("buttonString")) || [];
    if (!userInput) {
        alert("invalid input")
    }   else {
        let appendedButton = $(("<li></li>"))
        appendedButton.text(userInput)
        appendedButton.attr("id", userInput)
        appendedButton.addClass("weather btn btn-block")
        buttonList.append(appendedButton);
        buttonString.push(userInput)
        localStorage.setItem("buttonString", JSON.stringify(buttonString));
    getWeather(userInput);
    // if (weatherData.length === !0) {
    //     for (x = 0; x < weatherData.length)
    // }
    }  
})

$(".btn").on("click", function(event){
    let buttonValue = $(event.target).attr("id")
    getWeather(buttonValue)
})

let pageLoad = function(){
    $("#today").hide()
    $("#main-row").hide()
    let buttonString = JSON.parse(localStorage.getItem("buttonString")) || [];
    ///COULD PUT NEW APPENDED BUTTON HERE MAYBE IDK LOL
        buttonString.forEach(function(city){
            let appendedButton = $(("<li></li>"))
            appendedButton.text(city)
            appendedButton.attr("id", city)
            appendedButton.addClass("weather btn btn-block")
            buttonList.append(appendedButton)
        })
    // for (x=0;x<loadingButtons.length;x++) {
    //     appendedButton.text(loadingButtons)
    //     appendedButton.attr("id", loadingButtons)
    //     appendedButton.addClass("weather btn btn-block")
    //     buttonList.append(appendedButton);
}

pageLoad();
// console.log(weatherData)
// "+weatherData.list[0].weather.icon.val()+"