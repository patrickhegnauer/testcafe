import { Selector, ClientFunction } from 'testcafe';

    // List of URLs to crawl
    const urls = [
        'https://www.css.ch/de/privatkunden.html?adb_validation_sessionid=ce2dfadc-2cf7-4d1c-ba6e-623a136c7805',
        'https://www.css.ch/de/privatkunden/meine-gesundheit/ernaehrung/ernaehrungswissen/zitronenwasser.html?adb_validation_sessionid=ce2dfadc-2cf7-4d1c-ba6e-623a136c7805',
        'https://www.css.ch/de/privatkunden/schnell-erledigt.html?adb_validation_sessionid=ce2dfadc-2cf7-4d1c-ba6e-623a136c7805',
        // Add more URLs as needed
    ];

const setUserAgent = ClientFunction(userAgent => {
    Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    writable: true,
    });
    });


fixture('Getting Started')
// Loop through each URL and create a test
for (const url of urls) {
    test(`Crawl ${url}`, async t => {
        //set useragent
        await setUserAgent('MyCustomUserAgent/1.0');
        // Navigate to the page
        await t.navigateTo(url);
        await t.wait(2000);
    });
}
