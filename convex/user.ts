import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const GetUser = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("UserTable")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

        return user[0];
    },
});

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        subscription: v.optional(v.string()), // Accept subscription
    },
    handler: async (ctx, args) => {
        // If User already exist?
        const user = await ctx.db.query("UserTable")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

        const userData = {
            name: args.name,
            email: args.email,
            imageUrl: args.imageUrl,
            ...(args.subscription ? { subscription: args.subscription } : {}), // Add subscription if present
        };

        if (user?.length === 0) {
            //If not then create new user
            const newUserId = await ctx.db.insert("UserTable", userData);
            return userData;
        } else {
            // Update existing user to sync metadata (e.g. subscription)
            const existingUser = user[0];
            await ctx.db.patch(existingUser._id, userData);
            return { ...existingUser, ...userData };
        }
    },
});