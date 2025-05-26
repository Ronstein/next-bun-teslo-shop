import bcryptjs from 'bcryptjs';

interface SeedProduct {
    description: string;
    images: string[];
    price: number;
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men' | 'women' | 'kid' | 'unisex';
    category: string; // Nombre de la categoría a la que pertenece el producto
    sizes: SeedProductSize[]; // Stock por talla
}

interface SeedProductSize {
    size: ValidSizes;
    inStock: number;
}

interface SeedUser {
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'user';
}

type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

interface SeedData {
    users: SeedUser[],
    categories: string[],
    products: SeedProduct[],
}




export const initialData: SeedData = {
    users: [
        {
            email: "roro@gmail.com",
            password: bcryptjs.hashSync("123456"),
            name: "Rodrigo Pavez",
            role: "admin"
        },
        {
            email: "juan@gmail.com",
            password: bcryptjs.hashSync("123456"),
            name: "Juan Perez",
            role: "user"
        },
    ],
    categories: ['Shirts', 'Pants', 'Hoodies', 'Hats'],
    products: [

        {
            "description": "Introducing the Tesla Chill Collection...",
            "images": ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
            "price": 75,
            "sizes": [
                { "size": "XS", "inStock": 7 },
                { "size": "S", "inStock": 7 },
                { "size": "M", "inStock": 7 },
                { "size": "L", "inStock": 7 },
                { "size": "XL", "inStock": 7 },
                { "size": "XXL", "inStock": 7 }
            ],
            "slug": "mens_chill_crew_neck_sweatshirt",
            "type": "shirts",
            "tags": ["sweatshirt"],
            "title": "Men’s Chill Crew Neck Sweatshirt",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "The Men's Quilted Shirt Jacket features a uniquely fit...",
            "images": ["1740507-00-A_0_2000.jpg", "1740507-00-A_1.jpg"],
            "price": 200,
            "sizes": [
                { "size": "XS", "inStock": 5 },
                { "size": "S", "inStock": 5 },
                { "size": "M", "inStock": 5 },
                { "size": "XL", "inStock": 5 },
                { "size": "XXL", "inStock": 5 }
            ],
            "slug": "men_quilted_shirt_jacket",
            "type": "shirts",
            "tags": ["jacket"],
            "title": "Men's Quilted Shirt Jacket",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Introducing the Tesla Raven Collection...",
            "images": ["1740250-00-A_0_2000.jpg", "1740250-00-A_1.jpg"],
            "price": 130,
            "sizes": [
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 },
                { "size": "L", "inStock": 10 },
                { "size": "XL", "inStock": 10 },
                { "size": "XXL", "inStock": 10 }
            ],
            "slug": "men_raven_lightweight_zip_up_bomber_jacket",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Raven Lightweight Zip Up Bomber Jacket",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Introducing the Tesla Turbine Collection...",
            "images": ["1740280-00-A_0_2000.jpg", "1740280-00-A_1.jpg"],
            "price": 45,
            "sizes": [
                { "size": "XS", "inStock": 50 },
                { "size": "S", "inStock": 50 },
                { "size": "M", "inStock": 50 },
                { "size": "L", "inStock": 50 }
            ],
            "slug": "men_turbine_long_sleeve_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Turbine Long Sleeve Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Introducing the Tesla Turbine Collection...",
            "images": ["1741416-00-A_0_2000.jpg", "1741416-00-A_1.jpg"],
            "price": 40,
            "sizes": [
                { "size": "M", "inStock": 50 },
                { "size": "L", "inStock": 50 },
                { "size": "XL", "inStock": 50 },
                { "size": "XXL", "inStock": 50 }
            ],
            "slug": "men_turbine_short_sleeve_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Turbine Short Sleeve Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton...",
            "images": ["7654393-00-A_2_2000.jpg", "7654393-00-A_3.jpg"],
            "price": 35,
            "sizes": [
                { "size": "M", "inStock": 0 },
                { "size": "L", "inStock": 0 },
                { "size": "XL", "inStock": 0 },
                { "size": "XXL", "inStock": 0 }
            ],
            "slug": "men_cybertruck_owl_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Cybertruck Owl Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Inspired by our fully integrated home solar and storage system...",
            "images": ["1703767-00-A_0_2000.jpg", "1703767-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "S", "inStock": 15 },
                { "size": "M", "inStock": 15 },
                { "size": "L", "inStock": 15 },
                { "size": "XL", "inStock": 15 }
            ],
            "slug": "men_solar_roof_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Solar Roof Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Inspired by the world’s most unlimited resource...",
            "images": ["1700280-00-A_0_2000.jpg", "1700280-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 17 },
                { "size": "S", "inStock": 17 },
                { "size": "XL", "inStock": 17 },
                { "size": "XXL", "inStock": 17 }
            ],
            "slug": "men_let_the_sun_shine_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Let the Sun Shine Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed for fit, comfort and style...",
            "images": ["8764734-00-A_0_2000.jpg", "8764734-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 12 },
                { "size": "S", "inStock": 12 },
                { "size": "M", "inStock": 12 }
            ],
            "slug": "men_3d_large_wordmark_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's 3D Large Wordmark Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed for fit, comfort and style...",
            "images": ["7652426-00-A_0_2000.jpg", "7652426-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 5 },
                { "size": "S", "inStock": 5 }
            ],
            "slug": "men_3d_t_logo_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's 3D T Logo Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed for comfort and style in any size...",
            "images": ["8528839-00-A_0_2000.jpg", "8528839-00-A_2.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 2 },
                { "size": "S", "inStock": 2 },
                { "size": "M", "inStock": 2 }
            ],
            "slug": "men_3d_small_wordmark_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men’s 3D Small Wordmark Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed to celebrate Tesla's incredible performance mode...",
            "images": ["1549268-00-A_0_2000.jpg", "1549268-00-A_2.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 82 },
                { "size": "S", "inStock": 82 },
                { "size": "M", "inStock": 82 },
                { "size": "L", "inStock": 82 },
                { "size": "XL", "inStock": 82 },
                { "size": "XXL", "inStock": 82 }
            ],
            "slug": "men_plaid_mode_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Plaid Mode Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Inspired by our popular home battery...",
            "images": ["9877034-00-A_0_2000.jpg", "9877034-00-A_2.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XL", "inStock": 24 },
                { "size": "XXL", "inStock": 24 }
            ],
            "slug": "men_powerwall_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Powerwall Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Inspired by Tesla Battery Day and featuring the unveiled tabless battery cell...",
            "images": ["1633802-00-A_0_2000.jpg", "1633802-00-A_2.jpg"],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 5 },
                { "size": "S", "inStock": 5 },
                { "size": "XXL", "inStock": 5 }
            ],
            "slug": "men_battery_day_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Battery Day Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed for exceptional comfort and inspired by the Cybertruck unveil event...",
            "images": ["7654399-00-A_0_2000.jpg", "7654399-00-A_1.jpg"],
            "price": 30,
            "sizes": [
                { "size": "M", "inStock": 150 },
                { "size": "L", "inStock": 150 }
            ],
            "slug": "men_cybertruck_bulletproof_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men’s Cybertruck Bulletproof Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Inspired by the Model Y order confirmation graphic...",
            "images": ["7652410-00-A_0.jpg", "7652410-00-A_1_2000.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 },
                { "size": "L", "inStock": 10 },
                { "size": "XL", "inStock": 10 },
                { "size": "XXL", "inStock": 10 }
            ],
            "slug": "men_haha_yes_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Haha Yes Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed for fit, comfort and style...",
            "images": ["8764600-00-A_0_2000.jpg", "8764600-00-A_2.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 34 },
                { "size": "S", "inStock": 34 },
                { "size": "M", "inStock": 34 },
                { "size": "L", "inStock": 34 }
            ],
            "slug": "men_s3xy_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's S3XY Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed for fit, comfort and style...",
            "images": ["8764813-00-A_0_2000.jpg", "8764813-00-A_1.jpg"],
            "price": 40,
            "sizes": [
                { "size": "XL", "inStock": 15 },
                { "size": "XXL", "inStock": 15 }
            ],
            "slug": "men_3d_wordmark_long_sleeve_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's 3D Wordmark Long Sleeve Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Designed for fit, comfort and style...",
            "images": ["8529198-00-A_0_2000.jpg", "8529198-00-A_1.jpg"],
            "price": 40,
            "sizes": [
                { "size": "XS", "inStock": 12 },
                { "size": "XXL", "inStock": 12 }
            ],
            "slug": "men_3d_t_logo_long_sleeve_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's 3D T Logo Long Sleeve Tee",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Introducing the Tesla Raven Collection...",
            "images": ["1740245-00-A_0_2000.jpg", "1740245-00-A_1.jpg"],
            "price": 115,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 },
                { "size": "L", "inStock": 10 },
                { "size": "XL", "inStock": 10 },
                { "size": "XXL", "inStock": 10 }
            ],
            "slug": "men_raven_lightweight_hoodie",
            "type": "hoodies",
            "tags": ["hoodie"],
            "title": "Men's Raven Lightweight Hoodie",
            "gender": "men",
            "category": "Hoodies"
        },
        {
            "description": "Introducing the Tesla Chill Collection...",
            "images": ["1740051-00-A_0_2000.jpg", "1740051-00-A_1.jpg"],
            "price": 130,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 },
                { "size": "L", "inStock": 10 },
                { "size": "XL", "inStock": 10 },
                { "size": "XXL", "inStock": 10 }
            ],
            "slug": "chill_pullover_hoodie",
            "type": "hoodies",
            "tags": ["hoodie"],
            "title": "Chill Pullover Hoodie",
            "gender": "unisex",
            "category": "Hoodies"
        },
        {
            "description": "Introducing the Tesla Chill Collection...",
            "images": ["1741111-00-A_0_2000.jpg", "1741111-00-A_1.jpg"],
            "price": 85,
            "sizes": [
                { "size": "XS", "inStock": 100 },
                { "size": "L", "inStock": 100 },
                { "size": "XL", "inStock": 100 },
                { "size": "XXL", "inStock": 100 }
            ],
            "slug": "men_chill_full_zip_hoodie",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Chill Full Zip Hoodie",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Introducing the Tesla Chill Collection...",
            "images": ["1740140-00-A_0_2000.jpg", "1740140-00-A_1.jpg"],
            "price": 85,
            "sizes": [
                { "size": "XS", "inStock": 7 },
                { "size": "S", "inStock": 7 },
                { "size": "M", "inStock": 7 }
            ],
            "slug": "men_chill_quarter_zip_pullover_-_gray",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Chill Quarter Zip Pullover - Gray",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "Introducing the Tesla Chill Collection...",
            "images": ["1740145-00-A_2_2000.jpg", "1740145-00-A_1.jpg"],
            "price": 85,
            "sizes": [
                { "size": "XS", "inStock": 15 },
                { "size": "S", "inStock": 15 },
                { "size": "M", "inStock": 15 },
                { "size": "L", "inStock": 15 }
            ],
            "slug": "men_chill_quarter_zip_pullover_-_white",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Men's Chill Quarter Zip Pullover - White",
            "gender": "men",
            "category": "Shirts"
        },
        {
            "description": "The Unisex 3D Large Wordmark Pullover Hoodie features soft fleece...",
            "images": ["8529107-00-A_0_2000.jpg", "8529107-00-A_1.jpg"],
            "price": 70,
            "sizes": [
                { "size": "XS", "inStock": 15 },
                { "size": "S", "inStock": 15 },
                { "size": "XL", "inStock": 15 },
                { "size": "XXL", "inStock": 15 }
            ],
            "slug": "3d_large_wordmark_pullover_hoodie",
            "type": "hoodies",
            "tags": ["hoodie"],
            "title": "3D Large Wordmark Pullover Hoodie",
            "gender": "unisex",
            "category": "Hoodies"
        },
        {
            "description": "As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie...",
            "images": ["7654420-00-A_0_2000.jpg", "7654420-00-A_1_2000.jpg"],
            "price": 60,
            "sizes": [
                { "size": "XS", "inStock": 13 },
                { "size": "S", "inStock": 13 },
                { "size": "M", "inStock": 13 },
                { "size": "L", "inStock": 13 },
                { "size": "XL", "inStock": 13 },
                { "size": "XXL", "inStock": 13 }
            ],
            "slug": "cybertruck_graffiti_hoodie",
            "type": "hoodies",
            "tags": ["hoodie"],
            "title": "Cybertruck Graffiti Hoodie",
            "gender": "unisex",
            "category": "Hoodies"
        },
        {
            "description": "The Relaxed T Logo Hat is a classic silhouette combined with modern details...",
            "images": ["1657932-00-A_0_2000.jpg", "1657932-00-A_1.jpg"],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 11 },
                { "size": "S", "inStock": 11 },
                { "size": "M", "inStock": 11 },
                { "size": "L", "inStock": 11 },
                { "size": "XL", "inStock": 11 },
                { "size": "XXL", "inStock": 11 }
            ],
            "slug": "relaxed_t_logo_hat",
            "type": "hats",
            "tags": ["hats"],
            "title": "Relaxed T Logo Hat",
            "gender": "unisex",
            "category": "Hats"
        },
        {
            "description": "The Relaxed T Logo Hat is a classic silhouette combined with modern details...",
            "images": ["1740417-00-A_0_2000.jpg", "1740417-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 13 },
                { "size": "S", "inStock": 13 },
                { "size": "M", "inStock": 13 },
                { "size": "L", "inStock": 13 },
                { "size": "XL", "inStock": 13 },
                { "size": "XXL", "inStock": 13 }
            ],
            "slug": "thermal_cuffed_beanie",
            "type": "hats",
            "tags": ["hats"],
            "title": "Thermal Cuffed Beanie",
            "gender": "unisex",
            "category": "Hats"
        },
        {
            "description": "The Women's Cropped Puffer Jacket features a uniquely cropped silhouette...",
            "images": ["1740535-00-A_0_2000.jpg", "1740535-00-A_1.jpg"],
            "price": 225,
            "sizes": [
                { "size": "XS", "inStock": 85 },
                { "size": "S", "inStock": 85 },
                { "size": "M", "inStock": 85 }
            ],
            "slug": "women_cropped_puffer_jacket",
            "type": "hoodies",
            "tags": ["hoodie"],
            "title": "Women's Cropped Puffer Jacket",
            "gender": "women",
            "category": "Hoodies"
        },
        {
            "description": "Introducing the Tesla Chill Collection...",
            "images": ["1740226-00-A_0_2000.jpg", "1740226-00-A_1.jpg"],
            "price": 130,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 },
                { "size": "XXL", "inStock": 10 }
            ],
            "slug": "women_chill_half_zip_cropped_hoodie",
            "type": "hoodies",
            "tags": ["hoodie"],
            "title": "Women's Chill Half Zip Cropped Hoodie",
            "gender": "women",
            "category": "Hoodies"
        },
        {
            "description": "Introducing the Tesla Raven Collection...",
            "images": ["1740260-00-A_0_2000.jpg", "1740260-00-A_1.jpg"],
            "price": 110,
            "sizes": [
                { "size": "XS", "inStock": 9 },
                { "size": "S", "inStock": 9 },
                { "size": "M", "inStock": 9 },
                { "size": "L", "inStock": 9 },
                { "size": "XL", "inStock": 9 },
                { "size": "XXL", "inStock": 9 }
            ],
            "slug": "women_raven_slouchy_crew_sweatshirt",
            "type": "hoodies",
            "tags": ["hoodie"],
            "title": "Women's Raven Slouchy Crew Sweatshirt",
            "gender": "women",
            "category": "Hoodies"
        },
        {
            "description": "Introducing the Tesla Turbine Collection...",
            "images": ["1740290-00-A_0_2000.jpg", "1740290-00-A_1.jpg"],
            "price": 45,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 },
                { "size": "L", "inStock": 10 },
                { "size": "XL", "inStock": 10 },
                { "size": "XXL", "inStock": 10 }
            ],
            "slug": "women_turbine_cropped_long_sleeve_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's Turbine Cropped Long Sleeve Tee",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "ntroducing the Tesla Turbine Collection...",
            "images": ["1741441-00-A_0_2000.jpg", "1741441-00-A_1.jpg"],
            "price": 40,
            "sizes": [
                { "size": "XS", "inStock": 0 },
                { "size": "S", "inStock": 0 }
            ],
            "slug": "women_turbine_cropped_short_sleeve_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's Turbine Cropped Short Sleeve Tee",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Designed for style and comfort...",
            "images": ["8765090-00-A_0_2000.jpg", "8765090-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 30 },
                { "size": "S", "inStock": 30 },
                { "size": "M", "inStock": 30 },
                { "size": "L", "inStock": 30 },
                { "size": "XL", "inStock": 30 },
                { "size": "XXL", "inStock": 30 }
            ],
            "slug": "women_t_logo_short_sleeve_scoop_neck_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's T Logo Short Sleeve Scoop Neck Tee",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Designed for style and comfort...",
            "images": ["8765100-00-A_0_2000.jpg", "8765100-00-A_1.jpg"],
            "price": 40,
            "sizes": [
                { "size": "XS", "inStock": 16 },
                { "size": "S", "inStock": 16 },
                { "size": "L", "inStock": 16 },
                { "size": "XL", "inStock": 16 },
                { "size": "XXL", "inStock": 16 }
            ],
            "slug": "women_t_logo_long_sleeve_scoop_neck_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's T Logo Long Sleeve Scoop Neck Tee",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Designed for style and comfort...",
            "images": ["8765120-00-A_0_2000.jpg", "8765120-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XS", "inStock": 18 },
                { "size": "S", "inStock": 18 },
                { "size": "M", "inStock": 18 },
                { "size": "L", "inStock": 18 },
                { "size": "XL", "inStock": 18 },
                { "size": "XXL", "inStock": 18 }
            ],
            "slug": "women_small_wordmark_short_sleeve_v-neck_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's Small Wordmark Short Sleeve V-Neck Tee",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Designed for style and comfort...",
            "images": ["8765115-00-A_0_2000.jpg", "8765115-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "XL", "inStock": 5 },
                { "size": "XXL", "inStock": 5 }
            ],
            "slug": "women_large_wordmark_short_sleeve_crew_neck_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's Large Wordmark Short Sleeve Crew Neck Tee",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Designed to celebrate Tesla's incredible performance mode...",
            "images": ["1549275-00-A_0_2000.jpg", "1549275-00-A_1.jpg"],
            "price": 35,
            "sizes": [
                { "size": "S", "inStock": 16 },
                { "size": "M", "inStock": 16 }
            ],
            "slug": "women_plaid_mode_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's Plaid Mode Tee",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Inspired by our popular home battery...",
            "images": ["9877040-00-A_0_2000.jpg", "9877040-00-A_1.jpg"],
            "price": 130,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 },
                { "size": "L", "inStock": 10 },
                { "size": "XL", "inStock": 10 },
                { "size": "XXL", "inStock": 10 }
            ],
            "slug": "women_powerwall_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women’s Powerwall Tee",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Fully customized and uniquely styled, the Women's Corp Jacket features a silicone-printed 'T' logo on the left chest and prominent Tesla wordmark across the back.",
            "images": [
                "5645680-00-A_0_2000.jpg",
                "5645680-00-A_3.jpg"
            ],
            "price": 90,
            "sizes": [
                { "size": "M", "inStock": 3 },
                { "size": "L", "inStock": 3 },
                { "size": "XL", "inStock": 3 },
                { "size": "XXL", "inStock": 3 }
            ],
            "slug": "women_corp_jacket",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's Corp Jacket",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Introducing the Tesla Raven Collection. The Women's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
            "images": [
                "1740270-00-A_0_2000.jpg",
                "1740270-00-A_1.jpg"
            ],
            "price": 100,
            "sizes": [
                { "size": "XS", "inStock": 162 },
                { "size": "S", "inStock": 162 },
                { "size": "M", "inStock": 162 },
                { "size": "L", "inStock": 162 },
                { "size": "XL", "inStock": 162 },
                { "size": "XXL", "inStock": 162 }
            ],
            "slug": "women_raven_joggers",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Women's Raven Joggers",
            "gender": "women",
            "category": "Shirts"
        },
        {
            "description": "Designed for fit, comfort and style, the Kids Cybertruck Graffiti Long Sleeve Tee features a water-based Cybertruck graffiti wordmark across the chest, a Tesla wordmark down the left arm and our signature T logo on the back collar. Made from 50% cotton and 50% polyester.",
            "images": [
                "1742694-00-A_1_2000.jpg",
                "1742694-00-A_3.jpg"
            ],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 }
            ],
            "slug": "kids_cybertruck_long_sleeve_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Kids Cybertruck Long Sleeve Tee",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.",
            "images": [
                "8529312-00-A_0_2000.jpg",
                "8529312-00-A_1.jpg"
            ],
            "price": 25,
            "sizes": [
                { "size": "XS", "inStock": 0 },
                { "size": "S", "inStock": 0 },
                { "size": "M", "inStock": 0 }
            ],
            "slug": "kids_scribble_t_logo_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Kids Scribble T Logo Tee",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "The Kids Cybertruck Tee features the iconic Cybertruck graffiti wordmark and is made from 100% Peruvian cotton for maximum comfort.",
            "images": [
                "8529342-00-A_0_2000.jpg",
                "8529342-00-A_1.jpg"
            ],
            "price": 25,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 }
            ],
            "slug": "kids_cybertruck_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Kids Cybertruck Tee",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "The refreshed Kids Racing Stripe Tee is made from 100% Peruvian cotton, featuring a newly enhanced racing stripe with a brushed Tesla wordmark that's perfect for any speed racer.",
            "images": [
                "8529354-00-A_0_2000.jpg",
                "8529354-00-A_1.jpg"
            ],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 }
            ],
            "slug": "kids_racing_stripe_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Kids Racing Stripe Tee",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
            "images": [
                "7652465-00-A_0_2000.jpg",
                "7652465-00-A_1.jpg"
            ],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 }
            ],
            "slug": "kids_3d_t_logo_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Kids 3D T Logo Tee",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "The checkered tee is made from long grain, GMO free Peruvian cotton. Peru is the only country in the world where cotton is picked by hand on a large scale. The 4,500-year-old tradition prevents damage to the fiber during the picking process and removes the need to use chemicals to open the cotton plants before harvest. This environmentally friendly process results in cotton that is soft, strong, and lustrous – and the tee will get even softer with every wash.",
            "images": [
                "100042307_0_2000.jpg",
                "100042307_alt_2000.jpg"
            ],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 }
            ],
            "slug": "kids_checkered_tee",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Kids Checkered Tee",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "For the future space traveler with discerning taste, a soft, cotton onesie with snap closure bottom. Clear labeling provided in case of contact with a new spacefaring civilization. 100% Cotton. Made in Peru",
            "images": [
                "1473809-00-A_1_2000.jpg",
                "1473809-00-A_alt.jpg"
            ],
            "price": 25,
            "sizes": [
                { "size": "XS", "inStock": 16 },
                { "size": "S", "inStock": 16 }
            ],
            "slug": "made_on_earth_by_humans_onesie",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Made on Earth by Humans Onesie",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "The Kids Scribble T Logo Onesie is made from 100% Peruvian cotton and features a Tesla T sketched logo for every little artist to wear.",
            "images": [
                "8529387-00-A_0_2000.jpg",
                "8529387-00-A_1.jpg"
            ],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 0 },
                { "size": "S", "inStock": 0 }
            ],
            "slug": "scribble_t_logo_onesie",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Scribble T Logo Onesie",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "Show your commitment to sustainable energy with this cheeky onesie for your young one. Note: Does not prevent emissions. 100% Cotton. Made in Peru.",
            "images": [
                "1473834-00-A_2_2000.jpg",
                "1473829-00-A_2_2000.jpg"
            ],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 }
            ],
            "slug": "zero_emissions_(almost)_onesie",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Zero Emissions (Almost) Onesie",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "Wear your Kids Cyberquad Bomber Jacket during your adventures on Cyberquad for Kids. The bomber jacket features a graffiti-style illustration of our Cyberquad silhouette and wordmark. With three zippered pockets and our signature T logo and Tesla wordmark printed along the sleeves, Kids Cyberquad Bomber Jacket is perfect for wherever the trail takes you. Made from 60% cotton and 40% polyester.",
            "images": [
                "1742702-00-A_0_2000.jpg",
                "1742702-00-A_1.jpg"
            ],
            "price": 65,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 }
            ],
            "slug": "kids_cyberquad_bomber_jacket",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Kids Cyberquad Bomber Jacket",
            "gender": "kid",
            "category": "Shirts"
        },
        {
            "description": "Cruise the playground in style with the Kids Corp Jacket. Modeled after the original Tesla Corp Jacket, the Kids Corp Jacket features the same understated style and high-quality materials but at a pint-sized scale.",
            "images": [
                "1506211-00-A_0_2000.jpg",
                "1506211-00-A_1_2000.jpg"
            ],
            "price": 30,
            "sizes": [
                { "size": "XS", "inStock": 10 },
                { "size": "S", "inStock": 10 },
                { "size": "M", "inStock": 10 }
            ],
            "slug": "kids_corp_jacket",
            "type": "shirts",
            "tags": ["shirt"],
            "title": "Kids Corp Jacket",
            "gender": "kid",
            "category": "Shirts"
        }
    ]
}