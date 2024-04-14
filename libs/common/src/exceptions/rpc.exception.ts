import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    console.log({ exception: exception.getResponse() });
    return exception.getResponse();
  }
}
