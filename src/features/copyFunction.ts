export const copyTextFromElement = (elementId: string) => {
    const copyText = document.getElementById(elementId);
    if (copyText) {
        const textToCopy = copyText.textContent; // Get the text content of the div

        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Optional: You can add a success message here if needed
                    // console.log('Text copied to clipboard');
                })
                .catch((err) => {
                    console.error('Could not copy text: ', err);
                    alert("Could not copy text.");
                });
        }
    } else {
        alert("Element not found.");
    }
};