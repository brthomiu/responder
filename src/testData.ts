// Example random data generation (you might want to use a library like Faker.js for more robust random data)

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomOrderInfo(): TOrderInfoObject {
  return {
    techName: generateRandomString(10),
    userName: generateRandomString(12),
    itemName: generateRandomString(15),
    deliveryLocation: generateRandomString(20),
    timeFrame: `${Math.floor(Math.random() * 24)} hours`,
    trackingNumber: `TRACK-${Math.floor(Math.random() * 1000000)}`,
    orderClosed: Math.random() < 0.5 ? "Yes" : "No",
    isSecurityKey: Math.random() < 0.5,
  };
}

export type TOrderInfoObject = {
  techName: string;
  userName: string;
  itemName: string;
  deliveryLocation: string;
  timeFrame: string;
  trackingNumber: string;
  orderClosed: string;
  isSecurityKey: boolean;
};

const testData1: TOrderInfoObject = generateRandomOrderInfo();
const testData2: TOrderInfoObject = generateRandomOrderInfo();
const testData3: TOrderInfoObject = generateRandomOrderInfo();

console.log("Test Data 1:", testData1);
console.log("Test Data 2:", testData2);
console.log("Test Data 3:", testData3);

export const testDataArray: TOrderInfoObject[] = [
  testData1,
  testData2,
  testData3,
];
