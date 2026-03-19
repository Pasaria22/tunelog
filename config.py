# config file, use for creating url


#TODO : idk how but implement a dynamic users list, i have 3 users i can add it mannualy, 
#if someone is reviewing this, add a way to implement multiple users


from dotenv import load_dotenv
import os
from urllib.parse import urlencode

load_dotenv()

Navidrome_url = os.getenv("base_url")
Navidrome_admin = os.getenv("admin_username")
navidrome_password = os.getenv("admin_password")
api_version = "1.16.1"
app_name = "tunelog"


# ADD MORE LINES IF YOU HAVE MORE USERS
USER_CREDENTIALS = {
    os.getenv("USER_ADITI"): os.getenv("PASSWORD_aditi"),
    os.getenv("USER_adii_mobile"): os.getenv("PASSWORD_adii_mobile"),
    os.getenv("admin_username"): os.getenv("admin_password"),
}


#default url to pull data from api
def build_url(endpoint):
    params = urlencode(
        {
            "u": Navidrome_admin,
            "p": navidrome_password,
            "v": api_version,
            "c": app_name,
            "f": "json",
        }
    )
    return f"{Navidrome_url.rstrip('/')}/rest/{endpoint}?{params}"

#url to create playlist for every user
def build_url_for_user(endpoint, username, password):
    params = urlencode(
        {
            "u": username,
            "p": password,
            "v": api_version,
            "c": app_name,
            "f": "json",
        }
    )
    return f"{Navidrome_url.rstrip('/')}/rest/{endpoint}?{params}"
