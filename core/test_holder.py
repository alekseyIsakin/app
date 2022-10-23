import random as rnd
import string

test_list = dict(zip(
    [i*10 + rnd.randint(0,10) for i in range (0, 5)],
    [string.ascii_letters[i] for i in range (0, 5)]))

def get_dump_test_list():
  return test_list