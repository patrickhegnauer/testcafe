import { Selector, ClientFunction } from 'testcafe';

const setUserAgent = ClientFunction(userAgent => {
    Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    writable: true,
    });
    });

fixture('Getting Started')
    .page('https://www.css.ch?adb_validation_sessionid=2c8ca2c1-c854-41aa-95ea-6a6887a6935f');

test('My first test', async t => {
    await setUserAgent('MyCustomUserAgent/1.0');
    await t
        .click('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
});
