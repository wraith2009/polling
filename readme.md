# Job Status Polling with Express.js

This project demonstrates **Short Polling** and **Long Polling** techniques using Node.js and Express. These are essential patterns for real-time or near-real-time communication between a client and a server when more advanced solutions like WebSockets are unnecessary or unavailable.

---

## What Are Polling Techniques?

### Short Polling

Short polling is a client-initiated technique where the client sends repeated requests to the server at regular intervals (e.g., every 1 second) to check for updates or changes.

- **Client checks repeatedly**: Even if nothing has changed.
- **Simple but inefficient**: Can cause unnecessary load on the server.

> **Your Code:**  
> The file under `short-polling/index.ts` implements this pattern. Clients can send repeated GET requests to `/checkStatus` to check the progress of a submitted job.

---

### Long Polling

Long polling is a more efficient polling technique. The server **holds** the client request **open until** new data is available or a timeout occurs.

- **Client waits**: The server only responds when data is ready.
- **Better for scalability**: Fewer requests compared to short polling.

> **Your Code:**  
> The file under `long-polling/index.ts` demonstrates this. When a client requests `/checkStatus`, the server holds the connection until the job completes (reaches 100%).

---

## How to Run the Project

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Build TypeScript Code

```bash
pnpm run build
```

### 3. Run the Short Polling Server

```bash
pnpm run start-shortpolling
```

### 4. Run the Long Polling Server

```bash
pnpm run start-longpolling
```

---

## Endpoints

### `POST /submit`

- Submits a new job and returns a `jobId`.
- The job simulates progress every 3 seconds.

### `GET /checkStatus?jobId=<id>`

- **In short polling**: Returns the current progress immediately.
- **In long polling**: Waits until the job is complete, then responds.

---

## How to Learn from This

### Compare the Two Techniques

| Feature           | Short Polling                   | Long Polling                       |
| ----------------- | ------------------------------- | ---------------------------------- |
| Server Load       | Higher due to frequent requests | Lower due to holding connections   |
| Client Experience | May receive stale data          | Gets update only when necessary    |
| Complexity        | Simple                          | Slightly more complex to implement |

---

Happy Polling!
