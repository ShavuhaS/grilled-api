export type DbFilter = {
  [key in string]: {
    gte?: number;
    lte?: number;
    in?: any[];
  };
};
