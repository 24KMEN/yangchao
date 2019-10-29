const Base = require('./base.js');

module.exports = class extends Base {
  
  async testAction(){
    return this.display();
  }

  // 退出登录
  async logoutAction(){
    await this.session('group',null);
    return this.redirect('/group/login');
  }

  // 用户列表
  async listAction(){
    if(this.isPost){
      let model = this.model('user');
      // 重组where条件数据
      let map = {};
      for(let key in this.post()){
        if(this.post()[key] == 'like'){
          let field = key.split('.')[0];
          let val = this.post(field);
          map[field] = ['like',`%${val}%`];
        }
      }
      let group = await this.session('group')
      map['group_id'] = group.group_id;
      let data = await model.where(map).page(this.post('currentPage'),this.post('pageSize')).order(this.post('orders')).fieldReverse('pwd').countSelect();
      data.list = data.data;
      delete data.data;
      return this.json(data);
    }else{
      return this.display();
    }
  }

  // async editAction(){
  //   if(this.isPost){
  //     console.log(this.post());
  //     // let data = JSON.parse(this.post('json'));
  //     console.log(this.post());
  //     let model = this.model('admin/user');
  //     let map = {};
  //     map.id = this.post('id');
  //     console.log(map)
  //     let res = await model.where(map).update({username:this.post('username'),nickname:this.post('nickname'),phone:this.post('phone')});
  //     console.log(res);
  //     if(res){
  //       // console.log('@@@@@@@',JSON.stringify(this.post()));
  //       return this.json(this.post());
  //     }
      
  //   }else{

  //   }
  //   return this.display();
  // }

  async rechargeAction(){
    if(this.isPost){
      let data = this.post();
      console.log(this.post());
      console.log(this.post('recharge'));
      if(this.post('recharge') != void 0){
      if(this.post('recharge') == 0){
        return this.fail(-1,'金额不能为零！',{});
      }
      // return this.json(this.post());
      return this.success({},'处理成功！');
      }else{
        this.assign('data',data)
        return this.display();
      }
      
    }
  }
};
