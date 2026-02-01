import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const GetMessages = query({
    args: {
        tripId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("MessagesTable")
            .withIndex("by_tripId", (q) => q.eq("tripId", args.tripId))
            .collect();
    },
});

export const SendMessage = mutation({
    args: {
        tripId: v.string(),
        role: v.string(),
        content: v.string(),
        ui: v.optional(v.string()),
        timestamp: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("MessagesTable", {
            tripId: args.tripId,
            role: args.role,
            content: args.content,
            ui: args.ui,
            timestamp: args.timestamp || new Date().toISOString()
        });
    },
});
