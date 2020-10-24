import FloatingActionButton from './floating-action-button';

//export const copySupported = (document.queryCommandSupported && document.queryCommandSupported('copy'));
export const copySupported = false;

export default class CopyButton extends FloatingActionButton {
  constructor() {
    const title = 'Copy as text';

    super({
      title,
      iconSvg: (
        '<svg viewBox="0 0 24 24" class="icon">' +
          `<title>${title}</title>` +
        '</svg>'
      ),
      minor: true
    });

    this._text = null;
    this._pre = document.createElement('pre');
  }

  _onClick(event) {
    super._onClick(event);
  }

  setCopyText(text, filename) {
    this._text = text;
  }
}
