import { TSnippetInfoObject } from "../App";

export const getTemplates = (): TSnippetInfoObject[] | null => {
  const savedTemplates = localStorage.getItem("templates");
  console.log("savedTemplates--------------------------------", savedTemplates);
  if (typeof savedTemplates === "string" && savedTemplates.length > 1) {
    const parsedTemplates = JSON.parse(savedTemplates) as TSnippetInfoObject[];
    return parsedTemplates;
  } else return null;
};

export const getSnippets = (
  currentSnippets: TSnippetInfoObject[],
  setCurrentSnippets: React.Dispatch<React.SetStateAction<TSnippetInfoObject[]>>
) => {
  const snippetsList = [...currentSnippets];
  const savedSnippets = getTemplates();
  console.log(
    "RENDERING --- savedSnippets---------------------------------",
    savedSnippets
  );
  if (savedSnippets) {
    const newSnippetsList = [...currentSnippets, ...savedSnippets];
    console.log("NEW SNIPPET LIST ----------------------------", snippetsList);
    setCurrentSnippets(newSnippetsList);
  }
};
