import { InUse } from "./in-use";
import { SoftDelete } from "./soft-delete";

export type Reactive = SoftDelete & {
  _id:string;
  description: string;
  cas: string;
  stock: String;
  isAvailable: boolean;
};

export type dtoReactive = SoftDelete & {
  description: string;
  cas: string;
  stock?: number;
  isAvailable: boolean;
};
