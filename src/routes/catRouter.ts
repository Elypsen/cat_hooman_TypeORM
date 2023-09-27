import { Router } from 'express';

import { addMaster, createCat, deleteCat, getAllCat, getCat, updateCat } from '../controllers/catController';

const catRouter = Router();

catRouter.get('/', getAllCat);
catRouter.put('/hooman/:id', addMaster);
catRouter.get('/:id', getCat);
catRouter.post('/', createCat);
catRouter.put('/:id', updateCat);
catRouter.delete('/:id', deleteCat);

export default catRouter;