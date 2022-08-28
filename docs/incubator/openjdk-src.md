# [工事中]Openjdkソースコード

### java 実行からインタプリタ実行まで

```
java.base/share/native/launcher/main.c#main
=> share/native/libjli/java.c#JLI_Launch
=> {{OS}}/native/libjli/java_md.c#JVMInit
=> share/native/libjli/java.c#ContinueInNewThread
=> {{OS}}/native/libjli/java_md.c#CallJavaMainInNewThread
=> share/native/libjli/java.cjava.c#JavaMain

{
mainClass = LoadMainClass(env, mode, what);
mainArgs = CreateApplicationArgs(env, argv, argc);
mainID = (*env)->GetStaticMethodID(env, mainClass, "main", "([Ljava/lang/String;)V");
(*env)->CallStaticVoidMethod(env, mainClass, mainID, mainArgs);
ret = (\*env)->ExceptionOccurred(env) == NULL ? 0 : 1;
LEAVE();
}

=> hotspot/share/prims/jni.cpp#jni*CallStaticVoidMethod
=> jni_invoke_static
=> share/runtime/javaCalls.cpp#JavaCalls::call
=> os/{{OS}}/os*{{OS}}.cpp#os::os_exception_wrapper
=> share/runtime/javaCalls.cpp#JavaCalls::call_helper
=> stubRoutines.hpp#StubRoutines::call_stub()
=> hotspot/cpu/zero/stubGenerator_zero.cpp#StubGenerator.call_stub

{
if (stack->needs_setup())
stack->setup(alloca(zero_stack_size), zero_stack_size);

Interpreter::invoke_method(method, entry_point, THREAD);
}

=> hotspot/cpu/zero/zeroInterpreter_zero.cpp#ZeroInterpreter::invoke_method
=> hotspot/cpu/zero/entry_zero.hpp#ZeroEntry.invoke
=> hotspot/cpu/zero/zeroInterpreter_zero.cpp#ZeroInterpreter::main_loop
=> hotspot/share/interpreter/zero/bytecodeInterpreter.cpp#BytecodeInterpreter::run
```

### iload の実装

```cpp
SET_STACK_SLOT(LOCALS_SLOT(num), 0);                          \
UPDATE_PC_AND_TOS_AND_CONTINUE(1, 1);

// ===>

*(long*)&topOfStack[0] = *(long*)(LOCALS_SLOT(num));
topOfStack -= Interpreter::stackElementWords;    // 先頭アドレスをずらす
```

topOfStackというlong値配列をスタック領域として扱い、その先頭アドレスをベースポインタのように使っている。
