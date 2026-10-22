def normalize_result(raw_result):

    if raw_result.get("status") == "error":
        return raw_result

    normalized_trace = []

    for step in raw_result.get("trace", []):

        normalized_step = {
            "event": step.get("event", "line")
        }

        if step.get("line") is not None:
            normalized_step["line"] = step.get("line")

        function = step.get("function")

        if function:
            normalized_step["function"] = function

        variables = step.get("variables")

        if variables:
            normalized_step["variables"] = variables

        heap = step.get("heap")

        if heap:

            normalized_heap = []

            for obj in heap:

                normalized_object = {}

                if "object" in obj:
                    normalized_object["object"] = str(
                        obj["object"]
                    )

                if "type" in obj:
                    normalized_object["type"] = obj["type"]

                if "items" in obj:
                    normalized_object["items"] = obj["items"]

                if "class" in obj:
                    normalized_object["class"] = obj["class"]

                if "fields" in obj:
                    normalized_object["fields"] = obj["fields"]

                normalized_heap.append(
                    normalized_object
                )

            if normalized_heap:
                normalized_step["heap"] = normalized_heap

        normalized_trace.append(
            normalized_step
        )

    return {
        "status": "success",
        "stdout": raw_result.get("stdout", ""),
        "trace": normalized_trace
    }