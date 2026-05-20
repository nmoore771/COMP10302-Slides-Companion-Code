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

export async function addGame(context) {
    try {
        // step 1: Data Validation
        if ( !context.newGame.name || !context.newGame.genre || !context.newGame.platform) {
            throw new Error("Incomplete data!");
        }

        // step 2: read existing data
        const raw = await fs.readFile('data/video-games.json')
        const data = JSON.parse(raw);
        // step 3: construct new element and append
        context.newGame.upvotes = 0;
        data.push(context.newGame);
        // step 4: write updated data back to file
        await fs.writeFile('data/video-games.json', JSON.stringify(data));
    } catch (err) {
        context.error = err;
    }
}

export async function safer_addGame(context) {
    try {
        // step 1: Data Validation
        if ( !context.newGame.name || !context.newGame.genre || !context.newGame.platform) {
            throw new Error("Incomplete data!");
        }

        // step 2: read existing data
        const raw = await fs.readFile('data/video-games.json')
        const data = JSON.parse(raw);
        // step 3: construct new element and append
        const newGame = {
            name : context.newGame.name,
            genre : context.newGame.genre,
            platform : context.newGame.platform,
            upvotes : 0
        }
        data.push(newGame);
        // step 4: write updated data back to file
        await fs.writeFile('data/video-games.json', JSON.stringify(data));
    } catch (err) {
        context.error = err;
    }
}

export async function upvote(context, id) {
    try {
        const raw = await fs.readFile('data/video-games.json')
        const data = JSON.parse(raw);
        if (id < 0 || id >= data.length) {
            throw new Error("Error! Game not found!");
        }
        data[id].upvotes ++;
        await fs.writeFile('data/video-games.json', JSON.stringify(data));
    } catch (err) {
        console.log("error! " + err);
        context.error = err;
    }
}




