import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/clima.service';
import { WeatherData } from './models/clima.model';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    FormsModule, 
    HttpClientModule,
    LoadingComponent, 
    ErrorComponent,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clima da Cidade';
  cityName: string = '';
  weatherData: WeatherData | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather(): void {
    if (!this.cityName.trim()) {
      this.errorMessage = 'Por favor, digite o nome de uma cidade.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.weatherData = null;

    this.weatherService.getWeatherForecast(this.cityName).subscribe({
      next: (data: WeatherData) => {
        this.weatherData = data;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
        this.weatherData = null;
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchWeather();
    }
  }

  clearSearch(): void {
    this.cityName = '';
    this.weatherData = null;
    this.errorMessage = '';
  }

  formatDate(dateString: string): string {
    return this.weatherService.formatDate(dateString);
  }

  getWeatherIcon(iconName: string): string {
    return this.weatherService.getWeatherIcon(iconName);
  }

  getTemperatureColor(temp: number): string {
    if (temp >= 30) return '#ff4444';
    if (temp >= 25) return '#ff8800';
    if (temp >= 20) return '#ffaa00';
    if (temp >= 15) return '#00aa00';
    if (temp >= 10) return '#0088aa';
    return '#0044aa';
  }

  getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', { weekday: 'long' });
    }
  }

  onRetry(): void {
    this.searchWeather();
  }

  onClear(): void {
    this.clearSearch();
  }
}
