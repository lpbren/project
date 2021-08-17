let userLocation = prompt("Whats your current location?");
    var APIKey = "166a433c57516f51dfab1f7edaed8413"; 
    var queryURL = "http://www.boredapi.com/api/activity?";
    var queryURLweather = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" + userLocation + "&appid=" + APIKey; 
  
  $("#anything").on("click", function(event){

    event.preventDefault(); 

    $.ajax({
        url: queryURL, 
        method: "GET"
    }).then(function(response){
        $("#taskHeader").text("Task:")
        $("#random-activity").text(JSON.stringify(response.activity)); 
        console.log(response); 

        }); 
   }); 

 $("#priceRange").on("click", function(event){
   // http://www.boredapi.com/api/activity?minprice=0&maxprice=0.1
    event.preventDefault(); 

    let minPrice = prompt("What's your minimum price?"); 
    let maxPrice = prompt("What's your max price?"); 
    activityType = $("priceRange"); 

    $.ajax({
        url: queryURL + "minprice=" + minPrice + "&maxPrice="+ maxPrice, 
        method: "GET"
    }).then(function(response){

        /*console.log(response.price);
        console.log(maxPrice);
       // console.log(minPrice); */  
       $("#taskHeader").text("Task:")
        if(response.price <= maxPrice && response.price >= minPrice){
            $("#priceRangeActivity").text(JSON.stringify(response.activity)); 
        }
        if(maxPrice === null || minPrice === null){
            $("#priceRangeActivity").text("Cannot choose an activity without a min and max price"); 

        }

        }); 
    }); 

    $("#new").on("click", function(event){
   //http://www.boredapi.com/api/activity?type=education

        event.preventDefault(); 

        $.ajax({
        url: queryURL + "type=education", 
        method: "GET"
    }).then(function(response){

       // console.log(minPrice);  
       $("#taskHeader").text("Task:");
       $("#somethingNewActivity").text(JSON.stringify(response.activity)); 
       // console.log(response); 

        }); 
    });      

   $.ajax({
       url:queryURLweather, 
       method: "GET"
   }).then(function(response){

    if(userLocation){

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        $(".cityName").text(response.name); 
        $(".description").text(response.weather.description);
        $(".wind").text("Wind Speed: " + response.wind.speed); 
        $(".humidity").text("Humidity: " + response.main.humidity); 
        $(".temperature").text("Temperature: " + tempF.toFixed(2)); 
    }

   }); 