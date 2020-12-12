import * as fs from "fs";
import * as webdriver from "selenium-webdriver";
import { Actions, Builder, By, until } from "selenium-webdriver";
import { promisify } from "util";
import { wait, waitUserInput } from "./subCommands";

const init = async () => {
  // ブラウザの設定
  const capabilities = webdriver.Capabilities.chrome();
  capabilities.set("chromeOptions", {
    args: [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      `--window-size=1980,1200`,
    ],
  });

  // ブラウザ立ち上げ
  const driver = await new Builder().withCapabilities(capabilities).build();
  await wait(3000);

  // Googleへ移動
  await driver.get("https://www.google.com/");
  await wait(3000);

  // 検索条件に値を入力
  await driver.findElement(By.name("q")).sendKeys("テスト");
  await wait(3000);

  // フォーカスをアウトさせる
  await driver.actions().move({ x: 0, y: 0 }).perform();
  await wait(3000);

  // 検索ボタンを押下
  await driver.findElement(By.name("btnK")).click();

  // スクリーンショットをとる
  let base64 = await driver.takeScreenshot();
  let buffer = Buffer.from(base64, "base64");
  await promisify(fs.writeFile)("./screenshot/screenshot.jpg", buffer);

  // ブラウザ終了
  // driver.quit();
  // 3秒まつ
  //await wait(3000);
  // キーボードの入力を待つ
  //await waitUserInput();
};

init();
