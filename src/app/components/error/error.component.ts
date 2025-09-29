import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container" *ngIf="errorMessage">
      <div class="error-card">
        <div class="error-icon">
          <span class="icon-main">⚠️</span>
          <div class="error-animation">
            <span class="error-particle"></span>
            <span class="error-particle"></span>
            <span class="error-particle"></span>
          </div>
        </div>
        
        <div class="error-content">
          <h3 class="error-title">Oops! Algo deu errado</h3>
          <p class="error-message">{{ errorMessage }}</p>
          
          <div class="error-suggestions" *ngIf="showSuggestions">
            <h4>Sugestões:</h4>
            <ul>
              <li>Verifique se o nome da cidade está correto</li>
              <li>Tente usar o nome completo da cidade</li>
              <li>Verifique sua conexão com a internet</li>
              <li>Aguarde alguns minutos e tente novamente</li>
            </ul>
          </div>
        </div>
        
        <div class="error-actions">
          <button 
            class="retry-button primary" 
            (click)="onRetry()">
            <span class="button-icon">🔄</span>
            Tentar Novamente
          </button>
          
          <button 
            class="clear-button secondary" 
            (click)="onClear()">
            <span class="button-icon">✖️</span>
            Limpar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      padding: 1rem;
      animation: fadeIn 0.5s ease-out;
    }

    .error-card {
      background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
      border: 2px solid #feb2b2;
      border-radius: 15px;
      padding: 2rem;
      max-width: 500px;
      width: 100%;
      text-align: center;
      box-shadow: 0 10px 25px rgba(254, 178, 178, 0.3);
      position: relative;
      overflow: hidden;
    }

    .error-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: shimmer 2s infinite;
    }

    .error-icon {
      position: relative;
      margin-bottom: 1.5rem;
    }

    .icon-main {
      font-size: 3rem;
      display: block;
      animation: shake 0.5s ease-in-out;
    }

    .error-animation {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .error-particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #e53e3e;
      border-radius: 50%;
      animation: particle 2s infinite ease-out;
    }

    .error-particle:nth-child(1) {
      animation-delay: 0s;
      top: -20px;
      left: -10px;
    }

    .error-particle:nth-child(2) {
      animation-delay: 0.7s;
      top: -15px;
      right: -10px;
    }

    .error-particle:nth-child(3) {
      animation-delay: 1.4s;
      bottom: -20px;
      left: 0;
    }

    .error-content {
      margin-bottom: 2rem;
    }

    .error-title {
      color: #c53030;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .error-message {
      color: #742a2a;
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }

    .error-suggestions {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 10px;
      padding: 1rem;
      text-align: left;
      margin-top: 1rem;
    }

    .error-suggestions h4 {
      color: #c53030;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .error-suggestions ul {
      color: #742a2a;
      font-size: 0.9rem;
      padding-left: 1.2rem;
    }

    .error-suggestions li {
      margin-bottom: 0.3rem;
    }

    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .retry-button, .clear-button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 140px;
      justify-content: center;
    }

    .primary {
      background: linear-gradient(135deg, #e53e3e, #c53030);
      color: white;
    }

    .primary:hover {
      background: linear-gradient(135deg, #c53030, #9c2626);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(197, 48, 48, 0.4);
    }

    .secondary {
      background: #f7fafc;
      color: #4a5568;
      border: 2px solid #e2e8f0;
    }

    .secondary:hover {
      background: #edf2f7;
      border-color: #cbd5e0;
      transform: translateY(-2px);
    }

    .button-icon {
      font-size: 1rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    @keyframes particle {
      0% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      100% {
        opacity: 0;
        transform: scale(0.3) translateY(-30px);
      }
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    @media (max-width: 480px) {
      .error-card {
        padding: 1.5rem;
      }
      
      .error-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .retry-button, .clear-button {
        width: 100%;
        max-width: 200px;
      }
    }
  `]
})
export class ErrorComponent {
  @Input() errorMessage: string = '';
  @Input() showSuggestions: boolean = true;
  @Output() retry = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }

  onClear(): void {
    this.clear.emit();
  }
}
