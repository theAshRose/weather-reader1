let weatherData = [];

let buttonList = $("#city-list")
let appendedButton = $(("<li><button>"))



let getWeather = function (input) {
    let cityCoord = "http://api.openweathermap.org/geo/1.0/direct?q=%22"+input+"%22&appid=0b2d7b88e4b40f17049aa4aac12a4c03"
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
            $("#today").show();
            $("#main-row").show();
            console.log(weatherData)
            $("#today-city-date").text(weatherData.city.name + " " + moment().format("M/D/Y"))
            $("#today-icon").attr("src", "https://openweathermap.org/img/wn/"+weatherData.list[0].weather[0].icon+"@2x.png")
            $("#today").children().eq(1).text("Temperature: " + weatherData.list[0].main.temp)
            $("#today").children().eq(2).text("Wind speeds: " + weatherData.list[0].wind.speed)
            $("#today").children().eq(3).text("Humidity: " + weatherData.list[0].main.humidity)
            for (x=1; x <  6; x++) {
                $("#" + x).children().eq(0).text(moment().add(x, "d").format("M/D/Y"))
                $("#" + x).children().eq(1).attr("src", "https://openweathermap.org/img/wn/"+weatherData.list[4*x+2].weather[0].icon+"@2x.png")
                $("#" + x).children().eq(2).text("Temperature: " + weatherData.list[4*x+2].main.temp)
                $("#" + x).children().eq(3).text("Wind speeds: " + weatherData.list[4*x+2].wind.speed)
                $("#" + x).children().eq(4).text("Humidity: " + weatherData.list[4*x+2].main.humidity)
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
    }   else 
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
    
})

appendedButton.on("click", function(event){
    let buttonValue = $(event.target).attr("id")
    getWeather(buttonValue)
})

let pageLoad = function(){
    $("#today").hide()
    $("#main-row").hide()
    let buttonString = JSON.parse(localStorage.getItem("buttonString")) || [];
    ///COULD PUT NEW APPENDED BUTTON HERE MAYBE IDK LOL
        buttonString.forEach(function(city){
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