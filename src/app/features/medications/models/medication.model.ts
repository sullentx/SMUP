export interface Medication {
  id: number;
  code: string;
  name: string;
  stock: number;
  laboratory?: string;
  dosage?: string;
  type?: string;
}