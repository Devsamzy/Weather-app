const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})
console.log('Hello World!');
const url =
	'https://api.openweathermap.org/data/2.5/weather';
const apiKey ='d65c6a53fe18794eb8449c6f6752cd5a';


$(document).ready(function () {
  
  $('.loader').show();
$('.weather-container').hide();
    getLocation();

	weatherFn('Lagos');
	$('#input').on('keypress', function (e) {
	if (e.which === 13) { // 13 = Enter key
		const city = $(this).val();
		if (city) {
			weatherFn(city);
			 $('.loader').show();
        $('.weather-container').hide();
		}
	}
});
	
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Fallback to default city if geolocation fails
        weatherFn('Lagos');
      }
    );
  } else {
    // Geolocation not supported, fallback to default city
    weatherFn('Lagos');
  }
}

// Function to get weather by coordinates
async function getWeatherByCoords(lat, lon) {
  const temp = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(temp);
    const data = await res.json();
    if (res.ok) {
      weatherShowFn(data);
    } else {
      alert('Unable to get weather for your location');
      weatherFn('Lagos'); // Fallback
    }
  } catch (error) {
    console.error('Error:', error);
    weatherFn('Lagos'); // Fallback
  }finally {
    // Hide loader and show weather container regardless of success/failure
    $('.loader').fadeOut(500);
    $('.weather-container').fadeIn(500);
  }
}



async function weatherFn(cName) {
  const temp=`${url}?q=${cName}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(temp);
    const data = await res.json();
    if (res.ok) {
      weatherShowFn(data)
    }
    else {
      alert('city not found')
    }
  } catch (error) {
    console.error('error',error)
  }finally {
  // Hide loader and show weather container regardless of success/failure
  $('.loader').fadeOut(500);
  $('.weather-container').fadeIn(500);
}
}

function weatherShowFn(data) {
  	$('#city-name').html(`${data.sys.country},${data.name}`);
	  $('#date').text(moment().
		format('ddd-DD-MM'));
	  $('#temperature').
		html(`${Math.round(data.main.temp)}`);
	  $('#wind-speed').
		html(`${data.wind.speed} m/s`);
		$('#humidity').html(`${data.main.humidity}%`)
  	$('#pressure').html(`${data.main.pressure} hpa`)
    $('#icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
	  $('info').fadeIn();
    $('#main').text(data.weather[0].main);
    $('#weather-details').text(data.weather[0].description);
    $('#feel').html(`${data.main.feels_like}°C`);
   	$('#speed').
		html(`${data.wind.speed} m/s`);
	  $('#visi').
		html(`${data.visibility} km`);
		$('#direction').html(`${data.wind.deg}°`)
		
}
