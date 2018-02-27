const request = require('request');

const options = {
    hostname: 'randomuser.me',
    port: 443,
    path: '/api/?results=20',
    method: 'GET'
};

let friendList = [];

// Populate friends list with 20 random people
function retrieveFriendList() {
    request('https://www.randomuser.me/api?results=20&nat=us', function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            // Populate friends list
            console.log(JSON.parse(body));
            populateUsers(JSON.parse(body).results);
            console.log(friendList);
        }
    });
}

function populateUsers(data) {
    data.forEach(person => {
        let user = {
            name: `${person.name.first} ${person.name.last}`,
            photo: person.picture.large,
            scores: generateRandomScores()
        };
        friendList.push(user);
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

retrieveFriendList();


module.exports = friendList;