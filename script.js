var latitude;
var longitude;

let openweaterApiKey = "YOUR_KEY_HERE";

function fetchData() {

  inProgress(true);

	var city = $( "#inputCity").val();
 	$("#inputCity").val("");
  $("#map").html("");

	$.ajax({
      type: 'GET',
      url: "http://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + openweaterApiKey + "&units=metric",
      success: function(response) {  
  			var icon = "http://openweathermap.org/img/w/"+ response["weather"][0]["icon"]+ ".png";
        var table = $("<table class='table'><tr><th>" + 
				response["weather"][0]["description"].replace(/\b\w/g, c => c.toUpperCase()) +
        		" <img src='" +  icon + "' alt='Weather icon'></div></th></tr>");

 			  var sunset = new Date(response.sys.sunset * 1000);
 			  var sunrise = new Date(response.sys.sunrise * 1000);

  			table.append("<tr><td>City:</td><td>" + response.name+ "</td></tr>");
        table.append("<tr><td>Country:</td><td>" + response.sys.country + "</td></tr>");
        table.append("<tr><td>Current Temperature:</td><td>" + response.main.temp + "°C</td></tr>");
        table.append("<tr><td>Maximum Temperature:</td><td>" + response.main.temp_max + "°C</td></tr>");
        table.append("<tr><td>Minimum Temperature:</td><td>" + response.main.temp_min + "°C</td></tr>");
        table.append("<tr><td>Humidity:</td><td>" + response.main.humidity + "</td></tr>");
        table.append("<tr><td>sunrise:</td><td>" + getTimeOfDay(sunrise) + "</td></tr>");
        table.append("<tr><td>sunset:</td><td>" + getTimeOfDay(sunset) + "</td></tr>");
        table.append("<tr><td>Latitude:</td><td>" + response.coord.lat + "</td></tr>");
        table.append("<tr><td>Longitude:</td><td>" + response.coord.lon + "</td></tr>");
    
        $("#result").html(table);
        initMap(response.coord.lat,response.coord.lon);
        
        inProgress(false);
      },
      error: function (xhr, status, error) {
        inProgress(false);
        alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
      }
    });
}

function inProgress(inProgress){
    if(inProgress){
      $("#result").html('');
      $("#progress").show();
      $("#btnFetch").hide();     
    }
    else{
      $("#btnFetch").show();
      $("#progress").hide();
    }
}

function getTimeOfDay(date){
	var hours = ("0" + date.getHours()).slice(-2);
	var minutes = ("0" + date.getMinutes()).slice(-2);

	return hours + ":" + minutes;
}

let map;

function initMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: Number(latitude), lng: Number(longitude) },
    zoom: 8,
  });
}