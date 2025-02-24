import { Router } from "express";
import validation from'../../Middleware/Validation.js'
import auth from '../../../SRC/Middleware/token.js';
import {asyncHandler} from '../../../SRC/utils/catcherror.js';
import {sendMessage,getMessage,deleteMessage} from './controller.js';
const router = Router();
router.post('/:receiverid', asyncHandler(sendMessage));
router.get('/', auth(),asyncHandler(getMessage));
router.delete('/:MessageID', auth(),asyncHandler(deleteMessage));
  
   export default router;
