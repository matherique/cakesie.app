export type StepProps = {
  onNext: () => void;
  onPrev: () => void;
  order: OrderDetails;
  setOrder: (order: Partial<OrderDetails>) => void;
};

export type OrderCakeDeatils = {
  id: string
  price: number
}

export type OrderDetails = {
  cakes: OrderCakeDeatils[];
  client: string;
  address: string;
  phone: string;
  total: number;
}
