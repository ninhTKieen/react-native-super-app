import httpUtil from '@src/utils/http.util';
import Config from 'react-native-config';

import { IOpenWeather } from './weather.model';

class WeatherService {
  async getWeatherByCoordinates(lat: number, lon: number) {
    const response = await httpUtil.request<IOpenWeather>({
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Config.OPEN_WEATHER_API_KEY}`,
      method: 'GET',
    });

    return response;
  }
}

export default new WeatherService();
