import { InUse } from "./in-use";
import { SoftDelete } from "./soft-delete";


export type Material = SoftDelete & {
  _id:  string;
  description: string;
  unitMeasure: string;
  type: string;
  stock: number;
  inUse: InUse[];
  inRepair?: number;
  isAvailable: boolean;
};
