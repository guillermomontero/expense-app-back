import { DataTypes } from "sequelize";
import db from '../db/connection';

const User = db.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nickname: { type: DataTypes.STRING(50) },
  name: { type: DataTypes.STRING(50) },
  lastname: { type: DataTypes.STRING(100) },
  email: { type: DataTypes.STRING(150) },
  phone: { type: DataTypes.INTEGER },
  birthday: { type: DataTypes.DATEONLY },
  nationality: { type: DataTypes.STRING(10) },
  image: { type: DataTypes.STRING },
  premium: { type: DataTypes.BOOLEAN },
  premiumSince: { type: DataTypes.DATEONLY },
  premiumUntil: { type: DataTypes.DATEONLY },
  createDate: { type: DataTypes.DATEONLY },
  createTime: { type: DataTypes.TIME },
  leavingDate: { type: DataTypes.DATEONLY },
  lastSession: { type: DataTypes.DATEONLY },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  notifications: { type: DataTypes.BOOLEAN },
  allowEmail: { type: DataTypes.BOOLEAN },
  allowTerms: { type: DataTypes.BOOLEAN },
  active: { type: DataTypes.BOOLEAN },
  groups: { type: DataTypes.BLOB },
});
