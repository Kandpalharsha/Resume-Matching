import os
import json
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) if os.getenv("OPENAI_API_KEY") else None

SYSTEM_PROMPT = """You are a resume-matching data extraction engine. You will be given raw resume text and raw job description text. Extract ONLY the categories listed below into structured JSON. Do not include anything else.

From the RESUME, extract:
- technical_skills: list of specific skills, languages, frameworks, tools
- projects: list of { title, description, technologies_used }
- certifications: list of certification names
- domain: the candidate's field of study or professional domain, as a short phrase
- academic_qualification: degree + CGPA/percentage if present, as a short phrase

Exclude entirely: contact details, address, location, school/college names and dates with no skill content, objective or profile summary narrative text, headers, and any line that does not describe a skill, project, certification, domain, or qualification.

From the JOB DESCRIPTION, extract:
- required_skills: list of specific skills, languages, frameworks, tools (mark each as "required" or "preferred")
- experience_required: years and seniority level if stated
- responsibilities: list of concrete responsibility statements that imply a skill or deliverable
- domain_requirement: industry or domain focus if the JD specifies one
- certifications_required: list, if any

Exclude entirely: job title as a standalone field, company description/about-us text, "Job Summary"/"Profile Summary"/"About the Role" narrative paragraphs (extract only the individual sentences within them that state an actual requirement — discard the rest), location, remote/hybrid policy, salary/benefits, equal-opportunity statements, and application instructions.

Return only valid JSON matching this shape:
{
  "resume": {
    "technical_skills": [...],
    "projects": [{ "title": "", "description": "", "technologies_used": [] }],
    "certifications": [...],
    "domain": "",
    "academic_qualification": ""
  },
  "job_description": {
    "required_skills": [{ "skill": "", "priority": "required" | "preferred" }],
    "experience_required": "",
    "responsibilities": [...],
    "domain_requirement": "",
    "certifications_required": [...]
  }
}

If a category has no content in the source text, return an empty array or empty string for it — never invent content.
"""

def extract_data(resume_text, jd_text):
    if not client:
        print("Warning: OpenAI client not initialized. Cannot run extraction.")
        # Return empty structure as fallback
        return {
            "resume": {"technical_skills": [], "projects": [], "certifications": [], "domain": "", "academic_qualification": ""},
            "job_description": {"required_skills": [], "experience_required": "", "responsibilities": [], "domain_requirement": "", "certifications_required": []}
        }
        
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"--- RESUME ---\n{resume_text}\n\n--- JOB DESCRIPTION ---\n{jd_text}"}
            ],
            response_format={"type": "json_object"},
            temperature=0
        )
        
        result_text = response.choices[0].message.content
        return json.loads(result_text)
    except Exception as e:
        print(f"Extraction failed: {str(e)}")
        # Return fallback structure
        return {
            "resume": {"technical_skills": [], "projects": [], "certifications": [], "domain": "", "academic_qualification": ""},
            "job_description": {"required_skills": [], "experience_required": "", "responsibilities": [], "domain_requirement": "", "certifications_required": []}
        }
