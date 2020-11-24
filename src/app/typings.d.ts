export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

export type CallBack = (...args: any) => any;

export type Similar<T> = Partial<{ [key in keyof T]: any } & { [key: string]: any }>;

export type Nullable<T> = T | null | undefined;

export type Optional<T> = T | undefined;
