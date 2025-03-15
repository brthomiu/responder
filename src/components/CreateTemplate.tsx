import React, { ChangeEvent, useState } from "react";
import { TLine, TSnippetInfoObject, TSnippetInfoSetter } from "../App";

// Define the Props interface for the CreateTemplate component
type Props = {
  snippetInfoObject: TSnippetInfoObject; // Object containing snippet information (title and lines)
  snippetInfoSetter: TSnippetInfoSetter; // Object containing setter functions to update snippet information
};

/**
 * CreateTemplate component: Renders a form for creating/editing a snippet template.
 * It includes an input for the title and inputs for each line of the snippet.
 */
const CreateTemplate = (props: Props) => {
  // Destructure props for easy access
  const { snippetInfoObject, snippetInfoSetter } = props;

  // State to manage the number of visible lines, initialized to 1
  const [visibleLines, setVisibleLines] = useState(1);

  /**
   * handleTextInput: Handles changes to simple text inputs (like the title input).
   * @param setField: Setter function to update the corresponding state variable.
   * @param event: Change event from the input field.
   */
  const handleTextInput = (
    setField: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the state with the new input value
    setField(event.target.value);
  };

  /**
   * handleLineInput: Handles changes to line input fields.
   * @param setter: Setter function to update the corresponding TLine object.
   * @param event: Change event from the input field.
   */
  const handleLineInput = (
    setter: (line: (prevLine: TLine) => TLine) => void,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // Update the TLine object's text property with the new input value
    setter((prevLine) => ({
      ...prevLine,
      text: event.target.value,
    }));
  };

  // Generate an array of line objects for rendering input fields.
  const lines = Array.from({ length: 9 }, (_, index) => ({
    label: `Line ${index + 1}`, // Label for the line input (e.g., "Line 1")
    // @ts-expect-error - TypeScript doesn't guarantee the existence of line${index} at compile time, but it works at runtime.
    value: snippetInfoObject[`line${index}`]?.text || "", // Current value of the line input
    // @ts-expect-error - TypeScript doesn't guarantee the existence of setLine${index} at compile time, but it works at runtime.
    setter: snippetInfoSetter[`setLine${index}`], // Setter function for the line input
    id: `line${index}`, // Unique ID for the line input
  }));

  return (
    <div className="flex flex-col gap-4">
      {/* Informative message about hashtags */}
      <div className="flex flex-col gap-1">
        <div className="text-gray-400">
          The following hashtags will be replaced with order information:
        </div>
        <div className="flex flex-row gap-6">
          {/* Display hashtags that will be replaced */}
          <div className="font-semibold text-xl tracking-wide">#tech</div>
          <div className="font-semibold text-xl tracking-wide">#user</div>
          <div className="font-semibold text-xl tracking-wide">#item</div>
          <div className="font-semibold text-xl tracking-wide">#time</div>
          <div className="font-semibold text-xl tracking-wide">#tracking</div>
          <div className="font-semibold text-xl tracking-wide">#closed</div>
          <div className="font-semibold text-xl tracking-wide">#today</div>
        </div>
      </div>

      {/* Title input */}
      <div className="flex flex-col">
        <h2 className="pl-1.5 pb-1 font-semibold">Title</h2>
        <input
          className="border-1 border-gray-700 bg-gray-800 rounded-sm pb-1 pt-0.5 px-1.5 w-96"
          id="title"
          value={snippetInfoObject.title}
          onChange={(event) =>
            handleTextInput(snippetInfoSetter.setTitle, event)
          }
        />
      </div>

      {/* Render line inputs based on visibleLines */}
      {lines.slice(0, visibleLines).map((line) => (
        <div key={line.id} className="flex flex-col">
          <h2 className="pl-1.5 pb-1 font-semibold">{line.label}</h2>
          <input
            className="border-1 border-gray-700 bg-gray-800 rounded-sm pb-1 pt-0.5 px-1.5"
            id={line.id}
            value={line.value}
            onChange={(event) => handleLineInput(line.setter, event)}
          />
        </div>
      ))}

      {/* Buttons to add/remove lines */}
      <div className="flex justify-start pt-2">
        {/* Add Line button (conditionally rendered) */}
        {visibleLines < lines.length && (
          <button
            onClick={() => setVisibleLines((prev) => prev + 1)}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Add Line
          </button>
        )}
        {/* Remove Line button (conditionally rendered) */}
        {visibleLines > 1 && (
          <button
            onClick={() => setVisibleLines((prev) => prev - 1)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove Line
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;