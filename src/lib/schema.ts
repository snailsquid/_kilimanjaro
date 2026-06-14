import { z } from 'zod';

export const profileSchema = z
  .object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    email: z.string().email(),
    location: z.string().optional(),
    links: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    ),
  })
  .strict();

export const experienceSchema = z.array(
  z
    .object({
      company: z.string(),
      role: z.string(),
      start: z.string(),
      end: z.string().optional(),
      current: z.boolean().optional(),
      summary: z.string().optional(),
      highlights: z.array(z.string()).default([]),
    })
    .strict()
);

export const projectsSchema = z.array(
  z
    .object({
      name: z.string(),
      description: z.string(),
      url: z.string().url().optional(),
      sourceUrl: z.string().url().optional(),
      tags: z.array(z.string()).default([]),
      image: z.string().optional(),
    })
    .strict()
);

export const skillsSchema = z.array(
  z
    .object({
      category: z.string(),
      items: z.array(z.string()),
    })
    .strict()
);

export const dataSchemas = {
  profile: profileSchema,
  experience: experienceSchema,
  projects: projectsSchema,
  skills: skillsSchema,
} as const;

export type Profile = z.infer<typeof profileSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Projects = z.infer<typeof projectsSchema>;
export type Skills = z.infer<typeof skillsSchema>;

export type DataKey = keyof typeof dataSchemas;
export type DataMap = {
  profile: Profile;
  experience: Experience;
  projects: Projects;
  skills: Skills;
};
