from main import app
from flask import render_template, request
import random as rnd
import string

@app.route('/')
def home():
  for i in request.headers:
    pass
  return render_template('main_page_temp.html', 
    title=f"Some changeable text [{' '.join([rnd.choice(string.ascii_lowercase) for i in range(10)])}]",
    body_text=f"static text ",
    headers=request.headers)