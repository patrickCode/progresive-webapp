self.addEventListener("message", function(e) {
    var primes = generatePrimes(e.data.limit);
    self.postMessage(primes);
}, false);

var generatePrimes = function(limit) {
    var primes = [];
    for (var i = 3; i <= limit; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

var isPrime = function(num) {
    var prime = true;
    for(var i=2; i< num/2; i++) {
        if (num % i === 0) {
            prime = false;
            break;
        }
    }
    return prime;
}