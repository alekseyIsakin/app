import random as rnd
import json, os
import uuid

from pathlib import PurePath, Path
from shutil import which


PATH_TO_DIR_WITH_TESTS = PurePath('.','static', 'tests_json')
_test_list = {}

def _load_tests_info():
  files = [
    i for i in  os.listdir(PATH_TO_DIR_WITH_TESTS) 
    if os.path.isfile(PATH_TO_DIR_WITH_TESTS.joinpath(i))]
  return files


for i in _load_tests_info():
  with open(PATH_TO_DIR_WITH_TESTS.joinpath(i), mode='r', encoding="utf-8") as file:
    js = json.load(file)
    uuid_str = os.path.splitext(i)[0]
    _test_list[uuid_str] = js['Name']


def get_test_list():
  return _test_list

def test_is_exist(name:str) -> bool:
  checking_file = PATH_TO_DIR_WITH_TESTS.joinpath(name + '.json')
  
  return os.path.exists(checking_file)