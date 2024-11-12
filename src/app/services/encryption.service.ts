import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  protected key: string;
  protected config: any;
  constructor() {
    this.key = environment.CRYPTOKEY;
  }
  encode(txt: string) {
    let code = '';
    if (!!txt) {
      code = CryptoJS.AES.encrypt(txt.trim(), this.key, this.config).toString();
    }
    let code_safe = code
      .replace(/\=/g, '~')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    return code_safe;
  }
  decode(code_safe: string) {
    let code = code_safe
      .replace(/\-/g, '+')
      .replace(/\~/g, '=')
      .replace(/\_/g, '/');
    let text = CryptoJS.AES.decrypt(code, this.key, this.config).toString(
      CryptoJS.enc.Utf8
    );
    return text;
  }
}
