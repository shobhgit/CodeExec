package com.codeexecution.execution_service.service;

import com.codeexecution.execution_service.dto.ExecutionRequest;
import com.codeexecution.execution_service.dto.ExecutionResponse;
import com.codeexecution.execution_service.runner.CodeRunner;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CodeExecutionServiceImpl implements CodeExecutionService {

    private final List<CodeRunner> codeRunners;

    public CodeExecutionServiceImpl(List<CodeRunner> codeRunners) {
        this.codeRunners = codeRunners;
    }

    @Override
    public ExecutionResponse execute(ExecutionRequest request) {

        if (request == null || request.getLanguage() == null) {
            return errorResponse(
                    "BadRequest",
                    "Execution request and language must not be null"
            );
        }

        if (request.getCode() == null) {
            return errorResponse(
                    "BadRequest",
                    "Code payload must not be null"
            );
        }

        String language = request.getLanguage().toLowerCase().trim();

        CodeRunner selectedRunner = codeRunners.stream()
                .filter(runner ->
                        runner.getLanguage().equalsIgnoreCase(language)
                )
                .findFirst()
                .orElse(null);

        if (selectedRunner == null) {
            return errorResponse(
                    "UnsupportedLanguage",
                    "Language '" + language + "' is not supported. Supported languages: java, python"
            );
        }

        return selectedRunner.execute(request.getCode());
    }

    private ExecutionResponse errorResponse(String type, String message) {
        return new ExecutionResponse(
                "error",
                null,
                null,
                Map.of(
                        "type", type,
                        "message", message
                )
        );
    }
}