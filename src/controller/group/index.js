const Base = require('./base.js');

module.exports = class extends Base {

  async indexAction() {
    let group = await this.session('group');
    this.assign('title', '首页'); 
    this.assign('nickname', group.nickname); // 给模板赋值
    return this.display();
  }

  // 获取菜单
  async getMenuAction(){
    let data = [{"name":"用户管理", "children":[
                  {"id":"base-button1", "name":"用户列表", "target":"navtab", "url":"/group/user/list"},
                  {"id":"base-button3", "name":"消费记录", "target":"navtab", "url":"/group/index/test"},
                ]},
                {"name":"权限管理", "children":[
                  {"id":"base-button1", "name":"管理员列表", "target":"navtab", "url":"/group/index/test"},
                  {"id":"base-button2", "name":"分组列表", "target":"navtab", "url":"/group/index/test"},
                  {"id":"base-button3", "name":"权限管理", "target":"navtab", "url":"/group/index/test"},
                ]},
              ];

    return this.json(data);
  }
};
