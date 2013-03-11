import urllib2
import twitter
from nltk.stem import WordNetLemmatizer
from nltk.stem.snowball import EnglishStemmer
import re
from senticnet.senticnet import Senticnet

def get_words_bag(message):
  wnl = WordNetLemmatizer()
  es = EnglishStemmer()
  for word in re.finditer("\w+", message):
    yield (wnl.lemmatize(word.group()), es.stem(word.group()))

def get_avg_polarity(message):
  threshold = 0.3
  sn = Senticnet()
  count = 0
  summ = 0
  for word_options in get_words_bag(message):
    polarity = 0
    for word in word_options:
      try:
        concept = sn.concept(word)
        polarity = concept['polarity']
        break
      except urllib2.HTTPError:
        pass #Do next
    if abs(polarity) > threshold:
      summ += polarity
      count += 1

  return summ / count if count > 0 else 0


def main():
  pass
#  reader = twitter.TwitterReader()
#  tweets = reader.search("Python", 10)
#  print "\n".join(tweets)
  print get_avg_polarity("Ok thanks RT @KaYsutra: It is,,'RT @Chinellly Who has watched a good day to die hard?I wanna know if it's a gud movie 2 see in d cinema.")



if __name__ == "__main__":
  main()