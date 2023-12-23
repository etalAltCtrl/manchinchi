import { serve } from "https://deno.land/std@0.154.0/http/server.ts";

const listener = serve(() => new Response("Hello, world!"));
console.log("Listening on:", listener.addr());
