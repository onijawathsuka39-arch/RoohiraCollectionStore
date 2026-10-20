// Comprehensive Color Name Resolver with Nearest-Color Distance
const standardColorMap = {
    '#000000': 'Black', '#ffffff': 'White', '#ff0000': 'Red', '#dc143c': 'Crimson Red',
    '#0000ff': 'Blue', '#008000': 'Green', '#ffff00': 'Yellow', '#808080': 'Gray',
    '#a9a9a9': 'Dark Gray', '#d3d3d3': 'Light Gray', '#00f2ff': 'Light Blue',
    '#e100ff': 'Magenta Pink', '#1a2a4a': 'Midnight Blue', '#4a90e2': 'Sky Blue',
    '#f0f0f0': 'Off-White', '#0a0f1e': 'Dark Navy', '#333333': 'Charcoal Grey',
    '#ff91a4': 'Salmon Pink', '#800000': 'Maroon', '#900056': 'Dark Pink',
    '#c4956a': 'Light Brown', '#f5e6c8': 'Light Yellow', '#e6a100': 'Dark Yellow',
    '#8b4513': 'Brown', '#36454f': 'Charcoal', '#889c8a': 'Sage Green',
    '#7f94a8': 'Dusty Blue', '#d9cdbe': 'Beige', '#a020f0': 'Purple',
    '#ffa500': 'Orange', '#ffc0cb': 'Pink', '#808000': 'Olive',
    '#00ffff': 'Cyan', '#008080': 'Teal', '#4b0082': 'Indigo',
    '#ee82ee': 'Violet', '#f5f5dc': 'Beige', '#ffe4c4': 'Bisque',
    '#faebd7': 'Antique White', '#7fffd4': 'Aquamarine', '#5f9ea0': 'Cadet Blue',
    '#d2691e': 'Chocolate', '#ff7f50': 'Coral', '#6495ed': 'Cornflower Blue',
    '#b8860b': 'Dark Goldenrod', '#006400': 'Dark Green', '#bdb76b': 'Dark Khaki',
    '#8b008b': 'Dark Magenta', '#556b2f': 'Dark Olive Green', '#ff8c00': 'Dark Orange',
    '#9932cc': 'Dark Orchid', '#8b0000': 'Dark Red', '#e9967a': 'Dark Salmon',
    '#8fbc8f': 'Dark Sea Green', '#483d8b': 'Dark Slate Blue', '#2f4f4f': 'Dark Slate Gray',
    '#00ced1': 'Dark Turquoise', '#9400d3': 'Dark Violet', '#ff1493': 'Deep Pink',
    '#00bfff': 'Deep Sky Blue', '#696969': 'Dim Gray', '#1e90ff': 'Dodger Blue',
    '#b22222': 'Firebrick', '#228b22': 'Forest Green', '#ffd700': 'Gold',
    '#daa520': 'Goldenrod', '#adff2f': 'Green Yellow', '#f0fff0': 'Honeydew',
    '#ff69b4': 'Hot Pink', '#cd5c5c': 'Indian Red', '#f0e68c': 'Khaki',
    '#e6e6fa': 'Lavender', '#fff0f5': 'Lavender Blush', '#7cfc00': 'Lawn Green',
    '#fffacd': 'Lemon Chiffon', '#add8e6': 'Light Blue', '#f08080': 'Light Coral',
    '#e0ffff': 'Light Cyan', '#eedd82': 'Light Goldenrod', '#90ee90': 'Light Green',
    '#ffb6c1': 'Light Pink', '#ffa07a': 'Light Salmon', '#20b2aa': 'Light Sea Green',
    '#87cefa': 'Light Sky Blue', '#778899': 'Light Slate Gray', '#b0c4de': 'Light Steel Blue',
    '#ffffe0': 'Light Yellow', '#00ff00': 'Lime', '#32cd32': 'Lime Green',
    '#faf0e6': 'Linen', '#66cdaa': 'Medium Aquamarine', '#0000cd': 'Medium Blue',
    '#ba55d3': 'Medium Orchid', '#9370db': 'Medium Purple', '#3cb371': 'Medium Sea Green',
    '#7b68ee': 'Medium Slate Blue', '#00fa9a': 'Medium Spring Green', '#48d1cc': 'Medium Turquoise',
    '#c71585': 'Medium Violet Red', '#191970': 'Midnight Blue', '#ffe4e1': 'Misty Rose',
    '#ffe4b5': 'Moccasin', '#ffdead': 'Navajo White', '#000080': 'Navy',
    '#fdf5e6': 'Old Lace', '#6b8e23': 'Olive Drab', '#ff4500': 'Orange Red',
    '#da70d6': 'Orchid', '#eee8aa': 'Pale Goldenrod', '#98fb98': 'Pale Green',
    '#afeeee': 'Pale Turquoise', '#db7093': 'Pale Violet Red', '#ffefd5': 'Papaya Whip',
    '#ffdab9': 'Peach Puff', '#cd853f': 'Peru', '#dda0dd': 'Plum',
    '#b0e0e6': 'Powder Blue', '#bc8f8f': 'Rosy Brown', '#4169e1': 'Royal Blue',
    '#f4a460': 'Sandy Brown', '#2e8b57': 'Sea Green', '#fff5ee': 'Seashell',
    '#a0522d': 'Sienna', '#c0c0c0': 'Silver', '#87ceeb': 'Sky Blue',
    '#6a5acd': 'Slate Blue', '#708090': 'Slate Gray', '#fffafa': 'Snow',
    '#00ff7f': 'Spring Green', '#4682b4': 'Steel Blue', '#d2b48c': 'Tan',
    '#d8bfd8': 'Thistle', '#ff6347': 'Tomato', '#40e0d0': 'Turquoise',
    '#f5deb3': 'Wheat', '#f5f5f5': 'White Smoke', '#9acd32': 'Yellow Green'
};

function hexToRgb(hex) {
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
        clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

function resolveFriendlyColorName(hexOrName, productContext) {
    if (!hexOrName) return 'Standard';
    const raw = String(hexOrName).trim();
    
    // Check product specific colorNames first
    if (productContext && productContext.colorNames && typeof productContext.colorNames === 'object') {
        const found = productContext.colorNames[raw] || productContext.colorNames[raw.toLowerCase()] || productContext.colorNames[raw.toUpperCase()];
        if (found) return found;
    }

    // Check global colorNames dictionary
    if (typeof colorNames !== 'undefined' && colorNames && typeof colorNames === 'object') {
        const found = colorNames[raw] || colorNames[raw.toLowerCase()] || colorNames[raw.toUpperCase()];
        if (found) return found;
    }

    // If it's already an English word without #, capitalize and return
    if (!raw.startsWith('#')) {
        return raw.charAt(0).toUpperCase() + raw.slice(1);
    }

    // Direct lookup in standardColorMap
    const lowerHex = raw.toLowerCase();
    if (standardColorMap[lowerHex]) {
        return standardColorMap[lowerHex];
    }

    // Nearest Color Calculation using Euclidean distance in RGB space
    try {
        const targetRgb = hexToRgb(lowerHex);
        let minDistance = Infinity;
        let bestMatchName = 'Custom Shade';

        for (const [mapHex, mapName] of Object.entries(standardColorMap)) {
            const mapRgb = hexToRgb(mapHex);
            const dist = Math.sqrt(
                Math.pow(targetRgb.r - mapRgb.r, 2) +
                Math.pow(targetRgb.g - mapRgb.g, 2) +
                Math.pow(targetRgb.b - mapRgb.b, 2)
            );
            if (dist < minDistance) {
                minDistance = dist;
                bestMatchName = mapName;
            }
        }
        return bestMatchName;
    } catch (e) {
        return 'Custom Shade';
    }
}

if (typeof window !== 'undefined') {
    window.resolveFriendlyColorName = resolveFriendlyColorName;
}
