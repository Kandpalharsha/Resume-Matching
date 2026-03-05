from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

def find_semantic_matches(resume_skills, job_skills):

    matches = []
    missing = []

    for job_skill in job_skills:

        job_embedding = model.encode(job_skill, convert_to_tensor=True)

        best_score = 0

        for resume_skill in resume_skills:

            resume_embedding = model.encode(resume_skill, convert_to_tensor=True)

            score = util.cos_sim(job_embedding, resume_embedding)

            if score > best_score:
                best_score = score

        if best_score > 0.6:
            matches.append(job_skill)
        else:
            missing.append(job_skill)

    return matches, missing