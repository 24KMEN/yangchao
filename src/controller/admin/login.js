module.exports = class extends think.Controller {
  __before() {

  }

  // 登录页面
  async indexAction(){
    return this.display();
  }

  // 登录
  async loginAction(){
    if(this.isPost) {
      let username = this.post('username');
      let pwd = this.post('pwd');
      let group_id = 0;
      if(username && pwd){
        pwd = think.md5(pwd);
        let model = this.model('admin/admin');
        let result = await model.where({username,pwd,group_id}).field('id,group_id,nickname').find();
        if(JSON.stringify(result) == "{}"){
          return this.fail(-1,'登录失败');
          // return this.redirect('/admin/login');
        }else{
          await this.session('admin',result);
          return this.redirect('/admin/user/list');
        }
      }
    }

    return this.redirect('/admin/login');
  
  }
};
