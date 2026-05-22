import numpy as np
from datetime import datetime
from collections import defaultdict

def extract_weekly_features(commit_dates):

    weekly_data = defaultdict(lambda: {
        "commits": 0,
        "night_commits": 0,
        "active_days": set()
    })

    for date_str in commit_dates:
        timestamp = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")

        week_key = timestamp.strftime("%Y-%W")

        weekly_data[week_key]["commits"] += 1
        weekly_data[week_key]["active_days"].add(timestamp.date())

        if timestamp.hour < 5:
            weekly_data[week_key]["night_commits"] += 1

    feature_matrix = []

    for week in sorted(weekly_data.keys()):
        data = weekly_data[week]

        if data["commits"] == 0:
            continue

        night_ratio = data["night_commits"] / data["commits"]

        feature_matrix.append([
            data["commits"],
            night_ratio,
            len(data["active_days"]),
        ])

    return np.array(feature_matrix) if feature_matrix else np.empty((0, 3))