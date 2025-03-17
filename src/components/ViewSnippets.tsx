/* eslint-disable react-hooks/exhaustive-deps */
import Snippet from "./Snippet";
import { TSnippetInfoObject, TOrderInfoObject } from "../App";
import { useEffect } from "react";
import { defaultSnippets } from "../defaultSnippets";
import { getSnippets } from "../features/getTemplates";

type Props = {
  orderInfoObject: TOrderInfoObject;
  currentSnippets: TSnippetInfoObject[];
  setCurrentSnippets: React.Dispatch<
    React.SetStateAction<TSnippetInfoObject[]>
  >;
  key: string;
};

function ViewSnippets(props: Props) {
  const { currentSnippets, orderInfoObject, setCurrentSnippets, key } = props;
  /**
   * Effect hook that runs once when the component mounts
   * Populates order information fields from URL query parameters if available
   */
  useEffect(() => {
    setCurrentSnippets(defaultSnippets);
    getSnippets(currentSnippets, setCurrentSnippets);
  }, [key]); // Empty dependency array ensures this runs only once on component mount

  return (
    <>
      <h1 className="mb-6">Snippets</h1>
      {currentSnippets.map((snippetInfo: TSnippetInfoObject, index: number) => (
        <Snippet
        key={snippetInfo.title} // Use a unique key for React's reconciliation
          index={index}
          orderInfoObject={orderInfoObject}
          snippetInfoObject={snippetInfo}
          setCurrentSnippets={setCurrentSnippets}
        />
      ))}
      {/* Pre-built snippet templates with current order data */}
      {/* <FirstResponse orderInfoObject={orderInfoObject} />
    <DeskDelivery orderInfoObject={orderInfoObject} />
    <OrderShipped orderInfoObject={orderInfoObject} /> */}
    </>
  );
}

export default ViewSnippets;
