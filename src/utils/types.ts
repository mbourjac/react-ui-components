export type ArrayElement<T> = T extends (infer U)[] ? U : never;

export type MutuallyExclusive<T> = { [K in keyof T]?: never } | T;

export type RenameProperties<T, K extends keyof T, N extends string> = {
  [P in Exclude<keyof T, K>]: T[P];
} & { [P in N]: T[K] };
