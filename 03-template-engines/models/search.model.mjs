import fs from "fs/promises";

export async function searchPlanet( name, TPL ) {
    try {
        const raw = await fs.readFile('data/solar-system.json');
        const data = JSON.parse(raw);
        for (let i = 0; i < data.solarSystem.planets.length; i++ ) {
            let planet = data.solarSystem.planets[i];
            if (planet.name === name) {
                TPL.planet = planet;
                TPL.found = true;
                break;
            }
        }
    } catch (err) {
        TPL.error = err;
    }
}