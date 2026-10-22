import copy


def normalize_heap(heap):
    result = {}

    for object_id, obj in heap.items():

        # Already normalized object
        if isinstance(obj, dict):
            result[str(object_id)] = obj
            continue

        # Python Tutor heap object
        if not isinstance(obj, list) or len(obj) < 2:
            result[str(object_id)] = obj
            continue

        object_type = obj[0]

        # -------------------------
        # INSTANCE
        # -------------------------

        if object_type == "INSTANCE":

            class_name = obj[1]
            fields = {}

            for field in obj[2:]:

                if (
                    isinstance(field, list)
                    and len(field) == 2
                ):
                    name = field[0]
                    value = field[1]

                    fields[name] = normalize_value(value)

            result[str(object_id)] = {
                "type": "object",
                "class": class_name,
                "fields": fields
            }

        # -------------------------
        # LIST / ARRAY
        # -------------------------

        elif object_type == "LIST":

            values = []

            for value in obj[1:]:
                values.append(
                    normalize_value(value)
                )

            result[str(object_id)] = {
                "type": "list",
                "items": values
            }

        # -------------------------
        # DICT
        # -------------------------

        elif object_type == "DICT":

            entries = []

            for entry in obj[1:]:

                if (
                    isinstance(entry, list)
                    and len(entry) == 2
                ):
                    key = normalize_value(entry[0])
                    value = normalize_value(entry[1])

                    entries.append({
                        "key": key,
                        "value": value
                    })

            result[str(object_id)] = {
                "type": "dict",
                "entries": entries
            }

        # -------------------------
        # UNKNOWN
        # -------------------------

        else:
            result[str(object_id)] = obj

    return result


def normalize_value(value):

    # Reference
    if (
        isinstance(value, list)
        and len(value) == 2
        and value[0] == "REF"
    ):
        return {
            "ref": value[1]
        }

    # Recursive list
    if isinstance(value, list):
        return [
            normalize_value(item)
            for item in value
        ]

    # Dictionary
    if isinstance(value, dict):
        return {
            key: normalize_value(val)
            for key, val in value.items()
        }

    return value

def normalize_variables(variables):
    """
    Clean globals/locals.
    """

    result = {}

    for name, value in variables.items():

        # Ignore Python Tutor internal/imported stuff
        if isinstance(value, list):
            if (
                len(value) >= 2
                and value[0] == "IMPORTED_FAUX_PRIMITIVE"
            ):
                continue

        result[name] = normalize_value(value)

    return result


def normalize_step(step):
    """
    Convert one Python Tutor execution step.
    """

    event = step.get("event")

    if event == "step_line":
        event = "line"

    normalized = {
        "event": event,
        "line": step.get("line"),
        "function": step.get("func_name"),
        "variables": normalize_variables(
            step.get("globals", {})
        ),
        "stack": copy.deepcopy(
            step.get("stack_to_render", [])
        ),
        "heap": normalize_heap(
            step.get("heap", {})
        ),
        "stdout": step.get("stdout", "")
    }

    return normalized


def normalize_trace(trace):
    """
    Normalize the complete execution trace.
    """

    return [
        normalize_step(step)
        for step in trace
    ]


def normalize_result(raw_result):
    """
    Normalize complete Python Tutor execution result.
    """

    return {
        "status": raw_result.get(
            "status",
            "success"
        ),
        "stdout": (
            raw_result["trace"][-1].get("stdout", "")
            if raw_result.get("trace")
            else ""
        ),
        "trace": normalize_trace(
            raw_result.get("trace", [])
        )
    }