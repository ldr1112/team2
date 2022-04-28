const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(100),
      },
      userId: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(500),
      },
      email: {
        type: Sequelize.STRING(255),
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  // static associate(db) {
  //   db.
  // }
};
