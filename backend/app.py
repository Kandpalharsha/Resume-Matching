from flask import Flask, request, jsonify
from flask_cors import CORS
from resume_parser import extract_resume_text
from skill_extractor import extract_skills
from scoring_engine import calculate_score
from semantic_matcher import find_semantic_matches
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Resume Analyzer Backend Running"

@app.route("/analyze", methods=["POST"])
def analyze():

    resume = request.files["resume"]
    job_description = request.form["job_description"]

    resume_text = extract_resume_text(resume)

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    matched, missing = find_semantic_matches(resume_skills, job_skills)

    score = int((len(matched)/len(job_skills))*100) if job_skills else 0

    return jsonify({
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "suggestions":[
            "Add more backend related projects",
            "Include missing skills in resume",
            "Highlight relevant experience"
        ]
    })
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)