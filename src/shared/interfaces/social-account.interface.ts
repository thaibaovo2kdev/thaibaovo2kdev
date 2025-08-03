export interface ISocialAccount {
    id: number;
    userId: number;
    teamId?: number;
    platform: string;
    username: string;
    followers: number;
  }
  
  export interface ISocialAccountDto {
    userId: number;
    teamId?: number;
    username: string;
    followers: number;
  }