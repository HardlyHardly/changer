import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorConfigService } from 'src/app/services/error-config.service';
import { tokenI } from 'src/app/interfaces/tokenI';
import { UserResponseI } from 'src/app/interfaces/userRessponseI';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  public refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public $refreshTokenSubject: Observable<null | tokenI> = this.refreshTokenSubject.asObservable();
  public refreshTokenInProgress: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public $refreshTokenInProgress: Observable<boolean> = this.refreshTokenInProgress.asObservable()
  

  constructor(private authService: AuthService,
    private errorConfigService: ErrorConfigService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessTokenBefore = localStorage.getItem('access_token');
    return next.handle(request).pipe(
      
      catchError((error) => {
        if (error.status !== 401 || !this.authService.isAuthenticated()) {
          return throwError(error);
        }
        if(error.status === 401){
          console.log('error refresh token try')
          this.authService
          .refreshToken()
          .pipe(
            catchError((error) => {
              if(error.status === 401){
                this.authService.logout();
                this.errorConfigService.errorConfig('Время сессии истекло')
              }
              return throwError(error)
            })
          )
          .subscribe((data: UserResponseI) => {
            const {accessToken, refreshToken} = data.tokens;
            this.refreshTokenInProgress.next(accessTokenBefore !== accessToken);
            this.$refreshTokenInProgress
            .subscribe((bool: boolean) => {
              localStorage.setItem('access_token', accessToken);
              this.refreshTokenSubject.next(accessToken);
            })
          })
          return throwError(error);
        }
        // if(error.status === 401){
        //   this.authService
        //   .refreshToken()
        //   .subscribe((data: UserResponseI) => {
        //     console.log(data);
        //     const {accessToken, refreshToken} = data.tokens;
        //     localStorage.setItem('access_token', accessToken);
        //     localStorage.setItem('refresh_token', refreshToken);
        //     this.authService.refreshTokenSubject.next({tokens: {access: accessToken, refresh: refreshToken}})
        //   })
        //   return throwError(error);
        // }
        

        
        return throwError(error);
      })
    )
  }
}
