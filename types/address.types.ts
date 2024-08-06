export interface Address {
  id: string;
  country: string;
  province: string;
  district: string;
  municipality: string;
  wardName: string;
  wardNo: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
