import { Selector } from 'testcafe';

fixture('Getting Started')
    .page('https://www.css.ch?adb_validation_sessionid=2c8ca2c1-c854-41aa-95ea-6a6887a6935f');

test('My first test', async t => {
    await t
        .typeText('#developer-name', 'John Smith')
        .click('#submit-button')
        .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});
