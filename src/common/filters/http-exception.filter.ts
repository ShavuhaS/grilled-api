import {
  ArgumentsHost,
  Catch,
  ExceptionFilter, ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import * as process from 'node:process';
import { nonEmptyObject, formattedJson } from '../utils/object.utils';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FILE_PROCESSED_EVENT } from '../../modules/upload/events/file-processed.event';
import { FileProcessedEvent } from '../events/file-processed.event';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor (private eventEmitter: EventEmitter2) {}

  async catch (exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    this.handleDanglingFiles(ctx);

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

  private handleDanglingFiles (ctx: HttpArgumentsHost) {
    const req = ctx.getRequest<Request>();

    if (req.file) {
      this.eventEmitter.emit(FILE_PROCESSED_EVENT, new FileProcessedEvent(req.file.path));
    }

    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        this.eventEmitter.emit(FILE_PROCESSED_EVENT, new FileProcessedEvent(file.path));
      }
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
