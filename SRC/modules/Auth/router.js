import { Router } from "express";
import  {registerschema,loginschema } from './validation.js';
import validation from'../../Middleware/Validation.js'
import {asyncHandler} from '../../../SRC/utils/catcherror.js';
import {Register,login} from './controller.js';
const router = Router();
router.post('/Register', validation(registerschema),asyncHandler(Register));
router.post("/login" ,validation(loginschema),asyncHandler(login));

  
   export default router;
