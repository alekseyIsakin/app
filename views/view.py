from main import app
from core.test_holder import get_dump_test_list
from flask import render_template, request, redirect, url_for
import random as rnd
import string



@app.route('/index',  methods=['GET', 'POST'])
def home():

  if request.method == 'POST':
    return redirect(url_for('new_page'), code=307)

  tl = get_dump_test_list()

  return render_template('main_page_temp.html', 
    title=f"Some changeable text [{' '.join([rnd.choice(string.ascii_lowercase) for i in range(10)])}]",
    body_text=f"static text ",
    headers=request.headers,
    test_list=tl)




@app.route('/redirect', methods=['GET','POST'])
def new_page():
  selected_element = request.form.get('selected_list')

  if selected_element is None or selected_element.isdigit() == False:
    return redirect (url_for('home'))
  
  tl = get_dump_test_list()

  test_id = int(selected_element)
  test_name = tl[test_id]


  return render_template('redirect.html', 
    title=f"redirect page", test_name=test_name, test_id=test_id)