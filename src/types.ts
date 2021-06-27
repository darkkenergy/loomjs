export interface Aria {
    label?: string;
    live?: 'assertive' | 'polite';
    role?: string;
}

export type NectarNode = ContextFunction | Node;

export interface PlainObject<T = any> {
    [key: string]: T;
}

export interface ValueProp<T = TemplateTagValue> {
    value?: T;
}

/* Template */
export type ContextNodeGetter = () => Node | undefined;

export interface TaggedTemplate {
    this?: TemplateContext;
    (chunks: TemplateStringsArray, ...interpolations: TemplateTagValue[]): Node;
}

export interface TemplateContext {
    created?: LifeCycleHandler;
    fingerPrint?: RenderFunction<unknown>;
    node?: ContextNodeGetter;
    render?: TaggedTemplate;
    rendered?: LifeCycleHandler;
    root?: Node;
}

export type TemplateTagValue =
    | boolean
    | MouseEventListener
    | NectarNode
    | null
    | number
    | string
    | TemplateTagValue[]
    | TemplateTagValueFunction
    | undefined
    | void;

export type TemplateTagValueFunction = () => TemplateTagValue;

export type TemplateNodeUpdate = (values: TemplateTagValue[]) => void;

// Component
export interface Component<T> {
    (props?: T): ContextFunction;
}

export type ComponentFunction = <T>(
    renderFunction: RenderFunction<
        T & {
            node: ContextNodeGetter;
            onCreated(handler: LifeCycleHandler): void;
            onRendered(handler: LifeCycleHandler): void;
        }
    >
) => Component<T>;

export type ContextFunction = (ctx?: TemplateContext) => Node;
export type LifeCycleHandler = (node: Node | undefined) => any;

export interface ReactiveComponent<T = any, P = any> {
    (transform?: (props?: T) => P): NectarNode;
}

export interface RenderFunction<T> {
    (render: TaggedTemplate, props: T): Node;
}

// Event
export type MouseEventListener = <T>(ev?: SyntheticMouseEvent<T>) => void;

export type SyntheticMouseEventListener = (
    this: HTMLElement,
    ev: MouseEvent
) => any;

export type SyntheticMouseEvent<T = EventTarget> = Event & {
    currentTarget: T;
    target: T;
};

// Activity
export type ActivityEffect<T = any> = (
    handler: ActivityHandler<T>,
    cache?: any[]
) => Node;
export type ActivityHandler<T> = (props?: ValueProp<T>) => NectarNode;

// Config
export type ConfigEvent =
    | 'abort'
    | 'animationcancel'
    | 'animationend'
    | 'animationiteration'
    | 'auxclick'
    | 'blur'
    | 'cancel'
    | 'canplay'
    | 'canplaythrough'
    | 'change'
    | 'click'
    | 'close'
    | 'contextmenu'
    | 'cuechange'
    | 'dblclick'
    | 'durationchange'
    | 'ended'
    | 'error'
    | 'focus'
    | 'formdata'
    | 'gotpointercapture'
    | 'input'
    | 'invalid'
    | 'keydown'
    | 'keypress'
    | 'keyup'
    | 'load'
    | 'loadeddata'
    | 'loadedmetadata'
    | 'loadend'
    | 'loadstart'
    | 'lostpointercapture'
    | 'mousedown'
    | 'mouseenter'
    | 'mouseleave'
    | 'mousemove'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup'
    | 'pause'
    | 'play'
    | 'playing'
    | 'pointercancel'
    | 'pointerdown'
    | 'pointerenter'
    | 'pointerleave'
    | 'pointermove'
    | 'pointerout'
    | 'pointerover'
    | 'pointerup'
    | 'reset'
    | 'resize'
    | 'scroll'
    | 'select'
    | 'selectionchange'
    | 'selectstart'
    | 'submit'
    | 'touchcancel'
    | 'touchstart'
    | 'transitioncancel'
    | 'transitionend'
    | 'wheel';

export interface Config {
    events: ConfigEvent[];
    global?: GlobalWindow;
    TOKEN: string;
    tokenRe: RegExp;
}

export type GlobalWindow = Window & { NodeFilter: NodeFilter };

export interface NodeFilter {
    SHOW_ALL: -1;
}

export interface GlobalConfig {
    config: Config;
}
