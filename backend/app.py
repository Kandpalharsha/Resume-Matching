import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from resume_parser import extract_resume_text
from skill_extractor import extract_skills
from scoring_engine import calculate_score

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "AI Resume Analyzer Backend Running"


@app.route("/analyze", methods=["POST"])
def analyze():

    resume = request.files["resume"]
    job_description = request.form["job_description"]

    # Extract resume text
    resume_text = extract_resume_text(resume)

    # Extract skills
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    # Calculate score
    result = calculate_score(resume_skills, job_skills)

    return jsonify(result)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)