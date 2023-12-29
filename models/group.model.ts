import { DataTypes } from "sequelize";
import db from '../db/connection';
import Payment from './payment.model';

const Group = db.define('app_groups', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  name: { type: DataTypes.STRING(50), allowNull: false },
  description: { type: DataTypes.STRING(50), allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.UUID, allowNull: false },
}, {
  timestamps: true,
});

Group.hasMany(Payment, {
  foreignKey: 'groupId',
  sourceKey: 'id',
});

Payment.belongsTo(Group, {
  foreignKey: 'groupId',
});

export default Group;
