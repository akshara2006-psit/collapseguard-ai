import os
from openai import OpenAI


def generate_ai_coach(result, total_commits):
    """
    Generates AI burnout coaching.
    If OpenRouter fails, returns a reliable rule-based fallback.
    """

    score = float(result.get("score", 0))
    status = result.get("status", "Unknown")
    features = result.get("feature_breakdown", {}) or {}

    late = float(features.get("late_night_intensity", 0))
    weekend = float(features.get("weekend_ratio", 0))
    streak = float(features.get("work_streak_index", 0))
    volatility = float(features.get("volatility_index", 0))

    api_key = os.getenv("OPENROUTER_API_KEY")

    # ---------------------------------------------------------
    # AI VERSION
    # ---------------------------------------------------------

    if api_key:

        try:
            client = OpenAI(
                api_key=api_key,
                base_url="https://openrouter.ai/api/v1"
            )

            prompt = f"""
You are an expert developer wellness coach.

Analyze this developer's actual GitHub activity.

Burnout Score: {score}
Risk Level: {status}
Total Commits: {total_commits}

Behavioral Features:
{features}

Important signals:
Late-night intensity: {late}
Weekend work ratio: {weekend}
Work streak index: {streak}
Workload volatility: {volatility}

Give concise, specific and human-like advice.

Use EXACTLY this structure:

Insight:
1-2 sentences about the developer's actual behavior.

Risk:
1 short explanation of the main risk.

Advice:
- practical recommendation
- practical recommendation
- practical recommendation
"""

            response = client.chat.completions.create(
                model="openai/gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a professional developer "
                            "wellness coach. Be specific and concise."
                        )
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.8,
                extra_headers={
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "CollapseGuard"
                }
            )

            content = response.choices[0].message.content

            if content:
                return content

        except Exception as e:
            print("AI COACH ERROR:", e)

    # ---------------------------------------------------------
    # FALLBACK VERSION
    # ---------------------------------------------------------

    if score < 30:
        insight = (
            "Your recent development activity appears relatively "
            "balanced and sustainable."
        )
        risk = "Current burnout risk appears low."

    elif score < 60:
        insight = (
            "Your workload is beginning to show patterns that "
            "could become difficult to sustain."
        )
        risk = "Current activity suggests moderate burnout risk."

    else:
        insight = (
            "Your recent work pattern shows signs of sustained "
            "workload pressure and possible overwork."
        )
        risk = "Current activity suggests elevated burnout risk."

    advice = []

    if late > 40:
        advice.append(
            "Reduce frequent late-night coding sessions."
        )

    if weekend > 40:
        advice.append(
            "Protect weekends from unnecessary development work."
        )

    if streak > 50:
        advice.append(
            "Break long work streaks with deliberate recovery periods."
        )

    if volatility > 50:
        advice.append(
            "Aim for a more consistent workload instead of large spikes."
        )

    if not advice:
        advice.append(
            "Maintain your current work rhythm and continue monitoring trends."
        )

    return (
        f"Insight:\n"
        f"{insight}\n\n"
        f"Risk:\n"
        f"{risk}\n\n"
        f"Advice:\n"
        + "\n".join(f"- {item}" for item in advice[:3])
    )