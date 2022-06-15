import {Router} from 'express';
import { login, renewToken } from '../controllers/auth';
import { check } from 'express-validator';
import { validateData } from '../middleware/validateData'
import { validateJtw } from '../middleware/validateJwt'

const router = Router();

router.post('/login',[check('email','mail is required').isEmail(),
validateData], login);
router.get('/', [validateJtw], renewToken );
export default router;