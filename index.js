"use strict";
const {Builder, By, Key, until} = require("selenium-webdriver");

async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.get("https://www.avito.ru/voronezh");
    await driver.findElement(By.id("search")).sendKeys("купить квартиру");
    await driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[2]/div[2]/div/div[3]/button")).click(); // Кликаем "Найти"
    // await driver.wait(until.titleIs('Купить квартиру в Воронеже на Avito — Объявления на сайте Авито'), 10000);
    await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/div[3]/div[2]/div[2]/select/option[2]")).click(); // Выбираем фильтр Дешевле. Здесь по-хорошему сделать небольшой таймаут.
    await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/div[1]/div/div[2]/div[1]/form/div[4]/div/div[2]/div/div/div/div/div/label[2]/input")).sendKeys("10000000"); // Фильтр цены
    await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/div[1]/div/div[2]/div[1]/form/div[3]/div/div[2]/div/div/div/div/ul/li[5]/label/span")).click(); // Отмечаем чекбокс
    // Не получилось реализовать передвижение слайдера метража. Понял, что как-то делается через dragAndDropBy и экшены, но не смог разобраться в синтаксисе.
    await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/div[1]/div/div[2]/div[2]/button")).click(); // Кликаем показ объявлений
    await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/div[3]/div[4]/div/div[1]/div[2]/div/div[2]/div[1]/div[1]/div[1]/h3/a")).click(); // Кликаем на первое объявление
    if (driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div/span"), 10000))) {
        console.log("Passed");
    } else {
        console.log("Failed");
    }
    driver.quit(); // Сделано неправильно, но пока научился только так.
}
example();

// Ушло на это около 4-5 дней. Многое недопонято или сделано через костыли, но при наличии нескольких наглядных конкретных примеров кода думаю результат был бы лучше :)