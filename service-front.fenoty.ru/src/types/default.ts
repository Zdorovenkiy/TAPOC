export interface Teams {
    id: number;
    name: string;
    imageBig: string;
    imageSmall: string;
}

export interface TelegramData {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    language_code: string;
    team_id: number;
}

export interface User {
    id: number;
    tg_id: number;
    tg_name: string;
    tg_surname: string;
    tg_username: string;
    balance: number;
    friend_id: number,
    friend_reward: number,
    level_id: number;
    team_id: number;
    language_code: string;
    daily_id: number;
    last_session: any;
    daily_accepted: boolean;
    levelLimit: number;
    
    
}
