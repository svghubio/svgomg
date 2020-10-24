import {
  domReady,
  transitionFromClass,
  transitionToClass,
  readFileAsText
} from '../utils';
import Spinner from './spinner';
import { EventEmitter } from 'events';

export default class MainMenu extends EventEmitter {
  constructor() {
    super();

    this.allowHide = false;
    this._spinner = new Spinner();

    domReady.then(() => {
      this.container = document.querySelector('.main-menu');
      this._loadFileInput = document.querySelector('.load-file-input');
      this._loadFileBtn = document.querySelector('.load-file');
      this._overlay = this.container.querySelector('.overlay');
      this._menu = this.container.querySelector('.menu');

      document.querySelector('.menu-btn')
        .addEventListener('click', e => this._onMenuButtonClick(e));

      this._overlay.addEventListener('click', e => this._onOverlayClick(e));

      this._loadFileBtn.addEventListener('click', e => this._onLoadFileClick(e));
      this._loadFileInput.addEventListener('change', e => this._onFileInputChange(e));
    });
  }

  show() {
    this.container.classList.remove('hidden');
    transitionFromClass(this._overlay, 'hidden');
    transitionFromClass(this._menu, 'hidden');
  }

  hide() {
    if (!this.allowHide) return;
    this.stopSpinner();
    this.container.classList.add('hidden');
    transitionToClass(this._overlay, 'hidden');
    transitionToClass(this._menu, 'hidden');
  }

  stopSpinner() {
    this._spinner.hide();
  }

  showFilePicker() {
    this._loadFileInput.click();
  }

  _onOverlayClick(event) {
    event.preventDefault();
    this.hide();
  }

  _onMenuButtonClick(event) {
    event.preventDefault();
    this.show();
  }

  _onLoadFileClick(event) {
    event.preventDefault();
    event.target.blur();
    this.showFilePicker();
  }

  async _onFileInputChange(event) {
    const file = this._loadFileInput.files[0];

    if (!file) return;

    this._loadFileBtn.appendChild(this._spinner.container);
    this._spinner.show();

    this.emit('svgDataLoad', {
      data: await readFileAsText(file),
      filename: file.name
    });
  }
}
