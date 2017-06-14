if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('swTool.js') //Using Toolbox for advanced caching patterns
    //navigator.serviceWorker.register('sw.js')
        .then(console.log)
        .catch(console.error);
}

var getText = function () {
    fetch('https://httpbin.org/html')
        .then(r => {
            if (r.ok)
                return r;

            throw new Error("Some error");
        })
        .then(r => r.text())
        .then(r => document.getElementById("text").innerHTML = r)
        .catch(console.error)
}