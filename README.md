# IntelliAgent

IntelliAgent is a LangGraph-based coding agent that converts a user request into:
1. A structured project plan
2. A step-by-step implementation plan
3. File edits generated via tool-enabled coding steps

The agent uses Groq (`openai/gpt-oss-120b`) through LangChain.

## Requirements

- Python `>=3.11` (3.12 recommended)
- A Groq API key

## Setup

From the project root:

```powershell
cd C:\Users\souvi\OneDrive\Desktop\IntelliAgent
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -e .
```

Create a `.env` file in the root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

## Run

Always run from project root:

```powershell
cd C:\Users\souvi\OneDrive\Desktop\IntelliAgent
.\.venv\Scripts\Activate.ps1
python -m agent.graph
```

## Output Location

Generated/edited project files are written under:

`generated_project/`

## Project Structure

```text
agent/
  __init__.py
  graph.py      # LangGraph flow: planner -> architect -> coder
  prompts.py    # Prompt templates for each stage
  states.py     # Pydantic schemas (Plan, TaskPlan, CoderState, etc.)
  tools.py      # File system tools used by coder agent
```

## How It Works

- `planner_agent`: Converts user prompt to `Plan`
- `architect_agent`: Converts `Plan` to `TaskPlan` (ordered implementation steps)
- `coder_agent`: Executes each step using tools (`read_file`, `write_file`, `list_files`, `get_current_directory`)

## PyCharm Run Configuration

- Interpreter:
  `C:\Users\souvi\OneDrive\Desktop\IntelliAgent\.venv\Scripts\python.exe`
- Run type: Module name
- Module: `agent.graph`
- Working directory:
  `C:\Users\souvi\OneDrive\Desktop\IntelliAgent`

## Troubleshooting

- `ModuleNotFoundError: No module named 'agent'`
  - Run from project root and use module mode:
    `python -m agent.graph`

- `ModuleNotFoundError: No module named 'langchain'` or `langgraph`
  - You are using the wrong interpreter. Use the `.venv` interpreter.

- Pydantic warning on Python 3.14
  - Prefer Python 3.11/3.12 for better compatibility with current LangChain stack.
