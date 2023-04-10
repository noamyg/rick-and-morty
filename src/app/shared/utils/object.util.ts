import { keyBy, transform, isObject } from 'lodash';

export class ObjectUtil {
  static deepOmit(obj: any, keysToOmit: string[]): void {
    const keysToOmitIndex =  keyBy(Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit] );
    const omitFromObject = (object: any): any => transform(object, (result: any, value: any, key: string) => {
      if (key in keysToOmitIndex) {
        return;
      }
      result[key] = isObject(value) ? omitFromObject(value) : value;
    });
    return omitFromObject(obj);
  }

  static print(object: any, printKey: boolean = false, separator: string = ', '): string {
    return Object.keys(object || {})
      .map(key => `${printKey ? `${key}:` : ''} ${object[key]}`).join(separator).trim();
  }

}
