import json

log_file = "/home/clouder/.gemini/antigravity-cli/brain/74f699fd-4686-4bd7-8785-781c4ec34204/.system_generated/logs/transcript_full.jsonl"
with open(log_file, "r") as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
            for tc in data["tool_calls"]:
                name = tc.get("function", {}).get("name")
                if name in ["replace_file_content", "multi_replace_file_content", "write_to_file"]:
                    args_str = tc["function"]["arguments"]
                    try:
                        args = json.loads(args_str)
                        if "SelectWork.tsx" in args.get("TargetFile", "") or "WorkflowSteps.tsx" in args.get("TargetFile", ""):
                            print(f"FOUND {args.get('TargetFile')} edit at step {data.get('step_index')} with tool {name}")
                    except Exception as e:
                        if "SelectWork" in args_str:
                            print(f"FOUND string SelectWork at step {data.get('step_index')} with tool {name}")
