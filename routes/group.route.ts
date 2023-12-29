import { Router } from 'express';
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../controllers/group.controller';

const router = Router();

router.get('/get-groups', getGroups);
router.get('/get-group/:id', getGroup);
router.post('/create-group/', createGroup);
router.put('/update-group/:id', updateGroup);
router.delete('/delete-group/:id', deleteGroup);

export default router;
