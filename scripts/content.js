// Function to highlight code blocks and add "Explain" buttons
function highlightCodeBlocks() {
    const codeSelectors = `
        code.language-cpp,
        code.language-c,
        code.language-java,
        code.language-python3,
        code.language-csharp,
        code.language-javascript,
        code.language-php
    `;
    const codeElements = document.querySelectorAll(codeSelectors);

    codeElements.forEach(codeElement => {
        // Highlight the code block
        codeElement.style.backgroundColor = "#f0f0f0";
        codeElement.style.border = "1px solid #ccc";
        codeElement.style.padding = "10px";
        codeElement.style.display = "block";
        codeElement.style.marginBottom = "10px";
        codeElement.style.whiteSpace = "pre-wrap"; // Ensure code block text wraps correctly

        // Create and append the "Explain" button
        const explainButton = document.createElement("button");
        explainButton.textContent = "Explain";
        explainButton.style.display = "block";
        explainButton.style.marginTop = "5px";
        explainButton.addEventListener("click", () => explainCode(codeElement.textContent)); // Pass the code content directly
        codeElement.parentNode.insertBefore(explainButton, codeElement.nextSibling);
    });
}

// Function to handle "Explain" button click and call the API
async function explainCode(code) {
    const apiUrl = 'http://127.0.0.1:2000/generate';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result);

        // Handle the API response here
        alert(result.explanation); // For simplicity, we're just alerting the explanation

    } catch (error) {
        // console.error('Error:', error);
        alert('Failed to explain the code.');
    }
}

// Call the function to highlight code blocks and add buttons
highlightCodeBlocks();
