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
      let name = this.post('name');
      let pwd = this.post('pwd');
      if(name && pwd){
        pwd = think.md5(pwd);
        let model = this.model('admin/admin');
        let result = await model.where({name,pwd}).find();
        if(JSON.stringify(result) == "{}"){
          await this.fail(-1,'登录失败');
          // return this.redirect('/admin/login');
        }else{
          await this.session('admin',result.id);
          await this.session('name',result.name);
          // await this.success({errno:0,errmsg:'登录成功'});
          return this.redirect('/');
        }
      }
    }

    return this.redirect('/admin/login');
  
  }
};
