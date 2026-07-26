import json

log_file = "/home/clouder/.gemini/antigravity-cli/brain/74f699fd-4686-4bd7-8785-781c4ec34204/.system_generated/logs/transcript_full.jsonl"

print("Parsing transcript for SelectWork.tsx and WorkflowSteps.tsx replacements...")
with open(log_file, "r") as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
            
        if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
            for tc in data["tool_calls"]:
                name = tc.get("function", {}).get("name")
                if name in ["replace_file_content", "multi_replace_file_content", "write_to_file"]:
                    args_str = tc["function"].get("arguments", "")
                    if "SelectWork.tsx" in args_str or "WorkflowSteps.tsx" in args_str:
                        print(f"--- STEP {data.get('step_index')} ---")
                        print(f"Tool: {name}")
                        try:
                            args = json.loads(args_str)
                            print(json.dumps(args, indent=2))
                        except Exception as e:
                            print(f"Failed to parse args: {e}")
