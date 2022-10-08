let weatherData = [];
let buttonList = $("#city-list")

$("#searchBtn").on("click", function(){
    let userInput = $("#user-input").val();
        let appendedButton = $(("<li><button>"))
        appendedButton.text(userInput)
        appendedButton.attr("id", userInput)
        appendedButton.addClass("weather btn btn-block")
        buttonList.append(appendedButton);
        localStorage.setItem(""+userInput, userInput)
    getWeather(userInput);
    // if (weatherData.length === !0) {
    //     for (x = 0; x < weatherData.length)
    // }



    
})


let getWeather = function (input) {
    let cityCoord = "http://api.openweathermap.org/geo/1.0/direct?q=%22"+input+"%22&appid=0b2d7b88e4b40f17049aa4aac12a4c03"
    fetch(cityCoord)
    .then(function(latLon){
        return latLon.json();
    }).then(function(data){
        let lat = data[0].lat
        let lon = data[0].lon
        var citiLoco = "https://api.openweathermap.org/data/2.5/forecast?lat="
        + lat + "&lon="+ lon +"&appid=0b2d7b88e4b40f17049aa4aac12a4c03"
        console.log(data);
        fetch(citiLoco).then(function(targetWeather){
            return targetWeather.json()
        }).then(function(weatherData){
            for (x=0; weatherData.length; x++) {
            
            }
            
        })
    }) 
}   
console.log(weatherData)