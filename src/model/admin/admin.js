module.exports = class extends think.Model {
    test(){
        return this.where({name: 'nodeIn'}).find();
    }
};
