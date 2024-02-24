import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loader = () => {
  const promise = delay(1000).then(() => {
    return { message: "Hello from the server!" };
  });

  return defer({
    promise,
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data.promise}>
          {(data) => <p>{data.message}</p>}
        </Await>
      </Suspense>
    </div>
  );
}
