import { Router } from 'express';
import { createUser, deleteUser, getUser, getAllUsers, getAllActiveUsers, updateUser } from '../controllers/user.controller';

const router = Router();

router.get('/get-all-users', getAllUsers);
router.get('/get-all-active-users', getAllActiveUsers);
router.get('/get-users', getAllActiveUsers);
router.get('/get-user/:id', getUser);
router.post('/create-user/', createUser);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;
