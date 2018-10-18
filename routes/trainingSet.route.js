import { Router } from 'express';
const router = Router();

import { test, trainingDataCreate, trainingDataList } from '../controllers/trainingSet.controller';

// initial test url to ensure things are working properly
router.get('/test', test);

// route to create a new trainingSet
router.post('/create', trainingDataCreate);
router.get('/list', trainingDataList)

export default router;
