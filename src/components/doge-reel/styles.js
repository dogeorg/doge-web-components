import { css } from "../../lib/doge-init.js"

export const styles = css`
    .scroll-hinted {
        --scroll-hint: 10%;
    }

    sl-carousel::part(base) {
        gap: 0;
    }


    sl-carousel sl-carousel-item.--is-active,
    sl-carousel sl-carousel-item[data-initial-slide].--in-view:not([data-clone]) {
        --aspect-ratio: 9/16;
    }
`