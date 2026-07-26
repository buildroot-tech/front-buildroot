import json

log_file = "/home/clouder/.gemini/antigravity-cli/brain/74f699fd-4686-4bd7-8785-781c4ec34204/.system_generated/logs/transcript_full.jsonl"

with open(log_file, "r") as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
            for tc in data["tool_calls"]:
                name = tc.get("function", {}).get("name")
                if name == "write_to_file":
                    args = json.loads(tc["function"]["arguments"])
                    if "SelectWork.tsx" in args.get("TargetFile", ""):
                        with open("SelectWork.tsx.bak", "w") as out:
                            out.write(args.get("CodeContent", ""))
