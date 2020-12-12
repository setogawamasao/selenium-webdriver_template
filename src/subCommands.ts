// ユーザからのキーボード入力を取得する Promise を生成する
export const waitUserInput = () => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    readline.question("wait user input : ", (answer: string) => {
      resolve(answer);
      readline.close();
    });
  });
};

// 指定秒数待つ
export const wait = (value: number) => {
  console.log(`wait ${value} ms`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, value);
  });
};
