import { DataTypes } from "sequelize";
import db from '../db/connection';

const PaymentUser = db.define('app_payments_users', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  payingUser: { type: DataTypes.UUID, allowNull: false },
  userToPay: { type: DataTypes.UUID, allowNull: false },
  amount: { type: DataTypes.FLOAT(7, 2), allowNull: false },
  paid: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  timestamps: true,
});

export default PaymentUser;
