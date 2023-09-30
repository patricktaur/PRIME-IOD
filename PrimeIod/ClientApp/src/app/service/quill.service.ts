import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuillService {
  config = {
    // toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['clean'],
        ['link', 'image']
      ]
    },
    keyboard: {
      bindings: {
        shiftEnter: {
          key: 13,
          shiftKey: true,
          handler: (range: any, context: any) => {
            // Handle shift+enter
            console.log('shift+enter');
          }
        },
        enter: {
          key: 13,
          handler: (range: any, context: any) => {
            console.log('enter');
            return true;
          }
        }
      }
    }
  };

  constructor() {}
}
