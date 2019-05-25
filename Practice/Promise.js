const p1 = new Promise((resolve, reject) => {
  console.log("Promise 함수 제작");
  // 0.5초 뒤에 콘솔에 찍는다.
  setTimeout(() => {
    resolve({ p1: "^_^" });
  }, 500);
});

const p2 = new Promise((resolve, reject) => {
  console.log("Promise 함수 제작");
  // 0.5초 뒤에 콘솔에 찍는다.
  setTimeout(() => {
    // Error 처리
    // reject();
    resolve({ p2: "-_-" });
  }, 300);
});

Promise.all([p1, p2]).then(result => {
  console.log(result);
  console.log(`p1 = ${result[0].p1}`);
  console.log(`p2 = ${result[1].p2}`);
});
