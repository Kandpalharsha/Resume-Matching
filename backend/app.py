import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Load environment variables
load_dotenv()

from services.matching import process_resume, process_jd, match_resume_to_jd
from services.chat import chat_with_context

app = Flask(__name__)
# Restrict CORS to specific origins (Checklist 7.1)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

# Restrict maximum upload size to 5MB (Checklist 8.1)
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

# Setup Rate Limiter (Checklist 6.1)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per day", "30 per hour"],
    storage_uri="memory://"
)

@app.route('/api/upload-resume', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    # Server-side validation of MIME type and extension (Checklist 8.1)
    if file and file.filename.endswith('.pdf') and file.mimetype == 'application/pdf':
        try:
            resume_text = process_resume(file)
            return jsonify({"resume_text": resume_text})
        except Exception as e:
            logging.error(f"Error processing resume: {e}")
            return jsonify({"error": "Internal Server Error"}), 500
    return jsonify({"error": "Invalid file type. Please upload a PDF."}), 400

@app.route('/api/upload-jd', methods=['POST'])
def upload_jd():
    data = request.json
    if not data or 'jd_text' not in data:
        return jsonify({"error": "No jd_text provided"}), 400
    
    jd_text = process_jd(data['jd_text'])
    return jsonify({"jd_text": jd_text})

@app.route('/api/match', methods=['POST'])
@limiter.limit("5 per minute")
def match():
    data = request.json
    if not data or 'resume_text' not in data or 'jd_text' not in data:
        return jsonify({"error": "resume_text and jd_text are required"}), 400
        
    try:
        match_result = match_resume_to_jd(data['resume_text'], data['jd_text'])
        # match_result contains { overall_score, breakdown, suggestions }
        return jsonify(match_result)
    except Exception as e:
        logging.error(f"Match error: {e}", exc_info=True)
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/api/chat', methods=['POST'])
@limiter.limit("10 per minute")
def chat():
    data = request.json
    if not data or 'messages' not in data or 'context' not in data:
        return jsonify({"error": "messages and context are required"}), 400
        
    try:
        response = chat_with_context(data['messages'], data['context'])
        return jsonify({"response": response})
    except Exception as e:
        logging.error(f"Chat error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
