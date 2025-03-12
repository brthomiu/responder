import { TOrderInfoObject } from "../App";

type TLine = {
  text: string;
  numberOfLineBreaksBefore?: number;
  numberOfLineBreaksAfter?: number;
}

type TSnippetInfo = {
  line0: TLine;
  line1?: TLine;
  line2?: TLine;
  line3?: TLine;
  line4?: TLine;
  line5?: TLine;
  line6?: TLine;
  line7?: TLine;
  line8?: TLine;
  line9?: TLine;
}

type Props = { orderInfoObject: TOrderInfoObject };

const Snippet = (props: Props) => {
  // Destructure order info from props
  const {
    techName,
    userName,
    itemName,
    orderClosed,
    deliveryLocation,
    isSecurityKey,
  } = props.orderInfoObject;

  return <div>Snippet</div>;
};

export default Snippet;
