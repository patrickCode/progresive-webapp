var ports = [];

self.onconnect = function(e) {
    var port = e.ports[0];
    ports.push(port);
    port.onmessage = connect;
}

var connect = function(e) {
    switch(e.data.commmand) {
        case 'generatePrime':
            var primes = generatePrimes(e.data.limit);
            postToAllPorts({command: 'generated', primeNumbers: primes});
            break;
        case 'reset':
            postToAllPorts({command: 'reset'});
            break;
    }
};

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