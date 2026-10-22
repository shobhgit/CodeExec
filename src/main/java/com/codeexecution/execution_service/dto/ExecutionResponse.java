package com.codeexecution.execution_service.dto;

public class ExecutionResponse {

    private String status;
    private String stdout;
    private Object trace;
    private Object error;

    public ExecutionResponse() {
    }

    public ExecutionResponse(
            String status,
            String stdout,
            Object trace,
            Object error
    ) {
        this.status = status;
        this.stdout = stdout;
        this.trace = trace;
        this.error = error;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStdout() {
        return stdout;
    }

    public void setStdout(String stdout) {
        this.stdout = stdout;
    }

    public Object getTrace() {
        return trace;
    }

    public void setTrace(Object trace) {
        this.trace = trace;
    }

    public Object getError() {
        return error;
    }

    public void setError(Object error) {
        this.error = error;
    }
}