export type ArrayElement<T> = T extends (infer U)[] ? U : never;

export type MutuallyExclusive<T> = { [K in keyof T]?: never } | T;
