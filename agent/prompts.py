def planner_promt(user_prompt:str)->str:
    PLANNER_PROMPT = f"""
    You are a planner agent. Convert the user prompt into  complete engineering 
    User request:
     {user_prompt}
"""
    return PLANNER_PROMPT