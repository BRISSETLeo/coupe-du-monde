import { Request, Response, NextFunction } from 'express';
import {BetRepository} from "../repositories/betRepository";

const betRepository = new BetRepository();

export const getAllBets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bets = await betRepository.findAll();
        res.json(bets);
    } catch (error) {
        next(error);
    }
};

export const getBetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bet = await betRepository.findById(parseInt(req.params.id));
        if (!bet) {
            return res.status(404).json({ message: 'Pari non trouvé' });
        }
        res.json(bet);
    } catch (error) {
        next(error);
    }
};

export const createBet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBet = await betRepository.create(req.body);
        res.status(201).json(newBet);
    } catch (error) {
        next(error);
    }
};

export const updateBet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedBet = await betRepository.update(parseInt(req.params.id), req.body);
        if (!updatedBet) {
            return res.status(404).json({ message: 'Pari non trouvé' });
        }
        res.json(updatedBet);
    } catch (error) {
        next(error);
    }
};

export const deleteBet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await betRepository.delete(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};