package com.codeexecution.execution_service.docker;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;

@Component
public class DockerExecutor {

    private final long timeoutSeconds;

    public DockerExecutor(
            @Value("${execution.timeout-seconds:35}") long timeoutSeconds
    ) {
        this.timeoutSeconds = timeoutSeconds;
    }

    public String execute(
            String imageName,
            String code,
            String fileName,
            boolean readOnly
    ) {

        Path tempDirectory = null;
        Process process = null;

        try {

            // 1. Create temporary execution directory
            tempDirectory = Files.createTempDirectory(
                    "code-execution-"
            );

            // 2. Create source file
            Path sourceFile = tempDirectory.resolve(
                    fileName
            );

            // 3. Write user code
            Files.writeString(
                    sourceFile,
                    code
            );

            // 4. Build Docker command
            List<String> command = new ArrayList<>();

            command.add("docker");
            command.add("run");

            // Remove container after execution
            command.add("--rm");

            // Disable network access
            command.add("--network");
            command.add("none");

            // Limit memory
            command.add("--memory");
            command.add("256m");

            // Limit CPU
            command.add("--cpus");
            command.add("1");

            // Limit number of processes
            command.add("--pids-limit");
            command.add("64");

            // Mount source code read-only
            command.add("-v");

            String mount = tempDirectory
                    .toAbsolutePath()
                    + ":/code";

            if (readOnly) {
                mount += ":ro";
            }

            command.add(mount);

            // Docker image
            command.add(imageName);

            // 5. Start Docker process
            ProcessBuilder processBuilder =
                    new ProcessBuilder(command);

            processBuilder.redirectErrorStream(true);

            process = processBuilder.start();

            // Read output concurrently in background thread to prevent OS pipe buffer deadlock
            Process targetProcess = process;
            java.util.concurrent.CompletableFuture<String> outputFuture =
                    java.util.concurrent.CompletableFuture.supplyAsync(() -> {
                        try {
                            return readOutput(targetProcess);
                        } catch (IOException e) {
                            return "";
                        }
                    });

            // 6. Wait with timeout
            boolean finished = process.waitFor(
                    timeoutSeconds,
                    TimeUnit.SECONDS
            );

            // If execution exceeded timeout
            if (!finished) {

                process.destroyForcibly();
                outputFuture.cancel(true);

                throw new RuntimeException(
                        "Code execution timed out after "
                                + timeoutSeconds
                                + " seconds"
                );
            }

            // 7. Get output from async reader
            String output;
            try {
                output = outputFuture.get(5, TimeUnit.SECONDS);
            } catch (Exception e) {
                output = readOutput(process);
            }

            int exitCode = process.exitValue();

            if (exitCode != 0) {

                throw new RuntimeException(
                        "Docker execution failed.\n"
                                + output
                );
            }

            return output;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Docker execution failed: "
                            + e.getMessage(),
                    e
            );

        } finally {

            // Ensure process is killed if still running
            if (process != null && process.isAlive()) {

                process.destroyForcibly();
            }

            // Cleanup temporary files
            if (tempDirectory != null) {

                try {

                    deleteDirectory(tempDirectory);

                } catch (IOException e) {

                    e.printStackTrace();
                }
            }
        }
    }


    private String readOutput(Process process)
            throws IOException {

        StringBuilder output =
                new StringBuilder();

        try (BufferedReader reader =
                     new BufferedReader(
                             new InputStreamReader(
                                     process.getInputStream()
                             )
                     )) {

            String line;

            while ((line = reader.readLine()) != null) {

                output.append(line)
                        .append("\n");
            }
        }

        return output.toString();
    }


    private void deleteDirectory(Path directory)
            throws IOException {

        if (!Files.exists(directory)) {
            return;
        }

        try (var paths =
                     Files.walk(directory)) {

            paths
                    .sorted((a, b) ->
                            b.compareTo(a))
                    .forEach(path -> {

                        try {

                            Files.delete(path);

                        } catch (IOException e) {

                            throw new RuntimeException(e);
                        }
                    });
        }
    }
}
