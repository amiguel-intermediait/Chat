import {Router} from 'express';
import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers/users';
import { validateJtw } from '../middleware/validateJwt';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.put('/:id',[
    validateJtw
], putUser);
router.delete('/:id',[
    validateJtw
], deleteUser)
export default router;