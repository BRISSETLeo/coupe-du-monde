import { RepositoryBase } from "./repositoryBase";
import { Team } from "../models/team";

export class TeamRepository extends RepositoryBase<Team> {

    protected static instance: TeamRepository | null = null;
    public constructor() {
        super("teams");
    }

    public static getInstance(): TeamRepository {
        if (!TeamRepository.instance) {
            TeamRepository.instance = new TeamRepository();
        }
        return TeamRepository.instance;
    }

    public async findAll(): Promise<Team[]> {
        return this.getList();
    }

    public async findById(id: number): Promise<Team | null> {
        return this.getOne(id);
    }
}