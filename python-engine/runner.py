import json
import io
import contextlib

import pg_logger
from normalizer import normalize_result
from compressor import compress_trace


STUDENT_FILE = "/code/test.py"


def create_error(error_type, message):
    return {
        "status": "error",
        "error": {
            "type": error_type,
            "message": message
        }
    }


def main():

    # ========================================
    # READ STUDENT CODE
    # ========================================

    try:
        with open(STUDENT_FILE, "r") as f:
            code = f.read()

    except Exception as e:

        print(
            json.dumps(
                create_error(
                    type(e).__name__,
                    str(e)
                ),
                indent=2
            )
        )

        return


    # ========================================
    # TRACER OPTIONS
    # ========================================

    options = {
        "cumulative_mode": False,
        "heap_primitives": False,
        "show_only_outputs": False
    }


    # ========================================
    # STORE FINAL EXECUTION RESULT
    # ========================================

    execution_result = {
        "value": None
    }


    # ========================================
    # FINALIZER
    # ========================================

    def finalizer(main_code, trace):

        raw_result = {
            "status": "success",
            "code": main_code,
            "trace": trace
        }


        # Normalize trace

        normalized = normalize_result(
            raw_result
        )


        # Compress trace

        normalized["trace"] = compress_trace(
            normalized["trace"]
        )


        # ========================================
        # DETECT EXECUTION ERRORS
        # ========================================

        for event in normalized["trace"]:

            event_type = event.get("event")

            if event_type in [
                "exception",
                "uncaught_exception"
            ]:

                normalized["status"] = "error"

                normalized["error"] = {
                    "type": "ExecutionError",
                    "message": (
                        "An exception occurred during "
                        "code execution."
                    )
                }

                break


        # ========================================
        # DETECT INSTRUCTION LIMIT
        # ========================================

        if normalized["status"] == "success":

            for event in normalized["trace"]:

                event_type = event.get("event")

                if event_type == "instruction_limit_reached":

                    normalized["status"] = "error"

                    normalized["error"] = {
                        "type": "InstructionLimitExceeded",
                        "message": (
                            "Code execution stopped because "
                            "the instruction limit was reached."
                        )
                    }

                    break


        # ========================================
        # STORE RESULT
        # ========================================

        execution_result["value"] = normalized


    # ========================================
    # CAPTURE INTERNAL OUTPUT
    # ========================================

    captured_stdout = io.StringIO()
    captured_stderr = io.StringIO()


    # ========================================
    # EXECUTE STUDENT CODE
    # ========================================

    try:

        with contextlib.redirect_stdout(
                captured_stdout
        ), contextlib.redirect_stderr(
            captured_stderr
        ):

            pg_logger.exec_script_str(
                code,
                "[]",
                json.dumps(options),
                finalizer
            )


    except Exception as e:

        execution_result["value"] = create_error(
            type(e).__name__,
            str(e)
        )


    # ========================================
    # RETURN STRUCTURED RESULT
    # ========================================

    if execution_result["value"] is not None:

        print(
            json.dumps(
                execution_result["value"],
                indent=2
            )
        )

        return


    # ========================================
    # CHECK CAPTURED ERRORS
    # ========================================

    stderr_output = (
        captured_stderr
        .getvalue()
        .strip()
    )

    stdout_output = (
        captured_stdout
        .getvalue()
        .strip()
    )


    error_output = stderr_output

    if not error_output:
        error_output = stdout_output


    # ========================================
    # EXTRACT ERROR
    # ========================================

    if error_output:

        lines = error_output.splitlines()

        error_type = "ExecutionError"

        error_message = error_output


        if lines:

            last_line = lines[-1]

            if ":" in last_line:

                parts = last_line.split(
                    ":",
                    1
                )

                error_type = parts[0].strip()

                error_message = parts[1].strip()

            else:

                error_message = last_line


        print(
            json.dumps(
                create_error(
                    error_type,
                    error_message
                ),
                indent=2
            )
        )

        return


    # ========================================
    # FINAL FALLBACK
    # ========================================

    print(
        json.dumps(
            create_error(
                "ExecutionError",
                "Python execution did not return "
                "a valid result."
            ),
            indent=2
        )
    )


# ========================================
# MAIN
# ========================================

if __name__ == "__main__":
    main()