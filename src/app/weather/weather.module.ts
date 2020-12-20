import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WeatherComponent } from "./weather.component";
import { WeatherRoutingModule } from "./weather-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [WeatherComponent],
  imports: [CommonModule, WeatherRoutingModule, FormsModule]
})
export class WeatherModule {}
