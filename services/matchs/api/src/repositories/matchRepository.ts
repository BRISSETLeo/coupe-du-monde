import { RepositoryBase } from "./repositoryBase";
import { Match } from "../models/match";

export class MatchRepository extends RepositoryBase<Match> {

    protected static instance: MatchRepository | null = null;
    public constructor() {
        super("matchs");
    }

    public static getInstance(): MatchRepository {
        if (!MatchRepository.instance) {
            MatchRepository.instance = new MatchRepository();
        }
        return MatchRepository.instance;
    }

    public async findAll(): Promise<Match[]> {
        return this.getList();
    }

    public async findById(id: number): Promise<Match | null> {
        return this.getOne(id);
    }
}