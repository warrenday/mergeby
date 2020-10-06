export type LooseObject = { [key: string]: any };
export type ComparitorFunction = <T extends LooseObject, K extends LooseObject>(
  newObject: T,
  oldObject: K
) => boolean;
export type MergedObject<T extends LooseObject, K extends LooseObject> =
  | T
  | K
  | (T & K);
