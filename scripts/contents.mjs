import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

async function fetchCodeBlocks(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const htmlText = await response.text();
        const dom = new JSDOM(htmlText);
        const document = dom.window.document;

        // Select all code blocks with the specified classes
        const codeElements = document.querySelectorAll(`
            code.language-cpp,
            code.language-c,
            code.language-java,
            code.language-python3,
            code.language-csharp,
            code.language-javascript,
            code.language-php
        `);

        if (codeElements.length > 0) {
            const codeBlocks = Array.from(codeElements).map(element => ({
                language: element.className,
                code: element.textContent.trim()
            }));
            console.log('Code Blocks:', codeBlocks);
            return codeBlocks;
        } else {
            throw new Error('No matching code elements found in the HTML.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const url = 'https://www.geeksforgeeks.org/bubble-sort/?ref=lbp';
fetchCodeBlocks(url);
