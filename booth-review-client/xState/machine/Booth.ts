import { createMachine } from "xstate";
import { fetchState } from "../schema/fetchSchema";

const A = fetchState("#booth.products.list");
export const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCMD2qAuALAdABwCdUBXCAYw1h1QHcA7SAJTADcBLMGgYloYmfadmAR2JwMiUHlSw2GNqjqSQAD0QBmAOwAmHAA4AnFr1aAbABYDpgIwBWADQgAnom0GDOTdYPnb2t7a25poGmgC+YY5omLiEJOSUOGTEBARgdBgCHNxpouIAwilpGVmcytKy8orKaghaAAw4vpr16tZeBrb11tqOLgjm6no4pvXafqaaeuGRINHYOABmYBhkuGwQADZgXABiAKIAKvkAEuUycgpKSKqIenq2OLam6qY+9QZ69baafYiDmhw7nck2s6ksdhmUXQC2Wq1wm1QAEMIGw6FAuIx9gBlADyABkAGr7c6VK41RDWOy6EJfTT074-Ax-Oq2dRNYEWUyGWxWHwRaExJYrNY4REotEYrEAKX2+UOpMu1RutXuj2er3en2+v2crheQM5-nM5m0U20ArmMNwcNFsGIZDIcFgXDSsGkdFgYEKqXSmVY2UVVWuoFqWnMOCG9Q+U3qlnGvT1CC6jXUZuCnUGJus5kt8xtItw9sdzp49CYcA9XtKNCD5JVGnpQLpemsenMNnqpgcSde1hwPQCXRslnUeetwvhOGLTtgLvxqCgaOY7sUXrrytD-26+k+PLNBm0hkGLONkZevk6Bg+6Yts3zk9FiyRbE2KR2WMOjAAmhuQ7cEDVJ4XjecwPi+H4WTTQFgSsMC42velxyFABVL0CBwBclzoLhEWwkQxFgCQbgqJV-zDPRTBwcZ7jeTRLC+E0WWsbkmhYwcrFeWxvFMCJZjoVAIDgZQHziUgKCoXgK0EWsSIuYMKQQGxI3UVS1PU1TzCgwYmhsNk9G0bsDDBMFkIWMSEioZJfRKAMyjkslNwA0xdD0oYOzsdyLBZDthlMfyXMMawPl8bRc3vCcLIkv9FK0FSNISrSkzNRoPO4zQXkhPQzILKcNm2GKGwQeiPA1N52i6QIPh89QPFgt5JkYzQxwioVbQRZFUXRQqtwQYKegHWi4N8DUoMCDkQR0aCj1sHLHyLB1Z3gByyMUqlfCBECWnpHxQh8zp9Bc4JDBaGjnjm9qlhfN80h6gD6OGQ91HqDKnpe3V+jNdk1LcTRngsbaLsLO7ah0CM3te7RnvpZjr0NdwdBzLoITmtCwAwrC0RBxBeUNNp3v8dRAgy5i3nh9wDNqhpzGy1qFjRghsdZPHgvpQnidMFlQhwaNedbMCczBWnBWwJmqRZgmoY508I157pGI+Qd-L4sIgA */
  createMachine({
    id: "booth",
    type: "parallel",
    states: {
      proudcts: {
        type: "parallel",
        states: {
          ownedReview: {
            on: {
              ownedReviewRequest: {
                target: "#booth.fetch.idle",
              },
            },
          },
          currentReview: {
            on: {
              requestCurrentReview: {
                target: "#booth.fetch.idle",
              },
            },
          },
        },
      },
      fetch: {
        initial: "idle",
        states: {
          idle: {
            on: {
              FETCH: {
                target: "#booth.fetch.loading",
              },
            },
          },
          loading: {
            on: {
              RESOLVE: {
                target: "#booth.fetch.success",
              },
              REJECT: {
                target: "#booth.fetch.failure",
              },
            },
          },
          success: {
            type: "final",
            on: {
              responseCurrentReview: {
                target: "#booth.proudcts.currentReview",
              },
              ownedResponseReview: {
                target: "#booth.proudcts.ownedReview",
              },
              LoginResponse: {
                target: "#booth.User.Login",
              },
            },
          },
          failure: {
            on: {
              RETRY: {
                actions: "xstate.assign",
                target: "#booth.fetch.loading",
              },
            },
          },
        },
      },
      User: {
        initial: "Login",
        states: {
          Login: {
            on: {
              loginRequest: {
                target: "#booth.fetch.idle",
              },
            },
          },
        },
      },
    },
  });
export default machine;
