import json

log_file = "/home/clouder/.gemini/antigravity-cli/brain/74f699fd-4686-4bd7-8785-781c4ec34204/.system_generated/logs/transcript_full.jsonl"

with open(log_file, "r") as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
            
        if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
            for tc in data["tool_calls"]:
                name = tc.get("name", "")
                if name in ["replace_file_content", "multi_replace_file_content", "write_to_file"]:
                    args = tc.get("args", {})
                    target_file = args.get("TargetFile", "")
                    if "WorkflowSteps.tsx" in target_file or "SelectWork.tsx" in target_file or "page.tsx" in target_file:
                        print(f"--- STEP {data.get('step_index')} {name} {target_file} ---")
