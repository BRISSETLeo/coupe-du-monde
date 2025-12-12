import { RepositoryBase } from "./repositoryBase";
import {Bet} from "../models/bet";

export class BetRepository extends RepositoryBase<Bet> {

    protected static instance: BetRepository | null = null;
    public constructor() {
        super("bets");
    }

    public static getInstance(): BetRepository {
        if (!BetRepository.instance) {
            BetRepository.instance = new BetRepository();
        }
        return BetRepository.instance;
    }

    public async findAll(): Promise<Bet[]> {
        return this.getList();
    }

    public async findById(id: number): Promise<Bet | null> {
        return this.getOne(id);
    }
}