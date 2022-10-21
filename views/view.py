from main import app
from flask import make_response, render_template, request, redirect, url_for
import random as rnd
import string

@app.route('/redirect/<receive_data>')
def new_page(receive_data):
  # data = ''#request.headers.get('data')
  return render_template('redirect.html', 
    title=f"redirect page", receive_data=receive_data)

@app.route('/',  methods=['GET', 'POST'])
def home():

  if request.method == 'POST' or len(request.args) > 0:
    data = ''
    if request.method == 'POST':
      data = f"post {request.form.get('submit_button')}"
    else:
      data = f"get {request.args.get('submit_button')}"

    return redirect(f'/redirect/{data}')

  return render_template('main_page_temp.html', 
    title=f"Some changeable text [{' '.join([rnd.choice(string.ascii_lowercase) for i in range(10)])}]",
    body_text=f"static text ",
    headers=request.headers)