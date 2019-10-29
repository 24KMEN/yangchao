module.exports = class extends think.Controller {
  async __before() {
    let admin = await this.session('admin');
    if(!admin){
      return this.redirect('/admin/login');
    }else{
      this.assign('nickname', admin.nickname); // 给模板赋值
    }
  }
};
