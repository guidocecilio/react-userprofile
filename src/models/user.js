/* eslint camelcase: 0 */
export class User {
  constructor() {
    
  }

  static fromObject(src) {
    return Object.assign(new User(), src);
  }
}
