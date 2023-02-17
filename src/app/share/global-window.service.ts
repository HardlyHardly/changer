import { Injectable } from '@angular/core';


function getWindow(): any {
  return window
}

export interface ICustomWindow extends Window {
  __custom_global_stuff: string;
}
@Injectable({
  providedIn: 'root'
})
export class GlobalWindowService {

  get nativeWindow(): ICustomWindow {
    return getWindow()
  }

}
