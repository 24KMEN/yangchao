const Base = require('./base.js');

module.exports = class extends Base {

  async testAction() {
    return this.display();
  }

  // 退出登录
  async logoutAction() {
    await this.session('admin', 'null');
    return this.redirect('/admin/login');
  }

  // 用户列表
  async listAction() {
    if (this.isPost) {
      const model = this.model('admin/user');
      // 重组where条件数据
      let map = {};
      let order = 'id asc';
      if (this.post('field') && this.post('order')) {
        order = `${this.post('field')} ${this.post('order')}`;
      }
      let field = 'u.id,u.username,u.nickname,u.phone,u.name,u.IDcard,u.money,u.score,u.join_time,g.group_name';
      // let data = await model.alias('u').join('yc_group AS g ON u.group_id = g.id').where(map).page(this.post('page'), this.post('limit')).order(order).field(field).countSelect();
      let data = await model.alias('u').join({table:'group',join:'left',as:'g',on:['u.group_id','g.id']}).where(map).page(this.post('page'), this.post('limit')).order(order).field(field).countSelect();
      data.code = 0;
      return this.json(data);
    } else {
      this.assign('title', '用户列表');
      return this.display();
    }
  }

  // 充值记录
  async rechargeListAction(){
    if(this.isPost){
      const model = this.model('money_log');
      // 重组where条件数据
      let map = {};
      map.type = 1;
      let order = 'l.id DESC';
      if (this.post('field') && this.post('order')) {
        order = `${this.post('field')} ${this.post('order')}`;
      }
      let field = 'l.id,l.userid,l.money,l.recharge,l.admin,l.time,l.remarks,u.username,u.nickname,g.nickname as adminName';
      let data = await model.alias('l').join('yc_user AS u ON l.userid = u.id').join('yc_admin AS g ON l.admin = g.id').where(map).page(this.post('page'), this.post('limit')).order(order).field(field).countSelect();
      console.log(data)
      data.code = 0;
      return this.json(data);
    }else{
      this.assign('title', '充值记录');
      return this.display();
    }
    
  }

  async testAction(){
    const model = this.model('admin/t1');
      // 重组where条件数据
      let map = {};
      // map.type = 1;
      let order = 'l.id DESC';
      if (this.post('field') && this.post('order')) {
        order = `${this.post('field')} ${this.post('order')}`;
      }
      // let field = 'l.id,l.userid,l.money,l.recharge,l.admin,l.time,l.remarks,u.username,u.nickname,g.nickname as adminName';
      // let data = await model.alias('l').join('yc_user AS u ON l.userid = u.id').join('yc_admin AS g ON l.admin = g.id').where(map).page(this.post('page'), this.post('limit')).order(order).countSelect();
      let data = await model.alias('l').where(map).page(this.post('page'), this.post('limit')).order(order).countSelect();
      console.log(data)
      data.code = 0;
      return this.json(data);
  }

  // 支付记录
  async payListAction(){
    if(this.isPost){
      const model = this.model('money_log');
      // 重组where条件数据
      let map = {};
      map.type = 2;
      let order = 'l.id DESC';
      if (this.post('field') && this.post('order')) {
        order = `${this.post('field')} ${this.post('order')}`;
      }
      let field = 'l.id,l.userid,l.money,l.recharge,l.time,l.remarks,u.username,u.nickname';
      let data = await model.alias('l').join('yc_user AS u ON l.userid = u.id').where(map).page(this.post('page'), this.post('limit')).order(order).field(field).countSelect();
      data.code = 0;
      return this.json(data);
    }else{
      this.assign('title', '消费记录');
      return this.display();
    }
    
  }

  // 编辑用户
  async editAction() {
    if (this.isPost) {
      // console.log('@@@@@@',this.post());
      // let data = JSON.parse(this.post('json'));
      let model = this.model('admin/user');
      let map = {};
      map.id = this.post('id');
      // console.log(map)
      let res = await model.where(map).update({ username: this.post('username'), nickname: this.post('nickname'), phone: this.post('phone') });
      if (res) {
        // return this.json(this.post());
        return this.success({}, '操作成功！');
      }

    } else {
      let map = {};
      map.id = this.get('id');
      let model = this.model('admin/user');
      let res = await model.where(map).find();
      this.assign('data', res);
      return this.display();
    }

  }

  // 删除用户
  async delAction() {
    if (this.isPost) {
      console.log(this.post());
      let model = this.model('admin/user');
      let map = {};
      map.id = this.post()[0].id;
      // map.
      let res = await model.where(map).delete();
      console.log(res);
      if (res) {
        return this.success({}, '删除成功！');
      } else {
        return this.fail(-1, '操作失败！', {});
      }
    }
  }

  // 充值
  async rechargeAction() {
    if (this.isPost) {
      let data = this.post();
      if (data.recharge == void 0) {
        this.assign('data', data)
        return this.display();
      }
      if (data.recharge == 0) {
        return this.fail(-1, '金额不能为零！', {});
      }

      // let userModel = this.model('admin/user');
      // let money = Math.floor(data.recharge);
      // let map = { 'id': data.id };

      // let res = await userModel.where(map).increment('money', money);

      let admin = await this.session('admin');
      let userModel = this.model('admin/user');
      let res = await userModel.recharge(data,admin.id);
      if (res >= 1) {
        return this.success({}, '处理成功！');
      }
      if (res == -1){
        return this.fail(-1, '操作失败！', {});
      }
     

    } else {
      let map = {};
      map.id = this.get('id');
      let model = this.model('admin/user');
      let res = await model.where(map).find();
      this.assign('data', res);
      return this.display();
    }
  }
};
