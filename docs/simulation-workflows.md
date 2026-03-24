---
title: "Simulation Workflows"
category: "8. Tooling & CLI"
order: 804
---

# Simulation Workflows

Standard software unit testing assertions like "Does `1 + 1 == 2`?" are insufficient for validating the behavior of a long-lived control plane. If your Domain orchestrates a distributed worker pool, the true test of correctness is whether the cluster successfully stabilizes after a sequence of network partitions, partial database timeouts, and instance failovers.

To test these scenarios locally, without spinning up expensive cloud resources, Ved offers the **Deterministic Replay Engine**.

## The Time-Travel Harness

Because Ved's business logic is mathematically isolated from system effects via the Effect Boundary, it is trivial to replace the actual `Network Adapter` with a `Test Adapter` during simulation. 

More importantly, the Test Adapter has the ability to manipulate **Logical Time**. 

When running `ved simulate`, developers can orchestrate scenarios spanning days or weeks, executing them practically instantly.

```ved
// A conceptual simulation block
test "Worker Pool Degradation Under Load" {
    given {
        domain PoolManager { desired = 10, current = 10 }
    }

    // Fast-forward the control loop deterministically 
    simulate {
        // Drop network packets for 500 logical ticks
        effect ProvisionNode { 
            return NetworkTimeout() 
        }
        advance_ticks(500)
    }

    // Assert that the system correctly fell back to its graceful degradation state
    expect {
        always PoolManager.status == "Degraded_Pending_Recovery"
    }
}
```

## Injecting Chaos

The simulation harness acts like a localized chaos-engineering tool. Developers can explicitly instruct the simulator to execute edge cases at specific logical timestamps:

* **Snapshot Corruption:** Purposely altering the local file tree to test the domain's ability to trigger the `v1_to_v2` Schema Evolution recovery path.
* **Effect Oscillation:** Firing alternating successful and fatal HTTP 500 error responses from the Mock Adapter to prove that the Domain's exponential backoff curve correctly triggers Quiescence Backoff.
* **Simulated Crash:** Force-killing the execution mid-slice. The runner automatically restarts the runtime context to verify that the Mailbox properly replays the identical intent against the persistent Snapshot from the previous step.

Through simulation workflows, the theoretical resilience of the Control Loop becomes a provable, gating asset in standard CI/CD pipelines.
