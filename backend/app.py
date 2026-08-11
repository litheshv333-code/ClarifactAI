"""ClariFact AI — Stage 1 backend entry point.

Runs a simple Flask server that exposes the analysis API. The analysis itself
is fully mocked (see services/mock_analyzer.py); no AI/ML model is involved.
"""

import os

from flask import Flask, jsonify
from flask_cors import CORS

from routes.analysis import analysis_bp


def load_dotenv(dotenv_path=None):
    dotenv_path = dotenv_path or os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    if not os.path.exists(dotenv_path):
        return False

    with open(dotenv_path, encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value

    return True


load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_FOLDER = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend"))


def create_app():
    app = Flask(__name__, static_folder=FRONTEND_FOLDER, static_url_path="/")
    app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024  # 100 MB
    app.config["UPLOAD_FOLDER"] = os.path.join(BASE_DIR, "uploads")

    # Allow the static frontend (opened via file:// or any localhost port) to call the API.
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.register_blueprint(analysis_bp)

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "ClariFact AI"})

    @app.get("/")
    def index():
        return app.send_static_file("index.html")

    @app.errorhandler(413)
    def too_large(_e):
        return jsonify({"error": "File is too large. Maximum size is 100 MB."}), 413

    @app.errorhandler(404)
    def not_found(_e):
        return jsonify({"error": "Endpoint not found."}), 404

    @app.errorhandler(500)
    def server_error(_e):
        return jsonify({"error": "Something went wrong on the server."}), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
