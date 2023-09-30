module.exports = function print(msg) {
    const len = msg.length;
    for(let i = 0; i<len; i++) console.log('*');
    console.log("\n");
    console.log(msg);
    console.log("\n");
    for(let i = 0; i<len; i++) console.log('*');
}