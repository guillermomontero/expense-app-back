import { DataTypes } from "sequelize";
import db from '../db/connection';
import Group from './group.model';
import Payment from './payment.model';

const User = db.define('app_users', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  nickname: { type: DataTypes.STRING(50), allowNull: false },
  name: { type: DataTypes.STRING(50), allowNull: false },
  lastname: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true }, },
  phone: { type: DataTypes.STRING(15), allowNull: false },
  birthday: { type: DataTypes.DATE, defaultValue: new Date() },
  nationality: { type: DataTypes.STRING(10), allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  notifications: { type: DataTypes.BOOLEAN, defaultValue: true },
  allowEmail: { type: DataTypes.BOOLEAN, defaultValue: true },
  allowTerms: { type: DataTypes.BOOLEAN, defaultValue: true },
  premium: { type: DataTypes.BOOLEAN },
  premiumSince: { type: DataTypes.DATE },
  premiumUntil: { type: DataTypes.DATE },
  lastSession: { type: DataTypes.DATE, defaultValue: new Date() },
  leavingDate: { type: DataTypes.DATE },
  code: { type: DataTypes.STRING },
}, {
  timestamps: true,
});

User.hasMany(Payment, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

Payment.belongsTo(User, {
  foreignKey: 'userId',
});

User.belongsToMany(Group, { through: 'app_users_groups' });
Group.belongsToMany(User, { through: 'app_users_groups' });

export default User;
