import json

log_file = "/home/clouder/.gemini/antigravity-cli/brain/74f699fd-4686-4bd7-8785-781c4ec34204/.system_generated/logs/transcript_full.jsonl"

select_work_content = ""
workflow_steps_content = ""

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
                    
                    if "SelectWork.tsx" in target_file:
                        if name == "write_to_file":
                            select_work_content = args.get("CodeContent", "")
                        elif name == "replace_file_content":
                            target = args.get("TargetContent", "")
                            replacement = args.get("ReplacementContent", "")
                            if target in select_work_content:
                                select_work_content = select_work_content.replace(target, replacement)
                        elif name == "multi_replace_file_content":
                            chunks = args.get("ReplacementChunks", [])
                            for chunk in chunks:
                                target = chunk.get("TargetContent", "")
                                replacement = chunk.get("ReplacementContent", "")
                                if target in select_work_content:
                                    select_work_content = select_work_content.replace(target, replacement)
                                    
                    elif "WorkflowSteps.tsx" in target_file:
                        if name == "write_to_file":
                            workflow_steps_content = args.get("CodeContent", "")
                        elif name == "replace_file_content":
                            target = args.get("TargetContent", "")
                            replacement = args.get("ReplacementContent", "")
                            if target in workflow_steps_content:
                                workflow_steps_content = workflow_steps_content.replace(target, replacement)
                        elif name == "multi_replace_file_content":
                            chunks = args.get("ReplacementChunks", [])
                            for chunk in chunks:
                                target = chunk.get("TargetContent", "")
                                replacement = chunk.get("ReplacementContent", "")
                                if target in workflow_steps_content:
                                    workflow_steps_content = workflow_steps_content.replace(target, replacement)

with open("SelectWork_reconstructed.tsx", "w") as f:
    f.write(select_work_content)
    
with open("WorkflowSteps_reconstructed.tsx", "w") as f:
    f.write(workflow_steps_content)
