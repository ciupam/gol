const ctx: Worker = self as any;

ctx.postMessage("Hello, World!");

ctx.addEventListener("message", (e) => console.log(e.data));
