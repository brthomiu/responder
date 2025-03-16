// background.js
// background script for a specific use-case, not deleting cause I might want this later

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && tab.url) {
//       const targetUrl = 'dasinfra-sap-fiori'; // Replace with the URL you're targeting

//       if (tab.url.includes(targetUrl)) {
//         chrome.scripting.executeScript({
//           target: { tabId: tabId },
//           function: processPage,
//         });
//       }
//     }
//   });
  
//   function processPage() {
//     const allElements = document.querySelectorAll('*'); // Select all elements
  
//     allElements.forEach((element) => {
//       if (element.id && element.id.includes('clone')) {
//         // Element has an ID and it contains "clone"
//         console.log('Found element with ID:', element.id); // Log the ID to the console
  
//         // Example: Add a class to the found element
//         element.classList.add('cloned-element');
  
//         // Example: add a small visual indicator.
//         element.style.border = "2px solid red";
//       }
//     });
//   }