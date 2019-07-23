const Base = require('./base.js');

module.exports = class extends Base {
  
  async testAction(){
    return this.display();
  }

  // 退出登录
  async logoutAction(){
    await this.session(null);
    return this.redirect('/admin/login');
  }

  // 用户列表
  async listAction(){
    // let model = this.model('admin/user');
    // let data = await model.where().select();
    // this.assign('data',data);
    // return this.display();
    if(this.isPost){
      let model = this.model('admin/user');
      // 重组where条件数据
      let map = {};
      for(let key in this.post()){
        if(this.post()[key] == 'like'){
          let field = key.split('.')[0];
          let val = this.post(field);
          map[field] = ['like',`%${val}%`];
        }
      }
      let data = await model.where(map).page(this.post('currentPage'),this.post('pageSize')).order(this.post('orders')).countSelect();
      data.list = data.data;
      delete data.data;
      return this.json(data);
    }else{
      return this.display();
    }
  }

};
