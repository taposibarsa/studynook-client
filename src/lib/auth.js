import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

let authInstance = null;

export function getAuth() {
  if (authInstance) return authInstance;

  const uri = process.env.MONGODB_URI;
  const secret = process.env.BETTER_AUTH_SECRET;

  if (!uri || !secret) {
    throw new Error(
      "Missing MONGODB_URI or BETTER_AUTH_SECRET in studynook-client/.env.local — see .env.local.example"
    );
  }

  const client = new MongoClient(uri);
  const db = client.db("studynook");

  authInstance = betterAuth({
    secret,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      autoSignIn: true,
    },
    emailVerification: {
      sendOnSignUp: false,
      sendOnSignIn: false,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google"],
      },
    },
    user: {
      additionalFields: {
        photoUrl: {
          type: "string",
          required: false,
          input: true,
        },
      },
    },
    trustedOrigins: [
      process.env.BETTER_AUTH_URL || "http://localhost:3000",
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    ],
  });

  return authInstance;
}
