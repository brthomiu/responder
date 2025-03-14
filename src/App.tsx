// App.tsx (or .jsx)
import { useState, useEffect } from "react";
import FirstResponse from "./components/snippets/FirstResponse";
import OrderShipped from "./components/snippets/OrderShipped";
import DeskDelivery from "./components/snippets/DeskDelivery";
import Snippet from "./components/Snippet";
import { testDataArray } from "./testData";

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

function App() {
  // these useState hooks make up the orderInfo object
  const [techName, setTechName] = useState("Technician");
  const [userName, setUserName] = useState("User");
  const [itemName, setItemName] = useState("Requested Item(s)");
  const [deliveryLocation, setDeliveryLocation] = useState("your desk");
  const [timeFrame, setTimeFrame] = useState("1 business day");
  const [trackingNumber, setTrackingNumber] = useState("XXXXXXXXX");
  const [isSecurityKey, setIsSecurityKey] = useState(false);

  const toggleIsSecurityKey = () => {
    setIsSecurityKey(!isSecurityKey);
  };

  // useEffect hook checks the URL for parameters to populate the orderInfo form with
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setTechName(urlParams.get("techName") || "Technician");
    setUserName(urlParams.get("userName") || "User");
    setItemName(urlParams.get("itemName") || "Requested Item(s)");
    setDeliveryLocation(urlParams.get("deliveryLocation") || "your desk");
    setTimeFrame(urlParams.get("timeFrame") || "1 business day");
    setTrackingNumber(urlParams.get("trackingNumber") || "XXXXXXXXX");
  }, []); // Empty dependency array ensures this runs only once on mount

  const orderInfoObject = {
    techName,
    userName,
    itemName,
    deliveryLocation,
    timeFrame,
    trackingNumber,
    orderClosed:
      "This request is now being closed, please visit go/stuff to request additional equipment, or visit go/emt-request for additional support.",
    isSecurityKey,
  };

  const handleInput = (
    setField: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setField(event.target.value);
  };

  return (
    <div className="App">
      {testDataArray.map((object: TOrderInfoObject, index) => (
        <Snippet key={index} orderInfoObject={object} />
      ))}
      <Snippet orderInfoObject={orderInfoObject} />

      <h1 className="">Order Information</h1>
      <form className="flex flex-col">
        <div className="flex gap-2 my-2">
          <div className="w-54">
            Tech Name:{" "}
            <input
              className="border border-gray-500 px-1.5 py-0.5 rounded"
              id="TechName"
              value={techName}
              onChange={(event) => handleInput(setTechName, event)}
            />
          </div>
          <div className="w-54">
            User Name:{" "}
            <input
              className="border border-gray-500 px-1.5 py-0.5 rounded"
              id="UserName"
              value={userName}
              onChange={(event) => handleInput(setUserName, event)}
            />
          </div>
          <div className="w-54">
            Item Name:{" "}
            <input
              className="border border-gray-500 px-1.5 py-0.5 rounded"
              id="ItemName"
              value={itemName}
              onChange={(event) => handleInput(setItemName, event)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-54">
            Time Frame:{" "}
            <input
              className="border border-gray-500 px-1.5 py-0.5 rounded"
              id="TimeFrame"
              value={timeFrame}
              onChange={(event) => handleInput(setTimeFrame, event)}
            />
          </div>
          <div className="w-54">
            Delivery Location:{" "}
            <input
              className="border border-gray-500 px-1.5 py-0.5 rounded"
              id="DeliveryLocation"
              value={deliveryLocation}
              onChange={(event) => handleInput(setDeliveryLocation, event)}
            />
          </div>
          <div className="w-54">
            Tracking Number:{" "}
            <input
              className="border border-gray-500 px-1.5 py-0.5 rounded"
              id="trackingNumber"
              value={trackingNumber}
              onChange={(event) => handleInput(setTrackingNumber, event)}
            />
          </div>
          <div className="flex flex-col gap-2 text-center w-54">
            <div className="">Security Key?</div>
            <input
              type="checkbox"
              className="scale-125"
              checked={isSecurityKey}
              onChange={toggleIsSecurityKey}
            />
          </div>
        </div>
      </form>
      <br />
      <h1>Snippets</h1>
      <br />
      <FirstResponse orderInfoObject={orderInfoObject} />
      <DeskDelivery orderInfoObject={orderInfoObject} />
      <OrderShipped orderInfoObject={orderInfoObject} />
    </div>
  );
}

export default App;
