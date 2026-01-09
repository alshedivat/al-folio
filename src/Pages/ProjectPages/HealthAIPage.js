import React from "react";
import { ProjectCategoryPage } from "./ProjectCategoryPage";

export const HealthAIPage = (props) => (
  <ProjectCategoryPage
    bannerSrc={"/images/project/digital_health.png"}
    bannerAlt={"digital_health"}
    title={"Human-Centered AI for Health"}
    description={
      "We build and evaluate the next generation of interactive systems for mental health and well-being. We move beyond simple tracking, utilizing generative AI and novel interaction paradigms to create tools for human-AI co-creation in therapeutic journaling, data-driven self-reflection, and designing new approaches to understanding personal data."
    }
    field={"health-ai"}
  />
);
