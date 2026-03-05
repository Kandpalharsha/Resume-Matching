def calculate_score(resume_skills, job_skills):

    matched = []
    missing = []

    for skill in job_skills:

        if skill in resume_skills:
            matched.append(skill)

        else:
            missing.append(skill)

    score = int((len(matched) / len(job_skills)) * 100) if job_skills else 0

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }