const playwright = require('playwright');

(async() =>{
    const launchOptions = {
        headless: false,
        // proxy: {
        //    server: 'http://us-pr.oxylabs.io:10000',
        //    username: 'USERNAME',
        //    password: 'PASSWORD'
        // }
    };
    const browser = await playwright.chromium.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/b?node=17938598011');
    await page.waitForTimeout(5000);

    const products = await page.$$eval('.s-card-container > .a-spacing-base', all_products => {
        const data = [];
        all_products.forEach(product => {
            const titleEl = product.querySelector('.a-size-base-plus');
            const title = titleEl ? titleEl.innerText : null;
            const priceEl = product.querySelector('.a-price');
            const price = priceEl ? priceEl.innerText : null;
            const ratingEl = product.querySelector('.a-icon-alt');
            const rating = ratingEl ? ratingEl.innerText : null;
            data.push({ title, price, rating});
        });
        return data;
    });
    console.log(products);
    await browser.close();
})();