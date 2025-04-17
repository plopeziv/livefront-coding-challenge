export interface TableResultDTO {
  position: number;
  team: TeamInfoDTO;
  name: string;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: unknown;
}

export interface TeamInfoDTO {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}
