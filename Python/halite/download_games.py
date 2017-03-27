import urllib.request
from urllib.parse import urlencode
import json
import shutil
import os
from multiprocessing import Pool
import gzip


class User:
    def __init__(self, user_id, username, rank):
        self.user_id = user_id
        self.username = username
        self.rank = rank
        self.games = []

    def load_games(self, limit=10, force=False):
        if len(self.games) > 0 and not force:
            return self.games
        self.games = Game.get_games(self.user_id, limit)

    def get_won_games(self):
        return [game for game in self.games if game.has_user_won(self.user_id)]

    @staticmethod
    def get_users(limit=10):
        query = {
            'fields[]': 'isRunning',
            'values[]': 1,
            'orderBy': 'rank',
            'limit': limit,
            'page': 0
        }
        url = 'https://halite.io/api/web/user'
        return load_json(url, query)['users']

    def __repr__(self):
        return "<%s %d>" % (self.username, self.user_id)


class Game:
    def __init__(self, game_id, replay_name, users):
        self.game_id = game_id
        self.replay_name = replay_name
        self.users = users
        self.winner = self.get_winner()

    def get_winner(self):
        return [user for user in self.users if user.rank == 1][0]

    def has_user_won(self, user_id):
        return user_id == self.winner.user_id

    def download(self, force=False):
        url = 'https://s3.amazonaws.com/halitereplaybucket/%s' % self.replay_name
        dest = 'data/%d-%s-%s.json' % (self.winner.user_id, self.winner.username, self.replay_name)
        if os.path.exists(dest) and not force:
            print("%s already downloaded" % self.replay_name)
            return

        print("Downloading %s" % self)
        req = urllib.request.Request(url)
        req.add_header('Accept-Encoding', 'gzip, deflate')
        with urllib.request.urlopen(req) as response, open(dest, 'wb') as target_file:
            f = gzip.GzipFile(fileobj=response)
            shutil.copyfileobj(f, target_file)

    @staticmethod
    def get_games(user_id, limit=10):
        query = {
            'userID': user_id,
            'limit': limit
        }
        url = 'https://halite.io/api/web/game'
        return load_json(url, query)

    def __repr__(self):
        return "<%s %d>" % (self.replay_name, self.game_id)


def json_decoder(data):
    if 'userID' in data:
        return User(int(data['userID']),
                    data['username'],
                    int(data['rank']))
    elif 'gameID' in data:
        return Game(int(data['gameID']), data['replayName'], data['users'])
    else:
        return data


def load_json(url, query):
    params = urlencode(query)
    url = '%s?%s' % (url, params)
    with urllib.request.urlopen(url) as f:
        return json.loads(f.read().decode('utf-8'), object_hook=json_decoder)


def download_won_games_for_user(user):
    print("Load games for %s" % user)
    user.load_games(30)
    won_games = user.get_won_games()
    print("%d won games" % len(won_games))
    for game in won_games:
        game.download()


print("Loading users")
users = User.get_users(10)
pool = Pool()
pool.map(download_won_games_for_user, users)


