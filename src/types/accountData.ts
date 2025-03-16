export interface AccountDetails {
  amountAvailable: number;
  box: Box;
  transactions: Transaction[];
}

export interface Box {
  amount: number;
  profit: number;
}

export interface Transaction {
  id: number;
  place: string;
  amount: number;
  date: string;
}
