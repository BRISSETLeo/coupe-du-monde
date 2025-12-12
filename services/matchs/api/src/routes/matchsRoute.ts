import { Router } from 'express';
import {
    getAllMatchs,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch
} from '../controllers/matchController';
import { requireAdminAuth } from '../middlewares/auth';

const router = Router();

// Routes publiques (lecture)
router.get('/', getAllMatchs);
router.get('/:id', getMatchById);

// Routes protégées (admin uniquement)
router.post('/', requireAdminAuth, createMatch);
router.put('/:id', requireAdminAuth, updateMatch);
router.delete('/:id', requireAdminAuth, deleteMatch);

export default router;