import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timedelta
import statistics

def calculate_late_night_intensity(commits):
    total_commits = 0
    late_night_commits = 0

    for commit in commits:
        if not isinstance(commit, dict):
            continue
        date_str = commit.get("date")
        if not date_str:
            continue
        try:
            clean_date = str(date_str).replace("Z", "+00:00")
            dt = datetime.fromisoformat(clean_date)
            count = commit.get("count", 1)
            total_commits += count
            if 0 <= dt.hour < 5:
                late_night_commits += count
        except Exception:
            continue

    if total_commits == 0:
        return 0

    lni = (late_night_commits / total_commits) * 100
    return min(lni, 100)

def calculate_work_streak_index(daily_commit_map):
    """
    daily_commit_map = {
        "2026-02-01": 4,
        "2026-02-02": 2,
        ...
    }
    """
    if not daily_commit_map:
        return 0

    dates = sorted(daily_commit_map.keys(), reverse=True)
    streak = 0
    prev_date = None

    for date_str in dates:
        try:
            current_date = datetime.fromisoformat(date_str[:10])
        except Exception:
            continue

        if daily_commit_map[date_str] > 0:
            if prev_date is None:
                streak = 1
            else:
                if (prev_date - current_date).days == 1:
                    streak += 1
                else:
                    break
            prev_date = current_date
        else:
            break

    # Normalize (14-day streak = 100)
    wsi = (streak / 14) * 100
    return min(wsi, 100)

def calculate_volatility_index(last_14_days_counts):
    if not last_14_days_counts or len(last_14_days_counts) < 2:
        return 0

    try:
        std_dev = statistics.stdev(last_14_days_counts)
    except Exception:
        return 0

    # Normalize assuming 0–10 typical range
    avi = (std_dev / 10) * 100
    return min(avi, 100)

def calculate_spike_crash(last_14_days_counts):
    if not last_14_days_counts or len(last_14_days_counts) < 14:
        return 0

    first_week = sum(last_14_days_counts[:7])
    second_week = sum(last_14_days_counts[7:14])

    if first_week > 2 * second_week:
        return 80  # strong spike-crash
    return 0

def calculate_burnout_score(lni, wsi, avi, scp):
    score = (
        0.30 * lni +
        0.25 * wsi +
        0.25 * avi +
        0.20 * scp
    )
    return min(round(score, 2), 100)

def generate_recommendation(score, lni, wsi, entropy, weekend_ratio):
    insights = []

    if lni > 30:
        insights.append("Frequent late-night coding detected. Consider stabilizing sleep cycles.")

    if wsi > 10:
        insights.append("Long work streak observed. Schedule rest days.")

    if entropy > 40:
        insights.append("Your coding rhythm is highly unpredictable. Try structured work blocks.")

    if weekend_ratio > 40:
        insights.append("High weekend workload detected. Protect personal time.")

    if score < 20:
        risk = "Stable"
    elif score < 40:
        risk = "Mild Risk"
    elif score < 60:
        risk = "Moderate Risk"
    else:
        risk = "High Risk"

    if not insights:
        insights.append("Your workflow is balanced and sustainable.")

    return {
        "risk_level": risk,
        "recommendation": insights
    }

def calculate_productivity_entropy(commit_counts):
    if not commit_counts:
        return 0
    total = sum(commit_counts)
    if total == 0:
        return 0

    probabilities = [c / total for c in commit_counts if c > 0]
    entropy = -sum(p * np.log2(p) for p in probabilities)

    return round(entropy * 10, 2)

def calculate_weekend_ratio(commits):
    weekend_commits = 0
    total_commits = 0

    for entry in commits:
        if not isinstance(entry, dict):
            continue
        date_str = entry.get("date")
        if not date_str:
            continue
        try:
            clean_date = str(date_str).replace("Z", "+00:00")
            date_obj = datetime.fromisoformat(clean_date)
            count = entry.get("count", 1)

            total_commits += count
            if date_obj.weekday() >= 5:
                weekend_commits += count
        except Exception:
            continue

    if total_commits == 0:
        return 0

    ratio = (weekend_commits / total_commits) * 100
    return round(ratio, 2)

def calculate_commit_clustering(commit_counts):
    if not commit_counts:
        return 0

    avg = np.mean(commit_counts)
    burst_days = sum(1 for c in commit_counts if c > avg * 2)

    clustering_score = (burst_days / len(commit_counts)) * 100
    return round(clustering_score, 2)

def detect_burnout(commits, daily_commit_map, last_14_days_counts):
    lni = calculate_late_night_intensity(commits)
    wsi = calculate_work_streak_index(daily_commit_map)
    avi = calculate_volatility_index(last_14_days_counts)
    scp = calculate_spike_crash(last_14_days_counts)
    entropy_index = calculate_productivity_entropy(last_14_days_counts)
    weekend_ratio = calculate_weekend_ratio(commits)
    clustering_index = calculate_commit_clustering(last_14_days_counts)

    score = (
        0.2 * avi +
        0.2 * wsi +
        0.15 * lni +
        0.1 * scp +
        0.15 * entropy_index +
        0.1 * weekend_ratio +
        0.1 * clustering_index
    )

    score = min(round(score, 2), 100)
    predicted_burnout = min(score + (avi * 0.05), 100)
    recommendation_data = generate_recommendation(
        score,
        lni,
        wsi,
        entropy_index,
        weekend_ratio
    )

    return {
        "score": score,
        "status": recommendation_data["risk_level"],
        "recommendation": recommendation_data["recommendation"],
        "feature_breakdown": {
            "late_night_intensity": lni,
            "work_streak_index": wsi,
            "volatility_index": avi,
            "spike_crash_pattern": scp,
            "productivity_entropy": entropy_index,
            "weekend_ratio": weekend_ratio,
            "commit_clustering": clustering_index
        },
        "predicted_burnout": round(predicted_burnout, 1)
    }

def generate_insights(feature_matrix):
    insights = []
    if len(feature_matrix) < 2:
        return insights

    current = feature_matrix[-1]
    previous = feature_matrix[-2]

    commits_now, night_now, days_now = current
    commits_prev, night_prev, days_prev = previous

    if commits_prev > 0 and commits_now > commits_prev * 1.5:
        insights.append("Commit volume increased significantly from last week.")
    if night_now > night_prev + 0.2:
        insights.append("Night-time activity has increased.")
    if commits_now > commits_prev and days_now < days_prev:
        insights.append("More work compressed into fewer days.")

    return insights