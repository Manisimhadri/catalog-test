const fs = require('fs');

// Function to decode a value from a given base to decimal
function decodeValue(value, base) {
    return parseInt(value, base);
}

// Function to perform Lagrange interpolation
function lagrangeInterpolation(points) {
    let c = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        c += term;
    }

    return c;
}

// Read and parse the JSON file
const jsonData = fs.readFileSync('input.json', 'utf8');
const data = JSON.parse(jsonData);

const n = data.keys.n;
const k = data.keys.k;
const points = [];

// Decode the Y values and prepare points for interpolation
for (let key in data) {
    if (key !== 'keys') {
        const x = parseInt(key);
        const base = parseInt(data[key].base);
        const value = data[key].value;
        const y = decodeValue(value, base);
        points.push({ x, y });
    }
}

// Perform Lagrange interpolation to find the constant term c
const c = lagrangeInterpolation(points);

console.log("The secret (constant term c) is:", c);