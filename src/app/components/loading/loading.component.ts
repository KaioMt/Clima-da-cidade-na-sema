import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-overlay" [class.show]="isLoading">
      <div class="loading-content">
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
          <div class="weather-icons">
            <span class="weather-icon" [style.animation-delay]="'0s'">☀️</span>
            <span class="weather-icon" [style.animation-delay]="'0.2s'">⛅</span>
            <span class="weather-icon" [style.animation-delay]="'0.4s'">🌧️</span>
            <span class="weather-icon" [style.animation-delay]="'0.6s'">❄️</span>
          </div>
        </div>
        <p class="loading-text">{{ message }}</p>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .loading-overlay.show {
      opacity: 1;
      visibility: visible;
    }

    .loading-content {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      max-width: 300px;
    }

    .loading-spinner {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 1rem;
    }

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid #e3f2fd;
      border-top: 3px solid #2196f3;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .weather-icons {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .weather-icon {
      position: absolute;
      font-size: 1.2rem;
      animation: bounce 1.5s ease-in-out infinite;
      transform: translate(-50%, -50%);
    }

    .loading-text {
      color: #333;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .loading-dots {
      display: flex;
      justify-content: center;
      gap: 0.3rem;
    }

    .loading-dots span {
      width: 8px;
      height: 8px;
      background: #2196f3;
      border-radius: 50%;
      animation: pulse 1.4s ease-in-out infinite both;
    }

    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
    .loading-dots span:nth-child(3) { animation-delay: 0s; }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes bounce {
      0%, 80%, 100% { 
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.5;
      }
      40% { 
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 1;
      }
    }

    @keyframes pulse {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
  `]
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
  @Input() message: string = 'Carregando previsão do tempo...';
}
