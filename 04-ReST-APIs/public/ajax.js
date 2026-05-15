function getData () {
    fetch('games', {method : 'get'})
        .then(resp => resp.json())
        .then( data => {
            console.log(data);
            const tbody = document.querySelector("#data-output");
            // delete old contents
            tbody.innerHTML = "";

            // add new contents
            for (let j = 0; j < data.games.length; j++) {
                let game = data.games[j];
                console.log(game);
                const tr = document.createElement("tr");
                const tds = [];
                for (let i = 0; i < 6; i++) {
                    tds.push(document.createElement("td"));
                }
                tds[0].textContent = game.name;
                tds[1].textContent = game.genre;
                tds[2].textContent = game.platform;
                tds[3].textContent = game.upvotes;
                up_button = document.createElement("button");
                up_button.textContent = "Upvote!";
                up_button.addEventListener("click", () => upvote(j));
                tds[4].appendChild(up_button);
                del_button = document.createElement("button");
                del_button.textContent = "Upvote!";
                del_button.addEventListener("click", () => upvote(j));
                tds[5].appendChild(del_button);
                for (let i = 0; i < tds.length; i++) {
                    tr.appendChild(tds[i]);
                }
                tbody.appendChild(tr);
            }
        });
}

function upvote(id) {
    console.log("Upvoting " + id);
    fetch('games/' + id, { method : 'put' })
        .then(resp => resp.json())
        .then(data => console.log(data));
}

function deleteGame(id) {
    console.log("Deleting entry " + id + "!");
    fetch('games/' + id, { method : 'delete' })
        .then(resp => resp.json())
        .then(data => console.log(data));
}

function addByQuery () {

}

function addByForm () {

}

function addByJSON () {

}