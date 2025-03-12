import { TOrderInfoObject } from "../../App";
import './Snippet.css';
import { copyTextFromElement } from "../../features/copyFunction";

interface SnippetProps {
    orderInfoObject: TOrderInfoObject;
}

const OrderShipped = (SnippetProps: SnippetProps) => {

    const { techName, userName, itemName, trackingNumber, orderClosed, isSecurityKey } = SnippetProps.orderInfoObject

    return (<div className="Snippet">
        <div className="FlexRow"><h2>Order Shipped</h2> <button onClick={() => copyTextFromElement("OrderShipped")}>Copy Response</button></div>
        <div id="OrderShipped">
            {`Hello ${userName},\n\n`}<br /><br />
            {`Your ${itemName} is ready!.\n\n`}<br /><br />
            {`This item is being shipped to you via FedEx. Please see the tracking number for the shipment below.\n\n`}<br /><br />
            {`FedEx Tracking ID: ${trackingNumber}\n\n`}<br /><br />
            {isSecurityKey && `To enroll a new security key please visit go/sk-enroll.\n\n`}
            {isSecurityKey && <><br /><br /></>}
            {`${orderClosed}\n\n`}<br /><br />
            {`Best Regards,\n`}<br />
            {`${techName}`}
        </div>
    </div>
    );
};

export default OrderShipped;