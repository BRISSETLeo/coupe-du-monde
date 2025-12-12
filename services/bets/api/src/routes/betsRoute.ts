import { Router } from 'express';
import {createBet, deleteBet, getAllBets, getBetById, updateBet} from "../controllers/betController";

const router = Router();

router.get('/', getAllBets);
router.get('/:id', getBetById);
router.post('/', createBet);
router.put('/:id', updateBet);
router.delete('/:id', deleteBet);

export default router;