import { EventEmitter } from 'events';
import { domReady } from '../utils';

export default class ViewToggler extends EventEmitter {
  constructor() {
    super();
    this.container = null;

    domReady.then(() => {
      this.container = document.querySelector('.view-toggler');

      // stop browsers remembering previous form state
      //this.container.output[0].checked = true;

      this.container.addEventListener('change', e => this._onChange(e));
    });
  }

  _onChange(event) {
    let value = this.container.output.value;

    if (!value) { // some browsers don't support the nice shortcut above (eg Safari)
      value = Array.from(this.container.output).reduce((value, input) => {
        return value || (input.checked ? input.value : '');
      }, '');
    }

    this.emit("change", { value });
  }
}
