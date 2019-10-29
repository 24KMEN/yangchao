module.exports = class extends think.Controller {
  async __before() {
    let admin = await this.session('group');
    if(!admin){
      return this.redirect('/group/login');
    }
  }
};
