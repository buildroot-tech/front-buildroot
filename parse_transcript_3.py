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
                name = tc.get("function", {}).get("name")
                if name in ["replace_file_content", "multi_replace_file_content", "write_to_file"]:
                    args_str = tc["function"].get("arguments", "")
                    if "SelectWork.tsx" in args_str:
                        print(f"--- STEP {data.get('step_index')} {data.get('created_at')} ---")
                        try:
                            args = json.loads(args_str)
                            print(args.get("CodeContent", args.get("ReplacementChunks", args.get("ReplacementContent"))))
                        except Exception as e:
                            pass
