
 var daysEl = document .querySelector('.defulat-day');
 var dateEl = document .querySelector('.defult-time');
 var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",]
 var inputLocation = document.getElementById('input-location');
 var butnEl = document.querySelector('.btn-seacrh');
 var key = "d77f14b42228c4b277b5436722ca0de8" ;
 var iconsEl = document.querySelector('.icon');
 var searchResult = document.querySelector('.search-result');
 var listContant = document.getElementById("listContant");


  ////////  displat Day   ////////
 var day = new Date ();
 var dayOfWeek = days[day.getDay()];
 console.log(dayOfWeek);
 daysEl .innerHTML = dayOfWeek ;



  ////////  displat Date   ////////
  var month = day.toLocaleString("default", {month: "long"});
  var date = day.getDate();
  var year = day.getFullYear();
  console.log(date,  month , year );
 dateEl.innerHTML = date + " "  + month + " " + year ;



  //////// event on search    ////////
 butnEl.addEventListener("click",(e)=>{
    e.preventDefault();
    if (inputLocation.value !== "" ){
        var search =   inputLocation.value ;
        inputLocation.value = "";
        getLocation(search)
        
    }
    else {
        Swal.fire("Please Enter Location");
    }
 })


   ////////  get Location  ////////
   async function getLocation(name){
    try{
       var location = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key} `
        var data = await fetch(location);
        var res = await data.json()
        console.log(res);
        if(res.cod == '404'){
         Swal.fire({
            title: "Oops...",
            text: "city not found , Please Try again and enter the name correctly",
          });
        }

        var cartonaa = 
        `
           <img src="https://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png" alt="">
           <h2 class="weather-temp">${Math.round(res.main.temp -273.15)}°C</h2>
           <h3 class="cloud-text">${res.weather[0].description}</h3>
             
        `
        iconsEl.innerHTML=cartonaa

        var cartonaaa = 
        `
        <div class="contect">
          <p class="Title">City</p>
          <span class="location">${res.name}</span>
         </div>
         <div class="contect">
        <p class="Title">Temp</p>
       <span class="location">${Math.round(res.main.temp -275.15)}°C</span>
       </div>
       <div class="contect">
        <p class="Title">Humidity</p>
        <span class="location">${res.main.humidity}%</span>
       </div>
       <div class="contect">
        <p class="Title">wind speed</p>
        <span class="location">${res.wind.gust}km/h</span>
       </div>
        `
       searchResult .innerHTML = cartonaaa
       ClimateForecast(res.coord.lat,res.coord.lon);

   }
    catch(err){
        console.log(err);

    }
 }

 
 
 ////////  ClimateForecast for 3 day  //////
 function ClimateForecast(lat, long) {
   var forCastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=ar`;
   var xhr = new XMLHttpRequest();
   xhr.open('GET', forCastURL, true);
   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
       var res = JSON.parse(xhr.responseText);
       var forecastDay = [];
       var dayForecast = res.list.filter(function(forecast) {
         var forecastDate = new Date(forecast.dt_txt).getDate();
         if (forecastDay.indexOf(forecastDate) === -1) {
           forecastDay.push(forecastDate);
           return true;
         }
         return false;
       });
       console.log(dayForecast);

       listContant.innerHTML = "";
       dayForecast.forEach(function(content, index) {
         if (index <= 2) {
           listContant.insertAdjacentHTML("beforeend", forCast(content));
         }
       });
     }
   };
   xhr.send();
 }

 function forCast(frcontent) {
   var day = new Date(frcontent.dt_txt);
   var dayName = new Intl.DateTimeFormat('EG-ar', { weekday: 'long' }).format(day);
   console.log(dayName);

   return '<li>' +
             '<img src="https://openweathermap.org/img/wn/' + frcontent.weather[0].icon + '@4x.png" alt="">' +
             '<span>' + dayName + '</span>' +
             '<span class="temp-day">' + Math.round(frcontent.main.temp -273.15) + '°C</span>' +
           '</li>';
 }

