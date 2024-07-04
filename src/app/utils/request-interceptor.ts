import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, Observable, tap} from "rxjs";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.includes('api/') ? 'http://localhost:8080/' + req.url : req.url;
    req = req.clone({
      url: url.toString(),
      headers: req.headers
    });
    // handle request

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        // handle successful responses if needed
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            // redirect to login if noRedirect header isn't present
            if (!req.headers.get('noRedirect')) {
              this.router.navigate(['/home/login']);
            }
          }
        }
        throw err;
      })
    );
  }
}
