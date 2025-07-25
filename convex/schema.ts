import {defineSchema , defineTable} from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title:v.string(),
        userId:v.string(),
        isArchived:v.boolean(),
        parentDocument:v.optional(v.id("documents")),
        content:v.optional(v.string()),
        coverImage:v.optional(v.string()),
        createdAt: v.number(),
        updatedAt: v.number(),
        sharedWith: v.optional(v.array(v.string())),
        isPublished: v.optional(v.boolean()),
        isFavourite: v.optional(v.boolean()),
    })
    .index("by_user",["userId"])
    .index("by_user_parent",["userId","parentDocument"])
    .index("by_user_updated", ["userId", "updatedAt"])
    .index("by_user_favourites", ["userId", "isFavourite"])
    .index("by_user_archived", ["userId", "isArchived"])
})