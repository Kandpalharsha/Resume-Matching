import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) if os.getenv("OPENAI_API_KEY") else None

def chat_with_context(messages, context):
    if not client:
        return "OpenAI API key is missing. The chatbot is currently unavailable."
        
    resume_text = context.get('resume_text', '')
    jd_text = context.get('jd_text', '')
    breakdown = context.get('breakdown', [])
    extracted_context = context.get('extracted_context', {})
    
    # Format the breakdown for the AI
    breakdown_str = "\n".join([f"- {item['status'].upper()}: {item['requirement']} (Evidence: {item['evidence']})" for item in breakdown])
    
    # Extract structural data
    r_data = extracted_context.get('resume', {})
    j_data = extracted_context.get('job_description', {})
    
    import json
    
    system_prompt = f"""You are MatchWise, an expert AI career assistant helping a user tailor their resume to a specific job description.
    
    CRITICAL INSTRUCTIONS:
    1. Be extremely concise and direct to save tokens.
    2. Do NOT provide unnecessary, generic, or irrelevant information. Answer EXACTLY what the user asks and nothing more.
    3. Use the provided structured context. DO NOT invent information. If the answer is not in the context, clearly state that.
    4. If the user asks to rewrite a bullet point, rewrite it explicitly to better match the Job Description requirements that are marked PARTIAL or MISSING.
    5. When discussing a specific requirement, mention whether it is marked MATCHED, PARTIAL, or MISSING.
    
    --- EXTRACTED RESUME DATA ---
    {json.dumps(r_data, indent=2)}
    
    --- EXTRACTED JOB DESCRIPTION DATA ---
    {json.dumps(j_data, indent=2)}
    
    --- MATCH BREAKDOWN ---
    {breakdown_str}
    """
    
    api_messages = [{"role": "system", "content": system_prompt}]
    
    for msg in messages:
        api_messages.append({"role": msg['role'], "content": msg['content']})
        
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=api_messages,
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        print("OpenAI API Error in chat:", e)
        return f"Sorry, I encountered an error: {str(e)}"
