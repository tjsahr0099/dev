export enum STATE {
    Normal = 'N',
    Battle = 'B',
    Death = 'D'
}

export enum CLASS {
    Equipment = 'EQP',
    Consume = 'CSM'
}

export enum SUB_CLASS {

    //EQP
    Weapon = 'WPN',
    Top = 'TOP',
    Bottom = 'BTM',
    Head = 'HED',
    SHOES = 'SHO',
    Ring = 'RNG',
    Necklace = 'NCK',

    //CSM
    Portion = 'PTN'
}

export enum MAX_STACK_SIZE {
    One = 1,
    Full = 99,
}