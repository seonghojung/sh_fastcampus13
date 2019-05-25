const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Contacts = sequelize.define("Contacts", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    writer: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  });

  // 제품 모델 관계도(OneToMany)
  Contacts.associate = models => {
    // 메모 모델에 외부키를 건다
    // onDelete 옵션의 경우 제품 하나가 삭제되면 외부키가 걸린 메모들도 싹다 삭제해준다
    Contacts.hasMany(models.ContactsMemo, {
      as: "Memo",
      foreignKey: "contact_id",
      sourceKey: "id",
      onDelete: "CASCADE"
    });
  };

  Contacts.prototype.dateFormat = date => moment(date).format("YYYY-MM-DD");

  return Contacts;
};
