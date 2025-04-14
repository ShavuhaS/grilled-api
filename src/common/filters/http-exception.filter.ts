import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import * as process from 'node:process';
import { nonEmptyObject, formattedJson } from '../utils/object.utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor () {}

  async catch (exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status: number, message: object;
    const errorName = exception.constructor.name;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'object') {
        const { statusCode, ...errorMessage } = errorResponse as any;
        message = errorMessage;
      } else {
        message = { message: errorResponse };
      }

      status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'An error occurred on the server side' };
    }

    const responsePayload = {
      status,
      timestamp: new Date().toISOString(),
      error: errorName,
      ...message,
    };

    res.status(status).json(responsePayload);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const errMsg = this.getErrorMsg(exception, ctx);
      console.error(errMsg);
    }
  }

  private getErrorMsg (exception: Error, ctx: HttpArgumentsHost): string {
    const req = ctx.getRequest<Request>();
    const { method, path } = req;
    const environment = process.env.NODE_ENV?.toUpperCase();
    const params = nonEmptyObject(req.params);
    const query = nonEmptyObject(req.query);
    const body = nonEmptyObject(req.body);
    const userId: string = (req as any).user?.id;

    let errorMsg = '';
    errorMsg += '🚨🚨🚨 ERROR 🚨🚨🚨\n';
    errorMsg += `⚙️ Environment: ${environment}\n`;
    errorMsg += `🌐 ${method} ${path}\n`;
    if (userId) errorMsg += `🆔 User ID: ${userId}\n`;
    if (params) errorMsg += `🔢 URL Params:\n${formattedJson(params)}\n`;
    if (query) errorMsg += `❓ Query Params:\n${formattedJson(query)}\n`;
    if (body) errorMsg += `📦 Request Body:\n${formattedJson(body)}\n`;
    errorMsg += '\n📜 Stack Trace:\n';
    errorMsg += exception.stack;

    return errorMsg;
  }
}
