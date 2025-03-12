import { TOrderInfoObject } from "../../App";
import './Snippet.css';
import { copyTextFromElement } from "../../features/copyFunction";

interface SnippetProps {
    orderInfoObject: TOrderInfoObject;
}

const DeskDelivery = (SnippetProps: SnippetProps) => {

    const { techName, userName, itemName, orderClosed, deliveryLocation, isSecurityKey } = SnippetProps.orderInfoObject

    return (<div className="Snippet">
        <div className="FlexRow"><h2>Desk Delivery</h2> <button onClick={() => copyTextFromElement("DeskDelivery")}>Copy Response</button></div>
        <div id="DeskDelivery">
            {`Hello ${userName},\n\n`}<br /><br />
            {`The ${itemName} that you ordered has been delivered to ${deliveryLocation} on ${new Date().toLocaleDateString()}.\n\n`}<br /><br />
            {isSecurityKey && `To enroll a new security key please visit go/sk-enroll.\n\n`}
            {isSecurityKey && <><br /><br /></>}
            {`${orderClosed}\n\n`}<br /><br />
            {`Best Regards,\n`}<br />
            {`${techName}`}
        </div>
    </div>
    );
};

export default DeskDelivery;