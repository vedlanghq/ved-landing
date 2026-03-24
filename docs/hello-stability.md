---
title: "Hello Stability"
category: "9. Examples"
order: 901
---

# Example: Hello Stability

Instead of a traditional `Hello World` that prints to standard output and immediately dies, our introductory example demonstrates Ved's core promise: **Stability**.

This script defines a simple application that ensures an external configuration file is always kept in a specific state. If the file is manually deleted by a user, the Control Loop will immediately jump in, detect the drift, and recreate it.

```ved
// We use Script Mode for a quick, implicit execution wrapper.
// This code is implicitly wrapped in an anonymous Domain by the compiler.

state {
    desiredMessage: String = "Hello Ved"
    fileCreated: Boolean = false
}

// The Goal is our declarative anchor. The runtime will continuously execute
// transitions and effects until this predicate evaluates to `true`.
goal EnsureGreetingExists {
    priority: 10
    terminate_after: never
    
    // The ultimate condition of stability
    predicate: System.file_exists("/tmp/greeting.txt") == true
}

// This transition is evaluated by the scheduler when the Goal is not met.
transition CreateFile() {
    // We cannot touch the disk directly in a transition.
    // Instead, we emit an intent across the Effect Boundary.
    emit System.WriteFile(
        path: "/tmp/greeting.txt", 
        content: state.desiredMessage,
        idempotency_key: "hello-init-v1"
    )
}
```

## How It Executes

1. **Initial Boot:** You run `ved runtime start hello.ved`.
2. **First Tick:** The runtime evaluates `EnsureGreetingExists`. The file does not exist, so the predicate is `false`.
3. **Execution Slice:** The scheduler triggers the `CreateFile` transition. It executes purely and emits the `System.WriteFile` intent into the runtime envelope.
4. **Effect Resolution:** The Impure Effect Adapter receives the intent, reaches out to the host OS, and successfully writes the file. It sends a success event back to the Domain.
5. **Stability Reached:** The Domain evaluates the predicate again. It finds the file. It goes to sleep.

### The Chaos Test

While the runtime is still secretly looping in the background, open another terminal and forcefully delete the file:
`rm /tmp/greeting.txt`

The moment you do, Ved's next background tick evaluates the `predicate`. It suddenly returns `false`. The runtime wakes up, pulls the `CreateFile` transition, and restores the file immediately.

You have just written an autonomous control plane in 15 lines of code.
