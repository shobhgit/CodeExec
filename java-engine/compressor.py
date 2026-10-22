import copy


def compress_trace(trace):

    if not trace:
        return []


    compressed_trace = []

    previous_step = None


    for step in trace:

        # ---------------------------------
        # First step
        # ---------------------------------

        if previous_step is None:

            compressed_trace.append(
                copy.deepcopy(step)
            )

            previous_step = step

            continue


        # ---------------------------------
        # Skip exact duplicate consecutive step
        # ---------------------------------

        if step == previous_step:

            continue


        # ---------------------------------
        # Keep changed step
        # ---------------------------------

        compressed_trace.append(
            copy.deepcopy(step)
        )

        previous_step = step


    return compressed_trace


def compress_result(result):

    # Preserve errors
    if result.get("status") == "error":

        return result


    return {
        "status": "success",

        "stdout": result.get(
            "stdout",
            ""
        ),

        "trace": compress_trace(
            result.get(
                "trace",
                []
            )
        )
    }