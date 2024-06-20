import { Selector, ClientFunction } from 'testcafe';

const sessionId = process.env.SESSION_ID_CALC;
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
 
fixture('Calculator')/*
    .page `https://calculator.css.ch/de/personen?adb_validation_sessionid=`+sessionId;
*/
test.page `https://calculator.css.ch/de/personen?adb_validation_sessionid=`+sessionId('PUMA Personen', async t => {
    // Selector for the overlay button
    await setUserAgent('MyCustomUserAgent/2.0');
 /*
    const overlayButton = Selector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
 
    // Click the overlay button to dismiss it
    await t.click(overlayButton);
 */
    // Define arrays for selectors and elements
    const selectors = [
        '#new-person-form',
        '#birthdate-field',
        '#firstName',
        '#zip',
        '[datatest="addPerson"]',
        '[datatest="navigateToProducts"]',
        //'[datatest="navigateNext"]',
       
        // Add more selectors as needed
    ];
 
    const elements = [
        'calc-fieldset-wrap > div > div:nth-child(1) > label',  // Example for #new-person-form
        '#birthdate-field-day',
        '#firstName',
        '#zip-search',
        '[data-test="addPerson"]',
        '[data-test="navigateToProducts"]',
        //'[data-test="navigateNext"]'
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
        if (selector === '#zip') {
            await t.typeText(shadowInputElement, '6003');
            await t.pressKey('tab');
        }
        else if(selector === '#firstName'){
            await t.typeText(shadowInputElement, 'Patrick');
        }
        else if(selector === '[datatest="addPerson"]' || selector === '[datatest="navigateToProducts"]' || selector === '#new-person-form'){
            await t.click(shadowInputElement);
        }
        else if(selector === '[datatest="navigateNext"]'){
            await scrollToBottom();
            await t.click(shadowInputElement);
        }
        else if(selector === '#birthdate-field'){
            await t.typeText(shadowInputElement, '15031990');
        }
           
        else {
           
        }
    }
    await setUserAgent('MyCustomUserAgent/2.0');
    const est = Selector('#product-MEDIZINISCHER_TELEFONDIENST');
        await t.click(est)
        await t
            .navigateTo('https://calculator.css.ch/de/produkte?adb_validation_sessionid='+sessionId);
        await t.wait(2000);
 
   
        const west = Selector('[datatest="navigateNext"]');
        await t.click(west)
        await t.wait(2000);
 
    const nord = Selector('#nis-toggle');
    const fieldExists = Selector(nord).exists;
        await t.expect(fieldExists).ok();
        await t.click(nord)
        await t
            .navigateTo('https://calculator.css.ch/de/angebot?adb_validation_sessionid='++sessionId);
        await t.wait(2000);
});
