const request = require('request');

let friendData = [];

// Populate friends list with 20 random people
function retrieveFriendList() {
    return new Promise((resolve, reject) => {
        request('https://www.randomuser.me/api?results=20&nat=us', function (error, response, body) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                // Populate friends list
                let friendList = populateUsers(JSON.parse(body).results);
                resolve(friendList);
            }
        });
    });
}

function populateUsers(data) {
    data.forEach(person => {
        let user = {
            name: `${person.name.first} ${person.name.last}`,
            photo: person.picture.large,
            scores: generateRandomScores()
        };
        friendData.push(user);
    });
}

function generateRandomScores() {
    let scores = [];
    for (let i = 0; i < 10; i++) {
        // random number between 1 and 5 (inclusive)
        scores.push(Math.floor(Math.random() * (5)) + 1);
    }
    return scores;
}


module.exports = retrieveFriendList;