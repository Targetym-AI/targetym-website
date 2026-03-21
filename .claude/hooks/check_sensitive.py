import sys
import json

SENSITIVE_FILES = [
    ".env",
    ".env.local",
    ".env.production",
    "task-definition.json",
    ".aws/credentials",
    "app/core/config.py",
    "alembic.ini"
]

tool_input = json.loads(sys.argv[1])
file_path = tool_input.get("path", "") or tool_input.get("file_path", "")

for sensitive in SENSITIVE_FILES:
    if sensitive in file_path:
        print(f"BLOQUÉ : accès refusé au fichier sensible {file_path}")
        sys.exit(2)  # exit 2 = bloquer l'action

sys.exit(0)  # exit 0 = autoriser
