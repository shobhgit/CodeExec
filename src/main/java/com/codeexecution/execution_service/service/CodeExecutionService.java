package com.codeexecution.execution_service.service;

import com.codeexecution.execution_service.dto.ExecutionRequest;
import com.codeexecution.execution_service.dto.ExecutionResponse;

public interface CodeExecutionService {

    ExecutionResponse execute(ExecutionRequest request);

}