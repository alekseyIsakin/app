import core

from flask import Flask
app = Flask(__name__)

from views.view import *

if __name__ == "__main__":
    app.run()