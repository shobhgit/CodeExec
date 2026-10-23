package com.codeexecution.execution_service.controller;

import com.codeexecution.execution_service.dto.ExecutionRequest;
import com.codeexecution.execution_service.dto.ExecutionResponse;
import com.codeexecution.execution_service.service.CodeExecutionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ExecutionController {

    private final CodeExecutionService codeExecutionService;

    public ExecutionController(CodeExecutionService codeExecutionService) {
        this.codeExecutionService = codeExecutionService;
    }

    @PostMapping("/execute")
    public ResponseEntity<ExecutionResponse> execute(
            @RequestBody ExecutionRequest request
    ) {

        ExecutionResponse response =
                codeExecutionService.execute(request);

        return ResponseEntity.ok(response);
    }
}
