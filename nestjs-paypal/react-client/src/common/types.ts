export type CreatePaypalorderBody = {
  surname: string;
  givenname: string;
  email: string;
  itemname: string;
  amount: number;
};

export type ApprovePaypalOrderBody = {
  orderId: string;
};
