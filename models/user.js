
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
     user_id: {
      type: DataTypes.INTEGER(11),
       primaryKey: true,
       autoIncrement: true
    },
     full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
       type: DataTypes.STRING,
       unique: true,
            allowNull: false,
            isEmail: true

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
     auth_token: {
      type: DataTypes.STRING,
      allowNull: true
    }
    }, {

        tableName: 'user',
        timestamps: false,
     freezeTableName: true

  });
};
