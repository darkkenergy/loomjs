import { component } from '@loomjs/core';

import { MediaMimeTypes } from '@app/types';

export interface SourceProps {
    media?: string;
    src?: string;
    srcSet?: string;
    type?: MediaMimeTypes;
}

export const Source = component<SourceProps>(
    (html, { media, src, srcSet, type }) =>
        html`<source
            $src=${src}
            media=${media}
            srcset=${srcSet}
            type=${type}
        />`
);
