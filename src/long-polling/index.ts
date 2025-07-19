import express from "express";
import { Request, Response } from "express";
const app = express();

/**
 * In-memory object to store job progress.
 * Key: Job ID (string), Value: Progress percentage (0–100)
 */
const jobs: { [key: string]: number } = {};

/**
 * Submits a new job and starts tracking its progress.
 * @route POST /submit
 * @returns {string} Job ID
 */
app.post("/submit", (req, res) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0); // Begin job progress simulation
  res.end(jobId);
});

/**
 * Checks the current status of a submitted job.
 * @route GET /checkStatus?jobId=job:timestamp
 * @returns {string} Current progress percentage of the job
 */
app.get("/checkStatus", async (req: Request, res: Response): Promise<void> => {
  const jobId = req.query.jobId as string;
  if (!jobId || jobs[jobId] === undefined) {
    res.status(400).send("Invalid or unknown jobId\n");
    return;
  }

  while ((await checkJobComplete(jobId)) == false);

  res.end(`\n\nJobStatus:Complete  ${jobs[jobId]}%\n\n`);
});

/**
 * Simulates a long-running job by updating the job's progress every 3 seconds.
 * @param jobId - Unique identifier of the job
 * @param progress - Current progress percentage (0–100)
 */
function updateJob(jobId: string, progress: number) {
  jobs[jobId] = progress;
  console.log(`[Update] ${jobId} => ${progress}%`);

  if (progress >= 100) return; // Job complete

  // Simulate progress increment every 3 seconds
  setTimeout(() => {
    updateJob(jobId, progress + 10);
  }, 3000);
}

async function checkJobComplete(jobId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (jobs[jobId] < 100)
      setTimeout(() => {
        resolve(false);
      }, 1000);
    else resolve(true);
  });
}

// Start the Express server
app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});
