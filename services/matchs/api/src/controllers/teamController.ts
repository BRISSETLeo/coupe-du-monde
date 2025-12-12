import { Request, Response, NextFunction } from 'express';
import { TeamRepository } from '../repositories/teamRepository';

const teamRepository = new TeamRepository();

export const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamRepository.findAll();
        res.json(teams);
    } catch (error) {
        next(error);
    }
};

export const getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await teamRepository.findById(parseInt(req.params.id));
        if (!team) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }
        res.json(team);
    } catch (error) {
        next(error);
    }
};

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTeam = await teamRepository.create(req.body);
        res.status(201).json(newTeam);
    } catch (error) {
        next(error);
    }
};

export const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedTeam = await teamRepository.update(parseInt(req.params.id), req.body);
        if (!updatedTeam) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }
        res.json(updatedTeam);
    } catch (error) {
        next(error);
    }
};

export const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await teamRepository.delete(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};