import React from "react";
import { ProjectCategoryPage } from "./ProjectCategoryPage";

export const AlignmentPage = (props) => (
  <ProjectCategoryPage
    bannerSrc={"/images/project/data_storytelling.png"}
    bannerAlt={"data_storytelling"}
    title={"Socio-Technical Auditing for AI Alignment"}
    description={
      "How do we ensure complex AI models are effective and aligned with human values? Our research addresses this challenge by developing methods for both technical evaluation and socio-technical auditing. This involves two interconnected perspectives: we build novel benchmarks and analyze training data to measure model capabilities rigorously, and we investigate the real-world impact of these algorithms to guide the alignment process."
    }
    field={"alignment"}
  />
);
