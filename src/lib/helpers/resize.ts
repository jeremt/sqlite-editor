/**
 * Add a resize observer to the element.
 * @param element The HTML element you want to observe
 * @param onResize called when the element resized
 * @returns
 */
export function resize(element: HTMLElement, onResize: (width: number, height: number, element: HTMLElement) => void) {
    if (ResizeObserver) {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                onResize(entry.contentRect.width, entry.contentRect.height, element);
            }
        });

        resizeObserver.observe(element);

        return {
            destroy() {
                resizeObserver.unobserve(element);
            },
        };
    }
}
