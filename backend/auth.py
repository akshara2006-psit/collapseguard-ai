# from fastapi import APIRouter, Request, HTTPException
# from fastapi.responses import RedirectResponse, JSONResponse
# from datetime import datetime, timedelta, timezone
# from collections import defaultdict
# import requests
# import secrets
# import json
# import sqlite3
# import os

# from config import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
# from ml_model import detect_burnout
# from ai_coach import generate_ai_coach

# router = APIRouter()

# FRONTEND_URL = "http://localhost:5173"
# DB_FILE = "dashboard.db"

# # ============================================================
# # DATABASE
# # ============================================================

# def init_db():
#     conn = sqlite3.connect(DB_FILE)
#     conn.execute("""
#         CREATE TABLE IF NOT EXISTS dashboard_sessions (
#             session_id TEXT PRIMARY KEY,
#             username TEXT NOT NULL,
#             dashboard_data TEXT NOT NULL,
#             created_at TEXT NOT NULL
#         )
#     """)
#     conn.commit()
#     conn.close()

# init_db()

# def save_dashboard_data(session_id, username, dashboard_data):
#     conn = sqlite3.connect(DB_FILE)
#     conn.execute(
#         """
#         INSERT OR REPLACE INTO dashboard_sessions
#         (session_id, username, dashboard_data, created_at)
#         VALUES (?, ?, ?, ?)
#         """,
#         (
#             session_id,
#             username,
#             json.dumps(dashboard_data),
#             datetime.utcnow().isoformat()
#         )
#     )
#     conn.commit()
#     conn.close()

# def get_dashboard_data(session_id):
#     conn = sqlite3.connect(DB_FILE)
#     row = conn.execute(
#         """
#         SELECT username, dashboard_data
#         FROM dashboard_sessions
#         WHERE session_id = ?
#         """,
#         (session_id,)
#     ).fetchone()
#     conn.close()

#     if not row:
#         return None

#     return {
#         "username": row[0],
#         "data": json.loads(row[1])
#     }

# def delete_session(session_id):
#     conn = sqlite3.connect(DB_FILE)
#     conn.execute(
#         "DELETE FROM dashboard_sessions WHERE session_id = ?",
#         (session_id,)
#     )
#     conn.commit()
#     conn.close()

# # ============================================================
# # GITHUB LOGIN
# # ============================================================

# @router.get("/login")
# def login():
#     github_auth_url = (
#         "https://github.com/login/oauth/authorize"
#         f"?client_id={GITHUB_CLIENT_ID}"
#         "&scope=repo"
#     )
#     return RedirectResponse(github_auth_url)

# # ============================================================
# # GITHUB CALLBACK
# # ============================================================

# @router.get("/auth/callback")
# def callback(code: str):
#     try:
#         # 1. Exchange OAuth code for access token
#         token_res = requests.post(
#             "https://github.com/login/oauth/access_token",
#             headers={"Accept": "application/json"},
#             data={
#                 "client_id": GITHUB_CLIENT_ID,
#                 "client_secret": GITHUB_CLIENT_SECRET,
#                 "code": code
#             },
#             timeout=20
#         )
#         token_res.raise_for_status()
#         token_data = token_res.json()
#         access_token = token_data.get("access_token")

#         if not access_token:
#             raise HTTPException(
#                 status_code=400,
#                 detail="GitHub authentication failed: Access token missing"
#             )

#         headers = {
#             "Authorization": f"Bearer {access_token}",
#             "Accept": "application/vnd.github+json"
#         }

#         # 2. Get GitHub user info
#         user_response = requests.get(
#             "https://api.github.com/user",
#             headers=headers,
#             timeout=20
#         )
#         user_response.raise_for_status()
#         user_data = user_response.json()
#         username = user_data.get("login")

#         if not username:
#             raise HTTPException(
#                 status_code=400,
#                 detail="Unable to identify GitHub user"
#             )

#         print("Logged in GitHub user:", username)

#         # 3. Get user repositories (paginated)
#         repos = []
#         page = 1
#         while page <= 10:
#             try:
#                 repos_response = requests.get(
#                     "https://api.github.com/user/repos",
#                     headers=headers,
#                     params={
#                         "per_page": 100,
#                         "page": page,
#                         "sort": "updated"
#                     },
#                     timeout=15
#                 )
#                 if repos_response.status_code != 200:
#                     break
#                 page_repos = repos_response.json()
#                 if not isinstance(page_repos, list) or not page_repos:
#                     break
#                 repos.extend(page_repos)
#                 if len(page_repos) < 100:
#                     break
#                 page += 1
#             except Exception as e:
#                 print(f"Error fetching repos page {page}: {e}")
#                 break

#         print(f"Repositories found: {len(repos)}")

#         # 4. Get commits from last 6 months (180 days)
#         six_months_ago_dt = datetime.utcnow() - timedelta(days=180)
#         six_months_ago = six_months_ago_dt.isoformat() + "Z"
#         all_commits = []

#         for repo in repos:
#             if not isinstance(repo, dict):
#                 continue
#             repo_name = repo.get("name")
#             owner = repo.get("owner", {}).get("login")
#             if not repo_name or not owner:
#                 continue

#             # Performance optimization: skip repos untouched in last 180 days
#             pushed_at = repo.get("pushed_at") or repo.get("updated_at")
#             if pushed_at:
#                 try:
#                     pushed_dt = datetime.fromisoformat(pushed_at.replace("Z", "+00:00"))
#                     if pushed_dt.tzinfo:
#                         pushed_dt = pushed_dt.astimezone(timezone.utc).replace(tzinfo=None)
#                     if pushed_dt < six_months_ago_dt:
#                         continue
#                 except Exception:
#                     pass

#             c_page = 1
#             max_c_pages = 10  # Up to 1000 commits per active repo
#             while c_page <= max_c_pages:
#                 try:
#                     commits_response = requests.get(
#                         f"https://api.github.com/repos/{owner}/{repo_name}/commits",
#                         headers=headers,
#                         params={
#                             "since": six_months_ago,
#                             "per_page": 100,
#                             "page": c_page
#                         },
#                         timeout=15
#                     )
#                     if commits_response.status_code != 200:
#                         break
#                     commits_data = commits_response.json()
#                     if not isinstance(commits_data, list) or not commits_data:
#                         break

#                     for commit in commits_data:
#                         if not isinstance(commit, dict):
#                             continue
#                         c_date = (
#                             commit.get("commit", {})
#                             .get("author", {})
#                             .get("date")
#                             or commit.get("commit", {})
#                             .get("committer", {})
#                             .get("date")
#                         )
#                         if c_date:
#                             all_commits.append(c_date)

#                     if len(commits_data) < 100:
#                         break
#                     c_page += 1
#                 except Exception as e:
#                     print(f"Error fetching commits for {owner}/{repo_name}: {e}")
#                     break

#         all_commits.sort()
#         total_commits = len(all_commits)
#         print("Total commits fetched:", total_commits)

#         # 5. Build daily commit map & heatmap
#         daily_commit_map = defaultdict(int)
#         commit_dates = {}
#         for date in all_commits:
#             day = date[:10]
#             daily_commit_map[day] += 1
#             commit_dates[day] = commit_dates.get(day, 0) + 1

#         heatmap_data = [
#             {"date": d, "count": c}
#             for d, c in sorted(commit_dates.items())
#         ]

#         # 6. Build last 14 days counts
#         today = datetime.utcnow().date()
#         last_14_days_counts = []
#         for i in range(13, -1, -1):
#             day = (today - timedelta(days=i)).isoformat()
#             last_14_days_counts.append(daily_commit_map.get(day, 0))

#         # 7. ML Burnout Detection
#         result = detect_burnout(
#             commits=[{"date": d, "count": 1} for d in all_commits],
#             daily_commit_map=daily_commit_map,
#             last_14_days_counts=last_14_days_counts
#         )

#         # 8. AI Coach Advice
#         ai_advice = generate_ai_coach(result, total_commits)

#         # 9. Next-week commit prediction
#         recent_total = sum(last_14_days_counts)
#         predicted_commits = round(recent_total / 14 * 7)

#         # 10. Weekly Activity
#         weekly_activity = defaultdict(int)
#         for commit in all_commits:
#             try:
#                 date_obj = datetime.fromisoformat(commit.replace("Z", "+00:00"))
#                 iso_year, iso_week, _ = date_obj.isocalendar()
#                 year_week = f"{iso_year}-W{iso_week:02d}"
#                 weekly_activity[year_week] += 1
#             except Exception:
#                 continue
#         weekly_activity = dict(sorted(weekly_activity.items()))

#         # 11. Historical weekly burnout scores for timeline visualization
#         weekly_burnout_scores = []
#         if weekly_activity:
#             sorted_weeks = sorted(weekly_activity.keys())
#             for wk in sorted_weeks[-6:]:
#                 cnt = weekly_activity[wk]
#                 avg_cnt = max(1, sum(weekly_activity.values()) / len(weekly_activity))
#                 wk_score = min(round((cnt / avg_cnt) * result.get("score", 30), 1), 100)
#                 weekly_burnout_scores.append(wk_score)
#         if not weekly_burnout_scores:
#             weekly_burnout_scores = [result.get("score", 0)]

#         # 12. Assemble Final Dashboard Data Payload
#         final_data = {
#             "username": username,
#             "burnout_score": result.get("score", 0),
#             "burnout_status": result.get("status", "Unknown"),
#             "burnout_recommendation": result.get("recommendation", []),
#             "ai_coach": ai_advice,
#             "feature_breakdown": result.get("feature_breakdown", {}),
#             "total_commits": total_commits,
#             "heatmap": heatmap_data,
#             "weekly_commit_activity": weekly_activity,
#             "predicted_next_week_commits": predicted_commits,
#             "weekly_burnout_scores": weekly_burnout_scores,
#             "predicted_burnout": result.get("predicted_burnout", result.get("score", 0))
#         }

#         # 13. Create Secure Server Session
#         session_id = secrets.token_urlsafe(32)
#         save_dashboard_data(session_id, username, final_data)

#         print("==========================================")
#         print("SESSION CREATED")
#         print("Username:", username)
#         print("Session ID:", session_id)
#         print("==========================================")

#         # 14. Redirect to /dashboard and set HttpOnly Cookie
#         response = RedirectResponse(
#             url=f"{FRONTEND_URL}/dashboard",
#             status_code=302
#         )
#         response.set_cookie(
#             key="collapseguard_session",
#             value=session_id,
#             max_age=60 * 60 * 24 * 7,
#             httponly=True,
#             secure=False,
#             samesite="lax",
#             path="/"
#         )
#         return response

#     except requests.RequestException as e:
#         print("GitHub API request failed:", e)
#         return JSONResponse(
#             status_code=502,
#             content={
#                 "error": "Unable to communicate with GitHub API",
#                 "details": str(e)
#             }
#         )
#     except Exception as e:
#         print("Authentication/dashboard error:", e)
#         return JSONResponse(
#             status_code=500,
#             content={
#                 "error": "Unable to generate dashboard",
#                 "details": str(e)
#             }
#         )

# # ============================================================
# # DASHBOARD DATA ENDPOINT
# # ============================================================

# @router.get("/dashboard-data")
# @router.get("/api/dashboard")
# def dashboard_data(request: Request):
#     print("\n================ DASHBOARD REQUEST ================")
#     print("Cookies received:", request.cookies)

#     session_id = request.cookies.get("collapseguard_session")
#     print("Session ID from cookie:", session_id)

#     # Fallback options for query parameter, header, or DB latest entry
#     if not session_id:
#         session_id = request.query_params.get("session_id") or request.headers.get("X-Session-ID")
#         print("Session ID from query/header fallback:", session_id)

#     if not session_id:
#         try:
#             conn = sqlite3.connect(DB_FILE)
#             row = conn.execute("SELECT session_id FROM dashboard_sessions ORDER BY created_at DESC LIMIT 1").fetchone()
#             conn.close()
#             if row:
#                 session_id = row[0]
#                 print("Session ID from DB fallback:", session_id)
#         except Exception as e:
#             print("DB fallback error:", e)

#     if not session_id:
#         print("❌ NO SESSION COOKIE OR SESSION FOUND")
#         return JSONResponse(
#             status_code=401,
#             content={"error": "Dashboard session cookie missing"}
#         )

#     session = get_dashboard_data(session_id)
#     if not session:
#         print("❌ SESSION NOT FOUND IN DATABASE")
#         return JSONResponse(
#             status_code=401,
#             content={"error": "Dashboard session not found"}
#         )

#     print("✅ SESSION FOUND FOR USER:", session["username"])
#     print("====================================================\n")

#     return {
#         "success": True,
#         "username": session["username"],
#         "data": session["data"],
#         **session["data"]
#     }

# # ============================================================
# # LOGOUT
# # ============================================================

# @router.post("/logout")
# def logout(request: Request):
#     session_id = request.cookies.get("collapseguard_session")
#     if session_id:
#         delete_session(session_id)

#     response = JSONResponse({"success": True})
#     response.delete_cookie("collapseguard_session", path="/")
#     return response


from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, JSONResponse
from datetime import datetime, timedelta, timezone
from collections import defaultdict
import requests
import secrets
import json
import sqlite3
import os

from config import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
from ml_model import detect_burnout
from ai_coach import generate_ai_coach


router = APIRouter()

# ============================================================
# CONFIGURATION
# ============================================================

FRONTEND_URL = "http://localhost:5173"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "dashboard.db")

SESSION_MAX_AGE = 60 * 60 * 24 * 7


# ============================================================
# DATABASE
# ============================================================

def init_db():
    conn = sqlite3.connect(DB_FILE)

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS dashboard_sessions (
            session_id TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            dashboard_data TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )

    conn.commit()
    conn.close()


init_db()


def save_dashboard_data(session_id, username, dashboard_data):
    conn = sqlite3.connect(DB_FILE)

    conn.execute(
        """
        INSERT OR REPLACE INTO dashboard_sessions
        (
            session_id,
            username,
            dashboard_data,
            created_at
        )
        VALUES (?, ?, ?, ?)
        """,
        (
            session_id,
            username,
            json.dumps(dashboard_data),
            datetime.now(timezone.utc).isoformat()
        )
    )

    conn.commit()
    conn.close()


def get_dashboard_data(session_id):
    if not session_id:
        return None

    conn = sqlite3.connect(DB_FILE)

    row = conn.execute(
        """
        SELECT username, dashboard_data
        FROM dashboard_sessions
        WHERE session_id = ?
        """,
        (session_id,)
    ).fetchone()

    conn.close()

    if not row:
        return None

    try:
        dashboard_data = json.loads(row[1])
    except json.JSONDecodeError:
        return None

    return {
        "username": row[0],
        "data": dashboard_data
    }


def delete_session(session_id):
    if not session_id:
        return

    conn = sqlite3.connect(DB_FILE)

    conn.execute(
        """
        DELETE FROM dashboard_sessions
        WHERE session_id = ?
        """,
        (session_id,)
    )

    conn.commit()
    conn.close()


# ============================================================
# GITHUB LOGIN
# ============================================================

@router.get("/login")
def login():

    github_auth_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={GITHUB_CLIENT_ID}"
        "&scope=repo"
    )

    return RedirectResponse(
        github_auth_url,
        status_code=302
    )


# ============================================================
# GITHUB CALLBACK
# ============================================================

@router.get("/auth/callback")
def callback(code: str):

    try:

        # ----------------------------------------------------
        # 1. Exchange OAuth code for access token
        # ----------------------------------------------------

        token_response = requests.post(
            "https://github.com/login/oauth/access_token",
            headers={
                "Accept": "application/json"
            },
            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code
            },
            timeout=20
        )

        token_response.raise_for_status()

        token_data = token_response.json()

        access_token = token_data.get("access_token")

        if not access_token:

            return JSONResponse(
                status_code=400,
                content={
                    "error": "GitHub authentication failed",
                    "details": token_data.get(
                        "error_description",
                        "Access token missing"
                    )
                }
            )

        github_headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json"
        }

        # ----------------------------------------------------
        # 2. Get GitHub user
        # ----------------------------------------------------

        user_response = requests.get(
            "https://api.github.com/user",
            headers=github_headers,
            timeout=20
        )

        user_response.raise_for_status()

        user_data = user_response.json()

        username = user_data.get("login")

        if not username:

            return JSONResponse(
                status_code=400,
                content={
                    "error": "Unable to identify GitHub user"
                }
            )

        print("Logged in GitHub user:", username)

        # ----------------------------------------------------
        # 3. Get repositories with pagination
        # ----------------------------------------------------

        repos = []

        page = 1
        max_repo_pages = 10

        while page <= max_repo_pages:

            try:

                repos_response = requests.get(
                    "https://api.github.com/user/repos",
                    headers=github_headers,
                    params={
                        "per_page": 100,
                        "page": page,
                        "sort": "updated"
                    },
                    timeout=20
                )

                # GitHub rate limit
                if repos_response.status_code == 403:

                    print("GitHub rate limit reached while fetching repos.")
                    break

                if repos_response.status_code != 200:

                    print(
                        "Repository request failed:",
                        repos_response.status_code
                    )
                    break

                page_repos = repos_response.json()

                if not isinstance(page_repos, list):
                    break

                if not page_repos:
                    break

                repos.extend(page_repos)

                if len(page_repos) < 100:
                    break

                page += 1

            except requests.RequestException as e:

                print(
                    f"Repository page {page} failed: {e}"
                )

                break

        print("Repositories found:", len(repos))

        # ----------------------------------------------------
        # 4. Get commits from last 180 days
        # ----------------------------------------------------

        now_utc = datetime.now(timezone.utc)

        six_months_ago = (
            now_utc - timedelta(days=180)
        )

        six_months_ago_github = (
            six_months_ago.isoformat()
        )

        all_commits = []

        for repo in repos:

            if not isinstance(repo, dict):
                continue

            repo_name = repo.get("name")

            owner = (
                repo.get("owner", {})
                .get("login")
            )

            if not repo_name or not owner:
                continue

            # ------------------------------------------------
            # Skip repositories inactive for 180+ days
            # ------------------------------------------------

            pushed_at = (
                repo.get("pushed_at")
                or repo.get("updated_at")
            )

            if pushed_at:

                try:

                    pushed_datetime = datetime.fromisoformat(
                        pushed_at.replace("Z", "+00:00")
                    )

                    if pushed_datetime < six_months_ago:

                        continue

                except (ValueError, TypeError):

                    pass

            # ------------------------------------------------
            # Fetch commits
            # ------------------------------------------------

            commit_page = 1
            max_commit_pages = 10

            while commit_page <= max_commit_pages:

                try:

                    commits_response = requests.get(
                        f"https://api.github.com/repos/"
                        f"{owner}/{repo_name}/commits",

                        headers=github_headers,

                        params={
                            "since": six_months_ago_github,
                            "per_page": 100,
                            "page": commit_page
                        },

                        timeout=20
                    )

                    # Rate limit
                    if commits_response.status_code == 403:

                        print(
                            f"GitHub rate limit reached "
                            f"while processing {owner}/{repo_name}"
                        )

                        break

                    # Empty repository
                    if commits_response.status_code == 409:

                        print(
                            f"Empty repository skipped: "
                            f"{owner}/{repo_name}"
                        )

                        break

                    if commits_response.status_code != 200:

                        print(
                            f"Commit request failed for "
                            f"{owner}/{repo_name}: "
                            f"{commits_response.status_code}"
                        )

                        break

                    commits_data = commits_response.json()

                    if not isinstance(commits_data, list):
                        break

                    if not commits_data:
                        break

                    # ----------------------------------------
                    # Extract commit dates
                    # ----------------------------------------

                    for commit in commits_data:

                        if not isinstance(commit, dict):
                            continue

                        commit_info = commit.get(
                            "commit",
                            {}
                        )

                        author_info = commit_info.get(
                            "author",
                            {}
                        )

                        committer_info = commit_info.get(
                            "committer",
                            {}
                        )

                        commit_date = (
                            author_info.get("date")
                            or committer_info.get("date")
                        )

                        if commit_date:

                            all_commits.append(
                                commit_date
                            )

                    if len(commits_data) < 100:
                        break

                    commit_page += 1

                except requests.RequestException as e:

                    print(
                        f"Commit request failed for "
                        f"{owner}/{repo_name}: {e}"
                    )

                    break

                except Exception as e:

                    print(
                        f"Unexpected commit processing error "
                        f"for {owner}/{repo_name}: {e}"
                    )

                    break

        # ----------------------------------------------------
        # Sort commits
        # ----------------------------------------------------

        all_commits.sort()

        total_commits = len(all_commits)

        print(
            "Total commits fetched:",
            total_commits
        )

        # ====================================================
        # 5. DAILY COMMIT MAP
        # ====================================================

        daily_commit_map = defaultdict(int)

        for commit_date in all_commits:

            try:

                day = commit_date[:10]

                daily_commit_map[day] += 1

            except Exception:

                continue

        # ====================================================
        # 6. HEATMAP
        # ====================================================

        heatmap_data = [
            {
                "date": day,
                "count": count
            }

            for day, count
            in sorted(daily_commit_map.items())
        ]

        # ====================================================
        # 7. LAST 14 DAYS
        # ====================================================

        today = datetime.now(
            timezone.utc
        ).date()

        last_14_days_counts = []

        for i in range(13, -1, -1):

            day = (
                today -
                timedelta(days=i)
            ).isoformat()

            last_14_days_counts.append(
                daily_commit_map.get(
                    day,
                    0
                )
            )

        # ====================================================
        # 8. ML BURNOUT DETECTION
        # ====================================================

        try:

            burnout_result = detect_burnout(

                commits=[
                    {
                        "date": commit_date,
                        "count": 1
                    }

                    for commit_date in all_commits
                ],

                daily_commit_map=daily_commit_map,

                last_14_days_counts=last_14_days_counts
            )

        except Exception as e:

            print(
                "Burnout detection failed:",
                e
            )

            burnout_result = {
                "score": 0,
                "status": "Insufficient Data",
                "recommendation": [],
                "feature_breakdown": {}
            }

        # ====================================================
        # 9. AI COACH
        # ====================================================

        try:

            ai_advice = generate_ai_coach(
                burnout_result,
                total_commits
            )

        except Exception as e:

            print(
                "AI Coach failed:",
                e
            )

            ai_advice = (
                "Unable to generate AI coaching advice "
                "at this time."
            )

        # ====================================================
        # 10. NEXT WEEK PREDICTION
        # ====================================================

        recent_total = sum(
            last_14_days_counts
        )

        predicted_commits = round(
            (recent_total / 14) * 7
        )

        # ====================================================
        # 11. WEEKLY ACTIVITY
        # ====================================================

        weekly_activity = defaultdict(int)

        for commit_date in all_commits:

            try:

                parsed_date = datetime.fromisoformat(
                    commit_date.replace(
                        "Z",
                        "+00:00"
                    )
                )

                iso_year, iso_week, _ = (
                    parsed_date.isocalendar()
                )

                week_key = (
                    f"{iso_year}-W{iso_week:02d}"
                )

                weekly_activity[week_key] += 1

            except (
                ValueError,
                TypeError
            ):

                continue

        weekly_activity = dict(
            sorted(
                weekly_activity.items()
            )
        )

        # ====================================================
        # 12. WEEKLY BURNOUT SCORES
        # ====================================================

        weekly_burnout_scores = []

        if weekly_activity:

            sorted_weeks = sorted(
                weekly_activity.keys()
            )

            average_activity = max(
                1,
                sum(
                    weekly_activity.values()
                ) / len(weekly_activity)
            )

            base_score = burnout_result.get(
                "score",
                0
            )

            for week in sorted_weeks[-6:]:

                week_count = weekly_activity[
                    week
                ]

                week_score = min(
                    round(
                        (
                            week_count /
                            average_activity
                        ) * base_score,
                        1
                    ),
                    100
                )

                weekly_burnout_scores.append(
                    week_score
                )

        if not weekly_burnout_scores:

            weekly_burnout_scores = [
                burnout_result.get(
                    "score",
                    0
                )
            ]

        # ====================================================
        # 13. FINAL DASHBOARD DATA
        # ====================================================

        final_data = {

            "username":
                username,

            "burnout_score":
                burnout_result.get(
                    "score",
                    0
                ),

            "burnout_status":
                burnout_result.get(
                    "status",
                    "Unknown"
                ),

            "burnout_recommendation":
                burnout_result.get(
                    "recommendation",
                    []
                ),

            "ai_coach":
                ai_advice,

            "feature_breakdown":
                burnout_result.get(
                    "feature_breakdown",
                    {}
                ),

            "total_commits":
                total_commits,

            "heatmap":
                heatmap_data,

            "weekly_commit_activity":
                weekly_activity,

            "predicted_next_week_commits":
                predicted_commits,

            "weekly_burnout_scores":
                weekly_burnout_scores,

            "predicted_burnout":
                burnout_result.get(
                    "predicted_burnout",
                    burnout_result.get(
                        "score",
                        0
                    )
                )
        }

        # ====================================================
        # 14. CREATE SESSION
        # ====================================================

        session_id = secrets.token_urlsafe(32)

        save_dashboard_data(
            session_id,
            username,
            final_data
        )

        print(
            "=========================================="
        )
        print("SESSION CREATED")
        print("Username:", username)
        print("Session ID:", session_id)
        print(
            "Dashboard saved:",
            get_dashboard_data(
                session_id
            ) is not None
        )
        print(
            "=========================================="
        )

        # ====================================================
        # 15. REDIRECT + HTTPONLY COOKIE
        # ====================================================

        response = RedirectResponse(
            url=f"{FRONTEND_URL}/dashboard",
            status_code=302
        )

        response.set_cookie(

            key="collapseguard_session",

            value=session_id,

            max_age=SESSION_MAX_AGE,

            httponly=True,

            secure=False,

            samesite="lax",

            path="/"
        )

        return response

    # ========================================================
    # REQUEST ERROR
    # ========================================================

    except requests.RequestException as e:

        print(
            "GitHub API request failed:",
            e
        )

        return JSONResponse(

            status_code=502,

            content={
                "error":
                    "Unable to communicate with GitHub API",

                "details":
                    str(e)
            }
        )

    # ========================================================
    # UNEXPECTED ERROR
    # ========================================================

    except Exception as e:

        print(
            "Authentication/dashboard error:",
            e
        )

        return JSONResponse(

            status_code=500,

            content={
                "error":
                    "Unable to generate dashboard",

                "details":
                    str(e)
            }
        )


# ============================================================
# DASHBOARD DATA
# ============================================================

@router.get("/dashboard-data")
@router.get("/api/dashboard")
def dashboard_data(request: Request):

    print(
        "\n================ DASHBOARD REQUEST ================"
    )

    print(
        "Cookies received:",
        request.cookies
    )

    # --------------------------------------------------------
    # Primary authentication method:
    # HttpOnly session cookie
    # --------------------------------------------------------

    session_id = request.cookies.get(
        "collapseguard_session"
    )

    # --------------------------------------------------------
    # Optional fallback:
    # query parameter
    # --------------------------------------------------------

    if not session_id:

        session_id = request.query_params.get(
            "session_id"
        )

    # --------------------------------------------------------
    # Optional fallback:
    # X-Session-ID header
    # --------------------------------------------------------

    if not session_id:

        session_id = request.headers.get(
            "X-Session-ID"
        )

    print(
        "Session ID:",
        session_id
    )

    # --------------------------------------------------------
    # No session
    # --------------------------------------------------------

    if not session_id:

        print(
            "❌ NO SESSION FOUND"
        )

        return JSONResponse(

            status_code=401,

            content={
                "error":
                    "Dashboard session not found"
            }
        )

    # --------------------------------------------------------
    # Get session
    # --------------------------------------------------------

    session = get_dashboard_data(
        session_id
    )

    if not session:

        print(
            "❌ SESSION NOT FOUND"
        )

        return JSONResponse(

            status_code=401,

            content={
                "error":
                    "Dashboard session expired or invalid"
            }
        )

    print(
        "✅ SESSION FOUND"
    )

    print(
        "Username:",
        session["username"]
    )

    print(
        "====================================================\n"
    )

    return {

        "success":
            True,

        "username":
            session["username"],

        "data":
            session["data"]
    }


# ============================================================
# LOGOUT
# ============================================================

@router.post("/logout")
def logout(request: Request):

    session_id = request.cookies.get(
        "collapseguard_session"
    )

    if session_id:

        delete_session(
            session_id
        )

    response = JSONResponse({

        "success":
            True
    })

    response.delete_cookie(

        key="collapseguard_session",

        path="/"
    )

    return response