package com.codeexecution.execution_service.runner;

import com.codeexecution.execution_service.docker.DockerExecutor;
import com.codeexecution.execution_service.dto.ExecutionResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JavaCodeRunner implements CodeRunner {

    private static final String JAVA_IMAGE = "java-engine";

    private final DockerExecutor dockerExecutor;
    private final ObjectMapper objectMapper;

    public JavaCodeRunner(
            DockerExecutor dockerExecutor,
            ObjectMapper objectMapper
    ) {
        this.dockerExecutor = dockerExecutor;
        this.objectMapper = objectMapper;
    }

    @Override
    public String getLanguage() {
        return "java";
    }

    @Override
    public ExecutionResponse execute(String code) {

        try {

            String output = dockerExecutor.execute(
                    JAVA_IMAGE,
                    code,
                    "Main.java",
                    false
            );

            JsonNode result =
                    objectMapper.readTree(output);

            String status =
                    result.path("status").asText();

            String stdout =
                    result.has("stdout")
                            ? result.get("stdout").asText()
                            : null;

            Object trace =
                    result.has("trace")
                            ? objectMapper.convertValue(
                            result.get("trace"),
                            Object.class
                    )
                            : null;

            Object error =
                    result.has("error")
                            ? objectMapper.convertValue(
                            result.get("error"),
                            Object.class
                    )
                            : null;

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