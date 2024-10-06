export = markdownlint;
/**
 * Lint specified Markdown files.
 *
 * @param {Options | null} options Configuration options.
 * @param {LintCallback} callback Callback (err, result) function.
 * @returns {void}
 */
declare function markdownlint(options: Options | null, callback: LintCallback): void;
declare namespace markdownlint {
    export { markdownlintSync as sync, readConfig, readConfigSync, getVersion, promises, GetMarkdownIt, RuleFunction, RuleParams, MarkdownParsers, ParserMarkdownIt, ParserMicromark, MarkdownItToken, MicromarkTokenType, MicromarkToken, RuleOnError, RuleOnErrorInfo, RuleOnErrorFixInfo, Rule, Options, Plugin, ToStringCallback, LintResults, LintError, FixInfo, LintContentCallback, LintCallback, Configuration, ConfigurationStrict, RuleConfiguration, ConfigurationParser, ReadConfigCallback, ResolveConfigExtendsCallback };
}
/**
 * Lint specified Markdown files synchronously.
 *
 * @param {Options | null} options Configuration options.
 * @returns {LintResults} Results object.
 */
declare function markdownlintSync(options: Options | null): LintResults;
/**
 * Read specified configuration file.
 *
 * @param {string} file Configuration file name.
 * @param {ConfigurationParser[] | ReadConfigCallback} parsers Parsing
 * function(s).
 * @param {Object} [fs] File system implementation.
 * @param {ReadConfigCallback} [callback] Callback (err, result) function.
 * @returns {void}
 */
declare function readConfig(file: string, parsers: ConfigurationParser[] | ReadConfigCallback, fs?: any, callback?: ReadConfigCallback): void;
/**
 * Read specified configuration file synchronously.
 *
 * @param {string} file Configuration file name.
 * @param {ConfigurationParser[]} [parsers] Parsing function(s).
 * @param {Object} [fs] File system implementation.
 * @returns {Configuration} Configuration object.
 * @throws An Error if processing fails.
 */
declare function readConfigSync(file: string, parsers?: ConfigurationParser[], fs?: any): Configuration;
/**
 * Gets the (semantic) version of the library.
 *
 * @returns {string} SemVer string.
 */
declare function getVersion(): string;
declare namespace promises {
    export { markdownlintPromise as markdownlint };
    export { extendConfigPromise as extendConfig };
    export { readConfigPromise as readConfig };
}
/**
 * Function to get an instance of the markdown-it parser.
 */
type GetMarkdownIt = () => any;
/**
 * Function to implement rule logic.
 */
type RuleFunction = (params: RuleParams, onError: RuleOnError) => void;
/**
 * Rule parameters.
 */
type RuleParams = {
    /**
     * File/string name.
     */
    name: string;
    /**
     * Markdown parser data.
     */
    parsers: MarkdownParsers;
    /**
     * File/string lines.
     */
    lines: readonly string[];
    /**
     * Front matter lines.
     */
    frontMatterLines: readonly string[];
    /**
     * Rule configuration.
     */
    config: RuleConfiguration;
};
/**
 * Markdown parser data.
 */
type MarkdownParsers = {
    /**
     * Markdown parser data from markdown-it (only present when Rule.parser is "markdownit").
     */
    markdownit: ParserMarkdownIt;
    /**
     * Markdown parser data from micromark (only present when Rule.parser is "micromark").
     */
    micromark: ParserMicromark;
};
/**
 * Markdown parser data from markdown-it.
 */
type ParserMarkdownIt = {
    /**
     * Token objects from markdown-it.
     */
    tokens: MarkdownItToken[];
};
/**
 * Markdown parser data from micromark.
 */
type ParserMicromark = {
    /**
     * Token objects from micromark.
     */
    tokens: MicromarkToken[];
};
/**
 * markdown-it token.
 */
type MarkdownItToken = {
    /**
     * HTML attributes.
     */
    attrs: string[][];
    /**
     * Block-level token.
     */
    block: boolean;
    /**
     * Child nodes.
     */
    children: MarkdownItToken[];
    /**
     * Tag contents.
     */
    content: string;
    /**
     * Ignore element.
     */
    hidden: boolean;
    /**
     * Fence info.
     */
    info: string;
    /**
     * Nesting level.
     */
    level: number;
    /**
     * Beginning/ending line numbers.
     */
    map: number[];
    /**
     * Markup text.
     */
    markup: string;
    /**
     * Arbitrary data.
     */
    meta: any;
    /**
     * Level change.
     */
    nesting: number;
    /**
     * HTML tag name.
     */
    tag: string;
    /**
     * Token type.
     */
    type: string;
    /**
     * Line number (1-based).
     */
    lineNumber: number;
    /**
     * Line content.
     */
    line: string;
};
type MicromarkTokenType = import("markdownlint-micromark").TokenType;
/**
 * micromark token.
 */
type MicromarkToken = {
    /**
     * Token type.
     */
    type: MicromarkTokenType;
    /**
     * Start line (1-based).
     */
    startLine: number;
    /**
     * Start column (1-based).
     */
    startColumn: number;
    /**
     * End line (1-based).
     */
    endLine: number;
    /**
     * End column (1-based).
     */
    endColumn: number;
    /**
     * Token text.
     */
    text: string;
    /**
     * Child tokens.
     */
    children: MicromarkToken[];
    /**
     * Parent token.
     */
    parent: MicromarkToken | null;
};
/**
 * Error-reporting callback.
 */
type RuleOnError = (onErrorInfo: RuleOnErrorInfo) => void;
/**
 * Fix information for RuleOnError callback.
 */
type RuleOnErrorInfo = {
    /**
     * Line number (1-based).
     */
    lineNumber: number;
    /**
     * Detail about the error.
     */
    detail?: string;
    /**
     * Context for the error.
     */
    context?: string;
    /**
     * Link to more information.
     */
    information?: URL;
    /**
     * Column number (1-based) and length.
     */
    range?: number[];
    /**
     * Fix information.
     */
    fixInfo?: RuleOnErrorFixInfo;
};
/**
 * Fix information for RuleOnErrorInfo.
 */
type RuleOnErrorFixInfo = {
    /**
     * Line number (1-based).
     */
    lineNumber?: number;
    /**
     * Column of the fix (1-based).
     */
    editColumn?: number;
    /**
     * Count of characters to delete.
     */
    deleteCount?: number;
    /**
     * Text to insert (after deleting).
     */
    insertText?: string;
};
/**
 * Rule definition.
 */
type Rule = {
    /**
     * Rule name(s).
     */
    names: string[];
    /**
     * Rule description.
     */
    description: string;
    /**
     * Link to more information.
     */
    information?: URL;
    /**
     * Rule tag(s).
     */
    tags: string[];
    /**
     * Parser used.
     */
    parser: "markdownit" | "micromark" | "none";
    /**
     * True if asynchronous.
     */
    asynchronous?: boolean;
    /**
     * Rule implementation.
     */
    function: RuleFunction;
};
/**
 * Configuration options.
 */
type Options = {
    /**
     * Configuration object.
     */
    config?: Configuration;
    /**
     * Configuration parsers.
     */
    configParsers?: ConfigurationParser[];
    /**
     * Custom rules.
     */
    customRules?: Rule[] | Rule;
    /**
     * Files to lint.
     */
    files?: string[] | string;
    /**
     * Front matter pattern.
     */
    frontMatter?: RegExp | null;
    /**
     * File system implementation.
     */
    fs?: any;
    /**
     * True to catch exceptions.
     */
    handleRuleFailures?: boolean;
    /**
     * Additional plugins.
     */
    markdownItPlugins?: Plugin[];
    /**
     * True to ignore HTML directives.
     */
    noInlineConfig?: boolean;
    /**
     * Results object version.
     */
    resultVersion?: number;
    /**
     * Strings to lint.
     */
    strings?: {
        [x: string]: string;
    };
};
/**
 * A markdown-it plugin.
 */
type Plugin = any[];
/**
 * Function to pretty-print lint results.
 */
type ToStringCallback = (ruleAliases?: boolean) => string;
/**
 * Lint results (for resultVersion 3).
 */
type LintResults = {
    [x: string]: LintError[];
};
/**
 * Lint error.
 */
type LintError = {
    /**
     * Line number (1-based).
     */
    lineNumber: number;
    /**
     * Rule name(s).
     */
    ruleNames: string[];
    /**
     * Rule description.
     */
    ruleDescription: string;
    /**
     * Link to more information.
     */
    ruleInformation: string;
    /**
     * Detail about the error.
     */
    errorDetail: string;
    /**
     * Context for the error.
     */
    errorContext: string;
    /**
     * Column number (1-based) and length.
     */
    errorRange: number[];
    /**
     * Fix information.
     */
    fixInfo?: FixInfo;
};
/**
 * Fix information.
 */
type FixInfo = {
    /**
     * Line number (1-based).
     */
    lineNumber?: number;
    /**
     * Column of the fix (1-based).
     */
    editColumn?: number;
    /**
     * Count of characters to delete.
     */
    deleteCount?: number;
    /**
     * Text to insert (after deleting).
     */
    insertText?: string;
};
/**
 * Called with the result of linting a string or document.
 */
type LintContentCallback = (error: Error | null, result?: LintError[]) => void;
/**
 * Called with the result of the lint function.
 */
type LintCallback = (error: Error | null, results?: LintResults) => void;
/**
 * Configuration object for linting rules. For the JSON schema, see
 * {@link  ../schema/markdownlint-config-schema.json}.
 */
type Configuration = import("./configuration").Configuration;
/**
 * Configuration object for linting rules strictly. For the JSON schema, see
 * {@link  ../schema/markdownlint-config-schema-strict.json}.
 */
type ConfigurationStrict = import("./configuration-strict").ConfigurationStrict;
/**
 * Rule configuration.
 */
type RuleConfiguration = boolean | any;
/**
 * Parses a configuration string and returns a configuration object.
 */
type ConfigurationParser = (text: string) => Configuration;
/**
 * Called with the result of the readConfig function.
 */
type ReadConfigCallback = (err: Error | null, config?: Configuration) => void;
/**
 * Called with the result of the resolveConfigExtends function.
 */
type ResolveConfigExtendsCallback = (err: Error | null, path?: string) => void;
/**
 * Lint specified Markdown files.
 *
 * @param {Options} options Configuration options.
 * @returns {Promise<LintResults>} Results object.
 */
declare function markdownlintPromise(options: Options): Promise<LintResults>;
/**
 * Extend specified configuration object.
 *
 * @param {Configuration} config Configuration object.
 * @param {string} file Configuration file name.
 * @param {ConfigurationParser[]} [parsers] Parsing function(s).
 * @param {Object} [fs] File system implementation.
 * @returns {Promise<Configuration>} Configuration object.
 */
declare function extendConfigPromise(config: Configuration, file: string, parsers?: ConfigurationParser[], fs?: any): Promise<Configuration>;
/**
 * Read specified configuration file.
 *
 * @param {string} file Configuration file name.
 * @param {ConfigurationParser[]} [parsers] Parsing function(s).
 * @param {Object} [fs] File system implementation.
 * @returns {Promise<Configuration>} Configuration object.
 */
declare function readConfigPromise(file: string, parsers?: ConfigurationParser[], fs?: any): Promise<Configuration>;
