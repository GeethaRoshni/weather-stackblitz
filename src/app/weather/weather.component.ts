import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  cityName = '';
  weatherData;
  @ViewChild('cityInput') cityInput;
  imageUrl;
  isLocal = false;
  isRefresh = false;
  weatherReport = [
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    },
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    },
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    },
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    },
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    },
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    },
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    },
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    },
    {
      city: '', temp: '', feels: '', desc: '', img: 'assets/images/clear-weather.jpg', isForm: false, isDetails: false, isInit: true, isError: false, isEdit: false, serverError: false
    }
  ]
  weatherIconURL = 'https://openweathermap.org/img/w/';
  constructor(private _weatherService: WeatherService, private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    // Getting local storage data for offline usage
    if (!this.isLocal) {
      const localWeatherReport = JSON.parse(window.localStorage.getItem('weatherReport'));
      const isWeatherData = localWeatherReport?.filter(val => val.city !== '');
      if (isWeatherData) {
        this.weatherReport = localWeatherReport;
        this.isRefresh = true;
      }
    }

    // Update data for every 30 seconds
    setInterval(() => {
      if (this.isRefresh) {
        this.weatherReport.forEach((val, index) => {
          if (val.city && !val.isEdit) {
            this.isLocal = true;
            this._weatherService.getCurrentWeather(val.city).subscribe((data: any) => {
              this.weatherData = data;
              const weaterStatus = data.weather[0].main.toLowerCase();
              this.getImage(weaterStatus);
              this.weatherReport[index].isDetails = true;
              this.weatherReport[index].isForm = false;
              this.weatherReport[index].isInit = false;
              this.weatherReport[index].city = data.name;
              this.weatherReport[index].temp = data.main.temp;
              this.weatherReport[index].feels = data.main.feels_like;
              this.weatherReport[index].desc = data.weather[0].description;
              this.weatherReport[index].img = this.imageUrl;
            })
            window.localStorage.clear();
            window.localStorage.setItem('weatherReport', JSON.stringify(this.weatherReport));
          }
        })
      }
    }, 30000);

  }

  /** Get Weather Report */
  getWeatherReport(index) {
    this.cityName = this.cityInput.nativeElement.value;
    this.weatherReport[index].serverError = false;
    this.weatherReport[index].isEdit = false;
    if (this.cityName) {
      this._weatherService.getCurrentWeather(this.cityName).subscribe((data: any) => {
        this.weatherData = data;
        const weaterStatus = data.weather[0].main.toLowerCase();
        this.getImage(weaterStatus);
        this.weatherReport[index].isDetails = true;
        this.weatherReport[index].isForm = false;
        this.weatherReport[index].isInit = false;
        this.weatherReport[index].city = data.name;
        this.weatherReport[index].temp = data.main.temp;
        this.weatherReport[index].feels = data.main.feels_like;
        this.weatherReport[index].desc = data.weather[0].description;
        this.weatherReport[index].img = this.imageUrl;
        window.localStorage.clear();
        window.localStorage.setItem('weatherReport', JSON.stringify(this.weatherReport));
        this.isRefresh = true;
      },
        err => {
          if (err.error.message === 'city not found') {
            this.weatherReport[index].isError = true;
            this.weatherReport[index].isForm = false;
          } else {
            this.weatherReport[index].serverError = true;
          }
        })
    }
  }

  /** Get Images */
  getImage(imageName) {
    switch (imageName) {
      case 'clouds':
        this.imageUrl = 'assets/images/cloudy-weather.jpg';
        break;
      case 'rain':
        this.imageUrl = 'assets/images/rainy-weather.jpg';
        break;
      case 'sunny':
        this.imageUrl = 'assets/images/sunny-weather.jpg';
        break;
      case 'mist':
        this.imageUrl = 'assets/images/mist.jpg';
        break;
      case 'haze':
        this.imageUrl = 'assets/images/haze.jpg';
        break;
      default:
        this.imageUrl = 'assets/images/clear-weather.jpg';
    }
  }

  /** Show forms */
  getForm(index) {
    this.weatherReport[index].isForm = true;
    this.weatherReport[index].isInit = false;
  }

  /** Show forms if it is a error screen*/
  showForm(index) {
    this.weatherReport[index].isForm = true;
    this.weatherReport[index].isError = false;
  }

  /** Edit form */
  edit(index) {
    this.isRefresh = false;
    this.weatherReport[index].isDetails = false;
    this.weatherReport[index].isForm = true;
    this.weatherReport[index].isEdit = true;
  }

  /** Cancel form */
  cancel(index) {
    this.weatherReport[index].isForm = false;
    this.weatherReport[index].isInit = true;
    this.weatherReport[index].img = 'assets/images/clear-weather.jpg';
  }
}
