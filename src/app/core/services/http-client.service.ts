import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  private readonly baseUrl = environment.API_URL;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private getHeaders(auth?: boolean): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Token ekleme örneği (geliştirilebilir):
    if (auth) {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  get<T>(url: string, params?: any, auth: boolean = false): Observable<T> {
    return this.http
      .get<T>(this.baseUrl + url, {
        headers: this.getHeaders(auth),
        params: new HttpParams({ fromObject: params }),
      })
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any, auth: boolean = false): Observable<T> {
    return this.http
      .post<T>(this.baseUrl + url, body, {
        headers: this.getHeaders(auth),
      })
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any, auth: boolean = false): Observable<T> {
    return this.http
      .put<T>(this.baseUrl + url, body, {
        headers: this.getHeaders(auth),
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string, auth: boolean = false): Observable<T> {
    return this.http
      .delete<T>(this.baseUrl + url, {
        headers: this.getHeaders(auth),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'Bir hata oluştu!';

    if (error.status === 0) {
      errorMessage =
        'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Hata: ${error.error.message}`;
    } else {
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.error?.detail) {
        errorMessage = error.error.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }
    }

    // Show only toastr notification with enhanced configuration
    this.toastr.error(errorMessage, 'Hata', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      tapToDismiss: true,
      newestOnTop: true,
    });

    // Return error without console logging
    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      error: error.error,
    }));
  };
}
