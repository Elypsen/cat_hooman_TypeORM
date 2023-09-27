import { Router } from 'express';
import { addCats, createHooman, deleteHooman, getAllHooman, getHooman, updateHooman } from '../controllers/hoomanController';

const hoomanRouter = Router();

hoomanRouter.get('/', getAllHooman);
hoomanRouter.put('/addCats/:id', addCats);
hoomanRouter.get('/:id', getHooman);
hoomanRouter.post('/', createHooman);
hoomanRouter.put('/:id', updateHooman);
hoomanRouter.delete('/:id', deleteHooman);

export default hoomanRouter;