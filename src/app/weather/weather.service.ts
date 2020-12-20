import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  weatherParams = '&units=metric&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534';

  constructor(private _http: HttpClient) { }

  getCurrentWeather(city) {
    return this._http.get(`${this.apiUrl}${city}${this.weatherParams}`);
  }
}
