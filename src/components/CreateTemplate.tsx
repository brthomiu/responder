import React, { ChangeEvent, useState } from "react";
import { TLine, TSnippetInfoObject, TSnippetInfoSetter } from "../App";
import { getTemplates } from "../features/getTemplates";

type Props = {
  snippetInfoObject: TSnippetInfoObject;
  snippetInfoSetter: TSnippetInfoSetter;
};

const CreateTemplate = (props: Props) => {
  const { snippetInfoObject, snippetInfoSetter } = props;
  const [visibleLines, setVisibleLines] = useState(1);

  const resetSnippetInfoForm = (snippetInfoSetter: TSnippetInfoSetter) => {
    const blankLine: TLine = {
      numberOfLineBreaksAfter: 0,
      text: "",
      numberOfLineBreaksBefore: 1,
    };

    snippetInfoSetter.setTitle("Title");
    snippetInfoSetter.setLine0(blankLine);
    snippetInfoSetter.setLine1(blankLine);
    snippetInfoSetter.setLine2(blankLine);
    snippetInfoSetter.setLine3(blankLine);
    snippetInfoSetter.setLine4(blankLine);
    snippetInfoSetter.setLine5(blankLine);
    snippetInfoSetter.setLine6(blankLine);
    snippetInfoSetter.setLine7(blankLine);
    snippetInfoSetter.setLine8(blankLine);
    snippetInfoSetter.setLine9(blankLine);
  };

  const saveTemplate = (
    snippetInfoObject: TSnippetInfoObject,
    snippetInfoSetter: TSnippetInfoSetter
  ) => {
    const savedTemplates = getTemplates();
    console.log("SAVING savedTemplates-------------", savedTemplates)
    if (savedTemplates) {
      const newTemplates = savedTemplates;
      newTemplates.push(snippetInfoObject);
      localStorage.removeItem("templates");
      localStorage.setItem("templates", JSON.stringify(newTemplates));
      resetSnippetInfoForm(snippetInfoSetter);
    } else if (
      snippetInfoObject.title.length > 0 &&
      snippetInfoObject.line0.text.length > 0 ||
      snippetInfoObject.line1.text.length > 0 ||
      snippetInfoObject.line2.text.length > 0 ||
      snippetInfoObject.line3.text.length > 0 ||
      snippetInfoObject.line4.text.length > 0 ||
      snippetInfoObject.line5.text.length > 0 ||
      snippetInfoObject.line6.text.length > 0 ||
      snippetInfoObject.line7.text.length > 0 ||
      snippetInfoObject.line8.text.length > 0 ||
      snippetInfoObject.line9.text.length > 0
    ) {
      const newTemplates = [snippetInfoObject];
      console.log("newTemplates----------------------------",newTemplates)
      localStorage.removeItem("templates");
      localStorage.setItem("templates", JSON.stringify(newTemplates));
      resetSnippetInfoForm(snippetInfoSetter);
    }
  };

  const handleTextInput = (
    setField: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setField(event.target.value);
  };

  const handleLineInput = (
    setter: (line: (prevLine: TLine) => TLine) => void,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setter((prevLine) => ({
      ...prevLine,
      text: event.target.value,
    }));
  };

  const handleLineBreaksChange = (
    setter: (line: (prevLine: TLine) => TLine) => void,
    value: 0 | 1 | 2
  ) => {
    setter((prevLine) => ({
      ...prevLine,
      numberOfLineBreaksAfter: value,
    }));
  };

  const lines = Array.from({ length: 9 }, (_, index) => ({
    label: `Line ${index + 1}`,
    // @ts-expect-error - TypeScript doesn't guarantee the existence of line${index} at compile time, but it works at runtime.
    value: snippetInfoObject[`line${index}`]?.text || "",
    // @ts-expect-error - TypeScript doesn't guarantee the existence of line${index} at compile time, but it works at runtime.
    setter: snippetInfoSetter[`setLine${index}`],
    id: `line${index}`,
    // @ts-expect-error - TypeScript doesn't guarantee the existence of line${index} at compile time, but it works at runtime.
    lineBreaks: snippetInfoObject[`line${index}`]?.numberOfLineBreaksAfter || 0,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="text-gray-400">
          The following hashtags will be replaced with order information:
        </div>
        <div className="flex flex-row gap-4">
          <div className="font-semibold text-lg tracking-wide">#tech</div>
          <div className="font-semibold text-lg tracking-wide">#user</div>
          <div className="font-semibold text-lg tracking-wide">#item</div>
          <div className="font-semibold text-lg tracking-wide">#time</div>
          <div className="font-semibold text-lg tracking-wide">#tracking</div>
          <div className="font-semibold text-lg tracking-wide">#today</div>
          <div className="font-semibold text-lg tracking-wide">#closed</div>
          <div className="font-semibold text-lg tracking-wide">#sk-enroll</div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="pl-1.5 pb-1 font-semibold">Title</h2>
        <div className="flex flex-row justify-between">
          <input
            className="border-1 border-gray-700 bg-gray-800 rounded-sm pb-1 pt-0.5 px-1.5 w-96"
            id="title"
            value={snippetInfoObject.title}
            onChange={(event) =>
              handleTextInput(snippetInfoSetter.setTitle, event)
            }
          />
        </div>
      </div>
      {lines.slice(0, visibleLines).map((line) => (
        <div key={line.id} className="flex flex-col">
          <h2 className="pl-1.5 pb-1 font-semibold">{line.label}</h2>
          <div className="flex flex-row items-center">
            <input
              className="border-1 w-[90%] mr-4 border-gray-700 bg-gray-800 rounded-sm pb-1 pt-0.5 px-1.5"
              id={line.id}
              value={line.value}
              onChange={(event) => handleLineInput(line.setter, event)}
            />
            <select
              value={line.lineBreaks}
              onChange={(e) =>
                handleLineBreaksChange(
                  line.setter,
                  parseInt(e.target.value) as 0 | 1 | 2
                )
              }
              className="border-1 border-gray-700 bg-gray-800 rounded-sm p-1"
            >
              <option value={1}>1 Line Break</option>
              <option value={2}>2 Line Breaks</option>
            </select>
          </div>
        </div>
      ))}
      <div className="flex justify-between pt-2">
        <div className="flex gap-4 flex-row">
          {visibleLines < lines.length && (
            <button
              onClick={() => setVisibleLines((prev) => prev + 1)}
              className="bg-blue-900 hover:bg-blue-800 active:bg-blue-700  py-2 px-3 rounded-md cursor-pointer transition-colors font-bold duration-200 hover:transition-none active:transition-none tracking-wide"
            >
              Add Line
            </button>
          )}
          {visibleLines > 1 && (
            <button
              onClick={() => setVisibleLines((prev) => prev - 1)}
              className="bg-red-900 hover:bg-red-800 active:bg-red-700  py-2 px-3 rounded-md cursor-pointer transition-colors font-bold duration-200 hover:transition-none active:transition-none tracking-wide"
            >
              Remove Line
            </button>
          )}
        </div>
        <button
          onClick={() => saveTemplate(snippetInfoObject, snippetInfoSetter)}
          className="bg-green-900 hover:bg-green-800 active:bg-green-700  py-2 px-3 rounded-md cursor-pointer transition-colors font-bold duration-200 hover:transition-none active:transition-none tracking-wide"
        >
          Save Template
        </button>
      </div>
      
    </div>
  );
};

export default CreateTemplate;
