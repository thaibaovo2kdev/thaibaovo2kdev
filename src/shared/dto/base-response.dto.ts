export class BaseResponseDto<T> {
    success: boolean;
    statusCode: number;
    data: T;
    message?: string;
    timestamp: string;
    requestId: string;
  }