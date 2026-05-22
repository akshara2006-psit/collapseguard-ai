from fastapi import APIRouter
import requests
from config import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
# from github_service import fetch_user_data
from feature_engineering import extract_weekly_features
from ml_model import detect_burnout

router = APIRouter()


# @router.get("/login")
# def login():
#     return {
#         "auth_url": f"https://github.com/login/oauth/authorize?client_id={GITHUB_CLIENT_ID}&scope=repo"
#     }
from fastapi.responses import RedirectResponse


@router.get("/login")
def login():
    github_auth_url = (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={GITHUB_CLIENT_ID}"
        f"&scope=repo"
    )
    return RedirectResponse(github_auth_url)





from collections import defaultdict

from fastapi.responses import RedirectResponse
import json
import urllib.parse
from datetime import datetime, timedelta


@router.get("/auth/callback")
def callback(code: str):

    # 1️⃣ Exchange code for access token
    token_res = requests.post(
        "https://github.com/login/oauth/access_token",
        headers={"Accept": "application/json"},
        data={
            "client_id": GITHUB_CLIENT_ID,
            "client_secret": GITHUB_CLIENT_SECRET,
            "code": code,
        },
    )

    token_data = token_res.json()
    access_token = token_data.get("access_token")

    if not access_token:
        return {"error": "Failed to get access token", "details": token_data}

    headers = {"Authorization": f"token {access_token}"}

    # 2️⃣ Get user info
    user_response = requests.get(
        "https://api.github.com/user",
        headers=headers
    )

    user_data = user_response.json()
    username = user_data.get("login")

    # 3️⃣ Get repos
    repos_response = requests.get(
        "https://api.github.com/user/repos",
        headers=headers,
        params={"per_page": 100}
    )

    repos = repos_response.json()

    # 4️⃣ Get commits from last 6 months
    six_months_ago = (datetime.utcnow() - timedelta(days=180)).isoformat() + "Z"

    all_commits = []
    for repo in repos:
        repo_name = repo["name"]
        owner = repo["owner"]["login"]

        commits_response = requests.get(
            f"https://api.github.com/repos/{owner}/{repo_name}/commits",
            headers=headers,
            params={
                "since": six_months_ago,
                "per_page": 100
            }
        )

        if commits_response.status_code != 200:
            continue

        commits = commits_response.json()

        for commit in commits:
            commit_date = commit["commit"]["author"]["date"]
            all_commits.append(commit_date)
        from collections import defaultdict

        daily_commit_map = defaultdict(int)

        for date in all_commits:
                day = date[:10]
                daily_commit_map[day] += 1

        last_14_days_counts = list(daily_commit_map.values())[-14:]
    print("Total commits fetched:", len(all_commits))
    # 🔥 Build heatmap AFTER commits are collected
    commit_dates = {}

    for date in all_commits:
        day = date[:10]
        if day not in commit_dates:
            commit_dates[day] = 0
        commit_dates[day] += 1

    heatmap_data = [
    {"date": date, "count": count}
    for date, count in commit_dates.items()
]
    # 5️⃣ Feature Engineering
#     feature_matrix = extract_weekly_features(all_commits)
# # Calculate burnout score per week
#     weekly_burnout_scores = []

#     for i in range(len(feature_matrix)):
#         partial_matrix = feature_matrix[: i + 1]
#         week_result = detect_burnout(partial_matrix)
#         weekly_burnout_scores.append(week_result["score"])
    # 6️⃣ ML Burnout Detection
    # result = detect_burnout(feature_matrix)
    result = detect_burnout(
    commits=[{"date": d, "count": 1} for d in all_commits],
    daily_commit_map=daily_commit_map,
    last_14_days_counts=last_14_days_counts
)
    total_commits = len(all_commits)
    from main import generate_ai_coach

    ai_advice = generate_ai_coach(result, total_commits)
    print(result)
   
    
    # Simple next-week commit prediction
    if last_14_days_counts:
        predicted_commits = round(sum(last_14_days_counts) / len(last_14_days_counts) * 7)
    else:
        predicted_commits = 0

    weekly_activity = defaultdict(int)

    for commit in all_commits:
        # date_obj = datetime.strptime(commit, "%Y-%m-%d")
        date_obj = datetime.fromisoformat(commit.replace("Z", ""))
        year_week = f"{date_obj.year}-W{date_obj.isocalendar().week}"
        weekly_activity[year_week] += 1

    weekly_activity = dict(weekly_activity)
    # Send commit_data to frontend
    final_data = {
        "username": username,
        # "burnout_status": result["status"],
        # "burnout_score": result["score"],
        # "weekly_burnout_scores": weekly_burnout_scores,
        # "insights": result["insights"],
        # "weekly_features": feature_matrix.tolist(),
        # "heatmap": heatmap_data
        "burnout_score": result["score"],
        "burnout_status": result["status"],
         "burnout_recommendation": result["recommendation"],
         "ai_coach": ai_advice, 
        "feature_breakdown": result["feature_breakdown"],
        "total_commits": total_commits,
        "heatmap": heatmap_data,
        "weekly_commit_activity": weekly_activity,
        "predicted_next_week_commits": predicted_commits
        }
    print("Heatmap Data:", heatmap_data)
    encoded = urllib.parse.quote(json.dumps(final_data))

    return RedirectResponse(
        url=f"http://localhost:5173/dashboard?data={encoded}"
    )