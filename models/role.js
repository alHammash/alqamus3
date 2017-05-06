
module.exports = function(sequelize, DataTypes) {
   return sequelize.define('role', {
     role_id: {
      type: DataTypes.INTEGER(11),
       primaryKey: true,
       autoIncrement: false
    },
     role_name: {
      type: DataTypes.STRING,
      allowNull: false
     }
    }, {

     tableName: 'role',
        timestamps: false,
     freezeTableName: true

  });
};
