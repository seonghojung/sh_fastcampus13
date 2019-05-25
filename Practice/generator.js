function* iterFunc() {
  yield console.log("first");
  yield console.log("second");
  yield console.log("third");
  yield console.log("fourth");
}

const iter = iterFunc();
iter.next(); // 첫번째 출력
iter.next(); // 두번째 출력
iter.next(); // 세번째 출력
iter.next(); // 네번째 출력
iter.next(); // 다섯번째는 없기 때문에 출력 안됨(yield 갯수만큼 실행)
