interface PlayerPlanet {
    'OwnerId': string;
    'HQLevel': StarbaseLevel;
}

interface PlayerDataFromAPI {
    id: number;
    Name: string;
    Avatar: string;
    Level: number;
    Experience: number;
    TutorialCompleted: boolean;
    AllianceId: string | null;
    Planets: PlayerPlanet[];
}

interface PlayerDataFromAPI {
    player: PlayerDataFromAPI;
}

interface AllianceEmblem {
    Shape: number;
    Pattern: number;
    Icon: number;
}

type RoleCode = 0 | 1 | 2 ;

interface AllianceMember {
    Id: number;
    Name: string;
    Avatar: string;
    Level: number;
    AllianceRole: RoleCode;
    TotalWarPoints: number;
}

interface AllianceDataFromAPI {
    Id: string;
    Name: string;
    Description: string;
    Emblem: AllianceEmblem;
    // AllianceLevel: int;
    // WarPoints: int;
    // WarsWon: int;
    // WarsLost: int;
    // InWar: bool;
    // OpponentAllianceId: int;
    Members: AllianceMember[];
}
