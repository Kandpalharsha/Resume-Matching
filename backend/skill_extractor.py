skills_db = [
"python","java","react","node","flask",
"docker","aws","mongodb","mysql","rest api"
]

def extract_skills(text):

    text = text.lower()
    found = []

    for skill in skills_db:
        if skill in text:
            found.append(skill)

    return found