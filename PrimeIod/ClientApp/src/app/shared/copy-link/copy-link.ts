import { Component } from '@angular/core';

@Component({
  selector: 'app-copy-link',

  template: `
    <button type="button" class="btn btn-primary me-1" (click)="copyLink()">Copy this page link</button>
  `
})
export class CopyLinkComponent {
  copyLink() {
    let link = window.location.href;

    if (navigator.clipboard == undefined) {
      this.unsecuredCopyToClipboard(link);
    } else {
      console.log('Clipboard using navigator.clipboard');
      navigator.clipboard
        .writeText(link)
        .then()
        .catch(e => console.error(e));
    }
  }

  // function unsecuredCopyToClipboard(text) {
  //   const textArea = document.createElement("textarea");
  //   textArea.value = text;
  //   document.body.appendChild(textArea);
  //   textArea.focus();
  //   textArea.select();
  //   try {
  //     document.execCommand('copy');
  //   } catch (err) {
  //     console.error('Unable to copy to clipboard', err);
  //   }
  //   document.body.removeChild(textArea);
  // }

  unsecuredCopyToClipboard(text: string) {
    console.log('Clipboard using execCommand');
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }
}
