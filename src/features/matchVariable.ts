import { TOrderInfoObject } from "../App";
import { TSnippetInfoObject, TLine } from "../App";

function getCurrentLocalDateMMDDYYYY() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();
  return `${month}/${day}/${year}`;
}

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
    case "#time":
      return orderInfoObject.timeFrame;
    case "#tracking":
      return orderInfoObject.trackingNumber;
    case "#today":
      return getCurrentLocalDateMMDDYYYY();
    case "#sk-enroll":
      return "To enroll a new security key please visit go/sk-enroll.";
    default:
      return "#VARIABLE_ERROR";
  }
};

export const processSnippet = (
  snippet: TSnippetInfoObject,
  orderInfoObject: TOrderInfoObject
): TSnippetInfoObject => {
  const processedSnippet: TSnippetInfoObject = { ...snippet };

  const processLine = (line: TLine): TLine => {
    let processedText = line.text;
    const regex = /#(tech|user|item|closed|location|time|tracking|today|sk-enroll)/g;
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
