import { InUse } from "./in-use";
import { SoftDelete } from "./soft-delete";

export type Reactive = SoftDelete & {
  _id:string;
  description: string;
  cas: string;
  stock?: number;
  inUse: InUse[];
  isAvailable: boolean;
};
