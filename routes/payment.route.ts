import { Router } from 'express';
import { createPayment, deletePayment, getPayment, getPayments, updatePayment } from '../controllers/payment.controller';

const router = Router();

router.get('/get-payments', getPayments);
router.get('/get-payment/:id', getPayment);
router.post('/create-payment/', createPayment);
router.put('/update-payment/:id', updatePayment);
router.delete('/delete-payment/:id', deletePayment);

export default router;
