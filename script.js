// Maintenance Mode Guard (Disabled)
(function () {
    const isMaintenanceMode = false;
    if (isMaintenanceMode) {
        const currentPath = window.location.pathname.toLowerCase();
        const isIndex = currentPath.endsWith('/') || currentPath.endsWith('/index.html') || currentPath.endsWith('\\index.html') || (!currentPath.includes('.html') && !currentPath.includes('.php'));
        if (!isIndex && !currentPath.includes('logo.png')) {
            window.location.replace('index.html');
            return;
        }
    }
})();

// Apply stored theme immediately to avoid flash of light theme
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Centralized Color Configuration (Hex to Name Mapping)
const colorNames = {
    '#ffffff': 'White',
    '#000000': 'Black',
    '#ff0000': 'Red',
    '#DC143C': 'Red',
    '#0000ff': 'Blue',
    '#008000': 'Green',
    '#ffff00': 'Yellow',
    '#808080': 'Gray',
    '#00f2ff': 'Light Blue',
    '#e100ff': 'Pink',
    '#1a2a4a': 'Midnight Blue',
    '#4a90e2': 'Sky Blue',
    '#f0f0f0': 'Off-White',
    '#0A0F1E': 'Dark Navy',
    '#333333': 'Grey',
    '#ff91a4': 'samon pink',
    '#800000': 'Maroon',
    '#900056': 'Dark Pink',
    '#c4956a': 'Light Brown',
    '#f5e6c8': 'Light Yellow',
    '#e6a100': 'Dark Yellow',
    '#8B4513': 'Brown',
    '#36454f': 'Charcoal',
    '#889c8a': 'Sage Green',
    '#7f94a8': 'Dusty Blue',
    '#d9cdbe': 'Beige',
    '#a020f0': 'Purple'
};

const products = [
    {
        id: '1', name: 'Infinity Edition', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/4w34h3hZ/Python-Infinity-w.png',
            'https://i.ibb.co/NnswC8R5/Chat-GPT-Image-Apr-30-2026-12-01-14-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'The Infinity Edition Regular Tee (Printed) by Roohira. Crafted with premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '2', name: 'Peace Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/ZzqQ1P97/Python-Peace.png',
            'https://i.ibb.co/QvcG1bRY/Chat-GPT-Image-May-4-2026-03-30-55-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#000000'], stock: 10,
        desc: 'Peace Design Regular Tee (Printed) by Roohira. Featuring a premium 220 GSM build for a sleek and meaningful streetwear look.'
    },
    {
        id: '3', name: 'Nike Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/XkDb3jmB/Nike.png',
            'https://i.ibb.co/BV3wRfLt/Chat-GPT-Image-Apr-30-2026-04-50-57-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Nike Design Regular Tee (Printed) by Roohira. A classic aesthetic combined with high-quality 220 GSM fabric for everyday premium style.'
    },
    {
        id: '4', name: 'Stitch Design for Girls', category: 'Regular Tee (Printed)', sections: ['Womens'],
        images: [
            'https://i.ibb.co/20MCs0nk/Python-Scrich.png',
            'https://i.ibb.co/C3SgXz87/Python-Srtich-balck.png',
            'https://i.ibb.co/Qj1hcz4D/Gemini-Generated-Image-9ngc6s9ngc6s9ngc.png',
            'https://i.ibb.co/sdC39Jz8/Gemini-Generated-Image-rgqfm7rgqfm7rgqf.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#000000', '#ffffff'],
        desc: 'Stitch Design for Girls Regular Tee (Printed) by Roohira. Cute and stylish aesthetic combined with high-quality 220 GSM fabric for everyday premium style.'
    },
    {
        id: '5', name: 'BMW Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/gLS0w69Y/Python-BMW.png',
            'https://i.ibb.co/m5mSZSSB/Chat-GPT-Image-Apr-30-2026-02-48-53-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'],
        desc: 'BMW Design Regular Tee (Printed) by Roohira. Iconic automotive styling paired with premium 220 GSM comfort.'
    },
    {
        id: '6', name: 'Space Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/jZ8BbSM2/Python-Space.png',
            'https://i.ibb.co/j9SNvjhp/Chat-GPT-Image-Apr-30-2026-12-19-43-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'],
        desc: 'Space Design Regular Tee (Printed) by Roohira. Explore the cosmos in style with this premium 220 GSM graphic tee.'
    },
    {
        id: '7', name: 'Air Jordan Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/yFQVXd3p/Chat-GPT-Image-Apr-29-2026-10-04-36-PM.png',
            'https://i.ibb.co/fdyjtDZY/Chat-GPT-Image-Apr-30-2026-05-36-29-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#000000'], stock: 10,
        desc: 'Air Jordan Design Regular Tee (Printed) by Roohira. Iconic basketball-inspired aesthetic meets premium 220 GSM comfort.'
    },
    {
        id: '8', name: 'Urban Design Oversized Tee (Printed)', category: 'Oversized Tee (Printed)', sections: ['Womens',],
        images: [
            'https://i.ibb.co/G4Nb8tRV/OVERSIZE-190-python.png',
            'https://i.ibb.co/cSvDHTyx/Chat-GPT-Image-Apr-30-2026-05-10-31-PM.png'
        ],
        gsm: '190 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1700, oldPrice: 1900 },
            'M': { price: 1700, oldPrice: 1900 },
            'L': { price: 1700, oldPrice: 1900 },
            'XL': { price: 1700, oldPrice: 1900 }
        },
        colors: ['#c803a4ff'],
        desc: 'Urban Oversized Tee (Printed) by Roohira. A bold, relaxed fit in a refreshing light blue hue, crafted from premium 190 GSM fabric for the ultimate streetwear vibe.'
    },
    {
        id: '9', name: 'Nike Design Oversized Tee (Printed) ', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/7d7g8Hmd/190gsm-python-nike-yellow.png',
            'https://i.ibb.co/Y7hJ3Mjy/Chat-GPT-Image-Apr-30-2026-04-53-45-PM.png'
        ],
        gsm: '190 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1700, oldPrice: 1900 },
            'M': { price: 1700, oldPrice: 1900 },
            'L': { price: 1700, oldPrice: 1900 },
            'XL': { price: 1700, oldPrice: 1900 }
        },
        colors: ['#ffff00'],
        desc: 'Nike Design Oversized Tee (Printed) by Roohira. A high-energy, vibrant yellow design featuring iconic streetwear aesthetics and premium 190 GSM comfort.'
    },
    {
        id: '10', name: 'Infinity Edition Oversized Tee (Printed)', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/yFmFFkG0/Python-Infinity-B.png',
            'https://i.ibb.co/Y7dvR0vH/Chat-GPT-Image-Apr-30-2026-12-07-41-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1790, oldPrice: 1900 },
            'M': { price: 1790, oldPrice: 1900 },
            'L': { price: 1790, oldPrice: 1900 },
            'XL': { price: 1790, oldPrice: 1900 }
        },
        colors: ['#00f2ff'],
        desc: 'Infinity Edition Oversized Tee (Printed) by Roohira. A refreshing light blue design featuring the iconic infinity motif and premium 220 GSM comfort.'
    },
    {
        id: '11', name: 'GTR Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/jmXL8K9/GTR-Design.png',
            'https://i.ibb.co/N24VB8L1/Chat-GPT-Image-May-20-2026-08-42-05-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'GTR Design Regular Tee (Printed) by Roohira. Featuring an iconic Nissan GT-R Liberty Walk graphic on the back, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '12', name: 'F30 M3 Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/qLqb4RNj/F30-M3-Design.png',
            'https://i.ibb.co/fzDHqJw6/Chat-GPT-Image-May-20-2026-08-51-35-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'F30 M3 Design Regular Tee (Printed) by Roohira. Featuring an iconic BMW F30 M3 graphic on the back, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '13', name: 'Samurai Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/35YkhXRs/honor-black-design.png',
            'https://i.ibb.co/p7ftW61/honor-white-design.png',
            'https://i.ibb.co/7NVzPVhv/Chat-GPT-Image-May-20-2026-08-47-42-PM.png',
            'https://i.ibb.co/rK2NP38J/Chat-GPT-Image-May-20-2026-09-03-02-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#000000', '#ffffff'], stock: 10,
        desc: 'Samurai Design Regular Tee (Printed) by Roohira. A premium 220 GSM streetwear t-shirt featuring a striking Japanese Samurai "Honor" design, available in both black and white.'
    },
    {
        id: '14', name: 'Mustang Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/23M5QKKX/Mustang-desing.png',
            'https://i.ibb.co/JRBp67cp/Chat-GPT-Image-May-20-2026-08-44-29-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Mustang Design Regular Tee (Printed) by Roohira. Featuring an iconic Ford Mustang graphic, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '15', name: 'Angel Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/hFsMZR7s/angels-design.png',
            'https://i.ibb.co/rR6WpLZC/Chat-GPT-Image-May-20-2026-08-54-03-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Angel Design Regular Tee (Printed) by Roohira. Featuring a unique angelic graphic, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '16', name: 'Rock Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/gMQPpMfR/rock-desing.png',
            'https://i.ibb.co/zV2z6pj0/Chat-GPT-Image-May-20-2026-08-57-42-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Rock Design Regular Tee (Printed) by Roohira. Featuring a striking rock-inspired graphic, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '17', name: 'Never Give Up Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/zh9kdHYY/never-give-up-design.png',
            'https://i.ibb.co/fcL3x12/Chat-GPT-Image-May-20-2026-08-49-40-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Never Give Up Design Regular Tee (Printed) by Roohira. Featuring a motivational graphic, crafted from premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '18', name: 'Waffle T-shirts', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/RTGD6DPx/12.png',
            'https://i.ibb.co/cKzdSStx/23.png'
        ],
        sizeImages: {
            'M': 'https://i.ibb.co/RTGD6DPx/12.png',
            'XL': 'https://i.ibb.co/cKzdSStx/23.png'
        },
        colorSizes: {
            '#c4956a': 'M',
            '#f5e6c8': 'XL'
        },
        sizeChartImg: 'https://i.ibb.co/0RVd9brV/Size-Chart-Waffle-240-GSM-OZ-T-Shirts-01.jpg',
        gsm: '240 GSM', brand: 'Roohira',
        sizes: {
            'M':  { price: 1450, oldPrice: 1500 },
            'XL': { price: 1450, oldPrice: 1500 }
        },
        colors: ['#c4956a', '#f5e6c8'], stock: 10,
        desc: 'Waffle T-shirts by Roohira. Premium 240 GSM waffle-knit fabric for a unique texture and superior comfort. Available in Light Brown and Light Yellow. A must-have wardrobe essential.'
    },
    {
        id: '19', name: 'Waffle Printed', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/7JPf15Fw/Chat-GPT-Image-Jun-5-2026-03-26-18-PM78.png',
            'https://i.ibb.co/j9XPBYs8/Chat-GPT-Image-Jun-5-2026-03-26-18-PM24.png',
            'https://i.ibb.co/CK4ZcVpH/Chat-GPT-Image-Jun-5-2026-04-31-07-PM.png',
            'https://i.ibb.co/nNbt6sjK/Chat-GPT-Image-Jun-5-2026-04-29-40-PM.png'
        ],
        sizeImages: {
            'M': 'https://i.ibb.co/7JPf15Fw/Chat-GPT-Image-Jun-5-2026-03-26-18-PM78.png',
            'XL': 'https://i.ibb.co/j9XPBYs8/Chat-GPT-Image-Jun-5-2026-03-26-18-PM24.png'
        },
        colorSizes: {
            '#c4956a': 'M',
            '#f5e6c8': 'XL'
        },
        sizeChartImg: 'https://i.ibb.co/0RVd9brV/Size-Chart-Waffle-240-GSM-OZ-T-Shirts-01.jpg',
        gsm: '240 GSM', brand: 'Roohira',
        sizes: {
            'M':  { price: 1850, oldPrice: null },
            'XL': { price: 1850, oldPrice: null }
        },
        colors: ['#c4956a', '#f5e6c8'], stock: 10,
        desc: 'Waffle Printed T-shirts by Roohira. Premium 240 GSM waffle-knit fabric for a unique texture, superior comfort, and clean prints. Features non-clickable sizes selected directly by color dots. Available in Light Brown and Light Yellow.'
    },
    {
        id: '20', name: 'Colour Elephant Design', category: 'Oversized Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/67CjtFx0/Python-Infinity.png',
            'https://i.ibb.co/WWwpQsLR/Chat-GPT-Image-Jun-6-2026-10-02-04-PM.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1790, oldPrice: 1900 },
            'M': { price: 1790, oldPrice: 1900 },
            'L': { price: 1790, oldPrice: 1900 },
            'XL': { price: 1790, oldPrice: 1900 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Colour Elephant Design Oversized Tee (Printed) by Roohira. Featuring a stunning elephant artwork graphic, crafted from premium 220 GSM fabric for ultimate comfort and design definition.'
    },
    {
        id: '21', name: 'Formular Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/sJJ3LhPL/F1-Design.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Formular Design Regular Tee (Printed) by Roohira. Crafted with premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '22', name: 'Monkey Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: [
            'https://i.ibb.co/2GCH9zF/monke-Design.png'
        ],
        gsm: '220 GSM', brand: 'Roohira',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#000000'], stock: 10,
        desc: 'Monkey Design Regular Tee (Printed) by Roohira. Crafted with premium 220 GSM fabric for ultimate comfort and durability.'
    },
    {
        id: '23', name: 'Long Design Frock', category: 'Frock', sections: ['Womens'],
        images: [
            'https://i.ibb.co/CKNLnKPW/Chat-GPT-Image-Aug-3-2026-12-13-02-PM.png',
            'https://i.ibb.co/5WMrGVJn/Chat-GPT-Image-Aug-3-2026-12-07-29-PM.png',
            'https://i.ibb.co/twtnzycD/Chat-GPT-Image-Aug-3-2026-12-04-41-PM-1.png'
        ],
        brand: 'Roohira',
        sizes: {
            'Free Size': { price: 2250, oldPrice: 2600 }
        },
        colors: ['#e6a100', '#f5e6c8', '#800000'], stock: 10,
        desc: 'Long Design Frock by Roohira. An elegant and stylish long frock crafted from soft, lightweight premium fabric. Designed with a flattering silhouette and available in Dark Yellow, Light Yellow, and Maroon in versatile Free Size.'
    },
    {
        id: '24', name: 'Long Batik Frock', category: 'Frock', sections: ['Womens'],
        images: [
            'https://i.ibb.co/cdSLGG9/Chat-GPT-Image-Aug-3-2026-04-59-27-PM.png',
            'https://i.ibb.co/yFMBjFbf/Chat-GPT-Image-Aug-3-2026-04-56-51-PM.png',
            'https://i.ibb.co/20B313Xw/Aug-3-2026-04-53-46-PM.png',
            'https://i.ibb.co/s9mgQnHb/Chat-GPT-Image-Aug-3-2026-04-46-45-PM.png'
        ],
        colorImages: {
            '#0000ff': 'https://i.ibb.co/cdSLGG9/Chat-GPT-Image-Aug-3-2026-04-59-27-PM.png',
            '#e6a100': 'https://i.ibb.co/yFMBjFbf/Chat-GPT-Image-Aug-3-2026-04-56-51-PM.png',
            '#8B4513': 'https://i.ibb.co/20B313Xw/Aug-3-2026-04-53-46-PM.png',
            '#800000': 'https://i.ibb.co/s9mgQnHb/Chat-GPT-Image-Aug-3-2026-04-46-45-PM.png'
        },
        brand: 'Roohira',
        sizes: {
            'XL': { price: 1500, oldPrice: 1850 },
            '2XL': { price: 1500, oldPrice: 1850 }
        },
        colors: ['#0000ff', '#e6a100', '#8B4513', '#800000'], stock: 10,
        desc: 'Long Batik Frock by Roohira. Beautiful traditional and modern fusion long batik frock available in Blue, Dark Yellow, Brown, and Maroon in XL and 2XL sizes.'
    },
    {
        id: '25', name: 'White Blouse with Embroidery', category: 'Blouse', sections: ['Womens'],
        images: [
            'https://i.ibb.co/dzYtF9G/Chat-GPT-Image-Aug-4-2026-12-25-15-PM.png',
            'https://i.ibb.co/TBM1752f/Chat-GPT-Image-Aug-4-2026-12-28-42-PM.png',
            'https://i.ibb.co/BH7rkYFB/Chat-GPT-Image-Aug-4-2026-12-36-48-PM.png',
            'https://i.ibb.co/1tzMntQr/Chat-GPT-Image-Aug-4-2026-12-38-24-PM.png'
        ],
        colorImages: {
            '#ffff00': 'https://i.ibb.co/dzYtF9G/Chat-GPT-Image-Aug-4-2026-12-25-15-PM.png',
            '#a020f0': 'https://i.ibb.co/TBM1752f/Chat-GPT-Image-Aug-4-2026-12-28-42-PM.png',
            '#0000ff': 'https://i.ibb.co/BH7rkYFB/Chat-GPT-Image-Aug-4-2026-12-36-48-PM.png',
            '#008000': 'https://i.ibb.co/1tzMntQr/Chat-GPT-Image-Aug-4-2026-12-38-24-PM.png'
        },
        brand: 'Roohira',
        sizes: {
            'XL': { price: 1490, oldPrice: 1700 },
            'XXL': { price: 1490, oldPrice: 1700 },
            'XXXL': { price: 1490, oldPrice: 1700 }
        },
        colors: ['#ffff00', '#a020f0', '#0000ff', '#008000'], stock: 15,
        desc: 'White Blouse with Embroidery by Roohira. A beautiful, lightweight premium blouse styled with intricate embroidery detail. Available in Yellow, Purple, Blue, and Green in XL, XXL, and XXXL sizes.'
    },
    {
        id: '26', name: 'Garfield Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/4ZZkgf5d/garfilde-tee.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Garfield Design Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric and featuring a high-quality A3 DTF print for ultimate durability and comfort.'
    },
    {
        id: '27', name: 'Focus Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/0VvY5PhY/Focus-tee.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Focus Design Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric and featuring a high-quality A3 DTF print for ultimate durability and comfort.'
    },
    {
        id: '28', name: 'Ducati Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/KpJygRTT/ducarti-tee.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Ducati Design Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric and featuring a high-quality A3 DTF print for ultimate durability and comfort.'
    },
    {
        id: '29', name: 'Dodge Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/v4wJ8PMC/doger-tee.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Dodge Design Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric and featuring a high-quality A3 DTF print for ultimate durability and comfort.'
    },
    {
        id: '30', name: 'Stitch Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/0RLVSK7c/stich-tee.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'Stitch Design Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric and featuring a high-quality A3 DTF print for ultimate durability and comfort.'
    },
    {
        id: '31', name: 'BMW Car Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/TqgwRzLD/BMW-tee-white.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1800, oldPrice: 1850 },
            'M': { price: 1800, oldPrice: 1850 },
            'L': { price: 1800, oldPrice: 1850 },
            'XL': { price: 1800, oldPrice: 1850 }
        },
        colors: ['#ffffff'], stock: 10,
        desc: 'BMW Car Design Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric and featuring a high-quality A3 DTF print for ultimate durability and comfort.'
    },
    {
        id: '32', name: 'Snoopy Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/SCypGfW/snoopy-tee.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: {
            'S': { price: 1650, oldPrice: 1850 },
            'M': { price: 1650, oldPrice: 1850 },
            'L': { price: 1650, oldPrice: 1850 },
            'XL': { price: 1650, oldPrice: 1850 }
        },
        colors: ['#000000'], stock: 10,
        desc: 'Snoopy Design Regular Tee (Printed) by Python. Crafted with premium 220 GSM fabric and featuring a high-quality A3 DTF print for ultimate durability and comfort.'
    },
    {
        id: '33', name: 'Japan Girl design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/KnYwkn7/japan-girl-desing.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#000000'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Japan Girl design Regular Tee (Printed) by Python. Featuring a premium quality A3 DTF print on 220 GSM fabric for ultimate style and comfort.'
    },
    {
        id: '34', name: 'Reject design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/3YPzTCXJ/Reject-desing.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#000000'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Reject design Regular Tee (Printed) by Python. Featuring a premium quality A3 DTF print on 220 GSM fabric for ultimate style and comfort.'
    },
    {
        id: '35', name: 'Yakuza design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/RpbMdjH4/yakusa-design.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#000000'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Yakuza design Regular Tee (Printed) by Python. Featuring a premium quality A3 DTF print on 220 GSM fabric for ultimate style and comfort.'
    },
    {
        id: '36', name: 'Cat Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/DgfQfYXn/cat-design-blck.png', 'https://i.ibb.co/HfqPgHkd/cat-design-white.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#000000', '#ffffff'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Cat Design Regular Tee (Printed) by Python. Available in both Black and White, featuring premium quality A3 DTF print on 220 GSM fabric.'
    },
    {
        id: '37', name: 'Monkey D Luffy Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/4R4ZJXNF/Monkey-d-luffy-design.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#ffffff'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Monkey D Luffy Design Regular Tee (Printed) by Python. White colour tee featuring premium quality A3 DTF print on 220 GSM fabric.'
    },
    {
        id: '38', name: 'Luffy Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/4RQ4tGKM/Gear-5-design.png', 'https://i.ibb.co/jPvVmqLT/luffy-design-white.png', 'https://i.ibb.co/YTy0dxSr/luffy-design-black.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#ffffff', '#000000'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Luffy Design Regular Tee (Printed) by Python. Available in White and Black, featuring Gear 5 artwork printed on 220 GSM fabric with A3 DTF print.'
    },
    {
        id: '39', name: 'Goku Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/bjsz2V1n/Goku-Design.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#ffffff'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Goku Design Regular Tee (Printed) by Python. White colour tee featuring premium quality A3 DTF print on 220 GSM fabric.'
    },
    {
        id: '40', name: 'Headphone Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/4ZMh98sg/hedset-design.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#ffffff'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Headphone Design Regular Tee (Printed) by Python. White colour tee featuring premium quality A3 DTF print on 220 GSM fabric.'
    },
    {
        id: '41', name: 'Kawasaki Design', category: 'Regular Tee (Printed)', sections: ['Mens', 'Womens', 'Unisexs'],
        images: ['https://i.ibb.co/NgZjzZgn/kawasaki-design.png'],
        gsm: '220 GSM', brand: 'Python',
        sizes: { 'S': { price: 1800, oldPrice: 1850 }, 'M': { price: 1800, oldPrice: 1850 }, 'L': { price: 1800, oldPrice: 1850 }, 'XL': { price: 1800, oldPrice: 1850 } },
        colors: ['#ffffff'], stock: 10, printTech: 'A3 DTF Print',
        desc: 'Kawasaki Design Regular Tee (Printed) by Python. White colour tee featuring premium quality A3 DTF print on 220 GSM fabric.'
    }
];

// --- Cart System ---
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('roohira_cart')) || [];
    if (!Array.isArray(cart)) cart = [];
} catch (e) {
    cart = [];
    console.error("Failed to load cart from localStorage", e);
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(name, price, image = '', size = 'Free', color = 'Default', quantity = 1) {
    const existingItem = cart.find(item => item.name === name && item.size === size && item.color === color);
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({ name: name, price: price, quantity: parseInt(quantity), image: image, size: size, color: color });
    }
    saveCart();
    showNotification(`${name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function updateQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) removeFromCart(index);
    else { saveCart(); renderCart(); }
}

function saveCart() {
    localStorage.setItem('roohira_cart', JSON.stringify(cart));
    updateCartCount();
    if(typeof updateFreeDeliveryBar === 'function') updateFreeDeliveryBar();
}

function displayProducts(filteredProducts) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    filteredProducts.forEach((p) => {
        const hasSizes = p.sizes && typeof p.sizes === 'object';
        const displayPrice = hasSizes ? Object.values(p.sizes)[0].price : p.price;
        const displayOldPrice = hasSizes ? Object.values(p.sizes)[0].oldPrice : p.oldPrice;

        // Calculate discount percentage
        let discountBadge = '';
        if (displayOldPrice && displayOldPrice > displayPrice) {
            const discountPercent = Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100);
            discountBadge = `<span class="card-discount-badge">${discountPercent}% OFF</span>`;
        }

        const isOutOfStock = p.stock === 0;

        // Determine wishlist state
        const wished = isInWishlist(p.id);
        const heartColor = wished ? 'color: #DC143C;' : 'color: #6D5D53;';

        // Available sizes array
        const availableSizes = hasSizes ? Object.keys(p.sizes) : ['Free Size'];
        const gsmText = p.gsm || (p.category && p.category.includes('Tee') ? '220 GSM' : 'Premium');
        const sectionBadge = (p.sections && p.sections.length > 0) ? p.sections[0] : '';

        grid.innerHTML += `
        <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}" 
             onclick="window.location.href='product-detail.html?id=${p.id}'" 
             onmouseenter="startHoverSlide('${p.id}', this.querySelector('.card-slider'))"
             onmouseleave="stopHoverSlide('${p.id}', this.querySelector('.card-slider'))">
            
            <!-- Image Area with Badges & Hover Slider -->
            <div class="product-image-box">
                ${discountBadge}
                
                <!-- Wishlist Toggle overlay -->
                <button class="card-wishlist-btn" onclick="event.stopPropagation(); handleCardWishlistToggle('${p.id}', this)" title="Add to Wishlist">
                    <i data-lucide="heart" style="width: 15px; height: 15px; ${heartColor}" ${wished ? 'fill="#DC143C"' : ''}></i>
                </button>

                <!-- Fabric & Section Tag -->
                <div class="product-card-tags">
                    <span class="card-gsm-tag">${gsmText}</span>
                    ${sectionBadge ? `<span class="card-section-tag">${sectionBadge}</span>` : ''}
                </div>

                <div class="card-slider">
                    ${p.images.map(img => `<img src="${img}" alt="${p.name}" loading="lazy">`).join('')}
                </div>
                ${p.images.length > 1 ? `
                <div class="card-slider-indicators">
                    ${p.images.map((_, idx) => `<div class="card-slider-indicator-dot ${idx === 0 ? 'active' : ''}"></div>`).join('')}
                </div>
                ` : ''}
            </div>

            <!-- Detailed Product Info Section -->
            <div class="product-card-body">
                
                <!-- Category & Reviews Rating Row -->
                <div class="product-card-meta">
                    <span class="product-card-category">${p.category || 'Roohira Apparel'}</span>
                    <div class="product-card-rating">
                        <i data-lucide="star" style="width: 11px; height: 11px; fill: #B38738;"></i>
                        <span>4.9</span>
                    </div>
                </div>

                <!-- Product Name -->
                <h3 class="product-card-title" title="${p.name}">${p.name}</h3>
                
                <!-- Price Row -->
                <div class="product-card-pricing">
                    <span class="card-price-current">Rs. ${displayPrice.toLocaleString()}.00</span>
                    ${displayOldPrice ? `<span class="card-price-old">Rs. ${displayOldPrice.toLocaleString()}</span>` : ''}
                </div>

                <!-- Available Sizes Chips -->
                <div class="product-card-sizes">
                    <span class="size-label">Sizes:</span>
                    <div class="size-chips">
                        ${availableSizes.slice(0, 4).map(sz => `<span class="size-chip">${sz}</span>`).join('')}
                        ${availableSizes.length > 4 ? `<span class="size-chip-more">+${availableSizes.length - 4}</span>` : ''}
                    </div>
                </div>

                <!-- Color Swatches & Action Bar -->
                <div class="product-card-footer">
                    <!-- Colors Preview -->
                    <div class="card-color-swatches">
                        ${(p.colors || []).slice(0, 5).map(c => {
                            const imgUrl = (p.colorImages && p.colorImages[c]) ? p.colorImages[c] : null;
                            const cName = (typeof colorNames !== 'undefined' && colorNames[c]) ? colorNames[c] : c;
                            if (imgUrl) {
                                return `<span class="swatch-circle" style="background-image: url('${imgUrl}');" title="${cName}"></span>`;
                            } else {
                                return `<span class="swatch-circle" style="background: ${c};" title="${cName}"></span>`;
                            }
                        }).join('')}
                    </div>

                    <!-- Quick Add Button with Feedback -->
                    ${isOutOfStock ? `
                        <span class="card-sold-out-badge">Sold Out</span>
                    ` : `
                        <button class="card-action-btn" onclick="event.stopPropagation(); addToCart('${p.name}', ${displayPrice}, '${p.images[0]}')">
                            <i data-lucide="shopping-bag" style="width: 13px; height: 13px;"></i> Add
                        </button>
                    `}
                </div>

            </div>
        </div>`;
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

let hoverIntervals = {};

function startHoverSlide(productId, sliderElement) {
    const p = products.find(prod => prod.id === productId);
    if (!p || !p.images || p.images.length <= 1) return;

    let currentIdx = 0;
    const container = sliderElement.parentElement;
    const dots = container.querySelectorAll('.card-slider-indicator-dot');

    hoverIntervals[productId] = setInterval(() => {
        currentIdx = (currentIdx + 1) % p.images.length;
        sliderElement.style.transform = `translateX(-${currentIdx * 100}%)`;
        
        dots.forEach((dot, idx) => {
            if (idx === currentIdx) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }, 1000);
}

function stopHoverSlide(productId, sliderElement) {
    if (hoverIntervals[productId]) {
        clearInterval(hoverIntervals[productId]);
        delete hoverIntervals[productId];
    }
    sliderElement.style.transform = 'translateX(0)';
    
    const container = sliderElement.parentElement;
    const dots = container.querySelectorAll('.card-slider-indicator-dot');
    dots.forEach((dot, idx) => {
        if (idx === 0) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// --- Shop Filtering System ---
let currentCategory = 'All';
let currentSubcategory = 'All';
let currentGSM = 'all';
let searchQuery = '';
let currentSort = 'default';

// true only when a *specific* (non-All) value is chosen
let categorySelected = false;
let subcategorySelected = false;

function handleSortChange(val) {
    currentSort = val;
    filterShop();
}

function handleSearch(val) {
    searchQuery = val.trim().toLowerCase();
    filterShop();
}

function scrollToActiveButtonInContainer(containerSelector, activeSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const activeBtn = container.querySelector(activeSelector);
    if (!activeBtn) return;
    
    const containerWidth = container.getBoundingClientRect().width;
    const btnWidth = activeBtn.getBoundingClientRect().width;
    const btnLeft = activeBtn.offsetLeft;
    
    container.scrollTo({
        left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
        behavior: 'smooth'
    });
}

function updateFilterVisibility() {
    const categoryRow = document.getElementById('category-row-wrapper');
    const subcategoryRow = document.getElementById('subcategory-row-wrapper');
    const gsmRow = document.getElementById('gsm-row-wrapper');

    // Category row is always visible
    if (categoryRow) categoryRow.classList.add('visible');

    // Subcategory row only appears when a specific category (not 'All', 'Blouse') is active
    if (subcategoryRow) {
        if (categorySelected && currentCategory !== 'Blouse') {
            subcategoryRow.classList.add('visible');
        } else {
            subcategoryRow.classList.remove('visible');
        }
    }

    // GSM row only appears when a specific subcategory (not 'All') is active
    if (gsmRow) {
        if (categorySelected && subcategorySelected && currentCategory !== 'Blouse') {
            gsmRow.classList.add('visible');
        } else {
            gsmRow.classList.remove('visible');
        }
    }
}

function selectCategory(cat, btn) {
    currentCategory = cat;
    // categorySelected = true only for a real category, not 'All'
    categorySelected = (cat !== 'All');
    // Whenever category changes, reset subcategory
    currentSubcategory = 'All';
    subcategorySelected = false;
    currentGSM = 'all';

    // Show/hide subcategory buttons depending on selected category
    const tshirtSubs = document.querySelectorAll('.t-shirt-sub');
    const frockSubs = document.querySelectorAll('.frock-sub');
    if (cat === 'T-Shirts') {
        tshirtSubs.forEach(b => b.style.display = '');
        frockSubs.forEach(b => b.style.display = 'none');
    } else if (cat === 'Frock') {
        tshirtSubs.forEach(b => b.style.display = 'none');
        frockSubs.forEach(b => b.style.display = '');
    } else {
        tshirtSubs.forEach(b => b.style.display = 'none');
        frockSubs.forEach(b => b.style.display = 'none');
    }

    // Reset subcategory buttons to 'All'
    document.querySelectorAll('.subcategory-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes("'All'")) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    // Reset GSM buttons to 'all'
    document.querySelectorAll('.gsm-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes("'all'")) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    document.querySelectorAll('.category-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${cat}'`)) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    updateFilterVisibility();
    filterShop();
    setTimeout(() => {
        scrollToActiveButtonInContainer('#category-row-wrapper .filter-scroll-container', '.category-btn.active');
    }, 100);
}

function selectSubcategory(subcat, btn) {
    currentSubcategory = subcat;
    // subcategorySelected = true only for a real subcategory, not 'All'
    subcategorySelected = (subcat !== 'All');
    // Reset GSM when subcategory changes
    currentGSM = 'all';
    document.querySelectorAll('.gsm-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes("'all'")) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    document.querySelectorAll('.subcategory-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${subcat}'`)) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    updateFilterVisibility();
    filterShop();
    setTimeout(() => {
        scrollToActiveButtonInContainer('#subcategory-row-wrapper .filter-scroll-container', '.subcategory-btn.active');
    }, 100);
}

function selectGSM(gsm, btn) {
    currentGSM = gsm;
    document.querySelectorAll('.gsm-btn').forEach(b => {
        const onclickAttr = b.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${gsm}'`)) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    filterShop();
    setTimeout(() => {
        scrollToActiveButtonInContainer('#gsm-row-wrapper .filter-scroll-container', '.gsm-btn.active');
    }, 100);
}

function filterShop() {
    let filtered = products;

    // 1. Filter by Category
    if (currentCategory !== 'All') {
        if (currentCategory === 'T-Shirts') {
            filtered = filtered.filter(p => p.category.toLowerCase().includes('tee') || p.category.toLowerCase().includes('t-shirt') || p.category.toLowerCase().includes('waffle'));
        } else if (currentCategory === 'Frock') {
            filtered = filtered.filter(p => p.category === 'Frock');
        } else if (currentCategory === 'Blouse') {
            filtered = filtered.filter(p => p.category === 'Blouse');
        }
    }

    // 2. Filter by Subcategory (Regular Tee, Oversized Tee)
    if (currentSubcategory !== 'All') {
        filtered = filtered.filter(p => p.category === currentSubcategory);
    }

    // 3. Filter by GSM
    if (currentGSM !== 'all') {
        filtered = filtered.filter(p => p.gsm === currentGSM);
    }

    // 4. Filter by Search Query
    if (searchQuery !== '') {
        filtered = filtered.filter(p => {
            const name = p.name.toLowerCase();
            const desc = (p.desc || '').toLowerCase();
            const category = (p.category || '').toLowerCase();
            const sections = (p.sections || []).map(s => s.toLowerCase());

            // 1. Direct includes match
            if (name.includes(searchQuery) || desc.includes(searchQuery) || category.includes(searchQuery)) {
                return true;
            }

            // 2. Synonyms and clothing type mapping
            const isTeeQuery = searchQuery.includes('t shirt') || searchQuery.includes('t-shirt') || searchQuery.includes('tee') || searchQuery.includes('te-shirt') || searchQuery.includes('tshirt');
            const isOversizedQuery = searchQuery.includes('oversize') || searchQuery.includes('oversized');
            const isKidsQuery = searchQuery.includes('kid') || searchQuery.includes('child');
            const isMensQuery = searchQuery.includes('men') || searchQuery.includes('boy');
            const isWomensQuery = searchQuery.includes('women') || searchQuery.includes('girl') || searchQuery.includes('lady') || searchQuery.includes('ladies');
            const isFrockQuery = searchQuery.includes('frock') || searchQuery.includes('dress');

            // If query is for a T-shirt and product is a T-shirt
            if (isTeeQuery && (category.includes('tee') || category.includes('t-shirt') || category.includes('t shirt'))) {
                // If it is also an oversized query, ensure product is oversized
                if (isOversizedQuery && !category.includes('oversized')) {
                    return false;
                }
                // If it's a kids query, check sections
                if (isKidsQuery && !sections.includes('kids')) {
                    return false;
                }
                return true;
            }

            // Kids clothing query
            if (isKidsQuery && sections.includes('kids')) {
                return true;
            }

            // Men's clothing query
            if (isMensQuery && (sections.includes('mens') || sections.includes('unisexs'))) {
                return true;
            }

            // Women's clothing query
            if (isWomensQuery && (sections.includes('womens') || sections.includes('unisexs'))) {
                return true;
            }

            // Frock or dress query
            if (isFrockQuery && (name.includes('frock') || name.includes('dress') || desc.includes('frock') || desc.includes('dress'))) {
                return true;
            }

            return false;
        });
    }

    // 5. Sort Products
    if (typeof currentSort !== 'undefined' && currentSort !== 'default') {
        filtered = [...filtered].sort((a, b) => {
            const getPrice = (item) => {
                if (item.sizes) {
                    const firstKey = Object.keys(item.sizes)[0];
                    if (firstKey && item.sizes[firstKey].price) return item.sizes[firstKey].price;
                }
                return item.price || 0;
            };

            if (currentSort === 'price-low') {
                return getPrice(a) - getPrice(b);
            } else if (currentSort === 'price-high') {
                return getPrice(b) - getPrice(a);
            } else if (currentSort === 'name-asc') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
    }

    displayProducts(filtered);

    // Empty State if 0 matching products
    const grid = document.getElementById('product-grid');
    if (grid && filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; animation: fadeIn 0.5s ease;">
                <div class="glass" style="display: inline-block; padding: 40px 60px; border-radius: 24px; border: 1px dashed var(--border-color); max-width: 450px;">
                    <i data-lucide="shopping-bag" style="width: 48px; height: 48px; color: var(--accent-gold); margin-bottom: 20px; stroke-width: 1.5;"></i>
                    <h3 style="margin-bottom: 10px; font-weight: 800; font-size: 1.3rem;">No Products Found</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">We couldn't find any products in this category. Stay tuned for the next drop!</p>
                </div>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

function filterProducts(category) {
    if (category === 'Regular Tee (Printed)' || category === 'Oversized Tee (Printed)') {
        // Set category first, then subcategory
        currentCategory = 'T-Shirts';
        categorySelected = true;
        currentSubcategory = category;
        subcategorySelected = true;
        currentGSM = 'all';
        // Show T-shirt subs, hide frock subs
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = '');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = 'none');
        // Update button states
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'T-Shirts'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes(`'${category}'`));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    } else if (category === 'Frock' || category === 'Frocks') {
        currentCategory = 'Frock';
        categorySelected = true;
        currentSubcategory = 'All';
        subcategorySelected = false;
        currentGSM = 'all';
        // Show frock subs, hide t-shirt subs
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = '');
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'Frock'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    } else if (category === 'Blouse' || category === 'Blouses') {
        currentCategory = 'Blouse';
        categorySelected = true;
        currentSubcategory = 'All';
        subcategorySelected = false;
        currentGSM = 'all';
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'Blouse'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    } else if (category === 'T-Shirts' || category === 't-shirts') {
        currentCategory = 'T-Shirts';
        categorySelected = true;
        currentSubcategory = 'All';
        subcategorySelected = false;
        currentGSM = 'all';
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = '');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'T-Shirts'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    } else {
        currentCategory = 'All';
        categorySelected = false;
        currentSubcategory = 'All';
        subcategorySelected = false;
        currentGSM = 'all';
        document.querySelectorAll('.t-shirt-sub').forEach(b => b.style.display = '');
        document.querySelectorAll('.frock-sub').forEach(b => b.style.display = 'none');
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.subcategory-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'All'"));
        });
        document.querySelectorAll('.gsm-btn').forEach(b => {
            b.classList.toggle('active', (b.getAttribute('onclick') || '').includes("'all'"));
        });
    }
    updateFilterVisibility();
    filterShop();
}


function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    if (!cartContainer) return;
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div style="text-align: center; padding: 50px; color: var(--text-muted);">Your cart is empty.</div>';
        if (totalElement) totalElement.innerText = 'Rs. 0.00';
        return;
    }
    let html = '', total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item glass" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                    <div>
                        <h4 style="margin: 0;">${item.name}</h4>
                        <p style="color: var(--text-muted); font-size: 0.8rem; margin: 2px 0;">Size: ${item.size} | Color: ${colorNames[item.color] || item.color}</p>
                        <p style="color: #000; font-weight: 800; margin: 5px 0 0;">Rs. ${itemTotal.toLocaleString()}</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.05); padding: 5px 10px; border-radius: 8px;">
                        <button onclick="updateQuantity(${index}, -1)" class="btn-qty">-</button>
                        <span style="min-width: 20px; text-align: center; font-weight: 800;">${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" class="btn-qty">+</button>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff4444; cursor: pointer;"><i data-lucide="trash-2" style="width: 18px;"></i></button>
                </div>
            </div>`;
    });
    cartContainer.innerHTML = html;
    if (totalElement) totalElement.innerText = `Rs. ${total.toLocaleString()}.00`;
    lucide.createIcons();
}

// --- Auth System ---
let currentUser = JSON.parse(localStorage.getItem('roohira_user')) || null;

// Sync Auth State with Firebase
if (typeof auth !== 'undefined' && auth) {
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(doc => {
                if (doc.exists) {
                    const userData = doc.data();
                    const syncedUser = { uid: user.uid, name: userData.name, email: user.email, phone: userData.phone || '', address: userData.address || '' };
                    localStorage.setItem('roohira_user', JSON.stringify(syncedUser));
                    currentUser = syncedUser;
                } else {
                    // Auto-create Firestore doc for existing Auth users who signed up before Firestore was configured
                    const autoData = { uid: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email, phone: '', address: '', createdAt: new Date().toISOString() };
                    db.collection('users').doc(user.uid).set(autoData).catch(err => console.warn('Auto user doc create failed:', err));
                    localStorage.setItem('roohira_user', JSON.stringify(autoData));
                    currentUser = autoData;
                }
                startNotificationListener();
            }).catch(err => {
                console.error("Error syncing user profile:", err);
                startNotificationListener();
            });
        } else {
            localStorage.removeItem('roohira_user');
            currentUser = null;
            if (notificationListenerUnsubscribe) {
                notificationListenerUnsubscribe();
                notificationListenerUnsubscribe = null;
            }
        }
    });
}

function login(email, password, onError) {
    if (typeof auth === 'undefined' || !auth) {
        if (onError) onError('Firebase configure කර නැත. firebase-config.js check කරන්න.');
        return;
    }
    // Check for redirect parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect') || 'profile.html';

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Check Firestore for blocked status before allowing entry
            if (typeof db !== 'undefined' && db) {
                db.collection('users').doc(user.uid).get().then(doc => {
                    if (doc.exists && doc.data().blocked === true) {
                        // Sign them back out immediately
                        auth.signOut();
                        if (onError) onError('⛔ ඔබගේ account block කර ඇත. Admin හා සම්බන්ධ වන්න.');
                        return;
                    }
                    const userData = doc.exists
                        ? { uid: user.uid, name: doc.data().name, email: user.email, phone: doc.data().phone||'', address: doc.data().address||'' }
                        : { uid: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email };
                    localStorage.setItem('roohira_user', JSON.stringify(userData));
                    currentUser = userData;
                    window.location.href = redirectTo;
                }).catch(() => {
                    // Firestore unreachable — allow login anyway
                    const quickUser = { uid: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email };
                    localStorage.setItem('roohira_user', JSON.stringify(quickUser));
                    currentUser = quickUser;
                    window.location.href = redirectTo;
                });
            } else {
                const quickUser = { uid: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email };
                localStorage.setItem('roohira_user', JSON.stringify(quickUser));
                currentUser = quickUser;
                window.location.href = redirectTo;
            }
        })
        .catch((error) => {
            let msg = 'Login failed. නැවත try කරන්න.';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') msg = 'Email හෝ Password වැරදියි.';
            else if (error.code === 'auth/invalid-email') msg = 'Email format එක වැරදියි.';
            else if (error.code === 'auth/too-many-requests') msg = 'ඉතා වාර ගණනක් try කළා. ටිකක් wait කරලා try කරන්න.';
            if (onError) onError(msg); else alert(msg);
        });
}

function signup(name, email, password, phone, address, onError) {
    if (typeof auth === 'undefined' || !auth) {
        if (onError) onError('Firebase configure කර නැත. firebase-config.js check කරන්න.');
        return;
    }
    // Check for redirect parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect') || 'profile.html';

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = { uid: user.uid, name: name, email: email, phone: phone || '', address: address || '', createdAt: new Date().toISOString() };
            if (typeof db !== 'undefined' && db) {
                db.collection('users').doc(user.uid).set(userData)
                    .then(() => {
                        localStorage.setItem('roohira_user', JSON.stringify(userData));
                        currentUser = userData;
                        window.location.href = redirectTo;
                    })
                    .catch(err => {
                        console.error('Firestore save error:', err);
                        user.delete().then(() => {
                            let msg = 'Database එකට දත්ත ඇතුලත් කිරීම අසාර්ථක විය. Firestore Rules -> read, write: if true ලෙස සකසා නැවත උත්සාහ කරන්න.';
                            if (onError) onError(msg); else alert(msg);
                        }).catch(() => {
                            if (onError) onError('Database දෝෂයකි: ' + err.message); else alert('Database error: ' + err.message);
                        });
                    });
            } else {
                localStorage.setItem('roohira_user', JSON.stringify(userData));
                currentUser = userData;
                window.location.href = redirectTo;
            }
        })
        .catch((error) => {
            let msg = 'Account create කිරීම අසාර්ථකයි.';
            if (error.code === 'auth/email-already-in-use') msg = 'මෙම Email ලෙස දැනටමත් account තිබේ. Login කරන්න.';
            else if (error.code === 'auth/invalid-email') msg = 'Email format එක වැරදියි.';
            else if (error.code === 'auth/weak-password') msg = 'Password ශක්තිමත් නැත. අවම 6 characters.';
            if (onError) onError(msg); else alert(msg);
        });
}

function logout() {
    if (typeof auth !== 'undefined' && auth) {
        auth.signOut().then(() => {
            localStorage.removeItem('roohira_user');
            currentUser = null;
            window.location.href = 'login.html';
        });
    } else {
        localStorage.removeItem('roohira_user');
        currentUser = null;
        window.location.href = 'login.html';
    }
}

function showNotification(message) {
    const note = document.createElement('div');
    note.className = 'glass';
    note.style.cssText = `position: fixed; bottom: 20px; right: 20px; padding: 15px 30px; border-left: 4px solid #DC143C; z-index: 10001; background: white;`;
    note.innerText = message;
    document.body.appendChild(note);
    setTimeout(() => { note.style.opacity = '0'; note.style.transition = '0.5s'; setTimeout(() => note.remove(), 500); }, 3000);
}

let notificationListenerUnsubscribe = null;

function startNotificationListener() {
    if (typeof db === 'undefined' || !db || !currentUser || !currentUser.email) return;
    
    if (notificationListenerUnsubscribe) {
        notificationListenerUnsubscribe();
    }
    
    notificationListenerUnsubscribe = db.collection('notifications')
        .where('userEmail', '==', currentUser.email)
        .where('read', '==', false)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const notif = change.doc.data();
                    const docId = change.doc.id;
                    
                    showCustomerNotification(notif.message, notif.status);
                    
                    db.collection('notifications').doc(docId).update({ read: true })
                        .catch(err => console.error("Error marking notification as read:", err));
                }
            });
        }, err => {
            console.error("Error in notification listener:", err);
        });
}

function showCustomerNotification(message, status) {
    // Play audio alert
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const ctx = new AudioContext();
            const playTone = (freq, start, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(freq, start);
                gain.gain.setValueAtTime(0.2, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
                osc.start(start);
                osc.stop(start + duration);
            };
            const now = ctx.currentTime;
            if (status === 'confirmed') {
                playTone(523.25, now, 0.15); // C5
                playTone(659.25, now + 0.1, 0.3); // E5
            } else {
                playTone(392.00, now, 0.15); // G4
                playTone(311.13, now + 0.1, 0.3); // D#4 (sad tone)
            }
        }
    } catch (e) {
        console.warn("Could not play customer notification sound:", e);
    }

    const note = document.createElement('div');
    note.className = 'glass';
    const borderLeftColor = status === 'confirmed' ? '#22c55e' : (status === 'cancelled' ? '#ef4444' : '#DC143C');
    const titleEmoji = status === 'confirmed' ? '✅' : (status === 'cancelled' ? '❌' : '🔔');
    
    note.style.cssText = `
        position: fixed; 
        bottom: 24px; 
        right: 24px; 
        padding: 16px 24px; 
        border-left: 4px solid ${borderLeftColor}; 
        z-index: 10001; 
        background: var(--surface, white);
        color: var(--text-main, #000);
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        border-radius: 12px;
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
    `;
    
    note.innerHTML = `
        <span style="font-size: 1.2rem;">${titleEmoji}</span>
        <div style="font-size: 0.9rem; font-weight: 700;">${message}</div>
    `;
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        note.style.transform = 'translateY(0)';
        note.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        note.style.transform = 'translateY(-20px)';
        note.style.opacity = '0';
        setTimeout(() => note.remove(), 400);
    }, 4500);
}

// --- Order System ---
let orders = JSON.parse(localStorage.getItem('roohira_orders')) || [];

function placeOrder() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }

    // Check if any product in the cart is out of stock in our synced products list
    for (const item of cart) {
        const p = products.find(prod => prod.name === item.name);
        if (p && p.stock === 0) {
            alert(`Sorry, the product "${item.name}" is currently out of stock. Please remove it from your cart to complete the order.`);
            return;
        }
    }

    // Extract Billing & Customer Details
    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');
    const phoneInput = document.getElementById('checkout-phone');
    const phone2Input = document.getElementById('checkout-phone2');
    const addressInput = document.getElementById('checkout-address');
    const cityInput = document.getElementById('checkout-city');
    const districtInput = document.getElementById('checkout-district');
    const postalInput = document.getElementById('checkout-postal');
    const notesInput = document.getElementById('checkout-notes');
    const paymentRadio = document.querySelector('input[name="payment"]:checked');

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const phone2 = phone2Input?.value.trim() || '';
    const address = addressInput?.value.trim() || '';
    const city = cityInput?.value.trim() || '';
    const district = districtInput?.value || '';
    const postal = postalInput?.value.trim() || '';
    const notes = notesInput?.value.trim() || '';
    let paymentMethod = paymentRadio?.value || 'Cash on Delivery';
    let targetBankChoice = '';
    if (paymentMethod.includes('Bank Transfer')) {
        targetBankChoice = document.querySelector('input[name="target_bank"]:checked')?.value || "People's Bank";
        paymentMethod = `Bank Transfer (${targetBankChoice})`;
    }

    // Clear previous validation error styles
    [nameInput, emailInput, phoneInput, addressInput, cityInput, districtInput].forEach(elem => {
        if (elem) elem.closest('.checkout-form-group')?.classList.remove('field-error');
    });

    // Validate Required Fields
    let missingField = false;
    if (!name) { nameInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!email) { emailInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!phone) { phoneInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!address) { addressInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!city) { cityInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }
    if (!district) { districtInput?.closest('.checkout-form-group')?.classList.add('field-error'); missingField = true; }

    if (missingField) {
        alert('⚠️ Please fill out all required billing fields marked with an asterisk (*).');
        const firstErr = document.querySelector('.checkout-form-group.field-error');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const fullAddress = `${address}, ${city}, ${district}${postal ? ' (' + postal + ')' : ''}`;

    const now = new Date();
    const dd = now.getDate().toString().padStart(2, '0');
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = now.getFullYear();

    // Function that continues order placement once we have a safe global count
    const proceedWithOrder = (globalCount) => {
        const orderNumber = (globalCount + 1).toString().padStart(3, '0');
        const orderID = `RC-${dd}/${mm}/${yyyy}-${orderNumber}`;

        // Calculate dynamic delivery fee
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const deliveryFee = itemCount > 3 ? 0 : 450;
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const grandTotal = subtotal + deliveryFee;

        // Prepare data for the E-Invoice
        const orderData = {
            id: orderID,
            name: name,
            email: email,
            phone: phone,
            phone2: phone2,
            address: fullAddress,
            streetAddress: address,
            city: city,
            district: district,
            postal: postal,
            notes: notes,
            paymentMethod: paymentMethod,
            targetBank: targetBankChoice,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            items: cart.map(item => {
                const p = products.find(prod => prod.name === item.name) || {};
                return {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: colorNames[item.color] || item.color,
                    image: item.image || (p.images ? p.images[0] : ''),
                    isCustom: item.isCustom || (item.id && String(item.id).startsWith('custom-')) || false,
                    customStickers: item.customStickers || []
                };
            }),
            delivery: deliveryFee,
            subtotal: subtotal,
            grandTotal: grandTotal
        };

        // Encode order data for the URL (Safe for Unicode/Sinhala)
        const jsonStr = JSON.stringify(orderData);
        const encodedData = btoa(unescape(encodeURIComponent(jsonStr)));
        
        let baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        let whatsappBaseUrl = baseUrl;
        
        if (window.location.protocol === 'file:') {
            baseUrl = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
            baseUrl = 'file:///' + baseUrl.replace(/^\/+/g, '');
            whatsappBaseUrl = 'https://onijawathsuka39-arch.github.io/Roohira-Store/';
        } else {
            whatsappBaseUrl = baseUrl;
        }
        
        const invoiceUrl = `${baseUrl}invoice.html?data=${encodeURIComponent(encodedData)}`;
        const whatsappInvoiceUrl = `${whatsappBaseUrl}invoice.html?data=${encodeURIComponent(encodedData)}`;

        let message = `🔴 *NEW ORDER CONFIRMATION: ${orderID}*\n\n`;
        message += `👤 *Customer Name:* ${name}\n`;
        if (email) message += `✉️ *Email:* ${email}\n`;
        message += `📞 *Primary Phone:* ${phone}\n`;
        if (phone2) message += `📱 *Alt Phone:* ${phone2}\n`;
        message += `📍 *Delivery Address:* ${fullAddress}\n`;
        if (notes) message += `📝 *Notes:* ${notes}\n`;
        message += `💳 *Payment Method:* ${paymentMethod}\n`;

        if (paymentMethod.includes('People\'s Bank')) {
            message += `\n🏦 *Deposit Account (People's Bank):*\n`;
            message += `• Acc Name: Onija Wathsuka Kodithuwakku\n`;
            message += `• Acc No: 217 200 4500 29209\n`;
            message += `• Branch: Mahara\n`;
        } else if (paymentMethod.includes('HNB Bank')) {
            message += `\n🏦 *Deposit Account (HNB Bank):*\n`;
            message += `• Acc Name: Roohira Collection\n`;
            message += `• Acc No: 0840 2041 4386\n`;
        }

        message += `\n📅 *Date:* ${orderData.date} | ${orderData.time}\n\n`;
        message += `📦 *Items Ordered:*\n`;

        cart.forEach((item) => {
            const colorName = colorNames[item.color] || item.color;
            message += `• *${item.name}* (${item.size} | ${colorName})\n`;
            message += `  Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()}\n`;
        });

        message += `\n💵 *Subtotal:* Rs. ${subtotal.toLocaleString()}.00\n`;
        message += `🚚 *Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : 'Rs. ' + deliveryFee.toLocaleString() + '.00'}\n`;
        message += `💰 *Grand Total: Rs. ${grandTotal.toLocaleString()}.00*\n\n`;

        message += `📄 *View E-Invoice:* ${whatsappInvoiceUrl}\n\n`;
        message += `Thank you for shopping with Roohira Collection!`;

        const whatsappUrl = `https://wa.me/94757218786?text=${encodeURIComponent(message)}`;

        const dbOrder = {
            id: orderID,
            date: now.toLocaleDateString(),
            items: [...cart],
            total: grandTotal,
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            userEmail: email,
            userName: name,
            userPhone: phone,
            userPhone2: phone2,
            userAddress: fullAddress,
            streetAddress: address,
            city: city,
            district: district,
            postal: postal,
            notes: notes,
            paymentMethod: paymentMethod,
            status: 'pending',
            timestamp: (typeof firebase !== 'undefined' ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString())
        };
        orders.push(dbOrder);
        localStorage.setItem('roohira_orders', JSON.stringify(orders));
        
        if (typeof db !== 'undefined' && db) {
            db.collection('orders').add(dbOrder).catch(e => {
                console.error("Error saving order to database:", e);
                alert("⚠️ Error: Order could not be saved to Firestore. Firestore Rules update කරන්න (allow read, write: if true).");
            });
        }

        localStorage.removeItem('roohira_free_delivery_active');
        const bar = document.getElementById('free-delivery-bar');
        if (bar) bar.remove();
        cart = []; saveCart();

        // Create success modal wrapper
        const successModal = document.createElement('div');
        successModal.style.position = 'fixed';
        successModal.style.top = '0';
        successModal.style.left = '0';
        successModal.style.width = '100%';
        successModal.style.height = '100%';
        successModal.style.backgroundColor = 'rgba(10, 15, 30, 0.9)';
        successModal.style.backdropFilter = 'blur(15px)';
        successModal.style.display = 'flex';
        successModal.style.alignItems = 'center';
        successModal.style.justifyContent = 'center';
        successModal.style.zIndex = '99999';
        successModal.style.padding = '20px';

        // Spinner loader
        successModal.innerHTML = `
            <div style="text-align: center; color: #fff;">
                <div style="width: 55px; height: 55px; border: 4px solid rgba(139, 90, 43, 0.2); border-left-color: #8B5A2B; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p style="font-weight: 700; font-size: 1.1rem; letter-spacing: 1px; font-family: 'Plus Jakarta Sans', sans-serif;">PROCESSING YOUR ORDER...</p>
                <style>
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                </style>
            </div>
        `;
        document.body.appendChild(successModal);

        // Transition to success card after 1.5s
        setTimeout(() => {
            successModal.innerHTML = `
                <div class="glass" style="max-width: 480px; width: 100%; border-radius: 20px; padding: 25px 20px; border: 2px solid #8B5A2B; box-shadow: 0 15px 35px rgba(139,90,43,0.15); text-align: center; color: #fff; background: rgba(15, 20, 35, 0.98); transform: scale(0.9); opacity: 0; transition: all 0.3s ease;">
                    <div style="width: 50px; height: 50px; background: rgba(34, 197, 94, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: #22c55e; border: 1.5px solid #22c55e;">
                        <i data-lucide="check" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.4rem; font-weight: 800; margin-bottom: 5px; color: #fff;">Order Confirmed!</h3>
                    <p style="color: #cbd5e0; font-size: 0.85rem; margin-bottom: 5px;">Your order has been recorded successfully.</p>
                    <p style="color: #8B5A2B; font-size: 0.82rem; font-weight: 800; margin-bottom: 15px;">Order ID: ${orderID}</p>
                    
                    <!-- Customer Details Box -->
                    <div style="text-align: left; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px 15px; border-radius: 12px; font-size: 0.82rem; color: #e2e8f0; margin-bottom: 15px; line-height: 1.6;">
                        <div style="font-weight: 700; color: #8B5A2B; margin-bottom: 6px; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Customer & Shipping Info</div>
                        <strong>Name:</strong> ${name}<br>
                        <strong>Email:</strong> ${email}<br>
                        <strong>Phone:</strong> ${phone}${phone2 ? ' / ' + phone2 : ''}<br>
                        <strong>Address:</strong> ${fullAddress}<br>
                        <strong>Payment:</strong> <span style="color:#8B5A2B; font-weight:700;">${paymentMethod}</span>
                    </div>

                    <!-- Compact Price Box -->
                    <div style="background: rgba(139, 90, 43, 0.08); padding: 12px; border-radius: 12px; margin-bottom: 18px; border: 1px solid rgba(139, 90, 43, 0.2); display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.85rem; color: #a0aec0; font-weight: 600;">Total Amount:</span>
                        <span style="color: #8B5A2B; font-size: 1.2rem; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif;">Rs. ${grandTotal.toLocaleString()}.00</span>
                    </div>

                    <p style="color: #cbd5e0; font-size: 0.88rem; font-weight: 600; margin-bottom: 12px;">Share order details to WhatsApp?</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button id="modal-wa-btn" style="width: 100%; background: #25D366; color: white; border: none; padding: 12px; font-weight: 700; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.88rem; transition: 0.2s;">
                            <i data-lucide="message-circle" style="width: 18px;"></i> Share to WhatsApp
                        </button>
                        <button id="modal-inv-btn" style="width: 100%; background: transparent; color: #8B5A2B; border: 1.5px solid #8B5A2B; padding: 11px; font-weight: 700; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.88rem; transition: 0.2s;">
                            <i data-lucide="file-text" style="width: 18px;"></i> View Invoice Only
                        </button>
                        <a href="index.html" style="width: 100%; background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.15); padding: 11px; font-weight: 700; border-radius: 10px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.88rem; transition: 0.2s;">
                            <i data-lucide="home" style="width: 18px;"></i> Go back to Home
                        </a>
                    </div>
                </div>
            `;

            // Entrance animation
            setTimeout(() => {
                const innerBox = successModal.querySelector('div');
                if (innerBox) {
                    innerBox.style.transform = 'scale(1)';
                    innerBox.style.opacity = '1';
                }
            }, 50);

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            document.getElementById('modal-wa-btn').onclick = () => {
                window.open(whatsappUrl, '_blank');
                window.location.href = invoiceUrl;
            };

            document.getElementById('modal-inv-btn').onclick = () => {
                window.location.href = invoiceUrl;
            };
        }, 1500);
    };

    // Query Firestore to get total orders count (ensures no duplicate IDs across different devices)
    if (typeof db !== 'undefined' && db) {
        db.collection('orders').get().then(snapshot => {
            const count = snapshot.size;
            proceedWithOrder(count);
        }).catch(err => {
            console.warn("Could not query orders count, falling back to local:", err);
            proceedWithOrder(orders.length);
        });
    } else {
        proceedWithOrder(orders.length);
    }
}

function clearOrderHistory() {
    if (confirm('Are you sure you want to clear your order history?')) {
        orders = orders.filter(o => o.userEmail !== currentUser.email);
        localStorage.setItem('roohira_orders', JSON.stringify(orders));
        if (typeof db !== 'undefined' && db) {
            db.collection('orders').where('userEmail', '==', currentUser.email).get().then(snapshot => {
                let deletePromises = [];
                snapshot.forEach(doc => deletePromises.push(doc.ref.delete()));
                Promise.all(deletePromises).then(() => {
                    loadProfile();
                    showNotification('Order history cleared.');
                });
            }).catch(e => {
                console.error("Error clearing orders from database:", e);
                loadProfile();
                showNotification('Order history cleared.');
            });
        } else {
            loadProfile();
            showNotification('Order history cleared.');
        }
    }
}

function loadProfile() {
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const initialEl = document.getElementById('profile-initial');
    const orderCountEl = document.getElementById('order-count');
    const historyEl = document.getElementById('order-history');
    if (currentUser) {
        if (nameEl) nameEl.innerText = currentUser.name;
        if (emailEl) emailEl.innerText = currentUser.email;
        if (initialEl) initialEl.innerText = currentUser.name.charAt(0).toUpperCase();

        const renderOrdersList = (ordersList) => {
            if (orderCountEl) orderCountEl.innerText = ordersList.length;
            if (historyEl) {
                if (ordersList.length === 0) {
                    historyEl.innerHTML = '<p style="color: var(--text-muted);">No orders found.</p>';
                } else {
                    historyEl.innerHTML = ordersList.map(o => {
                        const status = o.status || 'pending';
                        const statusColor = status === 'confirmed' ? '#22c55e' : status === 'cancelled' ? '#ef4444' : '#f59e0b';
                        const statusLabel = status === 'confirmed' ? '✅ Confirmed' : status === 'cancelled' ? '❌ Cancelled' : '🕐 Pending';
                        return `
                        <div class="glass" style="padding: 20px; margin-bottom: 15px; text-align: left;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                                <span style="font-weight: 800;">Order #${o.id.toString().slice(-6)}</span>
                                <div style="display:flex; gap:10px; align-items:center;">
                                    <span style="background:${statusColor}22; color:${statusColor}; border:1px solid ${statusColor}44; padding:3px 10px; border-radius:20px; font-size:0.78rem; font-weight:700;">${statusLabel}</span>
                                    <span style="color: var(--text-muted); font-size:0.85rem;">${o.date}</span>
                                </div>
                            </div>
                            <div style="font-size: 0.9rem; margin-bottom: 10px;">
                                ${o.items.map(i => `${i.name} (${i.size}, ${i.quantity}x)`).join(', ')}
                            </div>
                            <div style="font-weight: 800; color: #DC143C;">Total: Rs. ${o.total.toLocaleString()}.00</div>
                        </div>`;
                    }).join('');
                }
            }
        };

        if (typeof db !== 'undefined' && db) {
            db.collection('orders')
                .where('userEmail', '==', currentUser.email)
                .get()
                .then((querySnapshot) => {
                    const dbOrders = [];
                    querySnapshot.forEach((doc) => {
                        dbOrders.push(doc.data());
                    });
                    // Sort descending by date/timestamp
                    dbOrders.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                    renderOrdersList(dbOrders);
                })
                .catch((err) => {
                    console.error("Error fetching orders from Firestore:", err);
                    const userOrders = orders.filter(o => o.userEmail === currentUser.email);
                    renderOrdersList(userOrders.reverse());
                });
        } else {
            const userOrders = orders.filter(o => o.userEmail === currentUser.email);
            renderOrdersList(userOrders.reverse());
        }
    } else {
        if (window.location.pathname.includes('profile.html')) { window.location.href = 'login.html'; }
    }
}

// Animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes pulse-red { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.7); } 70% { transform: scale(1.2); box-shadow: 0 0 0 10px rgba(220, 20, 60, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 20, 60, 0); } }
    .btn-qty { background: white; border: 1px solid #ddd; color: #000; width: 25px; height: 25px; border-radius: 5px; cursor: pointer; transition: 0.2s; font-weight: bold; }
    .btn-qty:hover { background: #000; color: white; }
    .offer-dot { position: absolute; top: -2px; right: -10px; width: 8px; height: 8px; background: #DC143C; border-radius: 50%; animation: pulse-red 2s infinite; }
`;
document.head.appendChild(styleSheet);

function handleOfferNotification() {
    const offerViewed = localStorage.getItem('roohira_offer_viewed_v2');
    const isOfferPage = window.location.pathname.includes('offers.html');
    if (isOfferPage) { localStorage.setItem('roohira_offer_viewed_v2', 'true'); }
    if (!offerViewed && !isOfferPage) {
        document.querySelectorAll('a[href="offers.html"]').forEach(link => {
            if (!link.querySelector('.offer-dot')) {
                link.style.position = 'relative';
                const dot = document.createElement('span');
                dot.className = 'offer-dot';
                link.appendChild(dot);
            }
        });
    }
}

// Centralized Light/Dark Theme Toggle System
function initThemeToggle() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Header Theme Toggle Icon Button
    const navIcons = document.querySelector('.nav-icons');
    if (navIcons && !document.getElementById('theme-toggle')) {
        const themeBtn = document.createElement('a');
        themeBtn.href = '#';
        themeBtn.id = 'theme-toggle';
        themeBtn.title = 'Toggle Light/Dark Theme';
        themeBtn.style.cursor = 'pointer';
        themeBtn.style.display = 'flex';
        themeBtn.style.alignItems = 'center';
        themeBtn.style.justifyContent = 'center';
        themeBtn.style.color = 'var(--accent-pink)';
        themeBtn.innerHTML = `<i data-lucide="${currentTheme === 'dark' ? 'sun' : 'moon'}"></i>`;

        // Insert before account user icon or first child
        const userIcon = navIcons.querySelector('a[href*="profile"], a[href*="login"]');
        if (userIcon) {
            navIcons.insertBefore(themeBtn, userIcon);
        } else {
            navIcons.insertBefore(themeBtn, navIcons.firstChild);
        }

        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleTheme() {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const mainToggle = document.getElementById('theme-toggle');
    if (mainToggle) {
        mainToggle.innerHTML = `<i data-lucide="${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
    }
    const mobileToggle = document.getElementById('mobile-theme-toggle');
    if (mobileToggle) {
        mobileToggle.innerHTML = `<i data-lucide="${newTheme === 'dark' ? 'sun' : 'moon'}"></i> Theme: ${newTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}`;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- Free Delivery Promo Bar (Disabled) ---
function initFreeDeliveryBar() {
    return; // Bar disabled as requested
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('offer') === 'freedelivery') {
        localStorage.setItem('roohira_free_delivery_active', 'true');
        window.history.replaceState({}, document.title, 'shop.html');
    }
    
    const isActive = localStorage.getItem('roohira_free_delivery_active') === 'true';
    if (isShopPage && isActive) {
        if (!document.getElementById('free-delivery-bar')) {
            const bar = document.createElement('div');
            bar.id = 'free-delivery-bar';
            bar.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: var(--primary-dark);
                color: var(--primary-light);
                padding: 15px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 -5px 20px rgba(0,0,0,0.2);
                transition: transform 0.3s ease;
                font-size: 1rem;
                font-weight: 500;
                border-top: 3px solid var(--accent-gold);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            `;
            document.body.appendChild(bar);
            
            if (!document.getElementById('promo-animations')) {
                const style = document.createElement('style');
                style.id = 'promo-animations';
                style.innerHTML = `
                    @keyframes celebrate {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    @keyframes pop {
                        0% { transform: scale(0.9); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        updateFreeDeliveryBar();
    }
}

function updateFreeDeliveryBar() {
    const bar = document.getElementById('free-delivery-bar');
    if (!bar) return;
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (itemCount >= 4) {
        bar.innerHTML = '🎉 <span style="font-weight: 800; letter-spacing: 1px;">Congratulations! You have unlocked FREE DELIVERY!</span> 🚚';
        bar.style.animation = 'celebrate 1s ease 3, pop 0.5s ease-out';
        bar.style.background = 'var(--accent-gold)';
        bar.style.color = '#fff';
        bar.style.borderTop = '3px solid #fff';
    } else {
        const needed = 4 - itemCount;
        bar.innerHTML = `<i data-lucide="shopping-bag" style="width: 20px;"></i> Buy <b style="color: var(--accent-gold); font-size: 1.2rem; margin: 0 5px;">${needed}</b> more item${needed > 1 ? 's' : ''} to get <b style="letter-spacing: 0.5px; margin-left: 5px;">FREE DELIVERY</b> Island Wide! 🚚`;
        bar.style.animation = 'pop 0.3s ease-out';
        bar.style.background = 'var(--primary-dark)';
        bar.style.color = 'var(--primary-light)';
        bar.style.borderTop = '3px solid var(--accent-gold)';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

// Wishlist Functionality
let wishlist = JSON.parse(localStorage.getItem('roohira_wishlist')) || [];

function toggleWishlist(productId) {
    wishlist = JSON.parse(localStorage.getItem('roohira_wishlist')) || [];
    const index = wishlist.indexOf(productId);
    let added = false;
    if (index === -1) {
        wishlist.push(productId);
        added = true;
    } else {
        wishlist.splice(index, 1);
    }
    localStorage.setItem('roohira_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    // Refresh display if we are on the wishlist page
    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlist();
    }
    return added;
}

function handleCardWishlistToggle(productId, btnElement) {
    const added = toggleWishlist(productId);
    const heart = btnElement.querySelector('i');
    if (added) {
        heart.setAttribute('fill', '#DC143C');
        heart.style.color = '#DC143C';
        showNotification('Added to Wishlist!');
    } else {
        heart.removeAttribute('fill');
        heart.style.color = 'var(--text-main)';
        showNotification('Removed from Wishlist!');
    }
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function updateWishlistCount() {
    wishlist = JSON.parse(localStorage.getItem('roohira_wishlist')) || [];
    const counts = document.querySelectorAll('#wishlist-count');
    counts.forEach(el => {
        el.innerText = wishlist.length;
    });
}

// Function to sync products from Firestore
function syncProducts(callback) {
    // Call the callback immediately so the UI is responsive
    if (callback) {
        try {
            callback();
        } catch (e) {
            console.error("Error in immediate syncProducts callback:", e);
        }
    }

    if (typeof db === 'undefined' || !db) {
        console.warn("Firestore 'db' is not initialized yet. Skipping Firestore sync.");
        return;
    }

    db.collection('products').get().then(snapshot => {
        const dbProducts = {};
        snapshot.forEach(doc => {
            dbProducts[doc.id] = doc.data();
        });
        
        let changed = false;
        // Loop backwards because we might delete elements
        for (let i = products.length - 1; i >= 0; i--) {
            const p = products[i];
            if (dbProducts[p.id]) {
                const dbP = dbProducts[p.id];
                if (dbP.isDeleted === true || dbP.deleted === true) {
                    products.splice(i, 1);
                    changed = true;
                } else if (dbP.status === 'out_of_stock' && p.stock !== 0) {
                    p.stock = 0;
                    changed = true;
                } else if (dbP.status === 'in_stock' && p.stock === 0) {
                    p.stock = 10;
                    changed = true;
                }
            }
        }

        // If something changed, trigger updates dynamically
        if (changed) {
            console.log("Firestore products synced. Dynamic update triggered.");
            if (window.location.pathname.includes('shop.html')) {
                if (typeof filterShop === 'function') filterShop();
            }
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                if (typeof displayProducts === 'function') displayProducts(products.slice(0, 4));
            }
            if (window.location.pathname.includes('wishlist.html')) {
                if (typeof renderWishlist === 'function') renderWishlist();
            }
            if (window.location.pathname.includes('product-detail.html')) {
                const urlParams = new URLSearchParams(window.location.search);
                const pid = urlParams.get('id') || '1';
                const currentProduct = products.find(p => p.id === pid);
                if (!currentProduct) {
                    alert('This product is no longer available.');
                    window.location.href = 'shop.html';
                } else if (currentProduct.stock === 0) {
                    const addToCartBtn = document.getElementById('add-to-cart-btn');
                    if (addToCartBtn) {
                        addToCartBtn.innerHTML = '<i data-lucide="slash"></i> OUT OF STOCK';
                        addToCartBtn.disabled = true;
                        addToCartBtn.style.background = '#555';
                        addToCartBtn.style.opacity = '0.6';
                        addToCartBtn.style.cursor = 'not-allowed';
                    }
                    const stockSection = document.getElementById('stock-urgency-section');
                    if (stockSection) stockSection.style.display = 'none';
                }
            }
        }
        
        // Trigger a custom event to notify that products are synced
        document.dispatchEvent(new CustomEvent('productsSynced'));
    }).catch(err => {
        console.error("Error syncing products from Firestore:", err);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    syncProducts(() => {
        initThemeToggle();
        updateCartCount();
        updateWishlistCount();
        handleOfferNotification();
        if (window.location.pathname.includes('cart.html')) { renderCart(); }
        if (window.location.pathname.includes('profile.html')) { loadProfile(); }
        if (window.location.pathname.includes('wishlist.html')) { renderWishlist(); }
        if (window.location.pathname.includes('shop.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const catParam = urlParams.get('category');
            catParam ? filterProducts(catParam) : filterProducts('All');
        }
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') { displayProducts(products.slice(0, 4)); }
        if ((window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) && currentUser) {
            window.location.href = 'profile.html';
        }
        if (typeof lucide !== 'undefined') { lucide.createIcons(); }
        
        // Trigger a custom event to notify that products are synced
        document.dispatchEvent(new CustomEvent('productsSynced'));
    });

    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('close-menu');
    if (menuBtn && mobileMenu && overlay) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
        });
        const closeHandler = () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        };
        overlay.addEventListener('click', closeHandler);
        if (closeBtn) closeBtn.addEventListener('click', closeHandler);
    }
    
    // Initialize Free Delivery Promo Bar if needed
    if (typeof initFreeDeliveryBar === 'function') {
        initFreeDeliveryBar();
    }
});

// ===== NEW DROP WAITLIST =====
function handleNewDropWaitlist() {
    const nameInput  = document.getElementById('nd-name-input');
    const phoneInput = document.getElementById('nd-phone-input');
    const btn        = document.getElementById('nd-notify-btn');
    const msg        = document.getElementById('nd-notify-msg');

    const name  = nameInput  ? nameInput.value.trim()  : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    // Reset message
    msg.className = 'nd-notify-msg';

    // Validation
    if (!name) {
        msg.textContent = '⚠️ Please enter your name.';
        msg.classList.add('error');
        if (nameInput) nameInput.focus();
        return;
    }
    if (!phone || !/^[0-9+\s\-]{7,15}$/.test(phone)) {
        msg.textContent = '⚠️ Please enter a valid phone number.';
        msg.classList.add('error');
        if (phoneInput) phoneInput.focus();
        return;
    }

    // Disable button to prevent double-submit
    if (btn) { btn.disabled = true; btn.textContent = 'Joining...'; }

    const waitlistEntry = { name: name, phone: phone, joinedAt: new Date().toISOString() };

    if (typeof db !== 'undefined' && db) {
        db.collection('waitlist').where('phone', '==', phone).get()
            .then(snap => {
                if (!snap.empty) {
                    msg.textContent = '✅ You are already on the waitlist!';
                    msg.classList.add('success');
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = '<i data-lucide="bell" style="width:16px;height:16px;"></i> Join Waitlist';
                        if (window.lucide) lucide.createIcons();
                    }
                    return;
                }
                
                db.collection('waitlist').add(waitlistEntry)
                    .then(() => {
                        msg.textContent = '🎉 You are successfully added to the waitlist!';
                        msg.classList.add('success');
                        
                        // Clear inputs
                        if (nameInput)  nameInput.value  = '';
                        if (phoneInput) phoneInput.value = '';
                        
                        // Save to localStorage waitlist
                        const waitlist = JSON.parse(localStorage.getItem('roohira_waitlist') || '[]');
                        // Filter out old phone entry if any to clean local cache
                        const filteredWaitlist = waitlist.filter(e => e.phone !== phone);
                        filteredWaitlist.push(waitlistEntry);
                        localStorage.setItem('roohira_waitlist', JSON.stringify(filteredWaitlist));
                    })
                    .catch(e => {
                        console.error("Error saving to waitlist database:", e);
                        msg.textContent = '⚠️ Error: Waitlist entry could not be saved to Firestore.';
                        msg.classList.add('error');
                    })
                    .finally(() => {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<i data-lucide="bell" style="width:16px;height:16px;"></i> Join Waitlist';
                            if (window.lucide) lucide.createIcons();
                        }
                    });
            })
            .catch(e => {
                console.error("Error checking waitlist database:", e);
                // Fallback to direct insertion if lookup fails
                db.collection('waitlist').add(waitlistEntry)
                    .then(() => {
                        msg.textContent = '🎉 You are successfully added to the waitlist!';
                        msg.classList.add('success');
                        if (nameInput)  nameInput.value  = '';
                        if (phoneInput) phoneInput.value = '';
                    })
                    .catch(err => {
                        console.error(err);
                        msg.textContent = '⚠️ Error: Waitlist entry could not be saved.';
                        msg.classList.add('error');
                    })
                    .finally(() => {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<i data-lucide="bell" style="width:16px;height:16px;"></i> Join Waitlist';
                            if (window.lucide) lucide.createIcons();
                        }
                    });
            });
    } else {
        // No firebase configuration loaded
        msg.textContent = '⚠️ Database connection is not available.';
        msg.classList.add('error');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="bell" style="width:16px;height:16px;"></i> Join Waitlist';
            if (window.lucide) lucide.createIcons();
        }
    }
}

