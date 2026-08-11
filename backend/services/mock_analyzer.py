"""Mock analysis service for ClariFact AI (Stage 1).

This module SIMULATES the future AI analysis pipeline. It does NOT perform
any real misinformation detection, fact checking, or multimodal understanding.
Values are derived deterministically from the submitted content so the results
are stable for identical inputs while still varying across different inputs.
"""

import hashlib
import os

# Interpretation bands (application labels for the prototype only).
BANDS = [
    (0, 20, "Very Low Credibility"),
    (21, 40, "Low Credibility"),
    (41, 60, "Uncertain"),
    (61, 80, "Likely Credible"),
    (81, 100, "Highly Credible"),
]

CLAIM_STATUSES = ["SUPPORTED", "REFUTED", "MISLEADING", "UNVERIFIED"]


def _digest(value):
    """Return a stable numeric seed (0-100) for a given string value."""
    raw = hashlib.sha256(str(value).encode("utf-8")).hexdigest()
    return int(raw[:8], 16) % 101


def _bounded(*bases):
    """Combine deterministic bases and clamp to a 0-100 integer."""
    total = sum(bases)
    return max(0, min(100, int(total / len(bases))))


def _verdict(score):
    """Map a score to its prototype verdict label."""
    for low, high, label in BANDS:
        if low <= score <= high:
            return label
    return "Uncertain"


def _result(score, confidence, input_type, subject):
    """Build a consistent result payload across all input types."""
    promo = _bounded(_digest(subject + ":promo"), 24, 30)
    ad_prob = _bounded(_digest(subject + ":ad"), 12, 18)
    disclosure = "Detected" if ad_prob > 12 else "Not Detected"

    claim_confidence = _bounded(confidence, _digest(subject + ":claim"), 88)
    if score >= 60:
        claim_status = "SUPPORTED"
    elif score >= 40:
        claim_status = "UNVERIFIED"
    elif score >= 20:
        claim_status = "MISLEADING"
    else:
        claim_status = "REFUTED"

    summary = []
    if score >= 55:
        summary.append("Supporting evidence signals detected.")
    else:
        summary.append("Limited supporting evidence signals detected.")
    if score >= 45:
        summary.append("No strong misleading signals detected.")
    else:
        summary.append("Some misleading signals were identified.")
    if score <= 70:
        summary.append("One claim may require additional verification.")
    else:
        summary.append("Promotional signals appear to be disclosed.")
    if ad_prob >= 15:
        summary.append("Potential promotional content detected.")
    else:
        summary.append("No strong promotional signals detected.")

    evidence_count = 3 if score >= 40 else 2
    evidence_types = ["Supporting", "Contradicting", "Neutral"]
    evidence = []
    for i in range(evidence_count):
        etype = evidence_types[i % len(evidence_types)]
        relevance = _bounded(_digest(subject + ":ev" + str(i)), 78, 92)
        if etype == "Supporting":
            desc = "Mock evidence for interface demonstration."
        elif etype == "Contradicting":
            desc = "Mock evidence for interface demonstration."
        else:
            desc = "Mock evidence for interface demonstration."
        evidence.append(
            {
                "source": "Demo Evidence Source",
                "type": etype,
                "relevance": relevance,
                "description": desc,
            }
        )

    return {
        "input_type": input_type,
        "credibility_score": score,
        "verdict": _verdict(score),
        "confidence": confidence,
        "claims": [
            {
                "text": "Example detected claim.",
                "status": claim_status,
                "confidence": claim_confidence,
            }
        ],
        "promotion": {
            "promotional_content": promo,
            "advertisement_probability": ad_prob,
            "disclosure": disclosure,
        },
        "evidence": evidence,
        "summary": summary,
    }


def analyze_text(text):
    """Generate a mock result for text input."""
    length = len(text.strip())
    score = _bounded(_digest(text), 42, 74)
    confidence = _bounded(_digest(text + ":conf"), 72, 88)
    subject = "text:" + text[:120]
    return _result(score, confidence, "text", subject)


def analyze_image(file):
    """Generate a mock result for an uploaded image file."""
    seed = _bounded(_digest(file.filename), _digest(file.content_length or 0), 55)
    score = _bounded(seed, 38, 78)
    confidence = _bounded(_digest(file.filename + ":conf"), 70, 86)
    subject = "image:" + file.filename
    return _result(score, confidence, "image", subject)


def analyze_audio(file):
    """Generate a mock result for an uploaded audio file."""
    seed = _bounded(_digest(file.filename), _digest(file.content_length or 0), 48)
    score = _bounded(seed, 36, 76)
    confidence = _bounded(_digest(file.filename + ":conf"), 68, 84)
    subject = "audio:" + file.filename
    return _result(score, confidence, "audio", subject)


def analyze_video(file):
    """Generate a mock result for an uploaded video file."""
    seed = _bounded(_digest(file.filename), _digest(file.content_length or 0), 50)
    score = _bounded(seed, 40, 80)
    confidence = _bounded(_digest(file.filename + ":conf"), 70, 86)
    subject = "video:" + file.filename
    return _result(score, confidence, "video", subject)
