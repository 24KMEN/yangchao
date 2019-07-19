const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    // const ip = this.ctx.ip;
    // console.log(ip);
    this.assign('title', 'thinkjs'); // 给模板赋值
    return this.display();
  }
};
