import imagesLoaded from 'imagesloaded';

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Gets the mouse position
const getMousePos = e => {
    return { 
        x : e.clientX, 
        y : e.clientY 
    };
};

// Preload images
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

// Preload fonts - simplified version that just waits for fonts to load
const preloadFonts = () => {
    return new Promise((resolve) => {
        // Check if the browser supports the native font loading API
        if ('fonts' in document) {
            Promise.all([
                document.fonts.load('800 italic 1em moret'),
                document.fonts.load('300 1em halyard-display')
            ]).then(() => {
                resolve();
            }).catch(() => {
                // If font loading fails, resolve anyway
                resolve();
            });
        } else {
            // If the browser doesn't support the font loading API, resolve immediately
            resolve();
        }
    });
};

export {
    map, 
    lerp, 
    clamp,
    randomNumber,
    getMousePos,
    preloadImages,
    preloadFonts
};