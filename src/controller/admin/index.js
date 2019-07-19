const Base = require('./base.js');

module.exports = class extends Base {

  async loginAction(){
    console.log('sdfsdf');
    return this.display();
  }

  async indexAction() {
    let model = this.model('admin/admin');
    let data = await model.test();
    this.assign('title', '首页'); 
    this.assign('user', data); // 给模板赋值
    return this.display();
  }
  
  async testAction(){
    return this.display();
  }

  // 获取菜单
  async getMenuAction(){
    let data = [{"name":"表单相关", "children":[
      {"id":"base-button", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
      
  ]}];

    return this.json(data);
  }
};
