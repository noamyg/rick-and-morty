export interface GroupedOption {
  name: string;
  code: any;
  children: ChildOption[];
}

export interface ChildOption {
  name: string;
  code: string;
}

// export abstract class SelectOptionsFactory {
//   static createFromArray(source: any[], nameKey: string, codeKey: string): GroupedOption[] {
//       return source.map(obj => ({
//           name: obj[nameKey],
//           code: obj[codeKey]
//       }));
//   }
// }
