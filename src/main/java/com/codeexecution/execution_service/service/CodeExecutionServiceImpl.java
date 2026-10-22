package com.codeexecution.execution_service.service;

import com.codeexecution.execution_service.dto.ExecutionRequest;
import com.codeexecution.execution_service.dto.ExecutionResponse;
import com.codeexecution.execution_service.runner.CodeRunner;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CodeExecutionServiceImpl implements CodeExecutionService {

    private final List<CodeRunner> codeRunners;

    public CodeExecutionServiceImpl(List<CodeRunner> codeRunners) {
        this.codeRunners = codeRunners;
    }

    @Override
    public ExecutionResponse execute(ExecutionRequest request) {

        if (request == null || request.getLanguage() == null) {
            return new ExecutionResponse("error", null, null, java.util.Map.of(
                    "type", "BadRequest",
                    "message", "Execution request and language must not be null"
            ));
        }

        if (request.getCode() == null) {
            return new ExecutionResponse("error", null, null, java.util.Map.of(
                    "type", "BadRequest",
                    "message", "Code payload must not be null"
            ));
        }

        String language = request.getLanguage().toLowerCase().trim();

        CodeRunner selectedRunner = codeRunners.stream()
                .filter(runner ->
                        runner.getLanguage().equalsIgnoreCase(language)
                )
                .findFirst()
                .orElse(null);

        if (selectedRunner == null) {
            return new ExecutionResponse("error", null, null, java.util.Map.of(
                    "type", "UnsupportedLanguage",
                    "message", "Language '" + language + "' is not supported. Supported languages: java, python"
            ));
        }

        return selectedRunner.execute(request.getCode());
    }
}