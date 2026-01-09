import React from "react";
import { ProjectCategoryPage } from "./ProjectCategoryPage";

export const CollectivesPage = (props) => (
  <ProjectCategoryPage
    bannerSrc={"/images/project/human_ai_interaction.png"}
    bannerAlt={"human_ai_interaction"}
    title={"Human-AI Agent Collectives"}
    description={
      "We design Human-Agent Collectives (HACs) to move beyond the 1-to-1 paradigm, enabling collaboration on complex tasks that require human creativity and nuanced teamwork. Supported by Google, our research explores collective curation—a new interaction primitive that allows users to act as orchestrators, defining the composition, roles, and dynamics of their AI teams."
    }
    field={"collectives"}
  />
);
