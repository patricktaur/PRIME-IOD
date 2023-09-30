import { Injectable, TemplateRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  toasts: any[] = [];
  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(evt => {
      // an update is available, add some logic here.
      console.log(`update available.`);
      this.show('A new version of Prism is available');
    });
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    // console.log('toast called');
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
