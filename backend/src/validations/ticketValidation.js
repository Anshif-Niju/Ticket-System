import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Please provide a valid id");

export const createTicketSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters long"),
    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters long"),
    category: z.string().trim().min(2, "Category is required"),
    priority: z.enum(["Low", "Medium", "High"]),
  }),
  params: z.object({}),
  query: z.object({}),
});

export const ticketIdParamSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: objectIdSchema,
  }),
  query: z.object({}),
});

export const assignTicketSchema = z.object({
  body: z.object({
    assignedAgent: objectIdSchema,
  }),
  params: z.object({
    id: objectIdSchema,
  }),
  query: z.object({}),
});

export const updateTicketSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).optional(),
    description: z.string().trim().min(10).optional(),
    category: z.string().trim().min(2).optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    status: z.enum(["Open", "In Progress", "Resolved"]).optional(),
  }),
  params: z.object({
    id: objectIdSchema,
  }),
  query: z.object({}),
});

export const updateTicketStatusSchema = z.object({
  body: z.object({
    status: z.enum(["Open", "In Progress", "Resolved"]),
  }),
  params: z.object({
    id: objectIdSchema,
  }),
  query: z.object({}),
});
