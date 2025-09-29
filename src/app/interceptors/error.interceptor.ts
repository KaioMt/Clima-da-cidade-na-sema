import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';
        
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro de conexão: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 0:
              errorMessage = 'Sem conexão com a internet. Verifique sua conexão.';
              break;
            case 400:
              errorMessage = 'Cidade não encontrada. Verifique o nome e tente novamente.';
              break;
            case 401:
              errorMessage = 'Chave da API inválida ou expirada.';
              break;
            case 403:
              errorMessage = 'Acesso negado ao serviço de previsão do tempo.';
              break;
            case 404:
              errorMessage = 'Serviço de previsão do tempo não encontrado.';
              break;
            case 429:
              errorMessage = 'Muitas requisições. Aguarde alguns minutos e tente novamente.';
              break;
            case 500:
              errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
              break;
            case 502:
              errorMessage = 'Serviço temporariamente indisponível.';
              break;
            case 503:
              errorMessage = 'Serviço em manutenção. Tente novamente mais tarde.';
              break;
            default:
              errorMessage = `Erro ${error.status}: ${error.statusText || 'Erro desconhecido'}`;
          }
        }
        
        console.error('Erro HTTP:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
