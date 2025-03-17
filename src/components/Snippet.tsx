import { useEffect, useState } from "react";
import { TLine, TOrderInfoObject, TSnippetInfoObject } from "../App";
import { processSnippet } from "../features/matchVariable";
import { copyTextFromElement } from "../features/copyFunction";
import { defaultSnippets } from "../defaultSnippets";
import { getTemplates } from "../features/getTemplates";

// Define the props interface for the Snippet component
type Props = {
  index?: number;
  orderInfoObject: TOrderInfoObject; // Object containing order information used for variable replacement
  snippetInfoObject: TSnippetInfoObject; // Object containing snippet template information
  setCurrentSnippets: React.Dispatch<
    React.SetStateAction<TSnippetInfoObject[]>
  >;
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
  const { orderInfoObject, snippetInfoObject, index, setCurrentSnippets } =
    props;

  const deleteSnippet = (index: number | undefined) => {
    const oldTemplates = getTemplates();
    if (oldTemplates && index) {
      console.log("deletion INDEX--------", index);
      console.log("oldTemplates------------------", oldTemplates);
      const newSnippets = oldTemplates.splice(index + 1);
      console.log("newSnippets------------------", newSnippets);

      const updatedSnippets = [...newSnippets];
      localStorage.removeItem("templates");
      localStorage.setItem("templates", JSON.stringify(updatedSnippets));
      setCurrentSnippets([...defaultSnippets, ...updatedSnippets]);
    }
  };

  // useEffect hook to process the snippet when snippetInfoObject or orderInfoObject changes
  useEffect(() => {
    if (snippetInfoObject) {
      // Process the snippet using the processSnippet function
      setProcessedSnippetInfo(
        processSnippet(
          snippetInfoObject,
          orderInfoObject,
          orderInfoObject.securityKeyMessage
        )
      );
    }
  }, [snippetInfoObject, orderInfoObject]);

  // Render the processed snippet if it exists
  if (processedSnippetInfo) {
    return (
      <div className="min-h-24 bg-stone-900 border border-stone-700 rounded-md shadow-md p-4 mb-6">
        <div className="flex justify-between items-center"></div>
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="text-3xl font-semibold mt-2 mb-6">
              {processedSnippetInfo.title}
            </h2>
          </div>
          <div className="flex flex-col justify-between mb-1" id={`${index}`}>
            <div className="flex flex-col ">
              <RenderLines processedSnippetInfo={processedSnippetInfo} />
            </div>
            <div className="">
            <div className="flex flex-row-reverse justify-between mt-12">
            <button
                className="bg-stone-700 h-16 font-bold hover:bg-stone-600 active:bg-stone-500 tracking-wide mr-4 py-1 px-2 rounded-md cursor-pointer transition-colors duration-200 hover:transition-none active:transition-none"
                onClick={() => copyTextFromElement(`${index}`)}
              >
                Copy Response
              </button>
              {!snippetInfoObject.default && (
                <button
                  className="bg-red-900 font-bold hover:bg-red-800 active:bg-red-700 tracking-wide h-16 mr-4 py-1 px-2 rounded-md cursor-pointer transition-colors duration-200 hover:transition-none active:transition-none"
                  onClick={() => deleteSnippet(index)}
                >
                  Delete
                </button>
              )}{" "}

            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }

  // Return null if processedSnippetInfo is undefined (snippet not processed yet or snippetInfoObject is missing)
  return null;
};

export default Snippet;
