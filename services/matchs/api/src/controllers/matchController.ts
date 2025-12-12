import { Request, Response, NextFunction } from 'express';
import { MatchRepository } from '../repositories/matchRepository';

const matchRepository = new MatchRepository();

export const getAllMatchs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const matchs = await matchRepository.findAll();
        res.json(matchs);
    } catch (error) {
        next(error);
    }
};

export const getMatchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const match = await matchRepository.findById(parseInt(req.params.id));
        if (!match) {
            return res.status(404).json({ message: 'Match non trouvé' });
        }
        res.json(match);
    } catch (error) {
        next(error);
    }
};

export const createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newMatch = await matchRepository.create(req.body);
        res.status(201).json(newMatch);
    } catch (error) {
        next(error);
    }
};

export const updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedMatch = await matchRepository.update(parseInt(req.params.id), req.body);
        if (!updatedMatch) {
            return res.status(404).json({ message: 'Match non trouvé' });
        }
        res.json(updatedMatch);
    } catch (error) {
        next(error);
    }
};

export const deleteMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await matchRepository.delete(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};