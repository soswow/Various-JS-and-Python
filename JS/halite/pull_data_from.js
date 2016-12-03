const request = require('request');
const fs = require('fs');
const _ = require('lodash');

const getJson = (url, qs={}) => {
  return new Promise((resolve, reject) => {
    console.log(`Requesting url: ${url}`);
    request.get({url:url, qs:qs, json:true, gzip: true}, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      if(response.statusCode >= 400){
        return reject(response);
      }

      return resolve(body);
    });
  });
};

const getListOfTopUsers = (limit=20) => {
  return getJson(
    'https://halite.io/api/web/user',
    {
      'fields[]': 'isRunning',
      'values[]': 1,
      'orderBy': 'rank',
      'limit': limit,
      'page': 0
    }).then((data) => {
      return data.users;
    });
};

const getUserWonGames = (userID, limit=10) => {
  console.log(`Requesting games for ${userID} with limit ${limit}`);
  return getJson('https://halite.io/api/web/game', {userID, limit})
    .then((games) => {
      console.log(`Loaded ${games.length} for user ${userID}`);
      return _.filter(games, (game) => _.find(game.users, {'rank': '1'}).userID === userID);
    });
};

const downloadGame = (replayFileName, username) => {
  const url = `https://s3.amazonaws.com/halitereplaybucket/${replayFileName}`;
  const dest = `data/${replayFileName}.json`;

  return getJson(url).then((data) => {
      data.winner = username;
      data.winner_index = _.findIndex(data.player_names, (name) => name.indexOf(username) === 0);
      fs.writeFileSync(dest, JSON.stringify(data));
      return dest;
  });
};

getListOfTopUsers(10)
.then((users) => {
  const usernames = _.map(users, (user) => `${user.username}\t(${user.userID})`).join('\t\n');
  console.log(`Download following users games:\n${usernames}`);
  return users;
})
.then((users) =>
  Promise.all(
    users.map((user) =>
      getUserWonGames(user.userID, 20).then((games) =>
        Promise.all(
          games.map((game) =>
            downloadGame(game.replayName, user.username)
          )
        )
      )
    )
  )
)
.catch((error) => {
  console.log(error);
});
