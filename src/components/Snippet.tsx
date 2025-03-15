import { useEffect, useState } from "react";
import { TLine, TOrderInfoObject, TSnippetInfoObject } from "../App";
import { processSnippet } from "../features/matchVariable";
import { copyTextFromElement } from "../features/copyFunction";

// Define the props interface for the Snippet component
type Props = {
  orderInfoObject: TOrderInfoObject; // Object containing order information used for variable replacement
  snippetInfoObject: TSnippetInfoObject; // Object containing snippet template information
};

/**
 * RenderLine component: Renders a single line of the snippet.
 * It handles line breaks before and after the text.
 */
const RenderLine = ({ line }: { line: TLine }) => {
  // Only render if the line and its text field are not empty
  if (!line || !line.text) return null;

  return (
    <>
      {/* Render a line break before the text if numberOfLineBreaksBefore is 1 */}
      {line.numberOfLineBreaksBefore === 1 && <br />}

      {/* Render the line text */}
      <div>{line.text}</div>

      {/* Render a line break after the text if numberOfLineBreaksAfter is 1 */}
      {line.numberOfLineBreaksAfter === 1 && <div>{`\n`}</div>}

      {/* Render two line breaks after the text if numberOfLineBreaksAfter is 2 */}
      {line.numberOfLineBreaksAfter === 2 && (
        <div>
          {`\n\n`}
          <br />
        </div>
      )}
    </>
  );
};

/**
 * RenderLines component: Renders all lines of the snippet.
 * It filters the snippetInfoObject to extract line data and uses RenderLine to render each line.
 */
const RenderLines = ({
  processedSnippetInfo,
}: {
  processedSnippetInfo: TSnippetInfoObject;
}) => {
  // Extract line objects from processedSnippetInfo
  const lines = Object.keys(processedSnippetInfo)
    .filter((key) => key.startsWith("line")) // Filter keys starting with "line" (e.g., "line0", "line1", ...)
    // @ts-expect-error - TypeScript cannot guarantee the dynamic key access, but it works at runtime
    .map((key) => processedSnippetInfo[key]); // Map keys to corresponding line objects

  return (
    <>
      {/* Render each line using the RenderLine component */}
      {lines.map((line, index) => (
        <RenderLine key={index} line={line} />
      ))}
    </>
  );
};

/**
 * Snippet component: Renders the processed snippet based on the provided snippet and order information.
 * It uses the processSnippet function to replace variables in the snippet with order data.
 */
const Snippet = (props: Props) => {
  // State to store the processed snippet information
  const [processedSnippetInfo, setProcessedSnippetInfo] = useState<
    TSnippetInfoObject | undefined
  >();

  // Destructure order info and snippet info from props
  const { orderInfoObject, snippetInfoObject } = props;

  // useEffect hook to process the snippet when snippetInfoObject or orderInfoObject changes
  useEffect(() => {
    if (snippetInfoObject) {
      // Process the snippet using the processSnippet function
      setProcessedSnippetInfo(
        processSnippet(snippetInfoObject, orderInfoObject)
      );
    }
  }, [snippetInfoObject, orderInfoObject]);

  // Render the processed snippet if it exists
  if (processedSnippetInfo) {
    return (
      <div className="bg-stone-900 border border-stone-700 rounded-md shadow-md p-4 mb-6">
        <div className="flex justify-between items-center"></div>
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="text-3xl font-semibold my-4">
              {processedSnippetInfo.title}
            </h2>
            <button
              className="bg-stone-700 hover:bg-stone-600 active:bg-stone-500 h-12 mt-2 mr-4 py-1 px-2 rounded-md cursor-pointer transition-colors duration-200 hover:transition-none active:transition-none"
              onClick={() => copyTextFromElement("snippet")}
            >
              Copy Response
            </button>
          </div>
          <div id="snippet">
            <RenderLines processedSnippetInfo={processedSnippetInfo} />
          </div>
        </div>
      </div>
    );
  }

  // Return null if processedSnippetInfo is undefined (snippet not processed yet or snippetInfoObject is missing)
  return null;
};

export default Snippet;
