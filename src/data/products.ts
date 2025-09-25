import { bagNames, disabledBags } from './bagsData';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'bags' | 'shirts' | 'bandana' | 'tote' | 'hats' | 'accessories';
  images: { src: string; alt: string }[];
  colorImages?: { [color: string]: { src: string; alt: string }[] }; // For color variants
  price: string;
  priceId?: string; // For single price products
  priceIds?: { [size: string]: string }; // For multi-size products
  sizes?: string[];
  slug: string;
  disabled?: boolean;
}

// Shirt price IDs
const yogaShirtPriceIds = {
  corgi: {
    S: "price_1QrEmcAp2D4XT14x0F0HqWS7",
    M: "price_1QrEmdAp2D4XT14xxwoEnIpR",
    L: "price_1QrEmeAp2D4XT14xCcysmM0x",
    XL: "price_1QrEmeAp2D4XT14xaWTzR6UK"
  },
  golden: {
    S: "price_1RhDUYAp2D4XT14xQBPFDFyR",
    M: "price_1RhDUYAp2D4XT14xCpfJPA22",
    L: "price_1RhDUYAp2D4XT14xNGDpFyBN",
    XL: "price_1RhDUZAp2D4XT14xQ2123Nfz"
  },
  greatDane: {
    S: "price_1RhDUiAp2D4XT14x3SXNGkmW",
    M: "price_1RhDUiAp2D4XT14xTDv63i8s",
    L: "price_1RhDUiAp2D4XT14xsN6YjZSn",
    XL: "price_1RhDUjAp2D4XT14x1QIfmH4w"
  },
  husky: {
    S: "price_1RhDPIAp2D4XT14xp5rGXrpd",
    M: "price_1RhDPIAp2D4XT14xzdCfgYud",
    L: "price_1RhDPIAp2D4XT14xTgms5Hi1",
    XL: "price_1RhDPJAp2D4XT14xq2CgjKI4"
  }
};

// Cool Aunts Club T-Shirt price IDs
const coolAuntsClubPriceIds = {
  "Green - Small": "price_1RbDB6Ap2D4XT14xg4Jqg4Lp",
  "Green - Medium": "price_1RbDB8Ap2D4XT14xJarRANZV",
  "Green - Large": "price_1RbDB9Ap2D4XT14xJOAGm8q7",
  "Green - X-Large": "price_1RbDBAAp2D4XT14xOOYf6QMR",
  "Pink - Small": "price_1RbDBTAp2D4XT14x1jUDzhTm",
  "Pink - Medium": "price_1RbDBVAp2D4XT14xafaUyDDP",
  "Pink - Large": "price_1RbDBWAp2D4XT14xi9vLXhPN",
  "Pink - X-Large": "price_1RbDBYAp2D4XT14xbzpaHGuq",
  "Natural - Small": "price_1RbDBpAp2D4XT14x0oGWdm5O",
  "Natural - Medium": "price_1RbDBqAp2D4XT14xTzmxEBAp",
  "Natural - Large": "price_1RbDBtAp2D4XT14xIIynnB0m",
  "Natural - X-Large": "price_1RbDBvAp2D4XT14x4NKSMhTb",
  "Yellow - Small": "price_1RbDCDAp2D4XT14xbrknYFN0",
  "Yellow - Medium": "price_1RbDCEAp2D4XT14xYH6mfseH",
  "Yellow - Large": "price_1RbDCGAp2D4XT14x5ANNDPIa",
  "Yellow - X-Large": "price_1RbDCHAp2D4XT14xEgIg5RY3"
};

// What The T-Shirt price IDs
const whatTheTShirtPriceIds = {
  "Green - Small": "price_1RbYCZAp2D4XT14xnwLXQQk5",
  "Green - Medium": "price_1RbYCdAp2D4XT14xHXxrRyOP",
  "Green - Large": "price_1RbYChAp2D4XT14xis9XlrP1",
  "Green - X-Large": "price_1RbYCnAp2D4XT14xJSHyuIOO",
  "Pink - Small": "price_1RbYCsAp2D4XT14x3DyI07Cz",
  "Pink - Medium": "price_1RbYCxAp2D4XT14xE721yRMs",
  "Pink - Large": "price_1RbYD1Ap2D4XT14xVdjACcDp",
  "Pink - X-Large": "price_1RbYD6Ap2D4XT14xyiw6HyhV",
  "Natural - Small": "price_1RbYDBAp2D4XT14xOokpUBGy",
  "Natural - Medium": "price_1RbYDGAp2D4XT14xbUIQgWW8",
  "Natural - Large": "price_1RbYDLAp2D4XT14xcDAeUAPM",
  "Natural - X-Large": "price_1RbYDQAp2D4XT14xZWaWplyE",
  "Yellow - Small": "price_1RbYDWAp2D4XT14xtfDA4KYz",
  "Yellow - Medium": "price_1RbYDcAp2D4XT14x8W6V2bOa",
  "Yellow - Large": "price_1RbYDfAp2D4XT14xIj8dIigl",
  "Yellow - X-Large": "price_1RbYDlAp2D4XT14xkQYUeisy"
};

// Freudian Tank price IDs
const freudianTankPriceIds = {
  "Black - Small": "price_1RhI2DAp2D4XT14x5IO7bbia",
  "Black - Medium": "price_1RhI2DAp2D4XT14xtNdoXmIk",
  "Black - Large": "price_1RhI2DAp2D4XT14xAzvQumRj",
  "Black - X-Large": "price_1RhI2DAp2D4XT14xzfjgGS5u"
};

// Cat Yoga price IDs
const catYogaPriceIds = {
  "Green - Small": "price_1Rh1fHAp2D4XT14xONNWIgmY",
  "Green - Medium": "price_1Rh1fHAp2D4XT14xaUwSSvfZ",
  "Green - Large": "price_1Rh1fHAp2D4XT14xemRpRpQc",
  "Green - X-Large": "price_1Rh1fIAp2D4XT14xiz0k3Iwr",
  "Pink - Small": "price_1Rh1fIAp2D4XT14xZ9NYSQRa",
  "Pink - Medium": "price_1Rh1fIAp2D4XT14xRwtKBcgu",
  "Pink - Large": "price_1Rh1fIAp2D4XT14xBxQ6XjjY",
  "Pink - X-Large": "price_1Rh1fIAp2D4XT14xpBEZZEWk",
  "Natural - Small": "price_1Rh1fJAp2D4XT14xJ12UFT9N",
  "Natural - Medium": "price_1Rh1fJAp2D4XT14x6FTXYFch",
  "Natural - Large": "price_1Rh1fJAp2D4XT14xvpsRan4X",
  "Natural - X-Large": "price_1Rh1fJAp2D4XT14xpthLSpQm",
  "Yellow - Small": "price_1Rh1fJAp2D4XT14xthKaHRtN",
  "Yellow - Medium": "price_1Rh1fKAp2D4XT14xpLh8yIYL",
  "Yellow - Large": "price_1Rh1fKAp2D4XT14xqJOgbsgf",
  "Yellow - X-Large": "price_1Rh1fKAp2D4XT14xj4Tg4KNx"
};

// Cats price IDs
const catsPriceIds = {
  "Green - Small": "price_1Rh1gHAp2D4XT14xfKI4Epb6",
  "Green - Medium": "price_1Rh1gIAp2D4XT14xQnvxTTQV",
  "Green - Large": "price_1Rh1gIAp2D4XT14xrIse9SjX",
  "Green - X-Large": "price_1Rh1gIAp2D4XT14x0steYjvi",

};

// Doge price IDs (single color)
const dogePriceIds = {
  "S": "price_1Rh25QAp2D4XT14xpb6xBZyP",
  "M": "price_1Rh25WAp2D4XT14xTZDXkBVh",
  "L": "price_1Rh25WAp2D4XT14xeo6dOVn0",
  "XL": "price_1Rh25XAp2D4XT14x1czMgrMx"
};

// Doge Moon price IDs (single color)
const dogeMoonPriceIds = {
  "S": "price_1Rh28yAp2D4XT14xEMeY5jFe",
  "M": "price_1Rh28yAp2D4XT14xWXDru9MI",
  "L": "price_1Rh28zAp2D4XT14xbJNmbsfa",
  "XL": "price_1Rh28zAp2D4XT14xxLG6OdQL"
};

// Tabby price IDs
const tabbyPriceIds = {
  "Olive - Small": "price_1RhCkQAp2D4XT14x4j7KVNz7",
  "Olive - Medium": "price_1RhCkRAp2D4XT14xtICsfhEd",
  "Olive - Large": "price_1RhCkRAp2D4XT14xPxn8Yhcp",
  "Olive - X-Large": "price_1RhCkRAp2D4XT14x2gVNHGKu",
  "Brown - Small": "price_1RhCkRAp2D4XT14xfs0cRknu",
  "Brown - Medium": "price_1RhCkSAp2D4XT14xubKGGtoD",
  "Brown - Large": "price_1RhCkSAp2D4XT14xwTaErx5H",
  "Brown - X-Large": "price_1RhCkSAp2D4XT14xXu8TRr1x",
  "Tan - Small": "price_1RhCkSAp2D4XT14xfScI5zyb",
  "Tan - Medium": "price_1RhCkTAp2D4XT14x2QzmO4HA",
  "Tan - Large": "price_1RhCkTAp2D4XT14xlXMvasmY",
  "Tan - X-Large": "price_1RhCkTAp2D4XT14x5WAkBirJ"
};

// Tanner price IDs (single color)
const tannerPriceIds = {
  "S": "price_1Rh28rAp2D4XT14xZ0elSLc6",
  "M": "price_1Rh28rAp2D4XT14xmzZq3CTH",
  "L": "price_1Rh28rAp2D4XT14xfbE4Ircu",
  "XL": "price_1Rh28sAp2D4XT14xtnzr1gy2"
};

// Tong price IDs (single color)
const tongPriceIds = {
  "S": "price_1Rh28kAp2D4XT14xBeJwSf2i",
  "M": "price_1Rh28kAp2D4XT14xYVl6Q46w",
  "L": "price_1Rh28kAp2D4XT14xaDxgI7Y0",
  "XL": "price_1Rh28kAp2D4XT14xpFVb969T"
};

// Gym Brat Cropped Shirt price IDs - Updated to $29.99
const gymBratCroppedShirtPriceIds = {
  "Black - Small": "price_1RiQjfAp2D4XT14xDnwmpMby",
  "Black - Medium": "price_1RiQjrAp2D4XT14xwuDPG4mR",
  "Black - Large": "price_1RiQk1Ap2D4XT14xvcN6qSd6",
  "Black - X-Large": "price_1RiQk1Ap2D4XT14xoCOpuAB2",
  "Ivory - Small": "price_1RiQk2Ap2D4XT14xgVPl6Kqs",
  "Ivory - Medium": "price_1RiQk2Ap2D4XT14xCciDiOam",
  "Ivory - Large": "price_1RiQk2Ap2D4XT14xtrnrQoVD",
  "Ivory - X-Large": "price_1RiQk2Ap2D4XT14xtV45PIFs"
};

// Halloween Ghosts T-Shirt price IDs ($29.99)
// Keys must follow the pattern "Color - Size" with sizes written out.
// Replace REPLACE_ME with real Stripe Price IDs after running the Stripe script.
const halloweenGhostsPriceIds = {
  "Orange - Small": "price_1S77jfAp2D4XT14xhHcBP8rl",
  "Orange - Medium": "price_1S77jfAp2D4XT14xHzQwrafu",
  "Orange - Large": "price_1S77jgAp2D4XT14xRdKzEf4s",
  "Orange - X-Large": "price_1S77jgAp2D4XT14x0ja1jFyf",
  "Brown - Small": "price_1S77jgAp2D4XT14xPFlONOUI",
  "Brown - Medium": "price_1S77jhAp2D4XT14xnjspsmUi",
  "Brown - Large": "price_1S77jhAp2D4XT14xK9zfkZ5e",
  "Brown - X-Large": "price_1S77jiAp2D4XT14xhFdTX9uY",
  "Gray - Small": "price_1S77jiAp2D4XT14xJKWcm9vO",
  "Gray - Medium": "price_1S77jjAp2D4XT14xQL7j3LRN",
  "Gray - Large": "price_1S77jjAp2D4XT14xr0petYUV",
  "Gray - X-Large": "price_1S77jkAp2D4XT14xdeueZIxW",
  "Green - Small": "price_1S77jkAp2D4XT14xi3JTHwlu",
  "Green - Medium": "price_1S77jlAp2D4XT14xSJEdAX2C",
  "Green - Large": "price_1S77jlAp2D4XT14xKb9MFzkI",
  "Green - X-Large": "price_1S77jmAp2D4XT14xsEKwFtCr",
};

// Cats + Pumpkins Crewneck price IDs ($34.99)
const catsPumpkinsCrewneckPriceIds = {
  "Gray - Small": "price_1S8a6RAp2D4XT14xRHNqUgd7",
  "Gray - Medium": "price_1S8a6RAp2D4XT14xERpQojSL",
  "Gray - Large": "price_1S8a6SAp2D4XT14x01B41xZX",
  "Gray - X-Large": "price_1S8a6TAp2D4XT14xw6zoqkTb",
  "Green - Small": "price_1S8a6UAp2D4XT14xHX7zdVtg",
  "Green - Medium": "price_1S8a6VAp2D4XT14x16clYA8a",
  "Green - Large": "price_1S8a6WAp2D4XT14xx4nuQtRf",
  "Green - X-Large": "price_1S8a6XAp2D4XT14x9PyzoB5X",
  "Orange - Small": "price_1S8a6YAp2D4XT14xImfumfXN",
  "Orange - Medium": "price_1S8a6ZAp2D4XT14xvrQHMiN4",
  "Orange - Large": "price_1S8a6aAp2D4XT14xTvR5yiX0",
  "Orange - X-Large": "price_1S8a6aAp2D4XT14xvVaRq6Xe",
  "White - Small": "price_1S8a6bAp2D4XT14xqCroNgh6",
  "White - Medium": "price_1S8a6cAp2D4XT14xHV4SuXoZ",
  "White - Large": "price_1S8a6dAp2D4XT14xuC6l7eu5",
  "White - X-Large": "price_1S8a6eAp2D4XT14xaqMzKSOH",
};

// Cats + Pumpkins T-Shirt price IDs ($29.99)
const catsPumpkinsTShirtPriceIds = {
  "Dark Gray - Small": "price_1S8a6fAp2D4XT14xAxQQwUfM",
  "Dark Gray - Medium": "price_1S8a6fAp2D4XT14xZJwwWbSG",
  "Dark Gray - Large": "price_1S8a6gAp2D4XT14xz3kAEblq",
  "Dark Gray - X-Large": "price_1S8a6iAp2D4XT14xzeVu3k1f",
  "Espresso - Small": "price_1S8a6iAp2D4XT14x68mr3Hy4",
  "Espresso - Medium": "price_1S8a6jAp2D4XT14xMCnXBx8V",
  "Espresso - Large": "price_1S8a6kAp2D4XT14xNNJa45Pa",
  "Espresso - X-Large": "price_1S8a6lAp2D4XT14xJNJiblC3",
  "Gray - Small": "price_1S8a6mAp2D4XT14xjbB5NWjh",
  "Gray - Medium": "price_1S8a6nAp2D4XT14xdLEsyVQb",
  "Gray - Large": "price_1S8a6oAp2D4XT14xFpH3NZwv",
  "Gray - X-Large": "price_1S8a6pAp2D4XT14xUoHhLiZW",
  "Green - Small": "price_1S8a6qAp2D4XT14xTRcqKYQw",
  "Green - Medium": "price_1S8a6qAp2D4XT14xjiJN2Vol",
  "Green - Large": "price_1S8a6rAp2D4XT14x0zIQxOha",
  "Green - X-Large": "price_1S8a6sAp2D4XT14xxz0I3Ktk",
  "White - Small": "price_1S8a6tAp2D4XT14x41wWWqY4",
  "White - Medium": "price_1S8a6uAp2D4XT14xqDgGi2y8",
  "White - Large": "price_1S8a6vAp2D4XT14xkzEo4ryu",
  "White - X-Large": "price_1S8a6vAp2D4XT14xQ61M1Nky",
};

// Too Cute To Quit (Cream only) price IDs ($29.99)
const tooCutePriceIds = {
  "Cream - Small": "price_1S7KSiAp2D4XT14xDvw61Z7Z",
  "Cream - Medium": "price_1S7KSjAp2D4XT14x5aUCe2Ka",
  "Cream - Large": "price_1S7KSjAp2D4XT14xv8ObT5YT",
  "Cream - X-Large": "price_1S7KSjAp2D4XT14xprbsxi2l",
};

// Keep Going T-Shirt price IDs ($29.99)
const keepGoingPriceIds = {
  "Brown - Small": "price_1S7KbeAp2D4XT14xyReCju9a",
  "Brown - Medium": "price_1S7KbfAp2D4XT14xF5CQEQ4t",
  "Brown - Large": "price_1S7KbfAp2D4XT14x3Qw4VA0L",
  "Brown - X-Large": "price_1S7KbgAp2D4XT14xTKOzbngX",
  "Gray - Small": "price_1S7KbgAp2D4XT14xSyNHqgGa",
  "Gray - Medium": "price_1S7KbgAp2D4XT14xKgFv0Efv",
  "Gray - Large": "price_1S7KbhAp2D4XT14x5AO3SxFy",
  "Gray - X-Large": "price_1S7KbhAp2D4XT14xenqmQDiJ",
  "Cream - Small": "price_1S7KbiAp2D4XT14x6aM2S8uL",
  "Cream - Medium": "price_1S7KbiAp2D4XT14xN6tJphWu",
  "Cream - Large": "price_1S7KbiAp2D4XT14x7kq6Po1I",
  "Cream - X-Large": "price_1S7KbjAp2D4XT14xFoKatOfC",
  "Green - Small": "price_1S7KbjAp2D4XT14x20bxwFpm",
  "Green - Medium": "price_1S7KbjAp2D4XT14xLNtMAB0S",
  "Green - Large": "price_1S7KbkAp2D4XT14xu5zmlwVW",
  "Green - X-Large": "price_1S7KbkAp2D4XT14x1ZTQXpkI",
};

// Hustle For The Muscle - Blue Print price IDs ($29.99)
const hustleBluePriceIds = {
  "Cream - Small": "price_1S7KsVAp2D4XT14xJMdPar4G",
  "Cream - Medium": "price_1S7KsVAp2D4XT14xbZTnPEff",
  "Cream - Large": "price_1S7KsWAp2D4XT14xiqgM9om0",
  "Cream - X-Large": "price_1S7KsWAp2D4XT14xqS9KdZ48",
  "Gray - Small": "price_1S7KsWAp2D4XT14xRIfgakzL",
  "Gray - Medium": "price_1S7KsXAp2D4XT14xrB9RAEMd",
  "Gray - Large": "price_1S7KsXAp2D4XT14xfB71zDWM",
  "Gray - X-Large": "price_1S7KsXAp2D4XT14xs7eEE7xe",
  "Green - Small": "price_1S7KsYAp2D4XT14xF1iD7bAF",
  "Green - Medium": "price_1S7KsYAp2D4XT14xomefaqkW",
  "Green - Large": "price_1S7KsZAp2D4XT14xwaq6edy2",
  "Green - X-Large": "price_1S7KsZAp2D4XT14xUgNhszue",
};

// Hustle For The Muscle - Orange Print price IDs ($29.99)
const hustleOrangePriceIds = {
  "Cream - Small": "price_1S7KspAp2D4XT14xsUW38vxc",
  "Cream - Medium": "price_1S7KspAp2D4XT14xSOtZgfVc",
  "Cream - Large": "price_1S7KspAp2D4XT14xnd1zKZwc",
  "Cream - X-Large": "price_1S7KsqAp2D4XT14xpIYNtEI0",
  "Espresso - Small": "price_1S7KsqAp2D4XT14xMqWH4Mr8",
  "Espresso - Medium": "price_1S7KsqAp2D4XT14xh9cx8mKF",
  "Espresso - Large": "price_1S7KsrAp2D4XT14xcd5dc6JK",
  "Espresso - X-Large": "price_1S7KsrAp2D4XT14xd9RhVHzQ",
  "Gray - Small": "price_1S7KsrAp2D4XT14xfryd75g9",
  "Gray - Medium": "price_1S7KssAp2D4XT14xeCDVfddT",
  "Gray - Large": "price_1S7KssAp2D4XT14xJiFvLIQN",
  "Gray - X-Large": "price_1S7KssAp2D4XT14xQUOO1Q0q",
  "Green - Small": "price_1S7KstAp2D4XT14xFVRlk282",
  "Green - Medium": "price_1S7KstAp2D4XT14xXEuGcV1N",
  "Green - Large": "price_1S7KstAp2D4XT14xS0CLfh8F",
  "Green - X-Large": "price_1S7KsuAp2D4XT14xvWvZGbT5",
};

// Hustle For The Muscle - Pink Print price IDs ($29.99)
const hustlePinkPriceIds = {
  "Black - Small": "price_1S7KtAAp2D4XT14xjyWWdIWw",
  "Black - Medium": "price_1S7KtAAp2D4XT14xAm9oTq2L",
  "Black - Large": "price_1S7KtAAp2D4XT14xPNpjofXt",
  "Black - X-Large": "price_1S7KtBAp2D4XT14x9bREZ9Aq",
  "Red - Small": "price_1S7KtBAp2D4XT14xKO3ECDTc",
  "Red - Medium": "price_1S7KtBAp2D4XT14xZ2tSCuWU",
  "Red - Large": "price_1S7KtCAp2D4XT14x25d2rtnm",
  "Red - X-Large": "price_1S7KtCAp2D4XT14xRnx0wcjO",
};

export const products: Product[] = [
  // Bags
  ...Array.from({ length: 11 }, (_, i) => ({
    id: `bag-${i + 1}`,
    name: bagNames[i],
    description: "A beautiful, handmade crochet bag. Perfect for carrying your essentials.",
    category: 'bags' as const,
    images: [{ src: `/bags/bags/${i + 1}.webp`, alt: bagNames[i] }],
    price: "$29.99",
    priceId: "price_1R88KsAp2D4XT14xnjBjFhmd",
    slug: `bag-${i + 1}`,
    disabled: disabledBags.includes(i + 1)
  })),
  
  // Shirts
  {
    id: 'halloween-ghosts',
    name: 'Halloween Ghosts T-Shirt',
    description: 'Spooky-season tee featuring three cute ghosties and some pumpkins.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/halloween_ghosts_front_orange.webp', alt: 'Halloween Ghosts T-Shirt - Orange Front' },
      { src: '/webpshirts/halloween_ghosts_folded_orange.webp', alt: 'Halloween Ghosts T-Shirt - Orange Folded' },
    ],
    colorImages: {
      'Orange': [
        { src: '/webpshirts/halloween_ghosts_front_orange.webp', alt: 'Halloween Ghosts T-Shirt - Orange Front' },
        { src: '/webpshirts/halloween_ghosts_folded_orange.webp', alt: 'Halloween Ghosts T-Shirt - Orange Folded' },
      ],
      'Brown': [
        { src: '/webpshirts/halloween_ghosts_front_brown.webp', alt: 'Halloween Ghosts T-Shirt - Brown Front' },
        { src: '/webpshirts/halloween_ghosts_folded_brown.webp', alt: 'Halloween Ghosts T-Shirt - Brown Folded' },
      ],
      'Gray': [
        { src: '/webpshirts/halloween_ghosts_front_gray.webp', alt: 'Halloween Ghosts T-Shirt - Gray Front' },
        { src: '/webpshirts/halloween_ghosts_folded_gray.webp', alt: 'Halloween Ghosts T-Shirt - Gray Folded' },
      ],
      'Green': [
        { src: '/webpshirts/halloween_ghosts_front_green.webp', alt: 'Halloween Ghosts T-Shirt - Green Front' },
        { src: '/webpshirts/halloween_ghosts_folded_green.webp', alt: 'Halloween Ghosts T-Shirt - Green Folded' },
      ],
    },
    price: '$29.99',
    priceIds: halloweenGhostsPriceIds,
    slug: 'halloween-ghosts',
    disabled: false,
  },
  {
    id: 'cats-pumpkins-t-shirt',
    name: 'Cats + Pumpkins T-Shirt',
    description: 'Cats + Pumpkins graphic tee.',
    category: 'shirts',
    images: [
      { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-front-white.webp', alt: 'Cats + Pumpkins T-Shirt - White Front' },
      { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-folded-white.webp', alt: 'Cats + Pumpkins T-Shirt - White Folded' },
    ],
    colorImages: {
      'White': [
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-front-white.webp', alt: 'Cats + Pumpkins T-Shirt - White Front' },
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-folded-white.webp', alt: 'Cats + Pumpkins T-Shirt - White Folded' },
      ],
      'Dark Gray': [
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-front-dark-gray.webp', alt: 'Cats + Pumpkins T-Shirt - Dark Gray Front' },
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-folded-dark-gray.webp', alt: 'Cats + Pumpkins T-Shirt - Dark Gray Folded' },
      ],
      'Espresso': [
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-front-espresso.webp', alt: 'Cats + Pumpkins T-Shirt - Espresso Front' },
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-folded-espresso.webp', alt: 'Cats + Pumpkins T-Shirt - Espresso Folded' },
      ],
      'Gray': [
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-front-gray.webp', alt: 'Cats + Pumpkins T-Shirt - Gray Front' },
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-folded-gray.webp', alt: 'Cats + Pumpkins T-Shirt - Gray Folded' },
      ],
      'Green': [
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-front-green.webp', alt: 'Cats + Pumpkins T-Shirt - Green Front' },
        { src: '/halloween/cats-pumpkins-t-shirts/cats-pumpkins-folded-green.webp', alt: 'Cats + Pumpkins T-Shirt - Green Folded' },
      ],
    },
    price: '$29.99',
    priceIds: catsPumpkinsTShirtPriceIds,
    slug: 'cats-pumpkins-t-shirt',
  },
  {
    id: 'cats-pumpkins-crewneck',
    name: 'Cats + Pumpkins Crewneck',
    description: 'Cats + Pumpkins cozy crewneck in Gray, Green, Orange, and White. Sizes Small–X-Large.',
    category: 'shirts',
    images: [
      { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-front-green.webp', alt: 'Cats + Pumpkins Crewneck - Green Front' },
      { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-folded-green.webp', alt: 'Cats + Pumpkins Crewneck - Green Folded' },
    ],
    colorImages: {
      'Green': [
        { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-front-green.webp', alt: 'Cats + Pumpkins Crewneck - Green Front' },
        { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-folded-green.webp', alt: 'Cats + Pumpkins Crewneck - Green Folded' },
      ],
      'Gray': [
        { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-front-gray.webp', alt: 'Cats + Pumpkins Crewneck - Gray Front' },
        { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-folded-gray.webp', alt: 'Cats + Pumpkins Crewneck - Gray Folded' },
      ],
      'Orange': [
        { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-front-orange.webp', alt: 'Cats + Pumpkins Crewneck - Orange Front' },
        { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-folded-orange.webp', alt: 'Cats + Pumpkins Crewneck - Orange Folded' },
      ],
      'White': [
        { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-front-white.webp', alt: 'Cats + Pumpkins Crewneck - White Front' },
        { src: '/halloween/cats-pumpkins-crewnecks/cats-pumpkins-folded-white.webp', alt: 'Cats + Pumpkins Crewneck - White Folded' },
      ],
    },
    price: '$34.99',
    priceIds: catsPumpkinsCrewneckPriceIds,
    slug: 'cats-pumpkins-crewneck',
  },
  {
    id: 'too-cute-to-quit',
    name: 'Too Cute To Quit T-Shirt',
    description: 'Gym Brat tee – Too Cute To Quit.',
    category: 'shirts',
    images: [
      { src: '/gym-brat-t-shirt/too cute to quit/too_cute_back_cream.webp', alt: 'Too Cute To Quit - Cream Back' },
      { src: '/gym-brat-t-shirt/too cute to quit/too_cute_front_cream.webp', alt: 'Too Cute To Quit - Cream Front' },
      { src: '/gym-brat-t-shirt/too cute to quit/too_cute_folded_cream.webp', alt: 'Too Cute To Quit - Cream Folded' },
    ],
    colorImages: {
      'Cream': [
        { src: '/gym-brat-t-shirt/too cute to quit/too_cute_front_cream.webp', alt: 'Too Cute To Quit - Cream Front' },
        { src: '/gym-brat-t-shirt/too cute to quit/too_cute_back_cream.webp', alt: 'Too Cute To Quit - Cream Back' },
        { src: '/gym-brat-t-shirt/too cute to quit/too_cute_folded_cream.webp', alt: 'Too Cute To Quit - Cream Folded' },
      ],
    },
    price: '$29.99',
    priceIds: tooCutePriceIds,
    slug: 'too-cute-to-quit',
  },
  {
    id: 'keep-going',
    name: 'Keep Going T-Shirt',
    description: 'Gym Brat tee – Keep Going. Brown, Gray, Cream, and Green. Sizes Small–X-Large.',
    category: 'shirts',
    images: [
      { src: '/gym-brat-t-shirt/Keep Going/keep_going_back_gray.webp', alt: 'Keep Going - Gray Back' },
      { src: '/gym-brat-t-shirt/Keep Going/keep_going_front_gray.webp', alt: 'Keep Going - Gray Front' },
      { src: '/gym-brat-t-shirt/Keep Going/keep_going_folded_gray.webp', alt: 'Keep Going - Gray Folded' },
    ],
    colorImages: {
      'Gray': [
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_front_gray.webp', alt: 'Keep Going - Gray Front' },
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_back_gray.webp', alt: 'Keep Going - Gray Back' },
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_folded_gray.webp', alt: 'Keep Going - Gray Folded' },
      ],
      'Green': [
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_front_green.webp', alt: 'Keep Going - Green Front' },
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_back_green.webp', alt: 'Keep Going - Green Back' },
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_folded_green.webp', alt: 'Keep Going - Green Folded' },
      ],
      'Brown': [
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_front_brown.webp', alt: 'Keep Going - Brown Front' },
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_back_brown.webp', alt: 'Keep Going - Brown Back' },
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_folded_brown.webp', alt: 'Keep Going - Brown Folded' },
      ],
      'Cream': [
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_front_cream.webp', alt: 'Keep Going - Cream Front' },
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_back_cream.webp', alt: 'Keep Going - Cream Back' },
        { src: '/gym-brat-t-shirt/Keep Going/keep_going_folded_cream.webp', alt: 'Keep Going - Cream Folded' },
      ],
    },
    price: '$29.99',
    priceIds: keepGoingPriceIds,
    slug: 'keep-going'
  },
  {
    id: 'hustle-blue-print',
    name: 'Hustle For The Muscle (Blue Print) T-Shirt',
    description: 'Gym Brat tee – Hustle For The Muscle with Blue print. Cream, Gray, and Green. Sizes Small–X-Large.',
    category: 'shirts',
    images: [
      { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_back_cream.webp', alt: 'Hustle (Blue Print) - Cream Back' },
      { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_front_cream.webp', alt: 'Hustle (Blue Print) - Cream Front' },
      { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_folded_cream.webp', alt: 'Hustle (Blue Print) - Cream Folded' },
    ],
    colorImages: {
      'Cream': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_front_cream.webp', alt: 'Hustle (Blue Print) - Cream Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_back_cream.webp', alt: 'Hustle (Blue Print) - Cream Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_folded_cream.webp', alt: 'Hustle (Blue Print) - Cream Folded' },
      ],
      'Gray': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_front_gray.webp', alt: 'Hustle (Blue Print) - Gray Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_back_gray.webp', alt: 'Hustle (Blue Print) - Gray Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_folded_gray.webp', alt: 'Hustle (Blue Print) - Gray Folded' },
      ],
      'Green': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_front_green.webp', alt: 'Hustle (Blue Print) - Green Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_back_green.webp', alt: 'Hustle (Blue Print) - Green Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (BLUE)/hustle_folded_green.webp', alt: 'Hustle (Blue Print) - Green Folded' },
      ],
    },
    price: '$29.99',
    priceIds: hustleBluePriceIds,
    slug: 'hustle-blue-print'
  },
  {
    id: 'hustle-orange-print',
    name: 'Hustle For The Muscle (Orange Print) T-Shirt',
    description: 'Gym Brat tee – Hustle For The Muscle with Orange print. Cream, Espresso, Gray, and Green. Sizes Small–X-Large.',
    category: 'shirts',
    images: [
      { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_back_cream.webp', alt: 'Hustle (Orange Print) - Cream Back' },
      { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_front_cream.webp', alt: 'Hustle (Orange Print) - Cream Front' },
      { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_folded_cream.webp', alt: 'Hustle (Orange Print) - Cream Folded' },
    ],
    colorImages: {
      'Cream': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_front_cream.webp', alt: 'Hustle (Orange Print) - Cream Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_back_cream.webp', alt: 'Hustle (Orange Print) - Cream Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_folded_cream.webp', alt: 'Hustle (Orange Print) - Cream Folded' },
      ],
      'Espresso': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_front_espresso.webp', alt: 'Hustle (Orange Print) - Espresso Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_back_espresso.webp', alt: 'Hustle (Orange Print) - Espresso Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_folded_espresso.webp', alt: 'Hustle (Orange Print) - Espresso Folded' },
      ],
      'Gray': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_front_gray.webp', alt: 'Hustle (Orange Print) - Gray Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_back_gray.webp', alt: 'Hustle (Orange Print) - Gray Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_folded_gray.webp', alt: 'Hustle (Orange Print) - Gray Folded' },
      ],
      'Green': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_front_green.webp', alt: 'Hustle (Orange Print) - Green Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_back_green.webp', alt: 'Hustle (Orange Print) - Green Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (Orange)/hustle_folded_green.webp', alt: 'Hustle (Orange Print) - Green Folded' },
      ],
    },
    price: '$29.99',
    priceIds: hustleOrangePriceIds,
    slug: 'hustle-orange-print'
  },
  {
    id: 'hustle-pink-print',
    name: 'Hustle For The Muscle (Pink Print) T-Shirt',
    description: 'Gym Brat tee – Hustle For The Muscle with Pink print. Black and Red. Sizes Small–X-Large.',
    category: 'shirts',
    images: [
      { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_back_black.webp', alt: 'Hustle (Pink Print) - Black Back' },
      { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_front_black.webp', alt: 'Hustle (Pink Print) - Black Front' },
      { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_black_folded.webp', alt: 'Hustle (Pink Print) - Black Folded' },
    ],
    colorImages: {
      'Black': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_front_black.webp', alt: 'Hustle (Pink Print) - Black Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_back_black.webp', alt: 'Hustle (Pink Print) - Black Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_black_folded.webp', alt: 'Hustle (Pink Print) - Black Folded' },
      ],
      'Red': [
        { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_front_red.webp', alt: 'Hustle (Pink Print) - Red Front' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_back_red.webp', alt: 'Hustle (Pink Print) - Red Back' },
        { src: '/gym-brat-t-shirt/hustle for the muscle (pink)/hustle_folded_red.webp', alt: 'Hustle (Pink Print) - Red Folded' },
      ],
    },
    price: '$29.99',
    priceIds: hustlePinkPriceIds,
    slug: 'hustle-pink-print'
  },
  {
    id: 'gym-brat-cropped-shirt',
    name: 'Gym Brat Cropped Shirt',
    description: 'Show off your fitness lifestyle with this stylish cropped shirt. Perfect for the gym or casual wear. Available in black and ivory.',
    category: 'shirts',
    images: [
      { src: '/gym-brat-croptop/brat_crop_front_ivory.webp', alt: 'Gym Brat Cropped Shirt - Black Front' },
      { src: '/gym-brat-croptop/brat_crop_back_ivory.webp', alt: 'Gym Brat Cropped Shirt - Black Back' }
    ],
    colorImages: {
      'Ivory': [
        { src: '/gym-brat-croptop/brat_crop_front_ivory.webp', alt: 'Gym Brat Cropped Shirt - Ivory Front' },
        { src: '/gym-brat-croptop/brat_crop_back_ivory.webp', alt: 'Gym Brat Cropped Shirt - Ivory Back' },
      ],
      'Black': [
        { src: '/gym-brat-croptop/brat_crop_front_black.webp', alt: 'Gym Brat Cropped Shirt - Black Front' },
        { src: '/gym-brat-croptop/brat_crop_back_black.webp', alt: 'Gym Brat Cropped Shirt - Black Back' },
      ]
    },
    price: '$29.99',
    priceIds: gymBratCroppedShirtPriceIds,
    sizes: Object.keys(gymBratCroppedShirtPriceIds),
    slug: 'gym-brat-cropped-shirt'
  },
  {
    id: 'corgi-yoga',
    name: 'Corgi Yoga T-Shirt',
    description: 'Comfortable and stylish t-shirt featuring our adorable Corgi Yoga design.',
    category: 'shirts',
    images: [
      { src: '/yoga/corgi1.jpg', alt: 'Corgi Yoga T-Shirt view 1' },
      { src: '/yoga/corgi2.jpg', alt: 'Corgi Yoga T-Shirt view 2' },
      { src: '/yoga/corgi3.jpg', alt: 'Corgi Yoga T-Shirt view 3' }
    ],
    price: '$19.99',
    priceIds: yogaShirtPriceIds.corgi,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'corgi-yoga'
  },
  {
    id: 'golden-yoga',
    name: 'Golden Yoga T-Shirt',
    description: 'Comfortable and stylish t-shirt featuring our adorable Golden Retriever Yoga design.',
    category: 'shirts',
    images: [
      { src: '/yoga/golden1.jpg', alt: 'Golden Yoga T-Shirt view 1' },
      { src: '/yoga/golden2.jpg', alt: 'Golden Yoga T-Shirt view 2' },
      { src: '/yoga/golden3.jpg', alt: 'Golden Yoga T-Shirt view 3' }
    ],
    price: '$19.99',
    priceIds: yogaShirtPriceIds.golden,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'golden-yoga'
  },
  {
    id: 'great-dane-yoga',
    name: 'Great Dane Yoga T-Shirt',
    description: 'Comfortable and stylish t-shirt featuring our adorable Great Dane Yoga design.',
    category: 'shirts',
    images: [
      { src: '/yoga/dane1.jpg', alt: 'Great Dane Yoga T-Shirt view 1' },
      { src: '/yoga/dane2.jpg', alt: 'Great Dane Yoga T-Shirt view 2' },
      { src: '/yoga/dane3.jpg', alt: 'Great Dane Yoga T-Shirt view 3' }
    ],
    price: '$19.99',
    priceIds: yogaShirtPriceIds.greatDane,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'great-dane-yoga'
  },
  {
    id: 'husky-yoga',
    name: 'Husky Yoga T-Shirt',
    description: 'Comfortable and stylish t-shirt featuring our adorable Husky Yoga design.',
    category: 'shirts',
    images: [
      { src: '/yoga/husky1.jpg', alt: 'Husky Yoga T-Shirt view 1' },
      { src: '/yoga/husky2.jpg', alt: 'Husky Yoga T-Shirt view 2' },
      { src: '/yoga/husky3.jpg', alt: 'Husky Yoga T-Shirt view 3' }
    ],
    price: '$19.99',
    priceIds: yogaShirtPriceIds.husky,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'husky-yoga'
  },
  {
    id: 'cool-aunts-club',
    name: 'Cool Aunts Club T-Shirt',
    description: 'Show your aunt pride with this stylish and comfortable t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/aunts_club_front_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Front' },
      { src: '/webpshirts/aunts_club_back_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Back' },
      { src: '/webpshirts/aunts_club_folded_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Folded' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/aunts_club_front_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Front' },
        { src: '/webpshirts/aunts_club_back_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Back' },
        { src: '/webpshirts/aunts_club_folded_green.webp', alt: 'Cool Aunts Club T-Shirt - Green Folded' }
      ],
      'Pink': [
        { src: '/webpshirts/aunts_club_front_pink.webp', alt: 'Cool Aunts Club T-Shirt - Pink Front' },
        { src: '/webpshirts/aunts_club_back_pink.webp', alt: 'Cool Aunts Club T-Shirt - Pink Back' },
        { src: '/webpshirts/aunts_club_folded_pink.webp', alt: 'Cool Aunts Club T-Shirt - Pink Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/aunts_club_front_natural.webp', alt: 'Cool Aunts Club T-Shirt - Natural Front' },
        { src: '/webpshirts/aunts_club_back_natural.webp', alt: 'Cool Aunts Club T-Shirt - Natural Back' },
        { src: '/webpshirts/aunts_club_folded_natural.webp', alt: 'Cool Aunts Club T-Shirt - Natural Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/aunts_club_front_yellow.webp', alt: 'Cool Aunts Club T-Shirt - Yellow Front' },
        { src: '/webpshirts/aunts_club_back_yellow.webp', alt: 'Cool Aunts Club T-Shirt - Yellow Back' },
        { src: '/webpshirts/aunts_club_folded_yellow.webp', alt: 'Cool Aunts Club T-Shirt - Yellow Folded' }
      ]
    },
    price: '$29.99',
    priceIds: coolAuntsClubPriceIds,
    sizes: Object.keys(coolAuntsClubPriceIds),
    slug: 'cool-aunts-club'
  },
  {
    id: 'what-the',
    name: 'What The T-Shirt',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
        { src: '/webpshirts/what_the_front_natural.webp', alt: 'What The T-Shirt - Natural Front' },
        { src: '/webpshirts/what_the_hanging_natural.webp', alt: 'What The T-Shirt - Natural Hanging' },
    ],
    colorImages: {
      /*
      'Green': [
        { src: '/webpshirts/what_the_front_green.webp', alt: 'What The T-Shirt - Green Front' },
        { src: '/webpshirts/what_the_back_green.webp', alt: 'What The T-Shirt - Green Back' },
        { src: '/webpshirts/what_the_folded_green.webp', alt: 'What The T-Shirt - Green Folded' }
      ],
      'Pink': [
        { src: '/webpshirts/what_the_front_pink.webp', alt: 'What The T-Shirt - Pink Front' },
        { src: '/webpshirts/what_the_back_pink.webp', alt: 'What The T-Shirt - Pink Back' },
        { src: '/webpshirts/what_the_folded_pink.webp', alt: 'What The T-Shirt - Pink Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/what_the_front_yellow.webp', alt: 'What The T-Shirt - Yellow Front' },
        { src: '/webpshirts/what_the_back_yellow.webp', alt: 'What The T-Shirt - Yellow Back' },
        { src: '/webpshirts/what_the_folded_yellow.webp', alt: 'What The T-Shirt - Yellow Folded' }
      ],*/
      'Natural': [
        { src: '/webpshirts/what_the_front_natural.webp', alt: 'What The T-Shirt - Natural Front' },
        { src: '/webpshirts/what_the_hanging_natural.webp', alt: 'What The T-Shirt - Natural Hanging' },
      ],
    },
    price: '$29.99',
    priceIds: whatTheTShirtPriceIds,
    sizes: Object.keys(whatTheTShirtPriceIds),
    slug: 'what-the'
  },
  {
    id: 'freudian-tank',
    name: 'Freudian Tank',
    description: 'Show your V.G. x Freudian French support with this tank top. Available in black.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/swole_tank_front.webp', alt: 'Freudian Tank - Black Front' },
      { src: '/webpshirts/swole_tank_back.webp', alt: 'Freudian Tank - Black Back' }
    ],
    colorImages: {
      'Black': [
        { src: '/webpshirts/swole_tank_front.webp', alt: 'Freudian Tank - Black Front' },
        { src: '/webpshirts/swole_tank_back.webp', alt: 'Freudian Tank - Black Back' }
      ]
    },
    price: '$29.99',
    priceIds: freudianTankPriceIds,
    sizes: Object.keys(freudianTankPriceIds),
    slug: 'freudian-tank'
  },
  {
    id: 'cat-yoga',
    name: 'Cat Yoga',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/cat_yoga_front_green.webp', alt: 'Cat Yoga - Green Front' },
      { src: '/webpshirts/cat_yoga_folded.webp', alt: 'Cat Yoga - Folded' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/cat_yoga_front_green.webp', alt: 'Cat Yoga - Green Front' },
        { src: '/webpshirts/cat_yoga_folded.webp', alt: 'Cat Yoga - Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/cat_yoga_front.webp', alt: 'Cat Yoga - Front' },
      ],
    },
    price: '$29.99',
    priceIds: catYogaPriceIds,
    sizes: Object.keys(catYogaPriceIds),
    slug: 'cat-yoga'
  },
  {
    id: 'cats',
    name: 'Cats',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
      { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
    ],
    colorImages: {
      'Green': [
        { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
        { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
      ],
      /*
      'Pink': [
        { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
        { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
      ],
      'Natural': [
        { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
        { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
      ],
      'Yellow': [
        { src: '/webpshirts/cats_front.webp', alt: 'Cats - Front' },
        { src: '/webpshirts/cats_folded.webp', alt: 'Cats - Folded' }
      ]
    */
    },
    price: '$29.99',
    priceIds: catsPriceIds,
    sizes: Object.keys(catsPriceIds),
    slug: 'cats'
  },
  {
    id: 'doge',
    name: 'Doge',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/doge_front.webp', alt: 'Doge - Front' },
      { src: '/webpshirts/doge_folded.webp', alt: 'Doge - Folded' }
    ],
    price: '$29.99',
    priceIds: dogePriceIds,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'doge'
  },
  {
    id: 'doge-moon',
    name: 'Doge Moon',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/dogemoon_front.webp', alt: 'Doge Moon - Front' }
    ],
    price: '$29.99',
    priceIds: dogeMoonPriceIds,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'doge-moon'
  },
  {
    id: 'tabby',
    name: 'Tabby',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt. Available in multiple colors and sizes.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/tabby_front_brown.webp', alt: 'Tabby - Brown Front' },
      { src: '/webpshirts/tabby_folded.webp', alt: 'Tabby - Folded' }
    ],
    colorImages: {
      'Olive': [
        { src: '/webpshirts/tabby_front_olive.webp', alt: 'Tabby - Olive Front' },
        { src: '/webpshirts/tabby_folded.webp', alt: 'Tabby - Olive Folded' }
      ],
      'Brown': [
        { src: '/webpshirts/tabby_front_brown.webp', alt: 'Tabby - Brown Front' },
        { src: '/webpshirts/tabby_folded_brown.webp', alt: 'Tabby - Brown Folded' }
      ],
      'Tan': [
        { src: '/webpshirts/tabby_front_grey.webp', alt: 'Tabby - Grey Front' },
        { src: '/webpshirts/tabby_folded_grey.webp', alt: 'Tabby - Grey Folded' }
      ]
    },
    price: '$29.99',
    priceIds: tabbyPriceIds,
    sizes: Object.keys(tabbyPriceIds),
    slug: 'tabby'
  },
  {
    id: 'tanner',
    name: 'Tanner',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/tanner_front_black.webp', alt: 'Tanner - Black Front' }
    ],
    price: '$29.99',
    priceIds: tannerPriceIds,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'tanner'
  },
  {
    id: 'tong',
    name: 'Tong',
    description: 'Show your unique style with this comfortable and eye-catching t-shirt.',
    category: 'shirts',
    images: [
      { src: '/webpshirts/tong_front.webp', alt: 'Tong - Front' }
    ],
    price: '$29.99',
    priceIds: tongPriceIds,
    sizes: ['S', 'M', 'L', 'XL'],
    slug: 'tong'
  },
  
  // Bandana
  {
    id: 'chewbarka-bandana',
    name: 'Chewbarka Bandana',
    description: 'The perfect accessory for your furry friend. Stylish and comfortable pet bandana.',
    category: 'accessories',
    images: [
      { src: '/chewbarka/item.webp', alt: 'Chewbarka Bandana' },
      { src: '/chewbarka/dog.webp', alt: 'Dog wearing Chewbarka Bandana' }
    ],
    price: '$22.99',
    priceId: 'price_1Rh2HtAp2D4XT14x51zjcjnJ',
    slug: 'chewbarka-bandana'
  },
  {
    id: 'halloween-bandana',
    name: 'Halloween Bandana',
    description: 'Spooky and stylish bandana for pets. Perfect for Halloween festivities.',
    category: 'accessories',
    images: [
      { src: '/halloween-bandana/halloween-bandana-1.webp', alt: 'Halloween Bandana' },
      { src: '/halloween-bandana/hero.webp', alt: 'Halloween Bandana Hero' }
    ],
    price: '$22.99',
    priceIds: {
      'S': 'price_1SB8EJAp2D4XT14x6JtGCCto',
      'M': 'price_1SB8EJAp2D4XT14xo5itB9xE',
      'LG': 'price_1SB8EKAp2D4XT14xsG5wWE9j'
    },
    sizes: ['S', 'M', 'LG'],
    slug: 'halloween-bandana'
  },
  {
    id: 'halloween-bow-tie',
    name: 'Halloween Bow Tie',
    description: 'Elegant bow tie for pets with a Halloween twist.',
    category: 'accessories',
    images: [
      { src: '/halloween-bandana/hero.webp', alt: 'Halloween Bow Tie' }
    ],
    price: '$22.99',
    priceIds: {
      'S': 'price_1SB8EKAp2D4XT14xAnvilhT9',
      'M': 'price_1SB8ELAp2D4XT14x7RWgGzke',
      'LG': 'price_1SB8ELAp2D4XT14xkSQgYKfM'
    },
    sizes: ['S', 'M', 'LG'],
    slug: 'halloween-bow-tie'
  },
  // Gym Brat Collection
  {
    id: 'gym-brat-hat',
    name: 'Gym Brat Hat',
    description: 'Complete your gym look with this stylish Gym Brat hat. Premium quality, comfortable fit, available in tan.',
    category: 'hats',
    images: [
      { src: '/gym-brat-hat/brat_hat_product.webp', alt: 'Gym Brat Hat - Tan Front' },
      { src: '/gym-brat-hat/brat_hat_model.webp', alt: 'Gym Brat Hat - Tan Side' }
    ],
    price: '$29.99',
    priceId: 'price_1RiQjZAp2D4XT14xjGlRDVfe',
    slug: 'gym-brat-hat'
  },
];
