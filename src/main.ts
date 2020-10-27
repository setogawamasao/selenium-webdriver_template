import * as fs from "fs";
import { promisify } from "util";
import * as webdriver from "selenium-webdriver";
import { Actions, Builder, By, until } from "selenium-webdriver";

const capabilities = webdriver.Capabilities.chrome();
capabilities.set("chromeOptions", {
  args: [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    `--window-size=1980,1200`,
  ],
});

const init = async () => {
  // ブラウザ立ち上げ
  const driver = await new Builder().withCapabilities(capabilities).build();

  // Googleへ移動
  await driver.get("https://www.google.com//");

  // ロゴが表示されるまで待つ
  await driver.wait(until.elementLocated(By.id("hplogo")), 10000);

  // 検索条件に値を入力
  await driver.findElement(By.name("q")).sendKeys("テスト");

  // フォーカスをアウトさせる
  await driver.actions().move({ x: 0, y: 0 }).perform();

  // 検索ボタンを押下
  await driver.findElement(By.name("btnK")).click();

  // スクリーンショットをとる
  let base64 = await driver.takeScreenshot();
  let buffer = Buffer.from(base64, "base64");
  await promisify(fs.writeFile)("./screenshot/screenshot.jpg", buffer);

  // ブラウザ終了
  //driver.quit();
};

init();
