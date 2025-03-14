import { TOrderInfoObject } from "../App";
import { processSnippet } from "../features/matchVariable";
import { useState } from "react";

export type TLine = {
  text: string;
  numberOfLineBreaksBefore?: 0 | 1;
  numberOfLineBreaksAfter?: 0 | 1 | 2;
};

export type TSnippetInfo = {
  title: string;
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
};

type Props = { orderInfoObject: TOrderInfoObject };

const Snippet = (props: Props) => {
  // these useState hooks make up the snippetInfo object
  const [title, setTitle] = useState("Title");
  const [line0, setLine0] = useState<TLine>({
    text: "",
    numberOfLineBreaksBefore: 0,
    numberOfLineBreaksAfter: 1,
  });
  const [line1, setLine1] = useState<TLine | undefined>();
  const [line2, setLine2] = useState<TLine | undefined>();
  const [line3, setLine3] = useState<TLine | undefined>();
  const [line4, setLine4] = useState<TLine | undefined>();
  const [line5, setLine5] = useState<TLine | undefined>();
  const [line6, setLine6] = useState<TLine | undefined>();
  const [line7, setLine7] = useState<TLine | undefined>();
  const [line8, setLine8] = useState<TLine | undefined>();
  const [line9, setLine9] = useState<TLine | undefined>();

  const snippetInfoObject: TSnippetInfo = {
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

  // Destructure order info from props
  const { orderInfoObject } = props;

  const processedOrderInfo = processSnippet(snippetInfoObject, orderInfoObject);

  return (
    <>
      <h2 className="text-3xl font-semibold">{`${processedOrderInfo.title}`}</h2>
      {/* LINE 0 */}
      {processedOrderInfo.line0.numberOfLineBreaksBefore === 1 && <br />}
      <div>{processedOrderInfo.line0.text}</div>
      {processedOrderInfo.line0.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line0.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 1 */}
      {processedOrderInfo.line1?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line1 && <div>{processedOrderInfo.line1.text}</div>}
      {processedOrderInfo.line1?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line1?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 2 */}
      {processedOrderInfo.line2?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line2 && <div>{processedOrderInfo.line2.text}</div>}
      {processedOrderInfo.line2?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line2?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 3 */}
      {processedOrderInfo.line3?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line3 && <div>{processedOrderInfo.line3.text}</div>}
      {processedOrderInfo.line3?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line3?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 4 */}
      {processedOrderInfo.line4?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line4 && <div>{processedOrderInfo.line4.text}</div>}
      {processedOrderInfo.line4?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line4?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 5 */}
      {processedOrderInfo.line5?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line5 && <div>{processedOrderInfo.line5.text}</div>}
      {processedOrderInfo.line5?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line5?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 6 */}
      {processedOrderInfo.line6?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line6 && <div>{processedOrderInfo.line6.text}</div>}
      {processedOrderInfo.line6?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line6?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 7 */}
      {processedOrderInfo.line7?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line7 && <div>{processedOrderInfo.line7.text}</div>}
      {processedOrderInfo.line7?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line7?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 8 */}
      {processedOrderInfo.line8?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line8 && <div>{processedOrderInfo.line8.text}</div>}
      {processedOrderInfo.line8?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line8?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}

      {/* LINE 9 */}
      {processedOrderInfo.line9?.numberOfLineBreaksBefore === 1 && <br />}
      {processedOrderInfo.line9 && <div>{processedOrderInfo.line9.text}</div>}
      {processedOrderInfo.line9?.numberOfLineBreaksAfter === 1 && (
        <div>{`\n`}<br /></div>
      )}
      {processedOrderInfo.line9?.numberOfLineBreaksAfter === 2 && (
        <div>{`\n\n`}<br /><br /></div>
      )}


    </>
  );
};

export default Snippet;
