import React from "react";
import { ProjectCategoryPage } from "./ProjectCategoryPage";

export const AccessibilityPage = (props) => (
  <ProjectCategoryPage
    bannerSrc={"/images/project/inclusive_by_design.png"}
    bannerAlt={"inclusive_by_design"}
    title={"Neurodiversity, Accessibility & Algorithmic Inclusion"}
    description={
      "Grounded in Participatory Design, we design inclusive systems with neurodiverse individuals and people with disabilities. Our research follows two interconnected paths: we build novel assistive technologies to augment human capability, and we critically audit and redesign algorithm-driven platforms to ensure they are accessible, fair, and empowering for all."
    }
    field={"accessibility"}
  />
);
