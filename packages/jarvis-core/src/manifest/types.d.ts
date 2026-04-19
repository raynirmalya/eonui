export type SourceManifestProp = {
    name: string;
    type: string;
    default?: string;
    values?: string[];
    description: string;
};
export type SourceManifestEvent = {
    name: string;
    detail?: string;
    description: string;
};
export type SourceManifestSlot = {
    name: string;
    description: string;
};
export type SourceManifestPart = {
    name: string;
    description: string;
};
export type SourceComponentManifestEntry = {
    name: string;
    tag: string;
    category: string;
    description: string;
    anatomy: string[];
    props: SourceManifestProp[];
    events: SourceManifestEvent[];
    methods: {
        name: string;
        description: string;
    }[];
    slots: SourceManifestSlot[];
    parts: SourceManifestPart[];
    cssVariables: {
        name: string;
        description: string;
    }[];
    accessibility: string[];
    responsive: string[];
    examples: {
        title: string;
        code: string;
    }[];
    antiPatterns: string[];
    related: string[];
    compositionRules: string[];
};
//# sourceMappingURL=types.d.ts.map