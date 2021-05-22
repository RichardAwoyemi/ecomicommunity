import { Injectable } from '@angular/core';
import { IUser } from 'functions/src/utils/interfaces.utils';

@Injectable()
export class UtilService {
  constructor() {}

  static checkUser(user: string | null): IUser | undefined {
    return !!user && user.startsWith('{', 0) ? JSON.parse(user) : undefined;
  }

}
