import { Router } from 'express';
import { createPaymentUser, deletePaymentUser, getPaymentUser, getPaymentsUsers, updatePaymentUser } from '../controllers/payment-user.controller';

const router = Router();

router.get('/get-payments-users', getPaymentsUsers);
router.get('/get-payment-user/:id', getPaymentUser);
router.post('/create-payment-user/', createPaymentUser);
router.put('/update-payment-user/:id', updatePaymentUser);
router.delete('/delete-payment-user/:id', deletePaymentUser);

export default router;
