export type ArgOfChildren<T> = T extends { children: (arg: infer R) => any } ? R : any;
