export class StringUtil {

  static getMimeTypeFromBase64(base64): {
    mime: string; ext: string;
  } {
    const signatures = {
      JVBERi0: 'application/pdf',
      R0lGODdh: 'image/gif',
      R0lGODlh: 'image/gif',
      iVBORw0KGgo: 'image/png',
      '/': 'image/jpeg'
    };
    for (const s in signatures) {
      if (base64.indexOf(s) === 0) {
        return {
          mime: signatures[s],
          ext: signatures[s].split('/')[1]
        };
      }
    }
    return null;
  }

  static isBase64(str: string): boolean {
    if (typeof str !== 'string' || str === '' || str.trim() === '') {
      return false;
    }
    if (str.startsWith('data:')) {
      str = str.split(',')[1];
    }
    try {
      return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (err) {
      return false;
    }
  }

  static toArrayBuffer(base64: string): Uint8Array {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
}
