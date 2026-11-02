package com.codeexecution.execution_service.runner;

import com.codeexecution.execution_service.dto.ExecutionResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

final class ExecutionResponseMapper {

    private ExecutionResponseMapper() {
    }

    static ExecutionResponse fromNode(
            JsonNode result,
            ObjectMapper objectMapper
    ) {
        return new ExecutionResponse(
                result.path("status").asText(),
                result.has("stdout")
                        ? result.get("stdout").asText()
                        : null,
                convert(result.get("trace"), objectMapper),
                convert(result.get("error"), objectMapper)
        );
    }

    static Object convert(JsonNode value, ObjectMapper objectMapper) {
        return value != null
                ? objectMapper.convertValue(value, Object.class)
                : null;
    }

    static ExecutionResponse error(Exception exception) {
        return new ExecutionResponse(
                "error",
                null,
                null,
                Map.of(
                        "type", exception.getClass().getSimpleName(),
                        "message", exception.getMessage() == null
                                ? "Execution failed"
                                : exception.getMessage()
                )
        );
    }
}
