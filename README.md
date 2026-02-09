# Todo++

A simple React todo application that prioritized **proper state management**, **performance-aware user interface**, and **sturdy handling of edge cases** over aesthetic appeal.


The purpose of this project was to illustrate the engineering principles required for frontend work in the real world.

--- ## Characteristics

- Stable unique IDs in an object-based task model

Tasks can be added, toggled as complete or incomplete, and deleted.

- Using `localStorage` for persistent state

To prevent inconsistent beginning states, use lazy initialization.

Debounced search (built by hand, without the use of external libraries)

- Async simulation with explicit loading and error UI states

Clear distinction between the derived data and the source of truth

--- ## Important Engineering Choices

 
## Tech Stack

- React

- JavaScript (ES6+)

- Vite

---
**Identity stability over index-based logic**

UUIDs are used by tasks to avoid issues when they are being deleted or rearranged.

- **Functional state updates (`prev`)**

Ensures correctness under batched and asynchronous updates.

- **Derived data, not duplicated state**

Filtered tasks are computed during render instead of stored.

- **Debouncing at the input boundary**

Prevents unnecessary re-computation during rapid user input.

- **Explicit async lifecycle modeling**

UI clearly represents loading, success, and failure states.

---

## Running Locally

```bash

npm install

npm run dev