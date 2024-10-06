import { ConfigurationStrict } from "./configuration-strict";

export interface Configuration extends ConfigurationStrict {
  /**
   * Index signature for arbitrary custom rules.
   */
  [k: string]: unknown;
}
