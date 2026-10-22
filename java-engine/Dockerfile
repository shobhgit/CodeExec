FROM eclipse-temurin:21-jdk

WORKDIR /runner

# Python is needed for runner + normalizer
RUN apt-get update && \
    apt-get install -y python3 && \
    rm -rf /var/lib/apt/lists/*

COPY runner.py .
COPY normalizer.py .
COPY JavaTracer.java .
COPY compressor.py .

# Compile the tracer once while building the image
RUN javac --add-modules jdk.jdi JavaTracer.java

RUN mkdir -p /code

CMD ["python3", "runner.py"]