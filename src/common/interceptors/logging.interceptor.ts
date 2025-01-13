import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const now = Date.now();

        console.log(`Incoming request: ${request.method} ${request.url}`);

        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse();
                const duration = Date.now() - now;
                console.log(`Response: ${response.statusCode} - ${duration}ms`);
            })
        )
    }
}