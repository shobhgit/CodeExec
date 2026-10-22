package com.codeexecution.execution_service.runner;

import com.codeexecution.execution_service.docker.DockerExecutor;
import com.codeexecution.execution_service.dto.ExecutionResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class PythonCodeRunner implements CodeRunner {

    private static final String PYTHON_IMAGE = "python-engine";

    private final DockerExecutor dockerExecutor;
    private final ObjectMapper objectMapper;

    public PythonCodeRunner(
            DockerExecutor dockerExecutor,
            ObjectMapper objectMapper
    ) {
        this.dockerExecutor = dockerExecutor;
        this.objectMapper = objectMapper;
    }

    @Override
    public String getLanguage() {
        return "python";
    }

    @Override
    public ExecutionResponse execute(String code) {

        try {

            String output = dockerExecutor.execute(
                    PYTHON_IMAGE,
                    code,
                    "test.py",
                    true
            );

            JsonNode result =
                    objectMapper.readTree(output);

            String status =
                    result.path("status").asText();

            String stdout =
                    result.has("stdout")
                            ? result.get("stdout").asText()
                            : null;

            JsonNode traceNode =
                    result.get("trace");


            // Check if the tracer stopped because
            // the instruction limit was reached
            if (traceNode != null
                    && traceNode.isArray()
                    && !traceNode.isEmpty()) {

                JsonNode lastEvent =
                        traceNode.get(
                                traceNode.size() - 1
                        );

                String event =
                        lastEvent.path("event").asText();

                if ("instruction_limit_reached"
                        .equals(event)) {

                    Object trace =
                            objectMapper.convertValue(
                                    traceNode,
                                    Object.class
                            );

                    return new ExecutionResponse(
                            "error",
                            stdout,
                            trace,
                            Map.of(
                                    "type",
                                    "InstructionLimitExceeded",
                                    "message",
                                    "Code execution stopped because "
                                            + "the instruction limit "
                                            + "was reached."
                            )
                    );
                }
            }


            // Normal trace conversion
            Object trace = traceNode != null
                    ? objectMapper.convertValue(
                    traceNode,
                    Object.class
            )
                    : null;


            // Convert tracer error if present
            Object error = result.has("error")
                    ? objectMapper.convertValue(
                    result.get("error"),
                    Object.class
            )
                    : null;


            // Return normal execution result
            return new ExecutionResponse(
                    status,
                    stdout,
                    trace,
                    error
            );

        } catch (Exception e) {

            return new ExecutionResponse(
                    "error",
                    null,
                    null,
                    Map.of(
                            "type",
                            e.getClass()
                                    .getSimpleName(),
                            "message",
                            e.getMessage()
                    )
            );
        }
    }
}