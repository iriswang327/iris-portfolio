import { defineField, defineType, defineArrayMember } from "sanity";

export const mockProjectSchema = defineType({
  name: "mockProject",
  title: "Mock Project (Dreams)",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      description: "e.g. Apple, Spotify, Meta, Gemini",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "company" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Pill label — e.g. 'Apple · Product Design'",
    }),
    defineField({
      name: "hoverDescription",
      title: "Hover Description",
      type: "string",
      description: "Appears below card on hover",
    }),
    defineField({
      name: "whyThisCompany",
      title: "Why This Company",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cardGradient",
      title: "Card Gradient CSS",
      type: "string",
      description: "Full CSS gradient string for card background",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "caseStudy",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
            defineField({
              name: "isLocked",
              title: "Currently Building 🔒",
              type: "boolean",
              initialValue: true,
              description: "Lock this case study while in progress",
            }),
            defineField({
              name: "password",
              title: "Password (for recruiters)",
              type: "string",
              description: "Given to recruiters directly",
            }),
            defineField({
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "overview",
              title: "Overview",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "problem",
              title: "The Problem",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "reflection",
              title: "Reflection",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "isLocked",
              media: "thumbnail",
            },
            prepare({ title, subtitle }) {
              return {
                title: title ?? "Untitled",
                subtitle: subtitle ? "🔒 Locked" : "✓ Published",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "company",
      subtitle: "tagline",
      media: "logo",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
