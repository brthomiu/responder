// App.tsx (or .jsx)
import { useState, useEffect } from "react";

// Import pre-built snippet template components
import FirstResponse from "./components/snippets/FirstResponse";
import OrderShipped from "./components/snippets/OrderShipped";
import DeskDelivery from "./components/snippets/DeskDelivery";
// Import generic snippet component and template creation component
import Snippet from "./components/Snippet";
import CreateTemplate from "./components/CreateTemplate";

/**
 * Type definition for order information
 * Contains all data needed to populate snippet templates with customer order details
 */
export type TOrderInfoObject = {
  techName: string;        // Name of the technician handling the order
  userName: string;        // Name of the customer/user receiving the order
  itemName: string;        // Description of the ordered item(s)
  deliveryLocation: string; // Where the item will be delivered
  timeFrame: string;       // Expected delivery timeframe
  trackingNumber: string;  // Order tracking identifier
  orderClosed: string;     // Standard message shown when an order is closed
  isSecurityKey: boolean;  // Flag for special handling of security-sensitive items
};

/**
 * Type definition for a line of text in a snippet template
 * Each line has customizable line break behavior before and after the text
 */
export type TLine = {
  text: string;                           // The content text of the line
  numberOfLineBreaksBefore?: 0 | 1;       // Optional line breaks before text (none or one)
  numberOfLineBreaksAfter?: 0 | 1 | 2;    // Optional line breaks after text (none, one, or two)
};

/**
 * Type definition for a complete snippet template
 * Contains a title and 10 configurable lines of text (line0 through line9)
 */
export type TSnippetInfoObject = {
  title: string;  // Title/name of the snippet template
  line0: TLine;   // First line of the template
  line1: TLine;   // Second line of the template
  line2: TLine;   // Third line of the template
  line3: TLine;   // Fourth line of the template
  line4: TLine;   // Fifth line of the template
  line5: TLine;   // Sixth line of the template
  line6: TLine;   // Seventh line of the template
  line7: TLine;   // Eighth line of the template
  line8: TLine;   // Ninth line of the template
  line9: TLine;   // Tenth line of the template
};

/**
 * Type definition for the setter functions of a snippet template
 * Provides a way for child components to update the state of the template
 */
export type TSnippetInfoSetter = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;  // Function to update template title
  setLine0: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update first line
  setLine1: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update second line
  setLine2: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update third line
  setLine3: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update fourth line
  setLine4: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update fifth line
  setLine5: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update sixth line
  setLine6: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update seventh line
  setLine7: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update eighth line
  setLine8: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update ninth line
  setLine9: React.Dispatch<React.SetStateAction<TLine>>;   // Function to update tenth line
};

/**
 * Main App component that serves as the container for the entire application.
 * Manages state for both order information and snippet templates.
 * Provides navigation between viewing templates and creating new ones.
 */
function App() {
  // State for controlling which view is currently active
  const [view, setView] = useState<"viewSnippets" | "createSnippets">("viewSnippets");

  // Order information state variables - each field has its own state and setter
  const [techName, setTechName] = useState("Technician");               // Default tech name
  const [userName, setUserName] = useState("User");                     // Default user name
  const [itemName, setItemName] = useState("Requested Item(s)");        // Default item description
  const [deliveryLocation, setDeliveryLocation] = useState("your desk"); // Default delivery location
  const [timeFrame, setTimeFrame] = useState("1 business day");         // Default timeframe
  const [trackingNumber, setTrackingNumber] = useState("XXXXXXXXX");    // Default tracking number placeholder
  const [isSecurityKey, setIsSecurityKey] = useState(false);            // Security key flag, default to false

  // Snippet template state variables - each line has its own state with default values
  const [title, setTitle] = useState("Title");  // Template title with default value

  // Initialize all template lines with empty text and default line break behavior
  const [line0, setLine0] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line1, setLine1] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line2, setLine2] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line3, setLine3] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line4, setLine4] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line5, setLine5] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line6, setLine6] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line7, setLine7] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line8, setLine8] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line9, setLine9] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });

  /**
   * Effect hook that runs once when the component mounts
   * Populates order information fields from URL query parameters if available
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set each field from URL parameter or use default value if parameter is not present
    setTechName(urlParams.get("techName") || "Technician");
    setUserName(urlParams.get("userName") || "User");
    setItemName(urlParams.get("itemName") || "Requested Item(s)");
    setDeliveryLocation(urlParams.get("deliveryLocation") || "your desk");
    setTimeFrame(urlParams.get("timeFrame") || "1 business day");
    setTrackingNumber(urlParams.get("trackingNumber") || "XXXXXXXXX");
  }, []); // Empty dependency array ensures this runs only once on component mount

  /**
   * Toggle handler for the security key checkbox
   * Inverts the current isSecurityKey state
   */
  const toggleIsSecurityKey = () => {
    setIsSecurityKey(!isSecurityKey);
  };

  /**
   * Consolidated order information object for use in child components
   * Combines all individual order state values into a single object
   */
  const orderInfoObject: TOrderInfoObject = {
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

  /**
   * Consolidated snippet template information object for use in child components
   * Combines all individual template line states into a single object
   */
  const snippetInfoObject: TSnippetInfoObject = {
    title,
    line0,
    line1,
    line2,
    line3,
    line4,
    line5,
    line6,
    line7,
    line8,
    line9,
  };

  /**
   * Object containing all setter functions for snippet template state
   * Allows child components to modify template content
   */
  const snippetInfoSetter: TSnippetInfoSetter = {
    setTitle,
    setLine0,
    setLine1,
    setLine2,
    setLine3,
    setLine4,
    setLine5,
    setLine6,
    setLine7,
    setLine8,
    setLine9,
  };

  /**
   * Generic input change handler for text input fields
   * Updates the corresponding state with the new input value
   * 
   * @param setField - State setter function for the field being updated
   * @param event - Change event from the input element
   */
  const handleInput = (
    setField: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setField(event.target.value);
  };

  return (
    <div className="max-w-4xl">
      {/* Navigation Bar */}
      <div className="fixed h-12 bg-neutral-800 w-full left-0 top-0 p-2">
        <div className="flex flex-row justify-end gap-4">
          <button onClick={() => setView("viewSnippets")}>View Snippets</button>
          <button onClick={() => setView("createSnippets")}>Create Snippets</button>
        </div>
      </div>
      <div className="mt-8"></div>
      
      {/* Order Information Form Section */}
      <h1 className="mb-2">Order Information</h1>
      <form className="flex flex-col mb-12">
        {/* First row of form fields */}
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
        
        {/* Second row of form fields */}
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
          
          {/* Security Key checkbox */}
          <div className="flex flex-col gap-2 text-center w-54">
            <div>Security Key?</div>
            <input
              type="checkbox"
              className="scale-125"
              checked={isSecurityKey}
              onChange={toggleIsSecurityKey}
            />
          </div>
        </div>
      </form>

      {/* Template Creation View - Only shown when view state is "createSnippets" */}
      {view === "createSnippets" && (
        <>
          <h1 className="mb-4">Create Template</h1>
          <CreateTemplate
            snippetInfoObject={snippetInfoObject}
            snippetInfoSetter={snippetInfoSetter}
          />

          {/* Preview section shows how the template will look with current order data */}
          <h1 className="mb-4 mt-12">Template Preview</h1>
          <Snippet
            orderInfoObject={orderInfoObject}
            snippetInfoObject={snippetInfoObject}
          />
        </>
      )}

      {/* View Snippets View - Only shown when view state is "viewSnippets" */}
      {view === "viewSnippets" && (
        <>
          <h1 className="mb-2">Snippets</h1>
          {/* Pre-built snippet templates with current order data */}
          <FirstResponse orderInfoObject={orderInfoObject} />
          <DeskDelivery orderInfoObject={orderInfoObject} />
          <OrderShipped orderInfoObject={orderInfoObject} />
        </>
      )}
    </div>
  );
}

export default App;