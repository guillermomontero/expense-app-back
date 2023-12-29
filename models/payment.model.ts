import { DataTypes } from "sequelize";
import db from '../db/connection';
import PaymentUser from './payment-user.model';

const Payment = db.define('app_payments', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(50), allowNull: false },
  description: { type: DataTypes.STRING(150), allowNull: false },
  amount: { type: DataTypes.FLOAT(7, 2), allowNull: false },
  typeAmount: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
}, {
  timestamps: true,
});

Payment.hasMany(PaymentUser, {
  foreignKey: 'paymentId',
  sourceKey: 'id',
});

PaymentUser.belongsTo(Payment, {
  foreignKey: 'paymentId',
});

export default Payment;
