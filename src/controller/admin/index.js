const Base = require('./base.js');

module.exports = class extends Base {

  async indexAction() {
    // let admin = await this.session('admin');
    // let model = this.model('admin/admin');
    // let data = await model.test();
    let admin = await this.session('admin');
    this.assign('title', '首页'); 
    // this.assign('nickname', admin.nickname); // 给模板赋值
    return this.display();
  }

  // 获取菜单
  async getMenuAction(){
    let data = [{"name":"用户管理", "children":[
                  {"id":"base-button1", "name":"用户列表", "target":"navtab", "url":"/admin/user/list"},
                  {"id":"base-button2", "name":"充值记录", "target":"navtab", "url":""},
                  {"id":"base-button3", "name":"消费记录", "target":"navtab", "url":""},
                ]},
                {"name":"基地管理", "children":[
                  {"id":"base-button2", "name":"基地列表", "target":"navtab", "url":""},
                ]},
                {"name":"权限管理（开发中）", "children":[
                  {"id":"base-button1", "name":"管理员列表", "target":"navtab", "url":""},
                  {"id":"base-button2", "name":"分组列表", "target":"navtab", "url":""},
                  {"id":"base-button3", "name":"权限管理", "target":"navtab", "url":""},
                ]},
              ];

    return this.json(data);
  }
};
