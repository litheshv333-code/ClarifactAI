"""API routes for ClariFact AI (Stage 1)."""

import os

from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename

from services.mock_analyzer import analyze_audio, analyze_image, analyze_text, analyze_video

analysis_bp = Blueprint("analysis", __name__)

ALLOWED_EXTENSIONS = {
    "image": {"png", "jpg", "jpeg"},
    "audio": {"mp3"},
    "video": {"mp4"},
}

MAX_CONTENT_LENGTH = 100 * 1024 * 1024  # 100 MB


def _error(message, status=400):
    return jsonify({"error": message}), status


def _extension(filename):
    if not filename or "." not in filename:
        return ""
    return filename.rsplit(".", 1)[1].lower()


def _save_upload(upload, upload_kind):
    """Validate, secure and persist an uploaded file."""
    if upload is None or not upload.filename:
        return None, _error("Please attach a file.")

    ext = _extension(upload.filename)
    if ext not in ALLOWED_EXTENSIONS[upload_kind]:
        allowed = ", ".join(sorted(ALLOWED_EXTENSIONS[upload_kind]))
        return None, _error(f"Unsupported file type. Allowed: {allowed}")

    upload.seek(0, os.SEEK_END)
    size = upload.tell()
    upload.seek(0)
    if size > MAX_CONTENT_LENGTH:
        return None, _error("File is too large. Maximum size is 100 MB.")

    filename = secure_filename(upload.filename)
    if not filename:
        filename = "upload"
    filename = f"{os.path.splitext(filename)[0]}{os.path.extsep}{ext}"

    folder = os.path.join(current_app.config["UPLOAD_FOLDER"], upload_kind + "s")
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, filename)
    upload.save(path)
    return path, None


@analysis_bp.route("/api/analyze/text", methods=["POST"])
def analyze_text_route():
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()
    if not text:
        return _error("Please enter some text to analyze.")
    if len(text) > 5000:
        return _error("Text is too long. Maximum length is 5000 characters.")

    result = analyze_text(text)
    return jsonify(result), 200


@analysis_bp.route("/api/analyze/image", methods=["POST"])
def analyze_image_route():
    path, err = _save_upload(request.files.get("file"), "image")
    if err is not None:
        return err
    result = analyze_image(request.files["file"])
    return jsonify(result), 200


@analysis_bp.route("/api/analyze/audio", methods=["POST"])
def analyze_audio_route():
    path, err = _save_upload(request.files.get("file"), "audio")
    if err is not None:
        return err
    result = analyze_audio(request.files["file"])
    return jsonify(result), 200


@analysis_bp.route("/api/analyze/video", methods=["POST"])
def analyze_video_route():
    path, err = _save_upload(request.files.get("file"), "video")
    if err is not None:
        return err
    result = analyze_video(request.files["file"])
    return jsonify(result), 200
