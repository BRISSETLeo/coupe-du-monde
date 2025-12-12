import { Router } from 'express';
import {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
} from '../controllers/teamController';
import { requireAdminAuth } from '../middlewares/auth';

const router = Router();

// Routes publiques (lecture)
router.get('/', getAllTeams);
router.get('/:id', getTeamById);

// Routes protégées (admin uniquement)
router.post('/', requireAdminAuth, createTeam);
router.put('/:id', requireAdminAuth, updateTeam);
router.delete('/:id', requireAdminAuth, deleteTeam);

export default router;