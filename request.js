(async () => {
    console.log("Start");
    const promise = new Promise((resolve)=>setTimeout(() => {
        console.log("middle")
        resolve()
    }, 5000));
    await promise
    console.log("End");
})();
