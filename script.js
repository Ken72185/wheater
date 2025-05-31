const apiKey = '01b44b576965cedf657d2019a752eb37'; 

async function getWeather() {
  const city = document.getElementById('city-input').value;
  const resultDiv = document.getElementById('weather-result');

  if (!city) {
    resultDiv.innerHTML = '<p>Silakan masukkan nama kota.</p>';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    
    const timezoneOffset = data.timezone; 
    const currentUTC = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(currentUTC + timezoneOffset * 1000);
    const hour = localTime.getHours();

    
    let waktuHari = '';
    if (hour >= 5 && hour < 12) {
      waktuHari = 'Pagi 🌅';
    } else if (hour >= 12 && hour < 15) {
      waktuHari = 'Siang ☀️';
    } else if (hour >= 15 && hour < 19) {
      waktuHari = 'Sore 🌇';
    } else {
      waktuHari = 'Malam 🌙';
    }

    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    
    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Local Time :</strong> ${localTime.toLocaleTimeString()} (${waktuHari})</p>
      <img src="${iconUrl}" alt="Ikon cuaca">
      <p>${data.weather[0].description}</p>
      <p>Temperature : ${data.main.temp}°C</p>
      <p>Humidity : ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
    resultDiv.innerHTML = weatherHTML;
  } catch (error) {
    resultDiv.innerHTML = `<p>Terjadi kesalahan. Coba lagi nanti.</p>`;
  }
}