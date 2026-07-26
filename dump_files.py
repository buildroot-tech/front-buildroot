import json

log_file = "/home/clouder/.gemini/antigravity-cli/brain/74f699fd-4686-4bd7-8785-781c4ec34204/.system_generated/logs/transcript_full.jsonl"
select_work_code = ""
workflow_steps_code = ""

with open(log_file, "r") as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
            for tc in data["tool_calls"]:
                name = tc.get("function", {}).get("name")
                if name == "write_to_file":
                    args_str = tc["function"]["arguments"]
                    try:
                        args = json.loads(args_str)
                        target = args.get("TargetFile", "")
                        if "SelectWork.tsx" in target:
                            select_work_code = args.get("CodeContent", "")
                        elif "WorkflowSteps.tsx" in target:
                            workflow_steps_code = args.get("CodeContent", "")
                    except Exception as e:
                        pass
                elif name == "replace_file_content" or name == "multi_replace_file_content":
                    args_str = tc["function"]["arguments"]
                    try:
                        args = json.loads(args_str)
                        target = args.get("TargetFile", "")
                        # Let's not try to reconstruct multi_replace here, just print if we touched it
                        if "SelectWork.tsx" in target:
                            print(f"Touched SelectWork at step {data.get('step_index')}")
                    except:
                        pass

print("=== SelectWork ===")
print(select_work_code[:200])
