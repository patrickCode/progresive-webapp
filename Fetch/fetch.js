 fetch('https://httpbin.org/html')
.then(r => {
  if (r.ok)
    return r;
  
  throw new Error("Some error");
})
.then(r => r.text())
.then(r => console.info(r) || r)
.catch (console.error);


var data = new FormData();
data.append("foo", "bar");
data.append("a", "1");
 fetch('https://httpbin.org/post', {
   method: 'POST',
   body: data
 })
.then(r => {
  if (r.ok)
    return r;
  
  throw new Error("Some error");
})
.then(r => r.text())
.then(r => console.info(r) || r)
.catch (console.error);