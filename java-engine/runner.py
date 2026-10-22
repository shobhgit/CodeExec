import subprocess
import json
import time

from normalizer import normalize_result
from compressor import compress_result


# ========================================
# CONFIG
# ========================================

CODE_DIR = "/code"

MAIN_FILE = f"{CODE_DIR}/Main.java"

MAIN_CLASS = "Main"

DEBUG_PORT = "5005"


# ========================================
# ERROR RESULT
# ========================================

def error_result(error_type, message):

    return {
        "status": "error",
        "error": {
            "type": error_type,
            "message": message
        }
    }


# ========================================
# CLEAN JDWP OUTPUT
# ========================================

def clean_program_stdout(stdout):

    if not stdout:
        return ""

    cleaned_lines = []

    for line in stdout.splitlines():

        # Remove JDWP startup message
        if line.startswith(
            "Listening for transport dt_socket"
        ):
            continue

        cleaned_lines.append(line)

    cleaned_stdout = "\n".join(
        cleaned_lines
    )

    if cleaned_stdout:
        cleaned_stdout += "\n"

    return cleaned_stdout


# ========================================
# COMPILE STUDENT CODE
# ========================================

def compile_student_code():

    compile_process = subprocess.run(
        [
            "javac",

            # Required for JDI debugging
            "-g",

            "-d",
            CODE_DIR,

            MAIN_FILE
        ],

        capture_output=True,
        text=True
    )

    if compile_process.returncode != 0:

        return error_result(
            "CompilationError",
            compile_process.stderr
        )

    return None


# ========================================
# START STUDENT JVM
# ========================================

def start_student_jvm():

    student_process = subprocess.Popen(

        [
            "java",

            "-agentlib:jdwp="
            "transport=dt_socket,"
            "server=y,"
            "suspend=y,"
            f"address=*:{DEBUG_PORT}",

            "-cp",
            CODE_DIR,

            MAIN_CLASS
        ],

        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    return student_process


# ========================================
# RUN JAVA TRACER
# ========================================

def run_java_tracer():

    tracer_process = subprocess.run(

        [
            "java",

            "--add-modules",
            "jdk.jdi",

            "-cp",
            "/runner",

            "JavaTracer"
        ],

        capture_output=True,
        text=True
    )

    if tracer_process.returncode != 0:

        return error_result(
            "JavaTracerError",
            tracer_process.stderr
        )

    return tracer_process


# ========================================
# EXTRACT JSON FROM TRACER OUTPUT
# ========================================

def parse_tracer_output(output):

    output = output.strip()

    json_start = output.find("{")

    if json_start == -1:

        return error_result(
            "InvalidTracerOutput",
            output
        )

    json_output = output[json_start:]

    try:

        return json.loads(
            json_output
        )

    except json.JSONDecodeError as exception:

        return error_result(
            "JSONDecodeError",
            str(exception)
        )


# ========================================
# RUN JAVA ENGINE
# ========================================

def run_java_engine():

    student_process = None

    try:

        # ========================================
        # STEP 1
        # Compile student code
        # ========================================

        compile_error = compile_student_code()

        if compile_error:

            return compile_error


        # ========================================
        # STEP 2
        # Start student JVM
        # ========================================

        student_process = start_student_jvm()


        # Wait for JDWP to initialize
        time.sleep(0.5)


        # ========================================
        # STEP 3
        # Run JDI tracer
        # ========================================

        tracer_result = run_java_tracer()


        # Structured tracer error
        if isinstance(
            tracer_result,
            dict
        ):

            return tracer_result


        # ========================================
        # STEP 4
        # Wait for student JVM
        # ========================================

        try:

            student_stdout, student_stderr = (
                student_process.communicate(
                    timeout=30
                )
            )

        except subprocess.TimeoutExpired:

            student_process.kill()

            student_stdout, student_stderr = (
                student_process.communicate()
            )

            return error_result(
                "ExecutionTimeout",
                "Student program exceeded execution time limit"
            )


        # ========================================
        # STEP 5
        # Parse raw tracer JSON
        # ========================================

        raw_result = parse_tracer_output(
            tracer_result.stdout
        )


        if raw_result.get(
            "status"
        ) == "error":

            return raw_result


        # ========================================
        # STEP 6
        # Add cleaned student stdout
        # ========================================

        raw_result["stdout"] = (
            clean_program_stdout(
                student_stdout
            )
        )


        # ========================================
        # STEP 7
        # NORMALIZE TRACE
        # ========================================

        normalized_result = normalize_result(
            raw_result
        )


        # ========================================
        # STEP 8
        # COMPRESS TRACE
        # ========================================

        compressed_result = compress_result(
            normalized_result
        )


        return compressed_result


    except Exception as exception:

        return error_result(
            exception.__class__.__name__,
            str(exception)
        )


    finally:

        # ========================================
        # SAFETY CLEANUP
        # ========================================

        if student_process:

            if student_process.poll() is None:

                student_process.kill()

                student_process.wait()


# ========================================
# MAIN
# ========================================

if __name__ == "__main__":

    result = run_java_engine()

    print(
        json.dumps(
            result,
            separators=(
                ",",
                ":"
            )
        )
    )
