
module.exports = function(sequelize, DataTypes) {
   return sequelize.define('dictionary', {
     dictionary_id: {
       type: DataTypes.INTEGER(11),
       //autoIncrement: true,
       primaryKey: true

    },
     name: {
      type: DataTypes.STRING,
      allowNull: false
     },
     role_id: {
       type: DataTypes.INTEGER(11),
       allowNull: false
     }
    }, {

     tableName: 'dictionary',
        timestamps: false,
     freezeTableName: true

  });
};
