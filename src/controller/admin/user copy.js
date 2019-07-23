const Base = require('./base.js');

module.exports = class extends Base {

  async indexAction() {
    let admin = await this.session('admin');
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
    let data = [{"name":"用户管理", "children":[
                  {"id":"base-button1", "name":"用户列表", "target":"navtab", "url":"/admin/user/test"},
                  {"id":"base-button2", "name":"充值", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button3", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button4", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button5", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button6", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                ]},
                {"name":"基地管理", "children":[
                  {"id":"base-button1", "name":"用户列表", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button2", "name":"基地列表", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button3", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button4", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button5", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button6", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                ]},
                {"name":"权限管理", "children":[
                  {"id":"base-button1", "name":"管理员列表", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button2", "name":"分组列表", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button3", "name":"权限管理", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button4", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button5", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button6", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                ]},
                {"name":"结算管理", "children":[
                  {"id":"base-button1", "name":"用户列表", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button2", "name":"基地列表", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button3", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button4", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button5", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                  {"id":"base-button6", "name":"测试", "target":"navtab", "url":"/admin/index/test"},
                ]},
              ];

    return this.json(data);
  }

  // 退出登录
  async logoutAction(){
    await this.session(null);
    return this.redirect('/admin/login');
  }
};
