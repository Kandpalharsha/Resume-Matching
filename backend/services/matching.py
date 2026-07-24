import pdfplumber
import os
from sentence_transformers import SentenceTransformer, util
from openai import OpenAI

# Using a small, fast model for semantic similarity
model = SentenceTransformer('all-MiniLM-L6-v2')
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) if os.getenv("OPENAI_API_KEY") else None

def process_resume(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    return text.strip()

def process_jd(text):
    return text.strip()

def match_resume_to_jd(resume_text, jd_text):
    from services.extract import extract_data
    
    # 1. Extract scoped data
    extracted_data = extract_data(resume_text, jd_text)
    r_data = extracted_data.get('resume', {})
    j_data = extracted_data.get('job_description', {})
    
    # 2. Build matchable units
    jd_reqs = []
    
    for skill in j_data.get('required_skills', []):
        # Handle dict or string depending on OpenAI's strictness
        if isinstance(skill, dict):
            s_name = skill.get('skill', '')
            s_pri = skill.get('priority', 'required')
            jd_reqs.append(f"Skill: {s_name} ({s_pri})")
        else:
            jd_reqs.append(f"Skill: {skill}")
            
    if j_data.get('experience_required'):
        jd_reqs.append(f"Experience: {j_data.get('experience_required')}")
        
    for resp in j_data.get('responsibilities', []):
        jd_reqs.append(f"Responsibility: {resp}")
        
    if j_data.get('domain_requirement'):
        jd_reqs.append(f"Domain: {j_data.get('domain_requirement')}")
        
    for cert in j_data.get('certifications_required', []):
        jd_reqs.append(f"Certification: {cert}")
        
    if not jd_reqs:
        # Fallback if extraction fails completely
        jd_reqs = [line.strip() for line in jd_text.split('\n') if len(line.strip()) > 10]
        if not jd_reqs: jd_reqs = [jd_text]

    # Resume evidence
    resume_lines = []
    
    for skill in r_data.get('technical_skills', []):
        resume_lines.append(f"Skill: {skill}")
        
    for proj in r_data.get('projects', []):
        if isinstance(proj, dict):
            techs = ", ".join(proj.get('technologies_used', []))
            resume_lines.append(f"Project: {proj.get('title', '')} - {proj.get('description', '')}. Technologies: {techs}")
        else:
            resume_lines.append(f"Project: {proj}")
            
    for cert in r_data.get('certifications', []):
        resume_lines.append(f"Certification: {cert}")
        
    if r_data.get('domain'):
        resume_lines.append(f"Domain: {r_data.get('domain')}")
        
    if r_data.get('academic_qualification'):
        resume_lines.append(f"Education: {r_data.get('academic_qualification')}")
        
    if not resume_lines:
        resume_lines = [line.strip() for line in resume_text.split('\n') if len(line.strip()) > 10]

    if not resume_lines:
        return {"overall_score": 0, "breakdown": [], "suggestions": [], "extracted_context": extracted_data}
    
    # 3. Embeddings
    jd_embeddings = model.encode(jd_reqs, convert_to_tensor=True)
    resume_embeddings = model.encode(resume_lines, convert_to_tensor=True)
    
    # Compute cosine similarities
    cosine_scores = util.cos_sim(jd_embeddings, resume_embeddings)
    
    breakdown = []
    total_score = 0
    total_weight = 0
    
    missing_items = []
    partial_items = []
    
    # 4. Classify and Score
    for i, req in enumerate(jd_reqs):
        best_score = max(cosine_scores[i]).item()
        best_idx = cosine_scores[i].argmax().item()
        best_evidence = resume_lines[best_idx]
        
        weight = 2 if "experience" in req.lower() or "years" in req.lower() else 1
        
        if best_score > 0.7:
            status = "matched"
            total_score += best_score * weight
        elif best_score > 0.4:
            status = "partial"
            total_score += best_score * weight
            partial_items.append(req)
        else:
            status = "missing"
            best_evidence = "No clear evidence found."
            missing_items.append(req)
            
        total_weight += weight
        
        breakdown.append({
            "requirement": req,
            "evidence": best_evidence,
            "status": status,
            "score": best_score,
            "weight_label": "Core Requirement" if weight == 2 else "Skill"
        })
        
    overall_score = (total_score / total_weight) * 100 if total_weight > 0 else 0
    
    # 5. Generate Suggestions using OpenAI
    suggestions = []
    if client and (missing_items or partial_items):
        prompt = f"""
        You are an expert career coach and technical recruiter.
        Based on the following structured requirements that are missing or only partially matched from the candidate's resume, generate 3 extremely concise, actionable suggestions for improving the resume.
        
        CRITICAL: Do NOT include filler text, introductions, or generic advice. Keep each suggestion to 1-2 short sentences maximum to save tokens.
        
        Missing Requirements: {missing_items[:3]}
        Partial Requirements: {partial_items[:3]}
        
        Candidate's current technical scope: {r_data.get('technical_skills', [])}
        
        Return the suggestions as a simple newline-separated list, no formatting or markdown.
        """
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=300
            )
            sugg_text = response.choices[0].message.content
            suggestions = [s.strip('- 1234567890.') for s in sugg_text.split('\n') if s.strip()]
        except Exception as e:
            print("OpenAI API Error in suggestions:", e)
            suggestions = ["Could not generate AI suggestions (check API key)."]
            
    return {
        "overall_score": min(int(overall_score), 100),
        "breakdown": breakdown,
        "suggestions": suggestions,
        "extracted_context": extracted_data
    }
