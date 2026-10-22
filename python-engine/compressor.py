def compress_trace(trace):

    compressed = []

    previous_heap = {}
    previous_variables = {}

    for step in trace:

        item = {
            "event": step.get("event"),
            "line": step.get("line")
        }

        # -------------------------
        # Function
        # -------------------------

        function = step.get("function")

        if function and function != "<module>":
            item["function"] = function

        # -------------------------
        # Variables
        # -------------------------

        variables = step.get("variables", {})

        if variables != previous_variables:

            if variables:
                item["variables"] = variables

        # -------------------------
        # Heap changes
        # -------------------------

        heap = step.get("heap", {})

        changed_objects = []

        for object_id, obj in heap.items():

            old_obj = previous_heap.get(object_id)

            if obj == old_obj:
                continue

            # -------------------------
            # Normalized object
            # -------------------------

            if isinstance(obj, dict):

                obj_type = obj.get("type")

                # Custom object / Node
                if obj_type == "object":

                    fields = obj.get("fields", {})

                    if fields:
                        changed_objects.append({
                            "object": object_id,
                            "type": "object",
                            "class": obj.get("class"),
                            "changes": fields
                        })

                # Python list
                elif obj_type == "list":

                    changed_objects.append({
                        "object": object_id,
                        "type": "list",
                        "items": obj.get("items", [])
                    })

                # Python dictionary
                elif obj_type == "dict":

                    changed_objects.append({
                        "object": object_id,
                        "type": "dict",
                        "entries": obj.get("entries", [])
                    })

            # Unknown heap value
            else:

                changed_objects.append({
                    "object": object_id,
                    "value": obj
                })

        if changed_objects:
            item["heap"] = changed_objects

        # -------------------------
        # stdout
        # -------------------------

        stdout = step.get("stdout", "")

        previous_stdout = ""

        if compressed:
            previous_stdout = compressed[-1].get(
                "stdout",
                ""
            )

        if stdout != previous_stdout and stdout:
            item["stdout"] = stdout

        # -------------------------
        # Save step
        # -------------------------

        compressed.append(item)

        # -------------------------
        # Save current state
        # -------------------------

        previous_heap = heap
        previous_variables = variables

    return compressed