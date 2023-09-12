function getRandomNumber(min, max) {
    // Ensure that min and max are valid numbers
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Both min and max must be numbers');
    }

    // Ensure that min is less than or equal to max
    if (min > max) {
        throw new Error('Min must be less than or equal to max');
    }

    // Calculate the random number within the range
    const randomNumber = Math.random() * (max - min) + min;

    // Return the random number as an integer
    return Math.floor(randomNumber);
}

function randomAlphaNumeric() {
    return Math.random().toString(36).charAt(2);
};

function createFromPattern(pattern) {
    pattern = pattern.split('');
    return pattern.map(x => x.replace('x', randomAlphaNumeric())).join('');
};

export { getRandomNumber, createFromPattern }