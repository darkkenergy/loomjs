import { component, MouseEventListener } from '@loomjs/core';

import { Link, LinkProps } from '@app/component/simple';

export interface NavProps {
    navigation: Omit<LinkProps, 'onClick'>[];
    onClick?: MouseEventListener;
}

export const Nav = component<NavProps>(
    (html, { className, navigation, onClick }) => html`
        <nav class="${className}">
            ${navigation?.map((link) =>
                Link({
                    ...link,
                    onClick
                })
            )}
        </nav>
    `
);