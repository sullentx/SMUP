export interface Medication {
    id?: number;
    code: string;
    name: string;
    description: string;
    stock: number;
    expirationDate?: Date;
    manufacturer?: string;
  }