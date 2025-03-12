import { TOrderInfoObject } from "../App";

export const matchVariable = (
  variable: string,
  orderInfoObject: TOrderInfoObject
): string => {
  switch (variable) {
    case "#tech":
      return orderInfoObject.techName;
    case "#user":
      return orderInfoObject.userName;
    case "#item":
      return orderInfoObject.itemName;
    case "#closed":
      return orderInfoObject.orderClosed;
    case "#location":
      return orderInfoObject.deliveryLocation;
    default:
      return "#VARIABLE_ERROR";
  }
};
