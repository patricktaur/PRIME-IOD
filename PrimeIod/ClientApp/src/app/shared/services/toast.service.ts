import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    // console.log('toast called');
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(textOrTpl: string | TemplateRef<any>) {
    let options = {
      classname: 'bg-success text-light',
      delay: 3000
    };
    this.toasts.push({ textOrTpl, ...options });
  }

  showDanger(textOrTpl: string | TemplateRef<any>) {
    let options = {
      classname: 'bg-danger text-light',
      delay: 5000
    };
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
