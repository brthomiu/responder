// import { TOrderInfoObject } from "../../App";
// import './Snippet.css';
// import { copyTextFromElement } from "../../features/copyFunction";

// interface SnippetProps {
//     orderInfoObject: TOrderInfoObject;
// }

// const FirstResponse = (SnippetProps: SnippetProps) => {

//     const { techName, userName, itemName, timeFrame, } = SnippetProps.orderInfoObject

//     return (<div className="Snippet">
//         <div className="FlexRow"><h2>First Response</h2> <button onClick={() => copyTextFromElement("FirstResponse")}>Copy Response</button></div>
//         <div id="FirstResponse">
//             {`Hello ${userName},\n\n`}<br /><br />
//             {`Thank you for contacting EMT!\n\n`}<br /><br />
//             {`Your order for the ${itemName} has been received and is being processed. You will receive an update from the assigned technician within ${timeFrame}.\n\n`}<br /><br />
//             {`Best Regards,\n`}<br />
//             {`${techName}`}
//         </div>
//     </div>
//     );
// };

// export default FirstResponse;