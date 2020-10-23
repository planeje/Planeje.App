import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public getUserId(): number {
    return JSON.parse(localStorage.getItem('userId'));
  }
}
