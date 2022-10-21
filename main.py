from flask import Flask

app = Flask(__name__)

from views.view import *


# @app.route('/')
# def home():
#   return "Yo"

if __name__ == "__main__":
    app.run()