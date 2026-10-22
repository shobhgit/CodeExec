package com.codeexecution.execution_service.runner;

import com.codeexecution.execution_service.dto.ExecutionResponse;

public interface CodeRunner {

    String getLanguage();

    ExecutionResponse execute(String code);

}