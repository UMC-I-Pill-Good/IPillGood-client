export type ConditionGraphDataType = {
    weekLabel: string;
    score: number;
    vitality: number;
    sleepHours: number;
    intakeDays: number;
    totalDays: number;
};

export type ConditionGraphPointType = ConditionGraphDataType & {
    x: number;
    y: number;
};

export type ConditionSummaryType = 'vitality' | 'sleep' | 'intake';
