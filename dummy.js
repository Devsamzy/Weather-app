// Add this to your CSS or style section
/*

*/

$(document).ready(function () {
  // Show loader immediately when page loads
  $('.loader').show();
  $('.weather-container').hide();
  
  // First try to get user's location
  getLocation();
  
  // Set up search functionality
  $('#input').on('keypress', function (e) {
    if (e.which === 13) { // 13 = Enter key
      const city = $(this).val();
      if (city) {
        $('.loader').show();
        $('.weather-container').hide();
        weatherFn(city);
      }
    }
  });
});

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
  } finally {
    // Hide loader and show weather container regardless of success/failure
    $('.loader').fadeOut(500);
    $('.weather-container').fadeIn(500);
  }
}

async function weatherFn(cName) {
  const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(temp);
    const data = await res.json();
    if (res.ok) {
      weatherShowFn(data);
    } else {
      alert('City not found');
    }
  } catch (error) {
    console.error('Error', error);
  } finally {
    // Hide loader and show weather container regardless of success/failure
    $('.loader').fadeOut(500);
    $('.weather-container').fadeIn(500);
  }
}

function weatherShowFn(data) {
  // Your existing weather display code
  $('#city-name').text(data.name);
  $('#date').text(moment().format('ddd-DD-MM'));
  // ... rest of your display code ...
  
  // Show weather container (already handled in finally blocks)
}