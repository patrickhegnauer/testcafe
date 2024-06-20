import { Selector, ClientFunction } from 'testcafe';

const sessionId = process.env.SESSION_ID_TRAVEL;
const startURL = 'https://travel.css.ch/start?package=economy'
const testURL = 'https://travel.css.ch/de/angaben?adb_validation_sessionid='+sessionId

// List of URLs to crawl
const urls = [
    'https://travel.css.ch/de/leistungen?adb_validation_sessionid='+sessionId,
    'https://travel.css.ch/de/uebersicht?adb_validation_sessionid='+sessionId,
    'https://travel.css.ch/de/zahlung?adb_validation_sessionid='+sessionId
    // Add more URLs as needed
];

// Define a ClientFunction to access shadow DOM
const getShadowElement = ClientFunction((selector, element) => {
    const shadowHost = document.querySelector(selector);
    return shadowHost.shadowRoot.querySelector(element).outerHTML;
});

const shadowElementSelector = Selector((selector, element) => {
    const shadowHost = document.querySelector(selector);
    return shadowHost.shadowRoot.querySelector(element);
});

const setUserAgent = ClientFunction(userAgent => {
    Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    writable: true,
    });
    });
    
fixture('Travel')

test.page(startURL)('Travel Journey', async t => {
    // Selector for the overlay button
    await setUserAgent('MyCustomUserAgent/2.0');
    await t.wait(2000);
    await t
    .navigateTo(testURL);
    await t.wait(2000);

    const overlayButton = Selector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');

    // Click the overlay button to dismiss it
    await t.click(overlayButton);

    for (const url of urls) {
            //set useragent
            await setUserAgent('MyCustomUserAgent/2.0');
            // Navigate to the page
            await t.navigateTo(url);
            await t.wait(2000);
    }
    /*
    // Define arrays for selectors and elements
    const selectors = [
        '[datatest="next-button"]',
        '[datatest="next-button"]'       
        // Add more selectors as needed
    ];

    const elements = [
        '[data-test="next-button"]',
        '[data-test="next-button"]'
        // Add more elements as needed
    ];

    // Iterate through selectors and interact with corresponding shadow DOM elements
    for (let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];
        const element = elements[i];

        // Wait for the field to appear in the DOM
        const fieldExists = Selector(selector).exists;
        await t.expect(fieldExists).ok();

        // Wait for the shadow DOM element to be accessible
        const shadowInputExists = await getShadowElement(selector, element);
        await t.expect(shadowInputExists).ok();

        // Get the shadow DOM element using Selector
        const shadowInputElement = shadowElementSelector(selector, element);

        // Interact with the shadow DOM element (click, typeText, etc.)
        await t.click(shadowInputElement)
    }*/
   
});
   



     
