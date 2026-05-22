# import requests

# def fetch_user_data(access_token):
#     headers = {"Authorization": f"Bearer {access_token}"}

#     user = requests.get(
#         "https://api.github.com/user",
#         headers=headers
#     ).json()

#     events = requests.get(
#         f"https://api.github.com/users/{user['login']}/events",
#         headers=headers
#     ).json()

#     return user, events



import requests

def get_commit_activity(token, username):
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
    }

    query = """
    {
      user(login: "%s") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
    """ % username

    response = requests.post(
        "https://api.github.com/graphql",
        json={"query": query},
        headers=headers,
    )

    return response.json()