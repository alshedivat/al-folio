/**
 * Attempt deals with several values, and tries to parse according to those
 * values.
 *
 * If a value resulted in `ok`, it worked, the tokens that were made are used,
 * and `ok` is switched to.
 * If the result is `nok`, the attempt failed, so we revert to the original
 * state, and `nok` is used.
 *
 * @param construct
 *   Construct(s) to try.
 * @param ok
 *   State to move to when successful.
 * @param nok
 *   State to move to when unsuccessful.
 * @returns
 *   Next state.
 */
declare type Attempt = (
construct: Array<Construct> | Construct | ConstructRecord,
ok: State,
nok?: State | undefined
) => State

/**
 * Generate a back label dynamically.
 *
 * For the following markdown:
 *
 * ```markdown
 * Alpha[^micromark], bravo[^micromark], and charlie[^remark].
 *
 * [^remark]: things about remark
 * [^micromark]: things about micromark
 * ```
 *
 * This function will be called with:
 *
 * * `0` and `0` for the backreference from `things about micromark` to
 *  `alpha`, as it is the first used definition, and the first call to it
 * * `0` and `1` for the backreference from `things about micromark` to
 *  `bravo`, as it is the first used definition, and the second call to it
 * * `1` and `0` for the backreference from `things about remark` to
 *  `charlie`, as it is the second used definition
 */
declare type BackLabelTemplate = (
referenceIndex: number,
rereferenceIndex: number
) => string

/**
 * A chunk is either a character code or a slice of a buffer in the form of a
 * string.
 *
 * Chunks are used because strings are more efficient storage that character
 * codes, but limited in what they can represent.
 */
declare type Chunk = Code | string

declare type Chunk_2 = Chunk

/**
 * A character code.
 *
 * This is often the same as what `String#charCodeAt()` yields but micromark
 * adds meaning to certain other values.
 *
 * `null` represents the end of the input stream (called eof).
 * Negative integers are used instead of certain sequences of characters (such
 * as line endings and tabs).
 */
declare type Code = number | null

declare type Compile = Compile_2

/**
 * @param {CompileOptions | null | undefined} [options]
 * @returns {Compile}
 */
export declare function compile(options?: CompileOptions_2 | null | undefined): Compile

/**
 * Serialize micromark events as HTML.
 */
declare type Compile_2 = (events: Array<Event_2>) => string

declare type CompileContext = CompileContext_2

/**
 * HTML compiler context.
 */
declare type CompileContext_2 = {
    /**
     * Configuration passed by the user.
     */
    options: CompileOptions

    /**
     * Set data into the key-value store.
     *
     * @param key
     *   Key.
     * @param value
     *   Value.
     * @returns
     *   Nothing.
     */
    setData: <Key extends keyof CompileData>(
    key: Key,
    value?: CompileData[Key]
    ) => undefined

    /**
     * Get data from the key-value store.
     *
     * @param key
     *   Key.
     * @returns
     *   Value at `key` in compile data.
     */
    getData: <Key extends keyof CompileData>(key: Key) => CompileData[Key]

    /**
     * Output an extra line ending if the previous value wasn’t EOF/EOL.
     *
     * @returns
     *   Nothing.
     */
    lineEndingIfNeeded: () => undefined

    /**
     * Make a value safe for injection in HTML (except w/ `ignoreEncode`).
     *
     * @param value
     *   Raw value.
     * @returns
     *   Safe value.
     */
    encode: (value: string) => string

    /**
     * Capture some of the output data.
     *
     * @returns
     *   Nothing.
     */
    buffer: () => undefined

    /**
     * Stop capturing and access the output data.
     *
     * @returns
     *   Captured data.
     */
    resume: () => string

    /**
     * Output raw data.
     *
     * @param value
     *   Raw value.
     * @returns
     *   Nothing.
     */
    raw: (value: string) => undefined

    /**
     * Output (parts of) HTML tags.
     *
     * @param value
     *   Raw value.
     * @returns
     *   Nothing.
     */
    tag: (value: string) => undefined

    /**
     * Get the string value of a token.
     *
     * @param token
     *   Start/end in stream.
     * @param expandTabs
     *   Whether to expand tabs.
     * @returns
     *   Serialized chunks.
     */
    sliceSerialize: TokenizeContext['sliceSerialize']
}

/**
 * State tracked to compile events as HTML.
 */
export declare interface CompileData {
    /**
     * Whether the last emitted value was a tag.
     */
    lastWasTag?: boolean | undefined

    /**
     * Whether the first list item is expected, used by lists.
     */
    expectFirstItem?: boolean | undefined

    /**
     * Whether to slurp the next line ending (resets itself on the next line
     * ending).
     */
    slurpOneLineEnding?: boolean | undefined

    /**
     * Whether to slurp all future line endings (has to be unset manually).
     */
    slurpAllLineEndings?: boolean | undefined

    /**
     * Whether we’re in fenced code, used by code (fenced).
     */
    fencedCodeInside?: boolean | undefined

    /**
     * Number of fences that were seen, used by code (fenced).
     */
    fencesCount?: number | undefined

    /**
     * Whether we’ve seen code data, used by code (fenced, indented).
     */
    flowCodeSeenData?: boolean | undefined

    /**
     * Ignore encoding unsafe characters, used for example for URLs which are
     * first percent encoded, or by HTML when supporting it.
     */
    ignoreEncode?: boolean | undefined

    /**
     * Current heading rank, used by heading (atx, setext).
     */
    headingRank?: number | undefined

    /**
     * Whether we’re in code data, used by code (text).
     */
    inCodeText?: boolean | undefined

    /**
     * Current character reference kind.
     */
    characterReferenceType?: string | undefined

    /**
     * Stack of containers, whether they’re tight or not.
     */
    tightStack: Array<boolean>

    /**
     * Collected definitions.
     */
    definitions: Record<string, Definition>
}

/**
 * Compile options.
 */
declare interface CompileOptions {
    /**
     * Whether to allow (dangerous) HTML (`boolean`, default: `false`).
     *
     * The default is `false`, which still parses the HTML according to
     * `CommonMark` but shows the HTML as text instead of as elements.
     *
     * Pass `true` for trusted content to get actual HTML elements.
     */
    allowDangerousHtml?: boolean | null | undefined

    /**
     * Whether to allow dangerous protocols in links and images (`boolean`,
     * default: `false`).
     *
     * The default is `false`, which drops URLs in links and images that use
     * dangerous protocols.
     *
     * Pass `true` for trusted content to support all protocols.
     *
     * URLs that have no protocol (which means it’s relative to the current page,
     * such as `./some/page.html`) and URLs that have a safe protocol (for
     * images: `http`, `https`; for links: `http`, `https`, `irc`, `ircs`,
     * `mailto`, `xmpp`), are safe.
     * All other URLs are dangerous and dropped.
     */
    allowDangerousProtocol?: boolean | null | undefined

    /**
     * Default line ending to use when compiling to HTML, for line endings not in
     * `value`.
     *
     * Generally, `micromark` copies line endings (`\r`, `\n`, `\r\n`) in the
     * markdown document over to the compiled HTML.
     * In some cases, such as `> a`, CommonMark requires that extra line endings
     * are added: `<blockquote>\n<p>a</p>\n</blockquote>`.
     *
     * To create that line ending, the document is checked for the first line
     * ending that is used.
     * If there is no line ending, `defaultLineEnding` is used.
     * If that isn’t configured, `\n` is used.
     */
    defaultLineEnding?: LineEnding | null | undefined

    /**
     * Array of HTML extensions (default: `[]`).
     */
    htmlExtensions?: Array<HtmlExtension> | null | undefined
}

declare type CompileOptions_2 = CompileOptions

/**
 * An object describing how to parse a markdown construct.
 */
declare type Construct = {
    /**
     * Set up a state machine to handle character codes streaming in.
     */
    tokenize: Tokenizer

    /**
     * Guard whether the previous character can come before the construct.
     */
    previous?: Previous | undefined

    /**
     * For containers, a continuation construct.
     */
    continuation?: Construct | undefined

    /**
     * For containers, a final hook.
     */
    exit?: Exiter | undefined

    /**
     * Name of the construct, used to toggle constructs off.
     *
     * Named constructs must not be `partial`.
     */
    name?: string | undefined

    /**
     * Whether this construct represents a partial construct.
     *
     * Partial constructs must not have a `name`.
     */
    partial?: boolean | undefined

    /**
     * Resolve the events parsed by `tokenize`.
     *
     * For example, if we’re currently parsing a link title and this construct
     * parses character references, then `resolve` is called with the events
     * ranging from the start to the end of a character reference each time one is
     * found.
     */
    resolve?: Resolver | undefined

    /**
     * Resolve the events from the start of the content (which includes other
     * constructs) to the last one parsed by `tokenize`.
     *
     * For example, if we’re currently parsing a link title and this construct
     * parses character references, then `resolveTo` is called with the events
     * ranging from the start of the link title to the end of a character
     * reference each time one is found.
     */
    resolveTo?: Resolver | undefined

    /**
     * Resolve all events when the content is complete, from the start to the end.
     * Only used if `tokenize` is successful once in the content.
     *
     * For example, if we’re currently parsing a link title and this construct
     * parses character references, then `resolveAll` is called *if* at least one
     * character reference is found, ranging from the start to the end of the link
     * title to the end.
     */
    resolveAll?: Resolver | undefined

    /**
     * Concrete constructs cannot be interrupted by more containers.
     *
     * For example, when parsing the document (containers, such as block quotes
     * and lists) and this construct is parsing fenced code:
     *
     * ````markdown
     * > ```js
     * > - list?
     * ````
     *
     * …then `- list?` cannot form if this fenced code construct is concrete.
     *
     * An example of a construct that is not concrete is a GFM table:
     *
     * ````markdown
     * | a |
     * | - |
     * > | b |
     * ````
     *
     * …`b` is not part of the table.
     */
    concrete?: boolean | undefined

    /**
     * Whether the construct, when in a `ConstructRecord`, precedes over existing
     * constructs for the same character code when merged.
     *
     * The default is that new constructs precede over existing ones.
     */
    add?: 'after' | 'before' | undefined
}

/**
 * Several constructs, mapped from their initial codes.
 */
declare type ConstructRecord = Record<
string,
Array<Construct> | Construct | undefined
>

/**
 * Deal with the character and move to the next.
 *
 * @param code
 *   Current code.
 */
declare type Consume = (code: Code) => undefined

/**
 * State shared between container calls.
 */
declare interface ContainerState {
    /**
     * Special field to close the current flow (or containers).
     */
    _closeFlow?: boolean | undefined

    /**
     * Used by block quotes.
     */
    open?: boolean | undefined

    /**
     * Current marker, used by lists.
     */
    marker?: Code | undefined

    /**
     * Current token type, used by lists.
     */
    type?: TokenType | undefined

    /**
     * Current size, used by lists.
     */
    size?: number | undefined

    /**
     * Whether there first line is blank, used by lists.
     */
    initialBlankLine?: boolean | undefined

    /**
     * Whether there are further blank lines, used by lists.
     */
    furtherBlankLines?: boolean | undefined
}

/**
 * Enumeration of the content types.
 *
 * Technically `document` is also a content type, which includes containers
 * (lists, block quotes) and flow.
 * As `ContentType` is used on tokens to define the type of subcontent but
 * `document` is the highest level of content, so it’s not listed here.
 *
 * Containers in markdown come from the margin and include more constructs
 * on the lines that define them.
 * Take for example a block quote with a paragraph inside it (such as
 * `> asd`).
 *
 * `flow` represents the sections, such as headings, code, and content, which
 * is also parsed per line
 * An example is HTML, which has a certain starting condition (such as
 * `<script>` on its own line), then continues for a while, until an end
 * condition is found (such as `</style>`).
 * If that line with an end condition is never found, that flow goes until
 * the end.
 *
 * `content` is zero or more definitions, and then zero or one paragraph.
 * It’s a weird one, and needed to make certain edge cases around definitions
 * spec compliant.
 * Definitions are unlike other things in markdown, in that they behave like
 * `text` in that they can contain arbitrary line endings, but *have* to end
 * at a line ending.
 * If they end in something else, the whole definition instead is seen as a
 * paragraph.
 *
 * The content in markdown first needs to be parsed up to this level to
 * figure out which things are defined, for the whole document, before
 * continuing on with `text`, as whether a link or image reference forms or
 * not depends on whether it’s defined.
 * This unfortunately prevents a true streaming markdown to HTML compiler.
 *
 * `text` contains phrasing content such as attention (emphasis, strong),
 * media (links, images), and actual text.
 *
 * `string` is a limited `text` like content type which only allows character
 * references and character escapes.
 * It exists in things such as identifiers (media references, definitions),
 * titles, or URLs.
 */
declare type ContentType = 'content' | 'document' | 'flow' | 'string' | 'text'

/**
 * Create a context.
 *
 * @param from
 *   Where to create from.
 * @returns
 *   Context.
 */
declare type Create = (
from?: Omit<Point, '_bufferIndex' | '_index'> | undefined
) => TokenizeContext

/**
 * Definition.
 */
declare type Definition = {
    /**
     * Destination.
     */
    destination?: string | undefined
    /**
     * Title.
     */
    title?: string | undefined
}

/**
 * Structure representing a directive.
 */
declare type Directive = {
    /**
     *   Kind.
     */
    type: DirectiveType
    /**
     *   Name of directive.
     */
    name: string
    /**
     * Compiled HTML content that was in `[brackets]`.
     */
    label?: string | undefined
    /**
     * Object w/ HTML attributes.
     */
    attributes?: Record<string, string> | undefined
    /**
     * Compiled HTML content inside container directive.
     */
    content?: string | undefined
    /**
     * Private :)
     */
    _fenceCount?: number | undefined
}

/**
 * Create an extension for `micromark` to enable directive syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable directive syntax.
 */
export declare function directive(): Extension

/**
 * Create an extension for `micromark` to support directives when serializing
 * to HTML.
 *
 * @param {HtmlOptions | null | undefined} [options={}]
 *   Configuration (default: `{}`).
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions`, to
 *   support directives when serializing to HTML.
 */
export declare function directiveHtml(
options?: HtmlOptions | null | undefined
): HtmlExtension_2

/**
 * Kind.
 */
declare type DirectiveType =
| 'containerDirective'
| 'leafDirective'
| 'textDirective'

/**
 * Handle the whole document.
 *
 * @returns
 *   Nothing.
 */
declare type DocumentHandle = (
this: Omit<CompileContext_2, 'sliceSerialize'>
) => undefined

/**
 * A context object to transition the state machine.
 */
declare type Effects = {
    /**
     * Start a new token.
     */
    enter: Enter

    /**
     * End a started token.
     */
    exit: Exit

    /**
     * Deal with the character and move to the next.
     */
    consume: Consume

    /**
     * Try to tokenize a construct.
     */
    attempt: Attempt

    /**
     * Interrupt is used for stuff right after a line of content.
     */
    interrupt: Attempt

    /**
     * Attempt, then revert.
     */
    check: Attempt
}

declare type Encoding = Encoding_2

/**
 * Encodings supported by `TextEncoder`.
 *
 * Arbitrary encodings can be supported depending on how the engine is built.
 * So any string *could* be valid.
 * But you probably want `utf-8`.
 */
declare type Encoding_2 =
// Encodings supported in Node by default or when built with the small-icu option.
// Does not include aliases.
| 'utf-8' // Always supported in Node.
| 'utf-16le' // Always supported in Node.
| 'utf-16be' // Not supported when ICU is disabled.
// Everything else (depends on browser, or full ICU data).
| (string & {})

/**
 * Open a token.
 *
 * @param type
 *   Token type.
 * @param fields
 *   Extra fields.
 * @returns {Token}
 *   Token.
 */
declare type Enter = (
type: TokenType,
fields?: Omit<Partial<Token>, 'type'> | undefined
) => Token

/**
 * The start or end of a token amongst other events.
 *
 * Tokens can “contain” other tokens, even though they are stored in a flat
 * list, through `enter`ing before them, and `exit`ing after them.
 */
declare type Event_2 = ['enter' | 'exit', Token, TokenizeContext]
export { Event_2 as Event }

/**
 * Close a token.
 *
 * @param type
 *   Token type.
 * @returns
 *   Token.
 */
declare type Exit = (type: TokenType) => Token

/**
 * Like a tokenizer, but without `ok` or `nok`, and returning `undefined`.
 *
 * This is the final hook when a container must be closed.
 *
 * @param this
 *   Tokenize context.
 * @param effects
 *   Effects.
 * @returns
 *   Nothing.
 */
declare type Exiter = (this: TokenizeContext, effects: Effects) => undefined

declare type Extension = Extension_2

/**
 * A syntax extension changes how markdown is tokenized.
 *
 * See: <https://github.com/micromark/micromark#syntaxextension>
 */
declare interface Extension_2 {
    document?: ConstructRecord | undefined
    contentInitial?: ConstructRecord | undefined
    flowInitial?: ConstructRecord | undefined
    flow?: ConstructRecord | undefined
    string?: ConstructRecord | undefined
    text?: ConstructRecord | undefined
    disable?: {null?: Array<string> | undefined} | undefined
    insideSpan?:
    | {null?: Array<Pick<Construct, 'resolveAll'>> | undefined}
    | undefined
    attentionMarkers?: {null?: Array<Code> | undefined} | undefined
}

declare type Extension_3 = Extension_2

declare type Extension_4 = Extension_2

declare type Extension_5 = Extension_2

declare type Extension_6 = Extension_2

/**
 * A full, filtereed, normalized, extension.
 */
declare type FullNormalizedExtension = {
    [Key in keyof Extension_2]-?: Exclude<Extension_2[Key], undefined>
}

/**
 * Create an extension for `micromark` to support GitHub autolink literal
 * syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   autolink literal syntax.
 */
export declare function gfmAutolinkLiteral(): Extension_3

/**
 * Create an HTML extension for `micromark` to support GitHub autolink literal
 * when serializing to HTML.
 *
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions` to
 *   support GitHub autolink literal when serializing to HTML.
 */
export declare function gfmAutolinkLiteralHtml(): HtmlExtension_3

/**
 * Create an extension for `micromark` to enable GFM footnote syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to
 *   enable GFM footnote syntax.
 */
export declare function gfmFootnote(): Extension_4

/**
 * Create an extension for `micromark` to support GFM footnotes when
 * serializing to HTML.
 *
 * @param {Options | null | undefined} [options={}]
 *   Configuration (optional).
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions` to
 *   support GFM footnotes when serializing to HTML.
 */
export declare function gfmFootnoteHtml(
options?: Options | null | undefined
): HtmlExtension_4

/**
 * Create an HTML extension for `micromark` to support GitHub tables syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   table syntax.
 */
export declare function gfmTable(): Extension_5

/**
 * Create an HTML extension for `micromark` to support GitHub tables when
 * serializing to HTML.
 *
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions` to
 *   support GitHub tables when serializing to HTML.
 */
export declare function gfmTableHtml(): HtmlExtension_5

/**
 * Handle a directive.
 */
declare type Handle = (
this: CompileContext,
directive: Directive
) => boolean | undefined

/**
 * Handle one token.
 *
 * @param token
 *   Token.
 * @returns
 *   Nothing.
 */
declare type Handle_2 = (this: CompileContext_2, token: Token) => undefined

/**
 * Token types mapping to handles.
 */
declare type Handles = {
    /**
    * Token handle.
    */
    [Key in TokenType]?: Handle_2
} & {
    /**
     * Document handle.
     */
    null?: DocumentHandle
}

/**
 * Normalized extenion.
 */
declare interface HtmlExtension {
    enter?: Handles | undefined
    exit?: Handles | undefined
}

declare type HtmlExtension_2 = HtmlExtension

declare type HtmlExtension_3 = HtmlExtension

declare type HtmlExtension_4 = HtmlExtension

declare type HtmlExtension_5 = HtmlExtension

declare type HtmlExtension_6 = HtmlExtension

/**
 * Configuration.
 *
 * > 👉 **Note**: the special field `'*'` can be used to specify a fallback
 * > handle to handle all otherwise unhandled directives.
 */
declare type HtmlOptions = Record<string, Handle>

declare type KatexOptions = Object

/**
 * Type of line ending in markdown.
 */
declare type LineEnding = '\r' | '\n' | '\r\n'

/**
 * Create an extension for `micromark` to enable math syntax.
 *
 * @param {Options | null | undefined} [options={}]
 *   Configuration (default: `{}`).
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable math syntax.
 */
export declare function math(options?: Options_2 | null | undefined): Extension_6

/**
 * Create an extension for `micromark` to support math when serializing to
 * HTML.
 *
 * > 👉 **Note**: this uses KaTeX to render math.
 *
 * @param {Options | null | undefined} [options={}]
 *   Configuration (default: `{}`).
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions`, to
 *   support math when serializing to HTML.
 */
export declare function mathHtml(options?: Options_4 | null | undefined): HtmlExtension_6

/**
 * Configuration.
 */
declare type Options = {
    /**
     * Prefix to use before the `id` attribute on footnotes to prevent them from
     * *clobbering* (default: `'user-content-'`).
     *
     * Pass `''` for trusted markdown and when you are careful with
     * polyfilling.
     * You could pass a different prefix.
     *
     * DOM clobbering is this:
     *
     * ```html
     * <p id="x"></p>
     * <script>alert(x) // `x` now refers to the `p#x` DOM element</script>
     * ```
     *
     * The above example shows that elements are made available by browsers, by
     * their ID, on the `window` object.
     * This is a security risk because you might be expecting some other variable
     * at that place.
     * It can also break polyfills.
     * Using a prefix solves these problems.
     */
    clobberPrefix?: string | null | undefined
    /**
     * Textual label to use for the footnotes section (default: `'Footnotes'`).
     *
     * Change it when the markdown is not in English.
     *
     * This label is typically hidden visually (assuming a `sr-only` CSS class
     * is defined that does that) and so affects screen readers only.
     * If you do have such a class, but want to show this section to everyone,
     * pass different attributes with the `labelAttributes` option.
     */
    label?: string | null | undefined
    /**
     * Attributes to use on the footnote label (default: `'class="sr-only"'`).
     *
     * Change it to show the label and add other attributes.
     *
     * This label is typically hidden visually (assuming an `sr-only` CSS class
     * is defined that does that) and so affects screen readers only.
     * If you do have such a class, but want to show this section to everyone,
     * pass an empty string.
     * You can also add different attributes.
     *
     * > 👉 **Note**: `id="footnote-label"` is always added, because footnote
     * > calls use it with `aria-describedby` to provide an accessible label.
     */
    labelAttributes?: string | null | undefined
    /**
     * HTML tag name to use for the footnote label element (default: `'h2'`).
     *
     * Change it to match your document structure.
     *
     * This label is typically hidden visually (assuming a `sr-only` CSS class
     * is defined that does that) and so affects screen readers only.
     * If you do have such a class, but want to show this section to everyone,
     * pass different attributes with the `labelAttributes` option.
     */
    labelTagName?: string | null | undefined
    /**
     * Textual label to describe the backreference back to references (default:
     * `defaultBackLabel`).
     *
     * The default value is:
     *
     * ```js
     * function defaultBackLabel(referenceIndex, rereferenceIndex) {
     * return (
     * 'Back to reference ' +
     * (referenceIndex + 1) +
     * (rereferenceIndex > 1 ? '-' + rereferenceIndex : '')
     * )
     * }
     * ```
     *
     * Change it when the markdown is not in English.
     *
     * This label is used in the `aria-label` attribute on each backreference
     * (the `↩` links).
     * It affects users of assistive technology.
     */
    backLabel?: BackLabelTemplate | string | null | undefined
}

declare type Options_2 = Options_3

/**
 * Configuration.
 */
declare type Options_3 = {
    /**
     * Whether to support math (text) with a single dollar (default: `true`).
     *
     * Single dollars work in Pandoc and many other places, but often interfere
     * with “normal” dollars in text.
     * If you turn this off, you can use two or more dollars for text math.
     */
    singleDollarTextMath?: boolean | null | undefined
}

/**
 * Configuration for HTML output.
 *
 * > 👉 **Note**: passed to `katex.renderToString`.
 * > `displayMode` is overwritten by this plugin, to `false` for math in
 * > text (inline), and `true` for math in flow (block).
 */
declare type Options_4 = Omit<KatexOptions, 'displayMode'>

/**
 * @param {ParseOptions | null | undefined} [options]
 * @returns {ParseContext}
 */
export declare function parse(options?: ParseOptions_2 | null | undefined): ParseContext_2

/**
 * A context object that helps w/ parsing markdown.
 */
declare interface ParseContext {
    /**
     * All constructs.
     */
    constructs: FullNormalizedExtension

    /**
     * Create a content tokenizer.
     */
    content: Create

    /**
     * Create a document tokenizer.
     */
    document: Create

    /**
     * Create a flow tokenizer.
     */
    flow: Create

    /**
     * Create a string tokenizer.
     */
    string: Create

    /**
     * Create a text tokenizer.
     */
    text: Create

    /**
     * List of defined identifiers.
     */
    defined: Array<string>

    /**
     * Map of line numbers to whether they are lazy (as opposed to the line before
     * them).
     * Take for example:
     *
     * ```markdown
     * > a
     * b
     * ```
     *
     * L1 here is not lazy, L2 is.
     */
    lazy: Record<number, boolean>
}

declare type ParseContext_2 = ParseContext

/**
 * Config defining how to parse.
 */
export declare interface ParseOptions {
    /**
     * Array of syntax extensions (default: `[]`).
     */
    extensions?: Array<Extension_2> | null | undefined
}

declare type ParseOptions_2 = ParseOptions

/**
 * A location in the document (`line`/`column`/`offset`) and chunk (`_index`,
 * `_bufferIndex`).
 *
 * `_bufferIndex` is `-1` when `_index` points to a code chunk and it’s a
 * non-negative integer when pointing to a string chunk.
 *
 * The interface for the location in the document comes from unist `Point`:
 * <https://github.com/syntax-tree/unist#point>
 */
declare type Point = {
    /**
     * Position in a string chunk (or `-1` when pointing to a numeric chunk).
     */
    _bufferIndex: number

    /**
     * Position in a list of chunks.
     */
    _index: number

    /**
     * 1-indexed column number.
     */
    column: number

    /**
     * 1-indexed line number.
     */
    line: number

    /**
     * 0-indexed position in the document.
     */
    offset: number
}

/**
 * @param {Array<Event>} events
 * @returns {Array<Event>}
 */
export declare function postprocess(
events: Array<Event_2>
): Array<Event_2>

/**
 * @returns {Preprocessor}
 */
export declare function preprocess(): Preprocessor

declare type Preprocessor = (
value: Value,
encoding?: Encoding | null | undefined,
end?: boolean | null | undefined
) => Array<Chunk_2>

/**
 * Guard whether `code` can come before the construct.
 *
 * In certain cases a construct can hook into many potential start characters.
 * Instead of setting up an attempt to parse that construct for most
 * characters, this is a speedy way to reduce that.
 *
 * @param this
 *   Tokenize context.
 * @param code
 *   Previous code.
 * @returns
 *   Whether `code` is allowed before.
 */
declare type Previous = (this: TokenizeContext, code: Code) => boolean

/**
 * A resolver handles and cleans events coming from `tokenize`.
 *
 * @param events
 *   List of events.
 * @param context
 *   Tokenize context.
 * @returns
 *   The given, modified, events.
 */
declare type Resolver = (
events: Array<Event_2>,
context: TokenizeContext
) => Array<Event_2>

/**
 * The main unit in the state machine: a function that gets a character code
 * and has certain effects.
 *
 * A state function should return another function: the next
 * state-as-a-function to go to.
 *
 * But there is one case where they return `undefined`: for the eof character
 * code (at the end of a value).
 * The reason being: well, there isn’t any state that makes sense, so
 * `undefined` works well.
 * Practically that has also helped: if for some reason it was a mistake, then
 * an exception is throw because there is no next function, meaning it
 * surfaces early.
 *
 * @param code
 *   Current code.
 * @returns
 *   Next state.
 */
declare type State = (code: Code) => State | undefined

/**
 * A token: a span of chunks.
 *
 * Tokens are what the core of micromark produces: the built in HTML compiler
 * or other tools can turn them into different things.
 *
 * Tokens are essentially names attached to a slice of chunks, such as
 * `lineEndingBlank` for certain line endings, or `codeFenced` for a whole
 * fenced code.
 *
 * Sometimes, more info is attached to tokens, such as `_open` and `_close`
 * by `attention` (strong, emphasis) to signal whether the sequence can open
 * or close an attention run.
 *
 * Linked tokens are used because outer constructs are parsed first.
 * Take for example:
 *
 * ```markdown
 * > *a
 * b*.
 * ```
 *
 * 1.  The block quote marker and the space after it is parsed first
 * 2.  The rest of the line is a `chunkFlow` token
 * 3.  The two spaces on the second line are a `linePrefix`
 * 4.  The rest of the line is another `chunkFlow` token
 *
 * The two `chunkFlow` tokens are linked together.
 * The chunks they span are then passed through the flow tokenizer.
 */
export declare interface Token {
    /**
     * Token type.
     */
    type: TokenType

    /**
     * Point where the token starts.
     */
    start: Point

    /**
     * Point where the token ends.
     */
    end: Point

    /**
     * The previous token in a list of linked tokens.
     */
    previous?: Token | undefined

    /**
     * The next token in a list of linked tokens.
     */
    next?: Token | undefined

    /**
     * Declares a token as having content of a certain type.
     */
    contentType?: ContentType | undefined

    /**
     * Connected tokenizer.
     *
     * Used when dealing with linked tokens.
     * A child tokenizer is needed to tokenize them, which is stored on those
     * tokens.
     */
    _tokenizer?: TokenizeContext | undefined

    /**
     * Field to help parse attention.
     *
     * Depending on the character before sequences (`**`), the sequence can open,
     * close, both, or none.
     */
    _open?: boolean | undefined

    /**
     * Field to help parse attention.
     *
     * Depending on the character before sequences (`**`), the sequence can open,
     * close, both, or none.
     */
    _close?: boolean | undefined

    /**
     * Field to help parse GFM task lists.
     *
     * This boolean is used internally to figure out if a token is in the first
     * content of a list item construct.
     */
    _isInFirstContentOfListItem?: boolean | undefined

    /**
     * Field to help parse containers.
     *
     * This boolean is used internally to figure out if a token is a container
     * token.
     */
    _container?: boolean | undefined

    /**
     * Field to help parse lists.
     *
     * This boolean is used internally to figure out if a list is loose or not.
     */
    _loose?: boolean | undefined

    /**
     * Field to help parse links.
     *
     * This boolean is used internally to figure out if a link opening
     * can’t be used (because links in links are incorrect).
     */
    _inactive?: boolean | undefined

    /**
     * Field to help parse links.
     *
     * This boolean is used internally to figure out if a link opening is
     * balanced: it’s not a link opening but has a balanced closing.
     */
    _balanced?: boolean | undefined
}

/**
 * A context object that helps w/ tokenizing markdown constructs.
 */
declare interface TokenizeContext {
    /**
     * The previous code.
     */
    previous: Code

    /**
     * Current code.
     */
    code: Code

    /**
     * Whether we’re currently interrupting.
     *
     * Take for example:
     *
     * ```markdown
     * a
     * # b
     * ```
     *
     * At 2:1, we’re “interrupting”.
     */
    interrupt?: boolean | undefined

    /**
     * The current construct.
     *
     * Constructs that are not `partial` are set here.
     */
    currentConstruct?: Construct | undefined

    /**
     * share state set when parsing containers.
     *
     * Containers are parsed in separate phases: their first line (`tokenize`),
     * continued lines (`continuation.tokenize`), and finally `exit`.
     * This record can be used to store some information between these hooks.
     */
    containerState?: ContainerState | undefined

    /**
     * Current list of events.
     */
    events: Array<Event_2>

    /**
     * The relevant parsing context.
     */
    parser: ParseContext

    /**
     * Get the chunks that span a token (or location).
     *
     * @param token
     *   Start/end in stream.
     * @returns
     *   List of chunks.
     */
    sliceStream: (token: Pick<Token, 'end' | 'start'>) => Array<Chunk>

    /**
     * Get the source text that spans a token (or location).
     *
     * @param token
     *   Start/end in stream.
     * @param expandTabs
     *   Whether to expand tabs.
     * @returns
     *   Serialized chunks.
     */
    sliceSerialize: (
    token: Pick<Token, 'end' | 'start'>,
    expandTabs?: boolean | undefined
    ) => string

    /**
     * Get the current place.
     *
     * @returns
     *   Current point.
     */
    now: () => Point

    /**
     * Define a skip
     *
     * As containers (block quotes, lists), “nibble” a prefix from the margins,
     * where a line starts after that prefix is defined here.
     * When the tokenizers moves after consuming a line ending corresponding to
     * the line number in the given point, the tokenizer shifts past the prefix
     * based on the column in the shifted point.
     *
     * @param point
     *   Skip.
     * @returns
     *   Nothing.
     */
    defineSkip: (point: Point) => undefined

    /**
     * Write a slice of chunks.
     *
     * The eof code (`null`) can be used to signal the end of the stream.
     *
     * @param slice
     *   Chunks.
     * @returns
     *   Events.
     */
    write: (slice: Array<Chunk>) => Array<Event_2>

    /**
     * Internal boolean shared with `micromark-extension-gfm-task-list-item` to
     * signal whether the tokenizer is tokenizing the first content of a list item
     * construct.
     */
    _gfmTasklistFirstContentOfListItem?: boolean | undefined

    // To do: next major: remove `_gfmTableDynamicInterruptHack` (no longer
    // needed in micromark-extension-gfm-table@1.0.6).
    /**
     * Internal boolean shared with `micromark-extension-gfm-table` whose body
     * rows are not affected by normal interruption rules.
     * “Normal” rules are, for example, that an empty list item can’t interrupt:
     *
     * ````markdown
     * a
     * *
     * ````
     *
     * The above is one paragraph.
     * These rules don’t apply to table body rows:
     *
     * ````markdown
     * | a |
     * | - |
     * *
     * ````
     *
     * The above list interrupts the table.
     */
    _gfmTableDynamicInterruptHack?: boolean
}

/**
 * A tokenize function sets up a state machine to handle character codes streaming in.
 *
 * @param this
 *   Tokenize context.
 * @param effects
 *   Effects.
 * @param ok
 *   State to go to when successful.
 * @param nok
 *   State to go to when unsuccessful.
 * @returns
 *   First state.
 */
declare type Tokenizer = (
this: TokenizeContext,
effects: Effects,
ok: State,
nok: State
) => State

/**
 * Enum of allowed token types.
 */
export declare type TokenType = keyof TokenTypeMap

/**
 * Map of allowed token types.
 */
export declare interface TokenTypeMap {
    // Note: these are compiled away.
    attentionSequence: 'attentionSequence' // To do: remove.
    space: 'space' // To do: remove.

    data: 'data'
    whitespace: 'whitespace'
    lineEnding: 'lineEnding'
    lineEndingBlank: 'lineEndingBlank'
    linePrefix: 'linePrefix'
    lineSuffix: 'lineSuffix'
    atxHeading: 'atxHeading'
    atxHeadingSequence: 'atxHeadingSequence'
    atxHeadingText: 'atxHeadingText'
    autolink: 'autolink'
    autolinkEmail: 'autolinkEmail'
    autolinkMarker: 'autolinkMarker'
    autolinkProtocol: 'autolinkProtocol'
    characterEscape: 'characterEscape'
    characterEscapeValue: 'characterEscapeValue'
    characterReference: 'characterReference'
    characterReferenceMarker: 'characterReferenceMarker'
    characterReferenceMarkerNumeric: 'characterReferenceMarkerNumeric'
    characterReferenceMarkerHexadecimal: 'characterReferenceMarkerHexadecimal'
    characterReferenceValue: 'characterReferenceValue'
    codeFenced: 'codeFenced'
    codeFencedFence: 'codeFencedFence'
    codeFencedFenceSequence: 'codeFencedFenceSequence'
    codeFencedFenceInfo: 'codeFencedFenceInfo'
    codeFencedFenceMeta: 'codeFencedFenceMeta'
    codeFlowValue: 'codeFlowValue'
    codeIndented: 'codeIndented'
    codeText: 'codeText'
    codeTextData: 'codeTextData'
    codeTextPadding: 'codeTextPadding'
    codeTextSequence: 'codeTextSequence'
    content: 'content'
    definition: 'definition'
    definitionDestination: 'definitionDestination'
    definitionDestinationLiteral: 'definitionDestinationLiteral'
    definitionDestinationLiteralMarker: 'definitionDestinationLiteralMarker'
    definitionDestinationRaw: 'definitionDestinationRaw'
    definitionDestinationString: 'definitionDestinationString'
    definitionLabel: 'definitionLabel'
    definitionLabelMarker: 'definitionLabelMarker'
    definitionLabelString: 'definitionLabelString'
    definitionMarker: 'definitionMarker'
    definitionTitle: 'definitionTitle'
    definitionTitleMarker: 'definitionTitleMarker'
    definitionTitleString: 'definitionTitleString'
    emphasis: 'emphasis'
    emphasisSequence: 'emphasisSequence'
    emphasisText: 'emphasisText'
    escapeMarker: 'escapeMarker'
    hardBreakEscape: 'hardBreakEscape'
    hardBreakTrailing: 'hardBreakTrailing'
    htmlFlow: 'htmlFlow'
    htmlFlowData: 'htmlFlowData'
    htmlText: 'htmlText'
    htmlTextData: 'htmlTextData'
    image: 'image'
    label: 'label'
    labelText: 'labelText'
    labelLink: 'labelLink'
    labelImage: 'labelImage'
    labelMarker: 'labelMarker'
    labelImageMarker: 'labelImageMarker'
    labelEnd: 'labelEnd'
    link: 'link'
    paragraph: 'paragraph'
    reference: 'reference'
    referenceMarker: 'referenceMarker'
    referenceString: 'referenceString'
    resource: 'resource'
    resourceDestination: 'resourceDestination'
    resourceDestinationLiteral: 'resourceDestinationLiteral'
    resourceDestinationLiteralMarker: 'resourceDestinationLiteralMarker'
    resourceDestinationRaw: 'resourceDestinationRaw'
    resourceDestinationString: 'resourceDestinationString'
    resourceMarker: 'resourceMarker'
    resourceTitle: 'resourceTitle'
    resourceTitleMarker: 'resourceTitleMarker'
    resourceTitleString: 'resourceTitleString'
    setextHeading: 'setextHeading'
    setextHeadingText: 'setextHeadingText'
    setextHeadingLine: 'setextHeadingLine'
    setextHeadingLineSequence: 'setextHeadingLineSequence'
    strong: 'strong'
    strongSequence: 'strongSequence'
    strongText: 'strongText'
    thematicBreak: 'thematicBreak'
    thematicBreakSequence: 'thematicBreakSequence'
    blockQuote: 'blockQuote'
    blockQuotePrefix: 'blockQuotePrefix'
    blockQuoteMarker: 'blockQuoteMarker'
    blockQuotePrefixWhitespace: 'blockQuotePrefixWhitespace'
    listOrdered: 'listOrdered'
    listUnordered: 'listUnordered'
    listItemIndent: 'listItemIndent'
    listItemMarker: 'listItemMarker'
    listItemPrefix: 'listItemPrefix'
    listItemPrefixWhitespace: 'listItemPrefixWhitespace'
    listItemValue: 'listItemValue'
    chunkDocument: 'chunkDocument'
    chunkContent: 'chunkContent'
    chunkFlow: 'chunkFlow'
    chunkText: 'chunkText'
    chunkString: 'chunkString'
}

declare type Value = Value_2

/**
 * Contents of the file.
 *
 * Can either be text, or a `Uint8Array` like structure.
 */
declare type Value_2 = Uint8Array | string

export { }

// Source: node_modules/micromark-extension-directive/index.d.ts

export declare interface TokenTypeMap {
    directiveContainer: 'directiveContainer'
    directiveContainerAttributes: 'directiveContainerAttributes'
    directiveContainerAttributesMarker: 'directiveContainerAttributesMarker'
    directiveContainerAttribute: 'directiveContainerAttribute'
    directiveContainerAttributeId: 'directiveContainerAttributeId'
    directiveContainerAttributeIdValue: 'directiveContainerAttributeIdValue'
    directiveContainerAttributeClass: 'directiveContainerAttributeClass'
    directiveContainerAttributeClassValue: 'directiveContainerAttributeClassValue'
    directiveContainerAttributeName: 'directiveContainerAttributeName'
    directiveContainerAttributeInitializerMarker: 'directiveContainerAttributeInitializerMarker'
    directiveContainerAttributeValueLiteral: 'directiveContainerAttributeValueLiteral'
    directiveContainerAttributeValue: 'directiveContainerAttributeValue'
    directiveContainerAttributeValueMarker: 'directiveContainerAttributeValueMarker'
    directiveContainerAttributeValueData: 'directiveContainerAttributeValueData'
    directiveContainerContent: 'directiveContainerContent'
    directiveContainerFence: 'directiveContainerFence'
    directiveContainerLabel: 'directiveContainerLabel'
    directiveContainerLabelMarker: 'directiveContainerLabelMarker'
    directiveContainerLabelString: 'directiveContainerLabelString'
    directiveContainerName: 'directiveContainerName'
    directiveContainerSequence: 'directiveContainerSequence'

    directiveLeaf: 'directiveLeaf'
    directiveLeafAttributes: 'directiveLeafAttributes'
    directiveLeafAttributesMarker: 'directiveLeafAttributesMarker'
    directiveLeafAttribute: 'directiveLeafAttribute'
    directiveLeafAttributeId: 'directiveLeafAttributeId'
    directiveLeafAttributeIdValue: 'directiveLeafAttributeIdValue'
    directiveLeafAttributeClass: 'directiveLeafAttributeClass'
    directiveLeafAttributeClassValue: 'directiveLeafAttributeClassValue'
    directiveLeafAttributeName: 'directiveLeafAttributeName'
    directiveLeafAttributeInitializerMarker: 'directiveLeafAttributeInitializerMarker'
    directiveLeafAttributeValueLiteral: 'directiveLeafAttributeValueLiteral'
    directiveLeafAttributeValue: 'directiveLeafAttributeValue'
    directiveLeafAttributeValueMarker: 'directiveLeafAttributeValueMarker'
    directiveLeafAttributeValueData: 'directiveLeafAttributeValueData'
    directiveLeafLabel: 'directiveLeafLabel'
    directiveLeafLabelMarker: 'directiveLeafLabelMarker'
    directiveLeafLabelString: 'directiveLeafLabelString'
    directiveLeafName: 'directiveLeafName'
    directiveLeafSequence: 'directiveLeafSequence'

    directiveText: 'directiveText'
    directiveTextAttributes: 'directiveTextAttributes'
    directiveTextAttributesMarker: 'directiveTextAttributesMarker'
    directiveTextAttribute: 'directiveTextAttribute'
    directiveTextAttributeId: 'directiveTextAttributeId'
    directiveTextAttributeIdValue: 'directiveTextAttributeIdValue'
    directiveTextAttributeClass: 'directiveTextAttributeClass'
    directiveTextAttributeClassValue: 'directiveTextAttributeClassValue'
    directiveTextAttributeName: 'directiveTextAttributeName'
    directiveTextAttributeInitializerMarker: 'directiveTextAttributeInitializerMarker'
    directiveTextAttributeValueLiteral: 'directiveTextAttributeValueLiteral'
    directiveTextAttributeValue: 'directiveTextAttributeValue'
    directiveTextAttributeValueMarker: 'directiveTextAttributeValueMarker'
    directiveTextAttributeValueData: 'directiveTextAttributeValueData'
    directiveTextLabel: 'directiveTextLabel'
    directiveTextLabelMarker: 'directiveTextLabelMarker'
    directiveTextLabelString: 'directiveTextLabelString'
    directiveTextMarker: 'directiveTextMarker'
    directiveTextName: 'directiveTextName'
}

// Source: node_modules/micromark-extension-gfm-autolink-literal/index.d.ts

export declare interface TokenTypeMap {
    literalAutolink: 'literalAutolink'
    literalAutolinkEmail: 'literalAutolinkEmail'
    literalAutolinkHttp: 'literalAutolinkHttp'
    literalAutolinkWww: 'literalAutolinkWww'
}

// Source: node_modules/micromark-extension-gfm-footnote/index.d.ts

export declare interface TokenTypeMap {
    gfmFootnoteCall: 'gfmFootnoteCall'
    gfmFootnoteCallLabelMarker: 'gfmFootnoteCallLabelMarker'
    gfmFootnoteCallMarker: 'gfmFootnoteCallMarker'
    gfmFootnoteCallString: 'gfmFootnoteCallString'
    gfmFootnoteDefinition: 'gfmFootnoteDefinition'
    gfmFootnoteDefinitionIndent: 'gfmFootnoteDefinitionIndent'
    gfmFootnoteDefinitionLabel: 'gfmFootnoteDefinitionLabel'
    gfmFootnoteDefinitionLabelMarker: 'gfmFootnoteDefinitionLabelMarker'
    gfmFootnoteDefinitionLabelString: 'gfmFootnoteDefinitionLabelString'
    gfmFootnoteDefinitionMarker: 'gfmFootnoteDefinitionMarker'
    gfmFootnoteDefinitionWhitespace: 'gfmFootnoteDefinitionWhitespace'
}

// Source: node_modules/micromark-extension-gfm-table/index.d.ts

export declare interface TokenTypeMap {
    table: 'table'
    tableBody: 'tableBody'
    tableCellDivider: 'tableCellDivider'
    tableContent: 'tableContent'
    tableData: 'tableData'
    tableDelimiter: 'tableDelimiter'
    tableDelimiterFiller: 'tableDelimiterFiller'
    tableDelimiterMarker: 'tableDelimiterMarker'
    tableDelimiterRow: 'tableDelimiterRow'
    tableHead: 'tableHead'
    tableHeader: 'tableHeader'
    tableRow: 'tableRow'
}

// Source: node_modules/micromark-extension-math/index.d.ts

export declare interface TokenTypeMap {
    mathFlow: 'mathFlow'
    mathFlowFence: 'mathFlowFence'
    mathFlowFenceMeta: 'mathFlowFenceMeta'
    mathFlowFenceSequence: 'mathFlowFenceSequence'
    mathFlowValue: 'mathFlowValue'
    mathText: 'mathText'
    mathTextData: 'mathTextData'
    mathTextPadding: 'mathTextPadding'
    mathTextSequence: 'mathTextSequence'
}
