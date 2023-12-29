import { Request, Response } from 'express';
import Payment from '../models/payment.model';

export const getPayments = (req: Request, res: Response) => {
  res.json({ msg: 'getPayments' });
};

export const getPayment = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ msg: 'getPayment', id });
};

export const createPayment = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const payment = await Payment.create(body);

    res.json({
      code: 1,
      msg: '',
      payment
    });
  } catch (error) {
    res.status(500).json({
      code: 3,
      msg: 'An error ocurred',
    });
  }
};

export const updatePayment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({ msg: 'updatePayment', body, id });
};

export const deletePayment = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ msg: 'deletePayment', id });
};
