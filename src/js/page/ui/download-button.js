import FloatingActionButton from './floating-action-button';

export default class DownloadButton extends FloatingActionButton {
  constructor() {
    const title = 'Download';

    super({
      title,
      href: './',
      iconSvg: (
        '<svg viewBox="0 0 24 24" class="icon">' +
          `<title>${title}</title>` +
        '</svg>'
      )
    });

    this._svgFile = null;
  }

  _onClick(event) {
    super._onClick(event);
  }

  setDownload(filename, svgFile) {
    return;
  }
}
