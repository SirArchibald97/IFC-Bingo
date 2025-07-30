import { fish as allFish } from "./fish.js";

// 25 fish total:
// 1x super hard (100,000+)
// 3x hard (50,000+)
// 9x medium (2,000+)
// 12x easy (0+)

const allPossibleFish = [];
for (const { fish } of allFish) {
    for (const weight of ["average", "large", "massive", "gargantuan"]) {
        allPossibleFish.push({
            name: fish.name,
            rarity: fish.rarity,
            collection: fish.collection,
            elusive: fish.elusive,
            weight: weight,
            price: fish[`${weight}Price`] || 0,
        });
    }
}

const easy = allPossibleFish.filter(f => f.price > 0 && f.price < 1000);
const medium = allPossibleFish.filter(f => f.price >= 1000 && f.price < 15000);
const hard = allPossibleFish.filter(f => f.price >= 15000 && f.price < 50000);
const superHard = allPossibleFish.filter(f => f.price >= 50000 && f.price < 100000);

// select 1 super hard fish, 3 hard fish, 9 medium fish, and 12 easy fish
const selectedFish = [
    superHard[Math.floor(Math.random() * superHard.length)],
    ...hard.sort(() => 0.5 - Math.random()).slice(0, 3),
    ...medium.sort(() => 0.5 - Math.random()).slice(0, 9),
    ...easy.sort(() => 0.5 - Math.random()).slice(0, 12),
];
const bingoBoard = selectedFish.map(f => `${f.rarity} ${f.name}: ${f.weight}${f.elusive ? " (elusive)" : ""} (${f.price})`);
console.log(bingoBoard, "Average Price: " + (selectedFish.reduce((sum, f) => sum + f.price, 0) / selectedFish.length).toFixed(2));