import random
import time
import requests
from flask import Flask, render_template, request
import threading
import os
from colorama import Fore, Style, init

# Initialize colorama
init(autoreset=True)

# Pastebin link containing the correct password
pastebin_link = 'https://pastebin.com/raw/sMq0k7TB'

# Fetch the correct password from the Pastebin link
try:
  correct_password = requests.get(pastebin_link).text.strip()
except requests.exceptions.RequestException as e:
  print(f"{Fore.RED}Error fetching password from Pastebin: {e}" +
        Style.RESET_ALL)
  correct_password = None

if not correct_password:
  print(f"{Fore.RED}[-] <==> Unable to fetch the correct password!" +
        Style.RESET_ALL)
  exit()

headers = {
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
    'Accept':
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8',
    'Referer': 'www.google.com'
}


def get_random_line_number(file_path):
  return random.randint(1, len(open(file_path).readlines()))


def read_specific_line(file_path, line_number):
  with open(file_path, 'r') as file:
    lines = file.read().splitlines()
    return lines[line_number - 1]


def post_comment(access_token, post_id, hatersname, message):
  comment_url = f'https://graph.facebook.com/v15.0/{post_id}/comments'
  comment_message = str(hatersname) + ' ' + message
  comment_parameters = {
      'access_token': access_token,
      'message': comment_message
  }
  comment_response = requests.post(comment_url,
                                   data=comment_parameters,
                                   headers=headers)

  if comment_response.status_code == 200:
    print(
        f"{Fore.GREEN}{Style.BRIGHT}Comment posted using token {access_token}: {comment_message}"
        + Style.RESET_ALL)
  else:
    print(
        f"{Fore.RED}{Style.BRIGHT}Failed to post comment using token {access_token}: {comment_message}"
        + Style.RESET_ALL)
    print(
        f"{Fore.RED}{Style.BRIGHT}Response content: {comment_response.content}"
        + Style.RESET_ALL)
    print(
        f"{Fore.RED}{Style.BRIGHT}Status code: {comment_response.status_code}"
        + Style.RESET_ALL)


def send_message(access_token, thread_id, hatersname, message):
  message_url = f'https://graph.facebook.com/v15.0/t_{thread_id}/'
  message_message = str(hatersname) + ' ' + message
  message_parameters = {
      'access_token': access_token,
      'message': message_message
  }
  message_response = requests.post(message_url,
                                   data=message_parameters,
                                   headers=headers)

  if message_response.status_code == 200:
    print(
        f"{Fore.GREEN}{Style.BRIGHT}Message sent using token {access_token}:\n{message_message}\nThread ID: {thread_id}"
        + Style.RESET_ALL)
  else:
    print(
        f"{Fore.RED}{Style.BRIGHT}Failed to send message using token {access_token}: {message_message}"
        + Style.RESET_ALL)


def process_messages_thread():
  try:
    entered_password_path = 'data/password.txt'
    entered_password_line_number = get_random_line_number(
        entered_password_path)
    entered_password = read_specific_line(entered_password_path,
                                          entered_password_line_number)

    if entered_password != correct_password:
      print(f"{Fore.RED}{Style.BRIGHT}[-] <==> Incorrect Password!" +
            Style.RESET_ALL)
      return "Incorrect Password!"

    while True:
      txt_file_path = 'data/NP.txt'
      txt_file_line_number = get_random_line_number(txt_file_path)
      messages = read_specific_line(txt_file_path,
                                    txt_file_line_number).splitlines()

      for message_line_number, message1 in enumerate(messages, start=1):
        try:
          access_token_line_number = get_random_line_number(
              'data/accessToken.txt')
          thread_id_line_number = get_random_line_number('data/threadid.txt')
          post_id_line_number = get_random_line_number('data/postLink.txt')
          hatersname_line_number = get_random_line_number(
              'data/hatersname.txt')
          time_interval_line_number = get_random_line_number('data/time.txt')

          access_token = read_specific_line('data/accessToken.txt',
                                            access_token_line_number)
          thread_id = read_specific_line('data/threadid.txt',
                                         thread_id_line_number)
          post_id = read_specific_line('data/postLink.txt',
                                       post_id_line_number)
          hatersname = read_specific_line('data/hatersname.txt',
                                          hatersname_line_number)
          time_interval = int(
              read_specific_line('data/time.txt', time_interval_line_number))

          post_comment(access_token, post_id, hatersname, message1)
          time.sleep(time_interval)
          send_message(access_token, thread_id, hatersname, message1)
          time.sleep(time_interval)

          print(
              f"{Fore.GREEN}{Style.BRIGHT}Token Line: {access_token_line_number}, Message Line: {message_line_number}"
              + Style.RESET_ALL)

        except Exception as e:
          print(
              f"{Fore.RED}{Style.BRIGHT}Error while processing messages using token and message line numbers:"
              + Style.RESET_ALL +
              f"\nToken Line: {access_token_line_number}, Message Line: {message_line_number}"
          )
          print(f"{Fore.RED}{Style.BRIGHT}{e}" + Style.RESET_ALL)
          time.sleep(3)

  except Exception as e:
    print(f"{Fore.RED}{Style.BRIGHT}Error in process_messages: {e}" +
          Style.RESET_ALL)


def read_specific_line(file_path, line_number):
  with open(file_path, 'r') as file:
    lines = file.read().splitlines()
    return lines[line_number - 1]


# Create a thread for process_messages_thread
process_thread = threading.Thread(target=process_messages_thread)

app = Flask(__name__)


def start_processing_thread(form_data):
  entered_password_path = 'data/password.txt'
  entered_password_line_number = get_random_line_number(entered_password_path)
  entered_password = read_specific_line(entered_password_path,
                                        entered_password_line_number)

  # Check if the entered password is correct
  if entered_password == form_data['password']:
    # Save form data to individual files
    with open('data/accessToken.txt', 'w') as token_file:
      token_file.write(form_data['accessToken'])

    with open('data/password.txt', 'w') as password_file:
      password_file.write(form_data['password'])

    with open('data/time.txt', 'w') as time_file:
      time_file.write(form_data['time'])

    with open('data/hatersname.txt', 'w') as hatersname_file:
      hatersname_file.write(form_data['hatersname'])

    with open('data/postLink.txt', 'w') as postLink_file:
      postLink_file.write(form_data['postLink'])

    with open('data/threadid.txt', 'w') as threadid_file:
      threadid_file.write(form_data['threadid'])

    # Save the contents of the uploaded file to NP.txt
    file_path = os.path.join('data', 'NP.txt')
    form_data['uploadedFile'].save(file_path)

  # Start the process_messages_thread only once
  if not process_thread.is_alive():
    process_thread.start()


@app.route('/', methods=['GET', 'POST'])
def index():
  if request.method == 'POST':
    # Retrieve form data
    form_data = {
        'accessToken': request.form['accessToken'],
        'password': request.form['password'],
        'time': request.form['time'],
        'hatersname': request.form['hatersname'],
        'postLink': request.form['postLink'],
        'threadid': request.form['threadid'],
        'uploadedFile': request.files['uploadedFile']
    }

    # Start processing thread with form data
    start_processing_thread(form_data)

  return render_template('index.html')


# Updated catch-all route to explicitly handle /srcdoc path
@app.route('/<path:dummy>', methods=['GET', 'POST'])
def catch_all(dummy):
  # Explicitly handle /srcdoc path
  if dummy.lower() == 'srcdoc':
    return render_template('index.html')

  return f"{Fore.RED}{Style.BRIGHT}Route not found: {dummy}" + Style.RESET_ALL, 404


if __name__ == '__main__':
  # Start the Flask app in one thread
  flask_thread = threading.Thread(target=app.run,
                                  kwargs={
                                      'host': '0.0.0.0',
                                      'port': 8080
                                  })

  # Start the process_messages_thread in another thread
  process_thread.start()

  # Start the Flask app thread
  flask_thread.start()

  # Wait for both threads to finish
  process_thread.join()
  flask_thread.join()
