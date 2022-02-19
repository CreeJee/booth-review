export const initialContext = {
  retries: 0,
};
export const fetchState = <Path extends string>(path: Path) => {
  return {
    initial: "idle",
    context: initialContext,
    states: {
      idle: {
        on: {
          FETCH: "loading",
        },
      },
      loading: {
        on: {
          RESOLVE: `${path}.success`,
          REJECT: `${path}.failure`,
        },
      },
      success: {
        type: "final",
      },
      failure: {
        on: {
          RETRY: {
            target: "loading",
            // actions: assign<typeof initialContext>({
            //   retries: (context, event) => context.retries + 1,
            // }),
          },
        },
      },
    },
  } as const;
};
