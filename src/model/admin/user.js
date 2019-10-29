module.exports = class extends think.Model {
    // 用户充值
    async recharge(data,admin) {
        let money = Math.floor(data.recharge);
        let map = { 'id': data.id };
        try{
            // 开启事物，复用数据库连接
            await this.startTrans();
            const user = this.model('user').db(this.db());
            const moneyLog = this.model('money_log').db(this.db());
            await user.where(map).increment('money', money);
            let userObj = await user.where(map).find();
            let log = {
                'userid': data.id,
                'money': userObj.money,
                'recharge': data.recharge,
                'time': Date.parse(new Date()),
                'admin': admin,
                'type':'1',
                'remarks':'后台充值'
            };
            
            let res = await moneyLog.add(log);
            await this.commit();
            return res;
        } catch(e){
            console.log(e)
            await this.rollback();
            return -1;
        }

    }

    
};
