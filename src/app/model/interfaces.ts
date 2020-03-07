export interface User {
  id?: number;
  username: string;
  password: string;
  // returnSecureToken?: boolean;
}

export class UserForLoginDto {
  id?: any;
  username: any;
  password: any;
  // returnSecureToken?: boolean;
}

export interface AuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Item {
  id?: number;
  realUrl: string;
  shortenedUrl: string;
  token: string;
  clicked: number;
}

export interface Environment {
  production: boolean;
  firebaseConfig: {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string,
  };
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

