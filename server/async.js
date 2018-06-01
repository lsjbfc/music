function asyncGet(x) {
    return new Promise(resolve =>
      setTimeout(() => {
        console.log("a");
        resolve(x);
      }, 500)
    );
  }
  
  async function test() {
    console.log("b");
    const x = 3 + 5;
    console.log(x);
  
    const a = await asyncGet(1);
    console.log(a);
  
    const b = await asyncGet(2);
    console.log(b);
  
    console.log("c");
    return a + b;
  }
  
  const now = Date.now();
  console.log("d");
  test().then(x => {
    console.log(x);
    console.log(`elapsed: ${Date.now() - now}`);
  });
  console.log("f");