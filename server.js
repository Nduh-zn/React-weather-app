const express = require('express');
const axios = require('axios');
const cache = require('memory-cache');

const app = express();

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = cache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.get('/weather/:city', cacheMiddleware(60), (req, res) => {
  const apiKey = '6400672fc96cafc7787f5bdda63b98a7';
  const city = req.params.city;
  const cacheKey = `weather_${city}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  axios.get(url)
    .then(response => {
      const weather = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      };
      res.json(weather);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred');
    });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
