import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {

  constructor() { }
  logError(error: any) {

    // when needed use this service to log errors to
    // various locations, diversify between error types, ...
    // for the demo, we're just logging to the console

    // add application name, date, ... any useful
    // additional info to the error message.
    console.error('YC Web', 'An error happened', error);
  }
}
