import { fish as allFish } from "./fish.js";

// 25 fish total:
// 1x super hard
// 3x hard
// 9x medium
// 12x easy

const allPossibleFish = [];
for (const { fish } of allFish) {
    if (fish.climate === "Barren") continue;
    if (fish.elusive && (fish.rarity === "MYTHIC" || fish.rarity === "LEGENDARY")) continue;

    for (const weight of ["average", "large", "massive", "gargantuan"]) {
        if (fish.elusive && weight === "gargantuan") continue;

        allPossibleFish.push({
            name: fish.name,
            rarity: fish.rarity,
            climate: fish.climate,
            elusive: fish.elusive,
            weight: weight,
            price: fish[`${weight}Price`]
        });
    }
}

const easy = allPossibleFish.filter(f => f.price > 0 && f.price < 1000);
const medium = allPossibleFish.filter(f => f.price >= 1000 && f.price < 10000);
const hard = allPossibleFish.filter(f => f.price >= 10000 && f.price < 50000);
const superHard = allPossibleFish.filter(f => f.price >= 50000);

// select 1 super hard fish, 3 hard fish, 9 medium fish, and 12 easy fish
let board = [];
let average = 7500;
while (average >= 7500) {
    const selectedFish = [
        superHard[Math.floor(Math.random() * superHard.length)],
        ...hard.sort(() => 0.5 - Math.random()).slice(0, 3),
        ...medium.sort(() => 0.5 - Math.random()).slice(0, 9),
        ...easy.sort(() => 0.5 - Math.random()).slice(0, 12),
    ];
    board = selectedFish.map(f => `${f.rarity} ${f.name}: ${f.weight}${f.elusive ? " (elusive)" : ""} (${f.climate}, $${f.price})`);
    average = selectedFish.reduce((sum, f) => sum + f.price, 0) / selectedFish.length;
}
console.log(board, "Average Price: " + average);