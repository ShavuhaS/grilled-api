export type DbFilter = {
  [key in string]: {
    min?: number;
    max?: number;
    in?: any[];
  };
};
