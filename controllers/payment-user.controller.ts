import { Request, Response } from 'express';
import PaymentUser from '../models/payment-user.model';

export const getPaymentsUsers = (req: Request, res: Response) => {
  res.json({ msg: 'getPaymentsUsers' });
};

export const getPaymentUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ msg: 'getPaymentUser', id });
};

export const createPaymentUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const paymentUser = await PaymentUser.create(body);

    res.json({
      code: 1,
      msg: '',
      paymentUser
    });
  } catch (error) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};

export const updatePaymentUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({ msg: 'updatePaymentUser', body, id });
};

export const deletePaymentUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ msg: 'deletePaymentUser', id });
};
