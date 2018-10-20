import { Router } from 'express';
import Multer from 'multer';


const upload = Multer({ storage: Multer.memoryStorage() })
const router = Router();

import { test, trainingDataCreate, trainingDataList } from '../controllers/trainingSet.controller';

// initial test url to ensure things are working properly
router.get('/test', test);

// route to create a new trainingSet
router.post('/create', upload.single('trainingData'), trainingDataCreate);
router.get('/list', trainingDataList);

export default router;
