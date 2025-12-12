import {RepositoryBase} from "./repositoryBase";
import {Match} from "../models/match";

export class MatchRepository extends RepositoryBase<Match>{

    protected static instance: MatchRepository | null = null;
    public constructor() {
        super("customer");
    }

    public static getInstance(): MatchRepository {
        if (!MatchRepository.instance) {
            MatchRepository.instance = new MatchRepository();
        }
        return MatchRepository.instance;
    }
}