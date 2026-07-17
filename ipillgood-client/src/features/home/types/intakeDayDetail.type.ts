export type DayIntakeItemType = {
  userSupplementId: number;
  productName: string;
  taken: boolean;
  takenAt: string | null;
};

export type DayIntakeDetailType = {
  date: string;
  intakes: DayIntakeItemType[];
};
