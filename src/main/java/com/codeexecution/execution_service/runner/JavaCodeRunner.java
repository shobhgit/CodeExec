package com.codeexecution.execution_service.runner;

import com.codeexecution.execution_service.docker.DockerExecutor;
import com.codeexecution.execution_service.dto.ExecutionResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

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

            return ExecutionResponseMapper.fromNode(
                    objectMapper.readTree(output),
                    objectMapper
            );
        } catch (Exception e) {
            return ExecutionResponseMapper.error(e);
        }
    }
}