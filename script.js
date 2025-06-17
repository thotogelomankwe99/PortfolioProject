navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max&timezone=auto`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const current = data.current_weather;
          const forecastDays = data.daily.time;
          const forecastTemps = data.daily.temperature_2m_max;

          // Display current weather
          document.getElementById('weather').textContent =
            `Weather now: ${current.temperature}°C`;

          // Show 6-day forecast (excluding today)
          const forecastEl = document.getElementById('forecast');
          forecastEl.innerHTML = "<h3>6-Day Forecast</h3>";
          for (let i = 1; i <= 6; i++) {
            forecastEl.innerHTML += `<div class="day">${forecastDays[i]}: ${forecastTemps[i]}°C</div>`;
          }
        })
        .catch(err => {
          document.getElementById('weather').textContent = "Failed to load weather.";
          console.error(err);
        });
    });
