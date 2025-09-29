import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherResponse, WeatherData } from '../models/clima.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly API_KEY = 'TLZGH8MGRU5JDE8KXC3FPNR8T';
  private readonly BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

  constructor(private http: HttpClient) { }

  getWeatherForecast(city: string): Observable<WeatherData> {
    const url = `${this.BASE_URL}/${encodeURIComponent(city)}?unitGroup=metric&key=${this.API_KEY}&contentType=json`;
    
    return this.http.get<WeatherResponse>(url).pipe(
      map(response => ({
        resolvedAddress: response.resolvedAddress,
        days: response.days.slice(0, 7)
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Cidade não encontrada. Verifique o nome e tente novamente.';
          break;
        case 401:
          errorMessage = 'Chave da API inválida.';
          break;
        case 429:
          errorMessage = 'Muitas requisições. Tente novamente em alguns minutos.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }

  celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getWeatherIcon(iconName: string): string {
    const iconMap: { [key: string]: string } = {
      'clear-day': '☀️',
      'clear-night': '🌙',
      'rain': '🌧️',
      'snow': '❄️',
      'sleet': '🌨️',
      'wind': '💨',
      'fog': '🌫️',
      'cloudy': '☁️',
      'partly-cloudy-day': '⛅',
      'partly-cloudy-night': '🌙',
      'hail': '🌨️',
      'thunderstorm': '⛈️'
    };
    
    return iconMap[iconName] || '🌤️';
  }
}
