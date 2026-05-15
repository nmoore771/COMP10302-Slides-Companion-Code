import fs from "fs/promises";

export async function getGames(context) {
    try {
        const raw = await fs.readFile('data/video-games.json');
        const data = JSON.parse(raw);
        context.games = data;
    } catch (err) {
        context.error = err;
    }
}

export async function addGame(context, name, genre, platform) {
    try {
        // step 1: read existing data
        const raw = await fs.readFile('data/video-games.json')
        const data = JSON.parse(raw);
        // step 2: construct new element and append
        let newGame =
            { "name" : name
            , "genre" : genre
            , "platform" : platform
            , "upvotes" : 0
            };
        data.push(newGame);
        // step 3: write updated data back to file
        await fs.writeFile('data/video-games.json', data);
    } catch (err) {
        context.error = err;
    }
}

export async function upvote(context, id) {
    try {
        // step 1: read existing data
        const raw = await fs.readFile('data/video-games.json')
        const data = JSON.parse(raw);

        // throw an error if the id is outside the available indexes.
        if (id < 0 || id >= data.length) {
            throw new Error("Error! Game not found!");
        }
        // step 2:
        data[i].upvotes ++;
        // step 3: write updated data back to file
        await fs.writeFile('data/video-games.json', data);
    } catch (err) {
        context.error = err;
    }
}

export async function deleteGame(context, name) {
    try {
        // step 1: read existing data
        const raw = await fs.readFile('data/video-games.json')
        let data = JSON.parse(raw);
        // step 2: search data for game
        // throw an error if the id is outside the available indexes.
        if (id < 0 || id >= data.length) {
            throw new Error("Error! Game not found!");
        }
        // step 2: (this is how you delete one entry in JS)
        data = data.splice(i, 1);
        // step 3: write updated data back to file
        await fs.writeFile('data/video-games.json', data);
    } catch (err) {
        context.error = err;
    }
}