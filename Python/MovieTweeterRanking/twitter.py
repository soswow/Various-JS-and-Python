import tweepy
import json

class TwitterReader(object):
  def __init__(self):
    self.api = self._get_api()

  def _get_api(self):
    config = self._get_config()
    auth = tweepy.OAuthHandler(config['consumer_key'], config['consumer_secret'])
    auth.set_access_token(config['access_token'], config['access_token_secret'])
    return tweepy.API(auth)

  def _get_config(self):
    with open("config.json") as f:
      return json.load(f)

  def search(self, query, size):
    tweets = []
    max_id = None
    print "Start searching ... "
    while len(tweets) < size:
      print "%d tweets read so far" % len(tweets)
      more = self.api.search(q=query, rpp=100, max_id=max_id)
      print "%d tweets read more" % len(more)
      tweets += map(lambda a: a.text, more)
      max_id = more[-1].id - 1
      print "Last id: %d" % more[-1].id
    return tweets[size:]