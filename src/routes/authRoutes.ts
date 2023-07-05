import express from 'express';
import {login, checkTokenValidity} from '../controllers/AuthController';

const router = express.Router();

router.post('/', login);
router.get('/', checkTokenValidity);

export default router;
