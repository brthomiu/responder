import { TOrderInfoObject } from "../App";
import { TSnippetInfo, TLine } from "../components/Snippet";

const matchVariable = (
  variable: string,
  orderInfoObject: TOrderInfoObject
): string => {
  switch (variable) {
    case "#tech":
      return orderInfoObject.techName;
    case "#user":
      return orderInfoObject.userName;
    case "#item":
      return orderInfoObject.itemName;
    case "#closed":
      return orderInfoObject.orderClosed;
    case "#location":
      return orderInfoObject.deliveryLocation;
    default:
      return "#VARIABLE_ERROR";
  }
};

export const processSnippet = (
  snippet: TSnippetInfo,
  orderInfoObject: TOrderInfoObject
): TSnippetInfo => {
  const processedSnippet: TSnippetInfo = { ...snippet };

  const processLine = (line: TLine | undefined): TLine | undefined => {
    if (!line) return undefined;

    let processedText = line.text;
    const regex = /#(tech|user|item|closed|location)/g;
    let match;

    while ((match = regex.exec(line.text)) !== null) {
      const variable = `#${match[1]}`;
      const replacement = matchVariable(variable, orderInfoObject);
      processedText = processedText.replace(variable, replacement);
    }

    return { ...line, text: processedText };
  };

  processedSnippet.line0 = processLine(snippet.line0)!; // line0 is required
  processedSnippet.line1 = processLine(snippet.line1);
  processedSnippet.line2 = processLine(snippet.line2);
  processedSnippet.line3 = processLine(snippet.line3);
  processedSnippet.line4 = processLine(snippet.line4);
  processedSnippet.line5 = processLine(snippet.line5);
  processedSnippet.line6 = processLine(snippet.line6);
  processedSnippet.line7 = processLine(snippet.line7);
  processedSnippet.line8 = processLine(snippet.line8);
  processedSnippet.line9 = processLine(snippet.line9);

  return processedSnippet;
};
