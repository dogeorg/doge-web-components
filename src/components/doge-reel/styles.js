import { css } from "../../lib/doge-init.js"

export const styles = css`
    :host {
        background: red;
    }

    .scroll-hinted {
        --scroll-hint: 10%;
    }

    sl-carousel::part(base) {
        gap: 0;
    }

    sl-carousel::part(base) .--is-active {
        border: 1px solid red;
    }
`