import { InUse } from "./in-use";
import { SoftDelete } from "./soft-delete";

export type Equipment = SoftDelete & {
  _id: string;
  type: string;
  description: string;
  stock: number;
  unitMeasure: string;
  inRepair: number;
  isAvailable: boolean;};


export type createEquipment = SoftDelete & {
  type: string;
  description: string;
  stock: number;
  unitMeasure: string;
  inRepair: number;
  isAvailable: boolean;
};
