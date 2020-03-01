"use strict";
const {Builder, By, Key, until} = require("selenium-webdriver");
//const {describe, before, after} = require("mocha");
const {assert} = require("chai");
//const {before, after} = require("jasmine-core");

/*describe('Test Avito', async function() {
    before(() => {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
    });

    after(function() {
        driver.quit();
    }); */

    async function testavito() {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        await driver.get("https://www.avito.ru/voronezh");
        await driver.findElement(By.css("#search")).sendKeys("купить квартиру");
        await driver.findElement(By.xpath("//button[@data-marker='search-form/submit-button']")).click(); // Кликаем "Найти"
        await driver.manage().setTimeouts( { implicit: 7000 } );
        await driver.findElement(By.xpath("//option[text()='Дешевле']")).click(); // Выбираем фильтр "Дешевле"
        await driver.manage().setTimeouts( { implicit: 10000 } );
        // await driver.wait(until.elementLocated(By.css('.input-input-25uCh')));
        await driver.findElement(By.xpath("//input[@data-marker='price/to']")).sendKeys("10000000", Key.ENTER); // Выставляем ценовой фильтр
        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.findElement(By.xpath("//span[@data-marker='params[549](5698)/text']")).click(); // Отмечаем чекбокс 3-комн кв.
        await driver.findElement(By.xpath("//button[@data-marker='search-filters/submit-button']")).click(); // Кликаем "Показать X объявлений"
        let mainWindow = await driver.getWindowHandle();
        await driver.findElement(By.xpath("(//li[@class='item-slider-item js-item-slider-item '])[1]")).click(); // Кликаем на первое объявление в списке
        await driver.manage().setTimeouts( { implicit: 5000 } );

        let windows = await driver.getAllWindowHandles();
        windows.forEach(async handle => {
            if (handle !== mainWindow) {
            await driver.switchTo().window(handle);
            }
        });

        if (driver.findElement(By.xpath("//span[@class='gallery-img-cover']"))) {
            console.log("Passed");
            assert.isOk('Passed');
            driver.quit();
        } else {
            console.log("Failed");
            assert.fail(driver.quit());
            }
        }
//});
testavito();