module.exports = class extends think.Model {
    get relation() {
        return {
          t2: {
            type:think.Model.HAS_MANY,
            fKey:'u_id',
            field:'u_id,score'
        }
          
        }
      }
      // 获取字段值之和
  getScoreSum() {
    // SELECT SUM(score) AS think_sum FROM `test_d` LIMIT 1
    return this.sum('score');
  }
};
