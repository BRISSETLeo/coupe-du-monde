import {RepositoryBase} from "./repositoryBase";
import {Team} from "../models/team";

export class TeamRepository extends RepositoryBase<Team>{

    protected static instance: TeamRepository | null = null;
    public constructor() {
        super("customer");
    }

    public static getInstance(): TeamRepository {
        if (!TeamRepository.instance) {
            TeamRepository.instance = new TeamRepository();
        }
        return TeamRepository.instance;
    }
}