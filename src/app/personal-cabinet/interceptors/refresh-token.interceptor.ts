import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserResponseI } from 'src/app/interfaces/userRessponseI';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private refreshTokenInProgress = false;
  

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const accessTokenBefore = localStorage.getItem('access_token');
    // const accessTokenAfter = '';
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status !== 401 || !this.authService.isAuthenticated()) {
          return throwError(error);
        }
        if(error.status === 401 || this.authService.isAuthenticated()){
          this.authService
          .refreshToken()
          .subscribe((data: UserResponseI) => {
            const {accessToken, refreshToken} = data.tokens;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
          })
        }

        
        return throwError(error);
      })
    )
  }
}
