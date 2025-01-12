from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
import databutton as db

router = APIRouter()

class MotivationRequest(BaseModel):
    current_streak: int
    highest_streak: int
    total_focus_minutes: int
    today_completed: bool

class MotivationResponse(BaseModel):
    message: str

def create_prompt(data: MotivationRequest) -> str:
    context = f"""Current streak: {data.current_streak} days
    Highest streak: {data.highest_streak} days
    Total focus time: {data.total_focus_minutes} minutes
    Today's session: {'Completed' if data.today_completed else 'Not completed yet'}"""
    
    return f"""You are an encouraging and motivational AI focus coach. 
    Based on the user's focus statistics, provide a short, personalized message (max 2 sentences) 
    that acknowledges their progress and encourages them to keep going.
    
    User's current stats:
    {context}
    
    Generate an encouraging message that:
    1. Is specific to their current progress
    2. Mentions their streak or focus time achievements
    3. Has a positive, uplifting tone
    4. Includes relevant emoji
    5. Is concise (max 2 sentences)
    
    Message:"""

@router.post("/get-motivation")
def get_motivation(request: MotivationRequest) -> MotivationResponse:
    client = OpenAI(api_key=db.secrets.get("OPENAI_API_KEY"))
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a motivational focus coach that provides encouraging messages."},
            {"role": "user", "content": create_prompt(request)}
        ],
        max_tokens=100,
        temperature=0.7
    )
    
    message = response.choices[0].message.content.strip()
    return MotivationResponse(message=message)
