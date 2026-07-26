import json

log_file = "/home/clouder/.gemini/antigravity-cli/brain/74f699fd-4686-4bd7-8785-781c4ec34204/.system_generated/logs/transcript_full.jsonl"

with open(log_file, "r") as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
            
        if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
            if data.get("step_index") == 796:
                for tc in data["tool_calls"]:
                    args = tc.get("args", {})
                    print(json.dumps(args, indent=2))
