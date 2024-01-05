import {chromium, expect, test} from "@playwright/test"



    test("Login test demo", async () => {
        const browser = await chromium.launch({ headless: false, slowMo: 100 });
        const context = await browser.newContext();
        const page = await context.newPage();
    
        await page.goto("https://www.fortissio.com/");
        await page.hover("#menu-item-dropdown-12");
    
        const newPage = await context.newPage(); // Създаваш страница от същия контекст
        await newPage.goto("https://www.fortissio.com/market-tools/autochartist/");
        await newPage.getByRole('link', { name: 'Sign up' }).click();
    
        let email = `testcase.mailcheckNR465${Math.floor(Math.random() * 10000)}@abv.bb`;
        let phoneNumber = `088${Math.floor(Math.random() * 10000000)}`;
        
        console.log(email);
        console.log(phoneNumber);
       
    
        // Попълни формата в новата страница
        await newPage.fill("#fullname", "Test Case");
        await newPage.fill("#phone-number", phoneNumber);
        await newPage.fill("#email", email);

        await newPage.fill("#password", 'Qwerty123!');

    
        // Кликни на бутона "Sign up" във втория контекст
        await newPage.click("#mainForm > button");
     

        // Изчакай 1 секунда (или промени стойността, ако е необходимо)
        await newPage.waitForTimeout(10000);

        
        // Затвори контекста
        await context.close();
        await browser.close();
    });
    