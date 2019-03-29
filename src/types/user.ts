import { Team } from "./team";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: number; // TODO: what status mean?
  team: Team;
  teamId: number | null;
  teamRole: number | null;
}
