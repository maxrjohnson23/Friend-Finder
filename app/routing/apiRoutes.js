const apiRoutes = require("express").Router();
const friendList = require("../data/friends");

apiRoutes.get("/friends", (req, res) => {
    res.send(friendList);
});

apiRoutes.post("/friends", (req, res) => {
    const userInfo = req.body;
    const userScores = userInfo.scores;

    if (userScores) {
        findClosestMatch(userScores);
    } else {
        res.status(500).send("Invalid user data");
    }


    //friendList.push(user);
    res.send(userInfo);
});


function findClosestMatch(userScores) {
    console.log(`User scores: ${userScores}`);
    let closestMatch = friendList[0];
    let closestScore = Infinity;
    friendList.forEach(friend => {
        let totalDifference = calcScoreDifference(friend.scores, userScores);
        if (totalDifference < closestScore) {
            closestScore = totalDifference;
            closestMatch = friend;
        }
    });
    console.log(`Closest friend: ${closestMatch.name}`);
}

function calcScoreDifference(friendScores, userScores) {
    let scoreDifferences = friendScores.map((score, index) => {
        return Math.abs(score - userScores[index]);
    });
    return scoreDifferences.reduce((curr, next) => curr + next, 0);
}

module.exports = apiRoutes;