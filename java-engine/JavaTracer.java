import com.sun.jdi.*;
import com.sun.jdi.connect.AttachingConnector;
import com.sun.jdi.connect.Connector;
import com.sun.jdi.event.*;
import com.sun.jdi.request.*;

import java.util.*;
import java.util.stream.Collectors;

public class JavaTracer {

    private static final List<Map<String, Object>> trace =
            new ArrayList<>();

    private static boolean programFailed = false;

    private static String exceptionType = null;

    private static String exceptionMessage = null;


    public static void main(String[] args) {

        VirtualMachine vm = null;

        try {

            // ====================================================
            // 1. ATTACH TO STUDENT JVM
            // ====================================================

            vm = attachToStudentVM();

            System.err.println("Attached to student JVM");

            EventRequestManager erm =
                    vm.eventRequestManager();


            // ====================================================
            // 2. WAIT FOR MAIN CLASS
            // ====================================================

            ClassPrepareRequest classPrepareRequest =
                    erm.createClassPrepareRequest();

            classPrepareRequest.addClassFilter("Main");

            classPrepareRequest.setSuspendPolicy(
                    EventRequest.SUSPEND_ALL
            );

            classPrepareRequest.enable();


            boolean tracingStarted = false;
            boolean finished = false;


            while (!finished) {

                EventSet eventSet =
                        vm.eventQueue().remove();


                for (Event event : eventSet) {


                    // ====================================================
                    // MAIN CLASS LOADED
                    // ====================================================

                    if (event instanceof ClassPrepareEvent) {

                        ClassPrepareEvent classEvent =
                                (ClassPrepareEvent) event;

                        ReferenceType mainClass =
                                classEvent.referenceType();

                        System.err.println(
                                "Main class loaded"
                        );


                        List<Method> methods =
                                mainClass.methodsByName(
                                        "main"
                                );


                        if (!methods.isEmpty()) {

                            Method mainMethod =
                                    methods.get(0);

                            Location mainLocation =
                                    mainMethod.location();


                            BreakpointRequest breakpoint =
                                    erm.createBreakpointRequest(
                                            mainLocation
                                    );


                            breakpoint.setSuspendPolicy(
                                    EventRequest.SUSPEND_ALL
                            );

                            breakpoint.enable();
                        }
                    }


                    // ====================================================
                    // START TRACING
                    // ====================================================

                    else if (event instanceof BreakpointEvent) {

                        BreakpointEvent breakpointEvent =
                                (BreakpointEvent) event;

                        ThreadReference thread =
                                breakpointEvent.thread();


                        System.err.println(
                                "Student JVM started"
                        );


                        StepRequest stepRequest =
                                erm.createStepRequest(
                                        thread,
                                        StepRequest.STEP_LINE,
                                        StepRequest.STEP_INTO
                                );


                        stepRequest.addClassFilter(
                                "Main"
                        );


                        stepRequest.setSuspendPolicy(
                                EventRequest.SUSPEND_EVENT_THREAD
                        );

                        stepRequest.enable();


                        // =================================================
                        // LISTEN FOR UNCAUGHT EXCEPTIONS
                        // =================================================

                        ExceptionRequest exceptionRequest =
                                erm.createExceptionRequest(
                                        null,
                                        false,
                                        true
                                );

                        exceptionRequest.addClassFilter(
                                "Main"
                        );

                        exceptionRequest.setSuspendPolicy(
                                EventRequest.SUSPEND_ALL
                        );

                        exceptionRequest.enable();


                        tracingStarted = true;


                        System.err.println(
                                "Step tracing enabled"
                        );
                    }


                    // ====================================================
                    // EVERY EXECUTED LINE
                    // ====================================================

                    else if (
                            event instanceof StepEvent
                                    && tracingStarted
                    ) {

                        StepEvent stepEvent =
                                (StepEvent) event;

                        ThreadReference thread =
                                stepEvent.thread();

                        Location location =
                                stepEvent.location();


                        if (
                                !location
                                        .declaringType()
                                        .name()
                                        .equals("Main")
                        ) {

                            continue;
                        }


                        captureStep(
                                thread,
                                location
                        );
                    }


                    // ====================================================
                    // UNCAUGHT JAVA EXCEPTION
                    // ====================================================

                    else if (
                            event instanceof ExceptionEvent
                                    && tracingStarted
                    ) {

                        ExceptionEvent exceptionEvent =
                                (ExceptionEvent) event;

                        Location location =
                                exceptionEvent.location();


                        // Only record exceptions thrown
                        // from student code
                        if (
                                location != null
                                        &&
                                        location.declaringType()
                                                .name()
                                                .equals("Main")
                        ) {

                            programFailed = true;


                            ObjectReference exception =
                                    exceptionEvent.exception();


                            exceptionType =
                                    exception
                                            .referenceType()
                                            .name();


                            exceptionMessage =
                                    extractExceptionMessage(
                                            exception
                                    );


                            Map<String, Object> errorEvent =
                                    new LinkedHashMap<>();


                            errorEvent.put(
                                    "event",
                                    "exception"
                            );


                            errorEvent.put(
                                    "line",
                                    location.lineNumber()
                            );


                            errorEvent.put(
                                    "function",
                                    location.method().name()
                            );


                            errorEvent.put(
                                    "type",
                                    exceptionType
                            );


                            errorEvent.put(
                                    "message",
                                    exceptionMessage
                            );


                            trace.add(errorEvent);


                            System.err.println(
                                    "Student exception: "
                                            + exceptionType
                            );
                        }
                    }


                    // ====================================================
                    // JVM FINISHED
                    // ====================================================

                    else if (
                            event instanceof VMDeathEvent
                                    ||
                                    event instanceof VMDisconnectEvent
                    ) {

                        finished = true;

                        System.err.println(
                                "Student JVM finished"
                        );
                    }
                }


                try {

                    eventSet.resume();

                } catch (
                        VMDisconnectedException ignored
                ) {

                    finished = true;
                }
            }


        } catch (Exception e) {

            printError(e);

            return;

        } finally {

            if (vm != null) {

                try {

                    vm.dispose();

                } catch (Exception ignored) {
                }
            }
        }


        // ====================================================
        // FINAL JSON
        // ====================================================

        printResult();
    }


    // ====================================================
    // ATTACH TO JDWP JVM
    // ====================================================

    private static VirtualMachine attachToStudentVM()
            throws Exception {

        AttachingConnector connector = null;


        for (
                Connector c :
                Bootstrap.virtualMachineManager()
                        .attachingConnectors()
        ) {

            if (
                    c.transport()
                            .name()
                            .equals("dt_socket")
            ) {

                connector =
                        (AttachingConnector) c;

                break;
            }
        }


        if (connector == null) {

            throw new RuntimeException(
                    "Socket attaching connector not found"
            );
        }


        Map<String, Connector.Argument> arguments =
                connector.defaultArguments();


        arguments
                .get("port")
                .setValue("5005");


        arguments
                .get("hostname")
                .setValue("localhost");


        return connector.attach(arguments);
    }


    // ====================================================
    // EXTRACT EXCEPTION MESSAGE
    // ====================================================

    private static String extractExceptionMessage(
            ObjectReference exception
    ) {

        try {

            Field detailMessageField =
                    exception
                            .referenceType()
                            .fieldByName(
                                    "detailMessage"
                            );


            if (detailMessageField == null) {

                return null;
            }


            Value messageValue =
                    exception.getValue(
                            detailMessageField
                    );


            if (
                    messageValue instanceof StringReference
            ) {

                return (
                        (StringReference) messageValue
                ).value();
            }


            return messageValue != null
                    ? messageValue.toString()
                    : null;


        } catch (Exception ignored) {

            return null;
        }
    }


    // ====================================================
    // CAPTURE STEP
    // ====================================================

    private static void captureStep(
            ThreadReference thread,
            Location location
    ) {

        try {

            StackFrame frame =
                    thread.frame(0);


            Map<String, Object> event =
                    new LinkedHashMap<>();


            event.put(
                    "event",
                    "line"
            );


            event.put(
                    "line",
                    location.lineNumber()
            );


            String methodName =
                    location.method().name();


            event.put(
                    "function",
                    methodName
            );


            Map<String, Object> variables =
                    new LinkedHashMap<>();

            List<Map<String, Object>> heap =
                    new ArrayList<>();


            readFrame(
                    frame,
                    variables,
                    heap
            );


            if (!variables.isEmpty()) {

                event.put(
                        "variables",
                        variables
                );
            }


            if (!heap.isEmpty()) {

                event.put(
                        "heap",
                        heap
                );
            }


            trace.add(event);


        } catch (
                IncompatibleThreadStateException
                |
                AbsentInformationException ignored
        ) {
        }
    }


    // ====================================================
    // READ FRAME VARIABLES
    // ====================================================

    private static void readFrame(
            StackFrame frame,
            Map<String, Object> variables,
            List<Map<String, Object>> heap
    )
            throws AbsentInformationException {

        List<LocalVariable> localVariables =
                frame.visibleVariables();

        Set<Long> processedObjects =
                new HashSet<>();

        ObjectReference thisObj = frame.thisObject();
        if (thisObj != null) {
            addObjectToHeap(
                    thisObj,
                    heap,
                    processedObjects
            );
        }

        for (
                LocalVariable variable :
                localVariables
        ) {

            String variableName =
                    variable.name();


            if (
                    variableName.startsWith("$")
                            ||
                            variableName.equals("args")
            ) {

                continue;
            }


            Value value =
                    frame.getValue(variable);


            variables.put(
                    variableName,
                    convertValue(value)
            );


            if (value instanceof ArrayReference) {

                addArrayToHeap(
                        (ArrayReference) value,
                        heap,
                        processedObjects
                );
            }


            else if (value instanceof ObjectReference) {

                addObjectToHeap(
                        (ObjectReference) value,
                        heap,
                        processedObjects
                );
            }
        }
    }


    private static void addObjectToHeap(
            ObjectReference object,
            List<Map<String, Object>> heap,
            Set<Long> processedObjects
    ) {

        long objectId =
                object.uniqueID();


        if (processedObjects.contains(objectId)) {

            return;
        }


        processedObjects.add(objectId);


        Map<String, Object> heapObject =
                new LinkedHashMap<>();


        heapObject.put(
                "object",
                String.valueOf(objectId)
        );


        heapObject.put(
                "type",
                "object"
        );


        heapObject.put(
                "class",
                object.referenceType().name()
        );

        if (object instanceof StringReference) {
            heapObject.put(
                    "value",
                    ((StringReference) object).value()
            );
        }

        Map<String, Object> fields =
                new LinkedHashMap<>();


        for (
                Field field :
                object.referenceType().allFields()
        ) {

            if (field.isStatic()) {

                continue;
            }


            Value fieldValue =
                    object.getValue(field);


            fields.put(
                    field.name(),
                    convertValue(fieldValue)
            );


            if (
                    fieldValue instanceof ArrayReference
            ) {

                addArrayToHeap(
                        (ArrayReference) fieldValue,
                        heap,
                        processedObjects
                );
            }


            else if (
                    fieldValue instanceof ObjectReference
            ) {

                addObjectToHeap(
                        (ObjectReference) fieldValue,
                        heap,
                        processedObjects
                );
            }
        }


        heapObject.put(
                "fields",
                fields
        );


        heap.add(heapObject);
    }


    private static void addArrayToHeap(
            ArrayReference array,
            List<Map<String, Object>> heap,
            Set<Long> processedObjects
    ) {

        long objectId =
                array.uniqueID();


        if (processedObjects.contains(objectId)) {

            return;
        }


        processedObjects.add(objectId);


        Map<String, Object> heapObject =
                new LinkedHashMap<>();


        heapObject.put(
                "object",
                String.valueOf(objectId)
        );


        heapObject.put(
                "type",
                "array"
        );


        heapObject.put(
                "items",
                convertArray(array)
        );


        heap.add(heapObject);

        for (Value val : array.getValues()) {
            if (val instanceof ArrayReference) {
                addArrayToHeap(
                        (ArrayReference) val,
                        heap,
                        processedObjects
                );
            } else if (val instanceof ObjectReference) {
                addObjectToHeap(
                        (ObjectReference) val,
                        heap,
                        processedObjects
                );
            }
        }
    }


    // ====================================================
    // CONVERT ARRAY
    // ====================================================

    private static List<Object> convertArray(
            ArrayReference array
    ) {

        List<Object> items =
                new ArrayList<>();


        for (
                Value value :
                array.getValues()
        ) {

            items.add(
                    convertValue(value)
            );
        }


        return items;
    }


    // ====================================================
    // CONVERT JDI VALUE
    // ====================================================

    private static Object convertValue(
            Value value
    ) {

        if (value == null) {

            return null;
        }


        if (value instanceof BooleanValue) {

            return (
                    (BooleanValue) value
            ).booleanValue();
        }


        if (value instanceof ByteValue) {

            return (
                    (ByteValue) value
            ).byteValue();
        }


        if (value instanceof CharValue) {

            return String.valueOf(
                    (
                            (CharValue) value
                    ).charValue()
            );
        }


        if (value instanceof ShortValue) {

            return (
                    (ShortValue) value
            ).shortValue();
        }


        if (value instanceof IntegerValue) {

            return (
                    (IntegerValue) value
            ).intValue();
        }


        if (value instanceof LongValue) {

            return (
                    (LongValue) value
            ).longValue();
        }


        if (value instanceof FloatValue) {

            return (
                    (FloatValue) value
            ).floatValue();
        }


        if (value instanceof DoubleValue) {

            return (
                    (DoubleValue) value
            ).doubleValue();
        }


        if (value instanceof StringReference) {

            return (
                    (StringReference) value
            ).value();
        }


        if (
                value instanceof ObjectReference
        ) {

            ObjectReference object =
                    (ObjectReference) value;

            try {
                String typeName = object.referenceType().name();
                if (typeName.equals("java.lang.Integer")) {
                    Field f = object.referenceType().fieldByName("value");
                    if (f != null && object.getValue(f) instanceof IntegerValue) {
                        return ((IntegerValue) object.getValue(f)).intValue();
                    }
                } else if (typeName.equals("java.lang.Character")) {
                    Field f = object.referenceType().fieldByName("value");
                    if (f != null && object.getValue(f) instanceof CharValue) {
                        return String.valueOf(((CharValue) object.getValue(f)).charValue());
                    }
                } else if (typeName.equals("java.lang.Boolean")) {
                    Field f = object.referenceType().fieldByName("value");
                    if (f != null && object.getValue(f) instanceof BooleanValue) {
                        return ((BooleanValue) object.getValue(f)).booleanValue();
                    }
                } else if (typeName.equals("java.lang.Long")) {
                    Field f = object.referenceType().fieldByName("value");
                    if (f != null && object.getValue(f) instanceof LongValue) {
                        return ((LongValue) object.getValue(f)).longValue();
                    }
                } else if (typeName.equals("java.lang.Double")) {
                    Field f = object.referenceType().fieldByName("value");
                    if (f != null && object.getValue(f) instanceof DoubleValue) {
                        return ((DoubleValue) object.getValue(f)).doubleValue();
                    }
                } else if (typeName.equals("java.lang.Float")) {
                    Field f = object.referenceType().fieldByName("value");
                    if (f != null && object.getValue(f) instanceof FloatValue) {
                        return ((FloatValue) object.getValue(f)).floatValue();
                    }
                } else if (typeName.equals("java.lang.Short")) {
                    Field f = object.referenceType().fieldByName("value");
                    if (f != null && object.getValue(f) instanceof ShortValue) {
                        return ((ShortValue) object.getValue(f)).shortValue();
                    }
                } else if (typeName.equals("java.lang.Byte")) {
                    Field f = object.referenceType().fieldByName("value");
                    if (f != null && object.getValue(f) instanceof ByteValue) {
                        return ((ByteValue) object.getValue(f)).byteValue();
                    }
                }
            } catch (Exception ignored) {
            }

            Map<String, Object> reference =
                    new LinkedHashMap<>();


            reference.put(
                    "ref",
                    object.uniqueID()
            );


            return reference;
        }


        return value.toString();
    }


    // ====================================================
    // FINAL RESULT
    // ====================================================

    private static void printResult() {

        Map<String, Object> result =
                new LinkedHashMap<>();


        if (programFailed) {

            result.put(
                    "status",
                    "error"
            );

        } else {

            result.put(
                    "status",
                    "success"
            );
        }


        result.put(
                "stdout",
                ""
        );


        result.put(
                "trace",
                trace
        );


        if (programFailed) {

            Map<String, Object> error =
                    new LinkedHashMap<>();


            error.put(
                    "type",
                    exceptionType
            );


            error.put(
                    "message",
                    exceptionMessage
            );


            result.put(
                    "error",
                    error
            );
        }


        System.out.println(
                toJson(result)
        );
    }


    // ====================================================
    // ERROR RESULT
    // ====================================================

    private static void printError(
            Exception exception
    ) {

        Map<String, Object> error =
                new LinkedHashMap<>();


        error.put(
                "type",
                exception
                        .getClass()
                        .getSimpleName()
        );


        error.put(
                "message",
                exception.getMessage()
        );


        Map<String, Object> result =
                new LinkedHashMap<>();


        result.put(
                "status",
                "error"
        );


        result.put(
                "error",
                error
        );


        System.out.println(
                toJson(result)
        );
    }


    // ====================================================
    // SIMPLE JSON SERIALIZER
    // ====================================================

    @SuppressWarnings("unchecked")
    private static String toJson(
            Object object
    ) {

        if (object == null) {

            return "null";
        }


        if (
                object instanceof String
                        ||
                        object instanceof Character
        ) {

            return "\""
                    + escape(
                    object.toString()
            )
                    + "\"";
        }


        if (
                object instanceof Number
                        ||
                        object instanceof Boolean
        ) {

            return object.toString();
        }


        if (
                object instanceof Map
        ) {

            Map<Object, Object> map =
                    (Map<Object, Object>) object;


            return "{"
                    + map.entrySet()
                    .stream()
                    .map(
                            entry ->

                                    toJson(
                                            String.valueOf(
                                                    entry.getKey()
                                            )
                                    )

                                            + ":"

                                            + toJson(
                                            entry.getValue()
                                    )
                    )
                    .collect(
                            Collectors.joining(",")
                    )

                    + "}";
        }


        if (
                object instanceof Collection
        ) {

            Collection<Object> collection =
                    (Collection<Object>) object;


            return "["
                    + collection.stream()
                    .map(
                            JavaTracer::toJson
                    )
                    .collect(
                            Collectors.joining(",")
                    )

                    + "]";
        }


        return toJson(
                object.toString()
        );
    }


    // ====================================================
    // ESCAPE JSON STRING
    // ====================================================

    private static String escape(
            String value
    ) {

        return value

                .replace(
                        "\\",
                        "\\\\"
                )

                .replace(
                        "\"",
                        "\\\""
                )

                .replace(
                        "\n",
                        "\\n"
                )

                .replace(
                        "\r",
                        "\\r"
                )

                .replace(
                        "\t",
                        "\\t"
                );
    }
}