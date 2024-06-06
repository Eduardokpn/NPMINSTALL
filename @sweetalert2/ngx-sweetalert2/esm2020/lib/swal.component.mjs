import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { dismissOnDestroyToken, fireOnInitToken } from './di';
import * as i0 from "@angular/core";
import * as i1 from "./sweetalert2-loader.service";
/**
 * <swal> component. See the README.md for usage.
 *
 * It contains a bunch of @Inputs that have a perfect 1:1 mapping with SweetAlert2 options.
 * Their types are directly coming from SweetAlert2 types defintitions, meaning that ngx-sweetalert2 is tightly coupled
 * to SweetAlert2, but also is type-safe even if both libraries do not evolve in sync.
 *
 * (?) If you want to use an object that declares the SweetAlert2 options all at once rather than many @Inputs,
 *     take a look at [swalOptions], that lets you pass a full {@link SweetAlertOptions} object.
 *
 * (?) If you are reading the TypeScript source of this component, you may think that it's a lot of code.
 *     Be sure that a lot of this code is types and Angular boilerplate. Compiled and minified code is much smaller.
 *     If you are really concerned about performance and/or don't care about the API and its convenient integration
 *     with Angular (notably change detection and transclusion), you may totally use SweetAlert2 natively as well ;)
 *
 * /!\ Some SweetAlert options aren't @Inputs but @Outputs: `willOpen`, `didOpen`, `didRender`, `willClose`, `didClose`
 *     and `didDestroy`.
 *     However, `preConfirm`, `preDeny` and `inputValidator` are still @Inputs because they are not event handlers,
 *     there can't be multiple listeners on them, and we need the values they can/must return.
 */
export class SwalComponent {
    constructor(sweetAlert2Loader, moduleLevelFireOnInit, moduleLevelDismissOnDestroy) {
        this.sweetAlert2Loader = sweetAlert2Loader;
        this.moduleLevelFireOnInit = moduleLevelFireOnInit;
        this.moduleLevelDismissOnDestroy = moduleLevelDismissOnDestroy;
        /**
         * Modal lifecycle hook. Synchronously runs before the modal is shown on screen.
         */
        this.willOpen = new EventEmitter();
        /**
         * Modal lifecycle hook. Synchronously runs before the modal is shown on screen.
         */
        this.didOpen = new EventEmitter();
        /**
         * Modal lifecycle hook. Synchronously runs after the popup DOM has been updated (ie. just before the modal is
         * repainted on the screen).
         * Typically, this will happen after `Swal.fire()` or `Swal.update()`.
         * If you want to perform changes in the popup's DOM, that survive `Swal.update()`, prefer {@link didRender} over
         * {@link willOpen}.
         */
        this.didRender = new EventEmitter();
        /**
         * Modal lifecycle hook. Synchronously runs when the popup closes by user interaction (and not due to another popup
         * being fired).
         */
        this.willClose = new EventEmitter();
        /**
         * Modal lifecycle hook. Asynchronously runs after the popup has been disposed by user interaction (and not due to
         * another popup being fired).
         */
        this.didClose = new EventEmitter();
        /**
         * Modal lifecycle hook. Synchronously runs after popup has been destroyed either by user interaction or by another
         * popup.
         * If you have cleanup operations that you need to reliably execute each time a modal is closed, prefer
         * {@link didDestroy} over {@link didClose}.
         */
        this.didDestroy = new EventEmitter();
        /**
         * Emits when the user clicks "Confirm".
         * The event value ($event) can be either:
         *  - by default, just `true`,
         *  - when using {@link input}, the input value,
         *  - when using {@link preConfirm}, the return value of this function.
         *
         * Example:
         *     <swal (confirm)="handleConfirm($event)"></swal>
         *
         *     public handleConfirm(email: string): void {
         *         // ... save user email
         *     }
         */
        this.confirm = new EventEmitter();
        /**
         * Emits when the user clicks "Deny".
         * This event bears no value.
         * Use `(deny)` (along with {@link showDenyButton}) when you want a modal with three buttons (confirm, deny and
         * cancel), and/or when you want to handle clear refusal in a separate way than simple dismissal.
         *
         * Example:
         *     <swal (deny)="handleDeny()"></swal>
         *
         *     public handleDeny(): void {
         *     }
         */
        this.deny = new EventEmitter();
        /**
         * Emits when the user clicks "Cancel", or dismisses the modal by any other allowed way.
         * The event value ($event) is a string that explains how the modal was dismissed. It is `undefined` when
         * the modal was programmatically closed (through {@link close} for example).
         *
         * Example:
         *     <swal (dismiss)="handleDismiss($event)"></swal>
         *
         *     public handleDismiss(reason: DismissReason | undefined): void {
         *         // reason can be 'cancel', 'overlay', 'close', 'timer' or undefined.
         *         // ... do something
         *     }
         */
        this.dismiss = new EventEmitter();
        /**
         * This Set retains the properties that have been changed from @Inputs, so we can know precisely
         * what options we have to send to {@link Swal.fire}.
         */
        this.touchedProps = new Set();
        /**
         * A function of signature `(propName: string): void` that adds a given property name to the list of
         * touched properties, ie. {@link touchedProps}.
         */
        this.markTouched = this.touchedProps.add.bind(this.touchedProps);
        /**
         * Is the SweetAlert2 modal represented by this component currently opened?
         */
        this.isCurrentlyShown = false;
    }
    /**
     * An object of SweetAlert2 native options, useful if:
     *  - you don't want to use the @Inputs for practical/philosophical reasons ;
     *  - there are missing @Inputs because ngx-sweetalert2 isn't up-to-date with SweetAlert2's latest changes.
     *
     * /!\ Please note that setting this property does NOT erase what has been set before unless you specify the
     *     previous properties you want to erase again.
     *     Ie. setting { title: 'Title' } and then { text: 'Text' } will give { title: 'Title', text: 'Text' }.
     *
     * /!\ Be aware that the options defined in this object will override the @Inputs of the same name.
     */
    set swalOptions(options) {
        //=> Update properties
        Object.assign(this, options);
        //=> Mark changed properties as touched
        const touchedKeys = Object.keys(options);
        touchedKeys.forEach(this.markTouched);
    }
    /**
     * Computes the options object that will get passed to SweetAlert2.
     * Only the properties that have been set at least once on this component will be returned.
     * Mostly for internal usage.
     */
    get swalOptions() {
        //=> We will compute the options object based on the option keys that are known to have changed.
        //   That avoids passing a gigantic object to SweetAlert2, making debugging easier and potentially
        //   avoiding side effects.
        return [...this.touchedProps].reduce((obj, key) => ({ ...obj, [key]: this[key] }), {});
    }
    set swalVisible(visible) {
        visible ? this.fire() : this.close();
    }
    get swalVisible() {
        return this.isCurrentlyShown;
    }
    /**
     * Angular lifecycle hook.
     * Asks the SweetAlert2 loader service to preload the SweetAlert2 library, so it begins to be loaded only if there
     * is a <swal> component somewhere, and is probably fully loaded when the modal has to be displayed,
     * causing no delay.
     */
    ngOnInit() {
        //=> Preload SweetAlert2 library in case this component is activated.
        this.sweetAlert2Loader.preloadSweetAlertLibrary();
    }
    /**
     * Angular lifecycle hook.
     * Fires the modal, if the component or module is configured to do so.
     */
    ngAfterViewInit() {
        const fireOnInit = this.swalFireOnInit === undefined
            ? this.moduleLevelFireOnInit
            : this.swalFireOnInit;
        fireOnInit && this.fire();
    }
    /**
     * Angular lifecycle hook.
     * Updates the SweetAlert options, and if the modal is opened, asks SweetAlert to render it again.
     */
    ngOnChanges(changes) {
        //=> For each changed @Input that matches a SweetAlert2 option, mark as touched so we can
        //   send it with the next fire() or update() calls.
        Object.keys(changes)
            //=> If the filtering logic becomes more complex here, we can use Swal.isValidParameter
            .filter((key) => !key.startsWith('swal'))
            .forEach(this.markTouched);
        //=> Eventually trigger re-render if the modal is open.
        void this.update();
    }
    /**
     * Angular lifecycle hook.
     * Closes the SweetAlert when the component is destroyed.
     */
    ngOnDestroy() {
        //=> Release the modal if the component is destroyed and if that behaviour is not disabled.
        const dismissOnDestroy = this.swalDismissOnDestroy === undefined
            ? this.moduleLevelDismissOnDestroy
            : this.swalDismissOnDestroy;
        dismissOnDestroy && this.close();
    }
    /**
     * Shows the SweetAlert.
     *
     * Returns the SweetAlert2 promise for convenience and use in code behind templates.
     * Otherwise, (confirm)="myHandler($event)" and (dismiss)="myHandler($event)" can be used in templates.
     */
    async fire() {
        const swal = await this.sweetAlert2Loader.swal;
        const userOptions = this.swalOptions;
        //=> Build the SweetAlert2 options
        const options = {
            //=> Merge with calculated options set for that specific swal
            ...userOptions,
            //=> Handle modal lifecycle events
            willOpen: composeHook(userOptions.willOpen, (modalElement) => {
                this.willOpen.emit({ modalElement });
            }),
            didOpen: composeHook(userOptions.didOpen, (modalElement) => {
                this.isCurrentlyShown = true;
                this.didOpen.emit({ modalElement });
            }),
            didRender: composeHook(userOptions.didRender, (modalElement) => {
                this.didRender.emit({ modalElement });
            }),
            willClose: composeHook(userOptions.willClose, (modalElement) => {
                this.isCurrentlyShown = false;
                this.willClose.emit({ modalElement });
            }),
            didClose: composeHook(userOptions.didClose, () => {
                this.didClose.emit();
            }),
            didDestroy: composeHook(userOptions.didDestroy, () => {
                this.didDestroy.emit();
            })
        };
        //=> Show the Swal! And wait for confirmation or dimissal.
        const result = await swal.fire(options);
        //=> Emit on (confirm), (deny) or (dismiss)
        switch (true) {
            case result.isConfirmed:
                this.confirm.emit(result.value);
                break;
            case result.isDenied:
                this.deny.emit();
                break;
            case result.isDismissed:
                this.dismiss.emit(result.dismiss);
                break;
        }
        return result;
        function composeHook(userHook, libHook) {
            return (...args) => (libHook(...args), userHook?.(...args));
        }
    }
    /**
     * Closes the modal, if opened.
     *
     * @param result The value that the modal will resolve with, triggering either (confirm), (deny) or (dismiss).
     *               If the argument is not passed, it is (dismiss) that will emit an `undefined` reason.
     *               {@see Swal.close}.
     */
    async close(result) {
        if (!this.isCurrentlyShown)
            return;
        const swal = await this.sweetAlert2Loader.swal;
        swal.close(result);
    }
    /**
     * Updates SweetAlert2 options while the modal is opened, causing the modal to re-render.
     * If the modal is not opened, the component options will simply be updated and that's it.
     *
     * /!\ Please note that not all SweetAlert2 options are updatable while the modal is opened.
     *
     * @param options
     */
    async update(options) {
        if (options) {
            this.swalOptions = options;
        }
        if (!this.isCurrentlyShown)
            return;
        const swal = await this.sweetAlert2Loader.swal;
        const allOptions = this.swalOptions;
        const updatableOptions = Object.keys(allOptions)
            .filter(swal.isUpdatableParameter)
            .reduce((obj, key) => ({ ...obj, [key]: allOptions[key] }), {});
        swal.update(updatableOptions);
    }
}
SwalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalComponent, deps: [{ token: i1.SweetAlert2LoaderService }, { token: fireOnInitToken }, { token: dismissOnDestroyToken }], target: i0.ɵɵFactoryTarget.Component });
SwalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.4", type: SwalComponent, selector: "swal", inputs: { title: "title", titleText: "titleText", text: "text", html: "html", footer: "footer", icon: "icon", iconColor: "iconColor", iconHtml: "iconHtml", backdrop: "backdrop", toast: "toast", target: "target", input: "input", width: "width", padding: "padding", background: "background", position: "position", grow: "grow", showClass: "showClass", hideClass: "hideClass", customClass: "customClass", timer: "timer", timerProgressBar: "timerProgressBar", heightAuto: "heightAuto", allowOutsideClick: "allowOutsideClick", allowEscapeKey: "allowEscapeKey", allowEnterKey: "allowEnterKey", stopKeydownPropagation: "stopKeydownPropagation", keydownListenerCapture: "keydownListenerCapture", showConfirmButton: "showConfirmButton", showDenyButton: "showDenyButton", showCancelButton: "showCancelButton", confirmButtonText: "confirmButtonText", denyButtonText: "denyButtonText", cancelButtonText: "cancelButtonText", confirmButtonColor: "confirmButtonColor", denyButtonColor: "denyButtonColor", cancelButtonColor: "cancelButtonColor", confirmButtonAriaLabel: "confirmButtonAriaLabel", denyButtonAriaLabel: "denyButtonAriaLabel", cancelButtonAriaLabel: "cancelButtonAriaLabel", buttonsStyling: "buttonsStyling", reverseButtons: "reverseButtons", focusConfirm: "focusConfirm", focusDeny: "focusDeny", focusCancel: "focusCancel", showCloseButton: "showCloseButton", closeButtonHtml: "closeButtonHtml", closeButtonAriaLabel: "closeButtonAriaLabel", loaderHtml: "loaderHtml", showLoaderOnConfirm: "showLoaderOnConfirm", preConfirm: "preConfirm", preDeny: "preDeny", imageUrl: "imageUrl", imageWidth: "imageWidth", imageHeight: "imageHeight", imageAlt: "imageAlt", inputLabel: "inputLabel", inputPlaceholder: "inputPlaceholder", inputValue: "inputValue", inputOptions: "inputOptions", inputAutoTrim: "inputAutoTrim", inputAttributes: "inputAttributes", inputValidator: "inputValidator", returnInputValueOnDeny: "returnInputValueOnDeny", validationMessage: "validationMessage", progressSteps: "progressSteps", currentProgressStep: "currentProgressStep", progressStepsDistance: "progressStepsDistance", scrollbarPadding: "scrollbarPadding", swalOptions: "swalOptions", swalFireOnInit: "swalFireOnInit", swalDismissOnDestroy: "swalDismissOnDestroy", swalVisible: "swalVisible" }, outputs: { willOpen: "willOpen", didOpen: "didOpen", didRender: "didRender", willClose: "willClose", didClose: "didClose", didDestroy: "didDestroy", confirm: "confirm", deny: "deny", dismiss: "dismiss" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'swal',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.SweetAlert2LoaderService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [fireOnInitToken]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [dismissOnDestroyToken]
                }] }]; }, propDecorators: { title: [{
                type: Input
            }], titleText: [{
                type: Input
            }], text: [{
                type: Input
            }], html: [{
                type: Input
            }], footer: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconColor: [{
                type: Input
            }], iconHtml: [{
                type: Input
            }], backdrop: [{
                type: Input
            }], toast: [{
                type: Input
            }], target: [{
                type: Input
            }], input: [{
                type: Input
            }], width: [{
                type: Input
            }], padding: [{
                type: Input
            }], background: [{
                type: Input
            }], position: [{
                type: Input
            }], grow: [{
                type: Input
            }], showClass: [{
                type: Input
            }], hideClass: [{
                type: Input
            }], customClass: [{
                type: Input
            }], timer: [{
                type: Input
            }], timerProgressBar: [{
                type: Input
            }], heightAuto: [{
                type: Input
            }], allowOutsideClick: [{
                type: Input
            }], allowEscapeKey: [{
                type: Input
            }], allowEnterKey: [{
                type: Input
            }], stopKeydownPropagation: [{
                type: Input
            }], keydownListenerCapture: [{
                type: Input
            }], showConfirmButton: [{
                type: Input
            }], showDenyButton: [{
                type: Input
            }], showCancelButton: [{
                type: Input
            }], confirmButtonText: [{
                type: Input
            }], denyButtonText: [{
                type: Input
            }], cancelButtonText: [{
                type: Input
            }], confirmButtonColor: [{
                type: Input
            }], denyButtonColor: [{
                type: Input
            }], cancelButtonColor: [{
                type: Input
            }], confirmButtonAriaLabel: [{
                type: Input
            }], denyButtonAriaLabel: [{
                type: Input
            }], cancelButtonAriaLabel: [{
                type: Input
            }], buttonsStyling: [{
                type: Input
            }], reverseButtons: [{
                type: Input
            }], focusConfirm: [{
                type: Input
            }], focusDeny: [{
                type: Input
            }], focusCancel: [{
                type: Input
            }], showCloseButton: [{
                type: Input
            }], closeButtonHtml: [{
                type: Input
            }], closeButtonAriaLabel: [{
                type: Input
            }], loaderHtml: [{
                type: Input
            }], showLoaderOnConfirm: [{
                type: Input
            }], preConfirm: [{
                type: Input
            }], preDeny: [{
                type: Input
            }], imageUrl: [{
                type: Input
            }], imageWidth: [{
                type: Input
            }], imageHeight: [{
                type: Input
            }], imageAlt: [{
                type: Input
            }], inputLabel: [{
                type: Input
            }], inputPlaceholder: [{
                type: Input
            }], inputValue: [{
                type: Input
            }], inputOptions: [{
                type: Input
            }], inputAutoTrim: [{
                type: Input
            }], inputAttributes: [{
                type: Input
            }], inputValidator: [{
                type: Input
            }], returnInputValueOnDeny: [{
                type: Input
            }], validationMessage: [{
                type: Input
            }], progressSteps: [{
                type: Input
            }], currentProgressStep: [{
                type: Input
            }], progressStepsDistance: [{
                type: Input
            }], scrollbarPadding: [{
                type: Input
            }], swalOptions: [{
                type: Input
            }], swalFireOnInit: [{
                type: Input
            }], swalDismissOnDestroy: [{
                type: Input
            }], swalVisible: [{
                type: Input
            }], willOpen: [{
                type: Output
            }], didOpen: [{
                type: Output
            }], didRender: [{
                type: Output
            }], willClose: [{
                type: Output
            }], didClose: [{
                type: Output
            }], didDestroy: [{
                type: Output
            }], confirm: [{
                type: Output
            }], deny: [{
                type: Output
            }], dismiss: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc3dlZXRhbGVydDIvc3JjL2xpYi9zd2FsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ1ksdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUM5RSxNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBTUgsTUFBTSxPQUFPLGFBQWE7SUFrUHRCLFlBQ3FCLGlCQUEyQyxFQUNsQixxQkFBOEIsRUFDeEIsMkJBQW9DO1FBRm5FLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBMEI7UUFDbEIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFTO1FBQ3hCLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBUztRQWpIeEY7O1dBRUc7UUFFYSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQXdCLENBQUM7UUFFcEU7O1dBRUc7UUFFYSxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQXVCLENBQUM7UUFFbEU7Ozs7OztXQU1HO1FBRWEsY0FBUyxHQUFHLElBQUksWUFBWSxFQUF5QixDQUFDO1FBRXRFOzs7V0FHRztRQUVhLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBeUIsQ0FBQztRQUV0RTs7O1dBR0c7UUFFYSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUVwRDs7Ozs7V0FLRztRQUVhLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXREOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFFYSxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVsRDs7Ozs7Ozs7Ozs7V0FXRztRQUVhLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRWhEOzs7Ozs7Ozs7Ozs7V0FZRztRQUVhLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBa0MsQ0FBQztRQUU3RTs7O1dBR0c7UUFDYyxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO1FBRW5FOzs7V0FHRztRQUNjLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU3RTs7V0FFRztRQUNLLHFCQUFnQixHQUFHLEtBQUssQ0FBQztJQU1qQyxDQUFDO0lBL0tEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUNXLFdBQVcsQ0FBQyxPQUEwQjtRQUM3QyxzQkFBc0I7UUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFN0IsdUNBQXVDO1FBQ3ZDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFtQyxDQUFDO1FBQzNFLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBVyxXQUFXO1FBQ2xCLGdHQUFnRztRQUNoRyxrR0FBa0c7UUFDbEcsMkJBQTJCO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQ2hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQWlCLENBQUMsRUFBRSxDQUFDLEVBQzFELEVBQUUsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQW1CRCxJQUNXLFdBQVcsQ0FBQyxPQUFnQjtRQUNuQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQXNIRDs7Ozs7T0FLRztJQUNJLFFBQVE7UUFDWCxxRUFBcUU7UUFDckUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGVBQWU7UUFDbEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTO1lBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCO1lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBRTFCLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyx5RkFBeUY7UUFDekYsb0RBQW9EO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2hCLHVGQUF1RjthQUN0RixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQWtDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEUsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUvQix1REFBdUQ7UUFDdkQsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVc7UUFDZCwyRkFBMkY7UUFDM0YsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEtBQUssU0FBUztZQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQjtZQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBRWhDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsSUFBSTtRQUNiLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUUvQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXJDLGtDQUFrQztRQUNsQyxNQUFNLE9BQU8sR0FBc0I7WUFDL0IsNkRBQTZEO1lBQzdELEdBQUcsV0FBVztZQUVkLGtDQUFrQztZQUNsQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQztZQUNGLE9BQU8sRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDO1lBQ0YsU0FBUyxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUM7WUFDRixTQUFTLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDM0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQztZQUNGLFFBQVEsRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDO1lBQ0YsVUFBVSxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUM7U0FDTCxDQUFDO1FBRUYsMERBQTBEO1FBQzFELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QywyQ0FBMkM7UUFDM0MsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLE1BQU0sQ0FBQyxXQUFXO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBQyxNQUFNO1lBQ2hFLEtBQUssTUFBTSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFBQyxNQUFNO1lBQzlDLEtBQUssTUFBTSxDQUFDLFdBQVc7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLE1BQU07U0FDckU7UUFFRCxPQUFPLE1BQU0sQ0FBQztRQUVkLFNBQVMsV0FBVyxDQUNoQixRQUF1QixFQUN2QixPQUFVO1lBRVYsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBeUI7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPO1FBRW5DLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFnRTtRQUNoRixJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPO1FBRW5DLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUUvQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXBDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQzthQUNqQyxNQUFNLENBQ0gsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUNsRCxFQUFFLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNsQyxDQUFDOzswR0EvWVEsYUFBYSwwREFvUFYsZUFBZSxhQUNmLHFCQUFxQjs4RkFyUHhCLGFBQWEsdytFQUhaLEVBQUU7MkZBR0gsYUFBYTtrQkFMekIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsTUFBTTtvQkFDaEIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzswQkFxUFEsTUFBTTsyQkFBQyxlQUFlOzswQkFDdEIsTUFBTTsyQkFBQyxxQkFBcUI7NENBcFBqQixLQUFLO3NCQUFwQixLQUFLO2dCQUNVLFNBQVM7c0JBQXhCLEtBQUs7Z0JBQ1UsSUFBSTtzQkFBbkIsS0FBSztnQkFDVSxJQUFJO3NCQUFuQixLQUFLO2dCQUNVLE1BQU07c0JBQXJCLEtBQUs7Z0JBQ1UsSUFBSTtzQkFBbkIsS0FBSztnQkFDVSxTQUFTO3NCQUF4QixLQUFLO2dCQUNVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1UsUUFBUTtzQkFBdkIsS0FBSztnQkFDVSxLQUFLO3NCQUFwQixLQUFLO2dCQUNVLE1BQU07c0JBQXJCLEtBQUs7Z0JBQ1UsS0FBSztzQkFBcEIsS0FBSztnQkFDVSxLQUFLO3NCQUFwQixLQUFLO2dCQUNVLE9BQU87c0JBQXRCLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxRQUFRO3NCQUF2QixLQUFLO2dCQUNVLElBQUk7c0JBQW5CLEtBQUs7Z0JBQ1UsU0FBUztzQkFBeEIsS0FBSztnQkFDVSxTQUFTO3NCQUF4QixLQUFLO2dCQUNVLFdBQVc7c0JBQTFCLEtBQUs7Z0JBQ1UsS0FBSztzQkFBcEIsS0FBSztnQkFDVSxnQkFBZ0I7c0JBQS9CLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxpQkFBaUI7c0JBQWhDLEtBQUs7Z0JBQ1UsY0FBYztzQkFBN0IsS0FBSztnQkFDVSxhQUFhO3NCQUE1QixLQUFLO2dCQUNVLHNCQUFzQjtzQkFBckMsS0FBSztnQkFDVSxzQkFBc0I7c0JBQXJDLEtBQUs7Z0JBQ1UsaUJBQWlCO3NCQUFoQyxLQUFLO2dCQUNVLGNBQWM7c0JBQTdCLEtBQUs7Z0JBQ1UsZ0JBQWdCO3NCQUEvQixLQUFLO2dCQUNVLGlCQUFpQjtzQkFBaEMsS0FBSztnQkFDVSxjQUFjO3NCQUE3QixLQUFLO2dCQUNVLGdCQUFnQjtzQkFBL0IsS0FBSztnQkFDVSxrQkFBa0I7c0JBQWpDLEtBQUs7Z0JBQ1UsZUFBZTtzQkFBOUIsS0FBSztnQkFDVSxpQkFBaUI7c0JBQWhDLEtBQUs7Z0JBQ1Usc0JBQXNCO3NCQUFyQyxLQUFLO2dCQUNVLG1CQUFtQjtzQkFBbEMsS0FBSztnQkFDVSxxQkFBcUI7c0JBQXBDLEtBQUs7Z0JBQ1UsY0FBYztzQkFBN0IsS0FBSztnQkFDVSxjQUFjO3NCQUE3QixLQUFLO2dCQUNVLFlBQVk7c0JBQTNCLEtBQUs7Z0JBQ1UsU0FBUztzQkFBeEIsS0FBSztnQkFDVSxXQUFXO3NCQUExQixLQUFLO2dCQUNVLGVBQWU7c0JBQTlCLEtBQUs7Z0JBQ1UsZUFBZTtzQkFBOUIsS0FBSztnQkFDVSxvQkFBb0I7c0JBQW5DLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxtQkFBbUI7c0JBQWxDLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxPQUFPO3NCQUF0QixLQUFLO2dCQUNVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxXQUFXO3NCQUExQixLQUFLO2dCQUNVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxnQkFBZ0I7c0JBQS9CLEtBQUs7Z0JBQ1UsVUFBVTtzQkFBekIsS0FBSztnQkFDVSxZQUFZO3NCQUEzQixLQUFLO2dCQUNVLGFBQWE7c0JBQTVCLEtBQUs7Z0JBQ1UsZUFBZTtzQkFBOUIsS0FBSztnQkFDVSxjQUFjO3NCQUE3QixLQUFLO2dCQUNVLHNCQUFzQjtzQkFBckMsS0FBSztnQkFDVSxpQkFBaUI7c0JBQWhDLEtBQUs7Z0JBQ1UsYUFBYTtzQkFBNUIsS0FBSztnQkFDVSxtQkFBbUI7c0JBQWxDLEtBQUs7Z0JBQ1UscUJBQXFCO3NCQUFwQyxLQUFLO2dCQUNVLGdCQUFnQjtzQkFBL0IsS0FBSztnQkFjSyxXQUFXO3NCQURyQixLQUFLO2dCQWdDQyxjQUFjO3NCQURwQixLQUFLO2dCQVFDLG9CQUFvQjtzQkFEMUIsS0FBSztnQkFJSyxXQUFXO3NCQURyQixLQUFLO2dCQWFVLFFBQVE7c0JBRHZCLE1BQU07Z0JBT1MsT0FBTztzQkFEdEIsTUFBTTtnQkFXUyxTQUFTO3NCQUR4QixNQUFNO2dCQVFTLFNBQVM7c0JBRHhCLE1BQU07Z0JBUVMsUUFBUTtzQkFEdkIsTUFBTTtnQkFVUyxVQUFVO3NCQUR6QixNQUFNO2dCQWtCUyxPQUFPO3NCQUR0QixNQUFNO2dCQWdCUyxJQUFJO3NCQURuQixNQUFNO2dCQWlCUyxPQUFPO3NCQUR0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsXG4gICAgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFN3YWwsIHsgU3dlZXRBbGVydE9wdGlvbnMsIFN3ZWV0QWxlcnRSZXN1bHQsIFN3ZWV0QWxlcnRVcGRhdGFibGVQYXJhbWV0ZXJzIH0gZnJvbSAnc3dlZXRhbGVydDInO1xuaW1wb3J0IHsgZGlzbWlzc09uRGVzdHJveVRva2VuLCBmaXJlT25Jbml0VG9rZW4gfSBmcm9tICcuL2RpJztcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICcuL3N3YWwtZXZlbnRzJztcbmltcG9ydCB7IFN3ZWV0QWxlcnQyTG9hZGVyU2VydmljZSB9IGZyb20gJy4vc3dlZXRhbGVydDItbG9hZGVyLnNlcnZpY2UnO1xuXG4vKipcbiAqIDxzd2FsPiBjb21wb25lbnQuIFNlZSB0aGUgUkVBRE1FLm1kIGZvciB1c2FnZS5cbiAqXG4gKiBJdCBjb250YWlucyBhIGJ1bmNoIG9mIEBJbnB1dHMgdGhhdCBoYXZlIGEgcGVyZmVjdCAxOjEgbWFwcGluZyB3aXRoIFN3ZWV0QWxlcnQyIG9wdGlvbnMuXG4gKiBUaGVpciB0eXBlcyBhcmUgZGlyZWN0bHkgY29taW5nIGZyb20gU3dlZXRBbGVydDIgdHlwZXMgZGVmaW50aXRpb25zLCBtZWFuaW5nIHRoYXQgbmd4LXN3ZWV0YWxlcnQyIGlzIHRpZ2h0bHkgY291cGxlZFxuICogdG8gU3dlZXRBbGVydDIsIGJ1dCBhbHNvIGlzIHR5cGUtc2FmZSBldmVuIGlmIGJvdGggbGlicmFyaWVzIGRvIG5vdCBldm9sdmUgaW4gc3luYy5cbiAqXG4gKiAoPykgSWYgeW91IHdhbnQgdG8gdXNlIGFuIG9iamVjdCB0aGF0IGRlY2xhcmVzIHRoZSBTd2VldEFsZXJ0MiBvcHRpb25zIGFsbCBhdCBvbmNlIHJhdGhlciB0aGFuIG1hbnkgQElucHV0cyxcbiAqICAgICB0YWtlIGEgbG9vayBhdCBbc3dhbE9wdGlvbnNdLCB0aGF0IGxldHMgeW91IHBhc3MgYSBmdWxsIHtAbGluayBTd2VldEFsZXJ0T3B0aW9uc30gb2JqZWN0LlxuICpcbiAqICg/KSBJZiB5b3UgYXJlIHJlYWRpbmcgdGhlIFR5cGVTY3JpcHQgc291cmNlIG9mIHRoaXMgY29tcG9uZW50LCB5b3UgbWF5IHRoaW5rIHRoYXQgaXQncyBhIGxvdCBvZiBjb2RlLlxuICogICAgIEJlIHN1cmUgdGhhdCBhIGxvdCBvZiB0aGlzIGNvZGUgaXMgdHlwZXMgYW5kIEFuZ3VsYXIgYm9pbGVycGxhdGUuIENvbXBpbGVkIGFuZCBtaW5pZmllZCBjb2RlIGlzIG11Y2ggc21hbGxlci5cbiAqICAgICBJZiB5b3UgYXJlIHJlYWxseSBjb25jZXJuZWQgYWJvdXQgcGVyZm9ybWFuY2UgYW5kL29yIGRvbid0IGNhcmUgYWJvdXQgdGhlIEFQSSBhbmQgaXRzIGNvbnZlbmllbnQgaW50ZWdyYXRpb25cbiAqICAgICB3aXRoIEFuZ3VsYXIgKG5vdGFibHkgY2hhbmdlIGRldGVjdGlvbiBhbmQgdHJhbnNjbHVzaW9uKSwgeW91IG1heSB0b3RhbGx5IHVzZSBTd2VldEFsZXJ0MiBuYXRpdmVseSBhcyB3ZWxsIDspXG4gKlxuICogLyFcXCBTb21lIFN3ZWV0QWxlcnQgb3B0aW9ucyBhcmVuJ3QgQElucHV0cyBidXQgQE91dHB1dHM6IGB3aWxsT3BlbmAsIGBkaWRPcGVuYCwgYGRpZFJlbmRlcmAsIGB3aWxsQ2xvc2VgLCBgZGlkQ2xvc2VgXG4gKiAgICAgYW5kIGBkaWREZXN0cm95YC5cbiAqICAgICBIb3dldmVyLCBgcHJlQ29uZmlybWAsIGBwcmVEZW55YCBhbmQgYGlucHV0VmFsaWRhdG9yYCBhcmUgc3RpbGwgQElucHV0cyBiZWNhdXNlIHRoZXkgYXJlIG5vdCBldmVudCBoYW5kbGVycyxcbiAqICAgICB0aGVyZSBjYW4ndCBiZSBtdWx0aXBsZSBsaXN0ZW5lcnMgb24gdGhlbSwgYW5kIHdlIG5lZWQgdGhlIHZhbHVlcyB0aGV5IGNhbi9tdXN0IHJldHVybi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzd2FsJyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU3dhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogU3dlZXRBbGVydE9wdGlvbnNbJ3RpdGxlJ107XG4gICAgQElucHV0KCkgcHVibGljIHRpdGxlVGV4dDogU3dlZXRBbGVydE9wdGlvbnNbJ3RpdGxlVGV4dCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0ZXh0OiBTd2VldEFsZXJ0T3B0aW9uc1sndGV4dCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBodG1sOiBTd2VldEFsZXJ0T3B0aW9uc1snaHRtbCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb290ZXI6IFN3ZWV0QWxlcnRPcHRpb25zWydmb290ZXInXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogU3dlZXRBbGVydE9wdGlvbnNbJ2ljb24nXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbkNvbG9yOiBTd2VldEFsZXJ0T3B0aW9uc1snaWNvbkNvbG9yJ107XG4gICAgQElucHV0KCkgcHVibGljIGljb25IdG1sOiBTd2VldEFsZXJ0T3B0aW9uc1snaWNvbkh0bWwnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgYmFja2Ryb3A6IFN3ZWV0QWxlcnRPcHRpb25zWydiYWNrZHJvcCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0b2FzdDogU3dlZXRBbGVydE9wdGlvbnNbJ3RvYXN0J107XG4gICAgQElucHV0KCkgcHVibGljIHRhcmdldDogU3dlZXRBbGVydE9wdGlvbnNbJ3RhcmdldCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpbnB1dDogU3dlZXRBbGVydE9wdGlvbnNbJ2lucHV0J107XG4gICAgQElucHV0KCkgcHVibGljIHdpZHRoOiBTd2VldEFsZXJ0T3B0aW9uc1snd2lkdGgnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFkZGluZzogU3dlZXRBbGVydE9wdGlvbnNbJ3BhZGRpbmcnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgYmFja2dyb3VuZDogU3dlZXRBbGVydE9wdGlvbnNbJ2JhY2tncm91bmQnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcG9zaXRpb246IFN3ZWV0QWxlcnRPcHRpb25zWydwb3NpdGlvbiddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBncm93OiBTd2VldEFsZXJ0T3B0aW9uc1snZ3JvdyddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93Q2xhc3M6IFN3ZWV0QWxlcnRPcHRpb25zWydzaG93Q2xhc3MnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaGlkZUNsYXNzOiBTd2VldEFsZXJ0T3B0aW9uc1snaGlkZUNsYXNzJ107XG4gICAgQElucHV0KCkgcHVibGljIGN1c3RvbUNsYXNzOiBTd2VldEFsZXJ0T3B0aW9uc1snY3VzdG9tQ2xhc3MnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgdGltZXI6IFN3ZWV0QWxlcnRPcHRpb25zWyd0aW1lciddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0aW1lclByb2dyZXNzQmFyOiBTd2VldEFsZXJ0T3B0aW9uc1sndGltZXJQcm9ncmVzc0JhciddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHRBdXRvOiBTd2VldEFsZXJ0T3B0aW9uc1snaGVpZ2h0QXV0byddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhbGxvd091dHNpZGVDbGljazogU3dlZXRBbGVydE9wdGlvbnNbJ2FsbG93T3V0c2lkZUNsaWNrJ107XG4gICAgQElucHV0KCkgcHVibGljIGFsbG93RXNjYXBlS2V5OiBTd2VldEFsZXJ0T3B0aW9uc1snYWxsb3dFc2NhcGVLZXknXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgYWxsb3dFbnRlcktleTogU3dlZXRBbGVydE9wdGlvbnNbJ2FsbG93RW50ZXJLZXknXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3RvcEtleWRvd25Qcm9wYWdhdGlvbjogU3dlZXRBbGVydE9wdGlvbnNbJ3N0b3BLZXlkb3duUHJvcGFnYXRpb24nXTtcbiAgICBASW5wdXQoKSBwdWJsaWMga2V5ZG93bkxpc3RlbmVyQ2FwdHVyZTogU3dlZXRBbGVydE9wdGlvbnNbJ2tleWRvd25MaXN0ZW5lckNhcHR1cmUnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgc2hvd0NvbmZpcm1CdXR0b246IFN3ZWV0QWxlcnRPcHRpb25zWydzaG93Q29uZmlybUJ1dHRvbiddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVueUJ1dHRvbjogU3dlZXRBbGVydE9wdGlvbnNbJ3Nob3dEZW55QnV0dG9uJ107XG4gICAgQElucHV0KCkgcHVibGljIHNob3dDYW5jZWxCdXR0b246IFN3ZWV0QWxlcnRPcHRpb25zWydzaG93Q2FuY2VsQnV0dG9uJ107XG4gICAgQElucHV0KCkgcHVibGljIGNvbmZpcm1CdXR0b25UZXh0OiBTd2VldEFsZXJ0T3B0aW9uc1snY29uZmlybUJ1dHRvblRleHQnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVueUJ1dHRvblRleHQ6IFN3ZWV0QWxlcnRPcHRpb25zWydkZW55QnV0dG9uVGV4dCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjYW5jZWxCdXR0b25UZXh0OiBTd2VldEFsZXJ0T3B0aW9uc1snY2FuY2VsQnV0dG9uVGV4dCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb25maXJtQnV0dG9uQ29sb3I6IFN3ZWV0QWxlcnRPcHRpb25zWydjb25maXJtQnV0dG9uQ29sb3InXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVueUJ1dHRvbkNvbG9yOiBTd2VldEFsZXJ0T3B0aW9uc1snZGVueUJ1dHRvbkNvbG9yJ107XG4gICAgQElucHV0KCkgcHVibGljIGNhbmNlbEJ1dHRvbkNvbG9yOiBTd2VldEFsZXJ0T3B0aW9uc1snY2FuY2VsQnV0dG9uQ29sb3InXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgY29uZmlybUJ1dHRvbkFyaWFMYWJlbDogU3dlZXRBbGVydE9wdGlvbnNbJ2NvbmZpcm1CdXR0b25BcmlhTGFiZWwnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVueUJ1dHRvbkFyaWFMYWJlbDogU3dlZXRBbGVydE9wdGlvbnNbJ2RlbnlCdXR0b25BcmlhTGFiZWwnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiBTd2VldEFsZXJ0T3B0aW9uc1snY2FuY2VsQnV0dG9uQXJpYUxhYmVsJ107XG4gICAgQElucHV0KCkgcHVibGljIGJ1dHRvbnNTdHlsaW5nOiBTd2VldEFsZXJ0T3B0aW9uc1snYnV0dG9uc1N0eWxpbmcnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmV2ZXJzZUJ1dHRvbnM6IFN3ZWV0QWxlcnRPcHRpb25zWydyZXZlcnNlQnV0dG9ucyddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb2N1c0NvbmZpcm06IFN3ZWV0QWxlcnRPcHRpb25zWydmb2N1c0NvbmZpcm0nXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZm9jdXNEZW55OiBTd2VldEFsZXJ0T3B0aW9uc1snZm9jdXNEZW55J107XG4gICAgQElucHV0KCkgcHVibGljIGZvY3VzQ2FuY2VsOiBTd2VldEFsZXJ0T3B0aW9uc1snZm9jdXNDYW5jZWwnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgc2hvd0Nsb3NlQnV0dG9uOiBTd2VldEFsZXJ0T3B0aW9uc1snc2hvd0Nsb3NlQnV0dG9uJ107XG4gICAgQElucHV0KCkgcHVibGljIGNsb3NlQnV0dG9uSHRtbDogU3dlZXRBbGVydE9wdGlvbnNbJ2Nsb3NlQnV0dG9uSHRtbCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjbG9zZUJ1dHRvbkFyaWFMYWJlbDogU3dlZXRBbGVydE9wdGlvbnNbJ2Nsb3NlQnV0dG9uQXJpYUxhYmVsJ107XG4gICAgQElucHV0KCkgcHVibGljIGxvYWRlckh0bWw6IFN3ZWV0QWxlcnRPcHRpb25zWydsb2FkZXJIdG1sJ107XG4gICAgQElucHV0KCkgcHVibGljIHNob3dMb2FkZXJPbkNvbmZpcm06IFN3ZWV0QWxlcnRPcHRpb25zWydzaG93TG9hZGVyT25Db25maXJtJ107XG4gICAgQElucHV0KCkgcHVibGljIHByZUNvbmZpcm06IFN3ZWV0QWxlcnRPcHRpb25zWydwcmVDb25maXJtJ107XG4gICAgQElucHV0KCkgcHVibGljIHByZURlbnk6IFN3ZWV0QWxlcnRPcHRpb25zWydwcmVEZW55J107XG4gICAgQElucHV0KCkgcHVibGljIGltYWdlVXJsOiBTd2VldEFsZXJ0T3B0aW9uc1snaW1hZ2VVcmwnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaW1hZ2VXaWR0aDogU3dlZXRBbGVydE9wdGlvbnNbJ2ltYWdlV2lkdGgnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaW1hZ2VIZWlnaHQ6IFN3ZWV0QWxlcnRPcHRpb25zWydpbWFnZUhlaWdodCddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpbWFnZUFsdDogU3dlZXRBbGVydE9wdGlvbnNbJ2ltYWdlQWx0J107XG4gICAgQElucHV0KCkgcHVibGljIGlucHV0TGFiZWw6IFN3ZWV0QWxlcnRPcHRpb25zWydpbnB1dExhYmVsJ107XG4gICAgQElucHV0KCkgcHVibGljIGlucHV0UGxhY2Vob2xkZXI6IFN3ZWV0QWxlcnRPcHRpb25zWydpbnB1dFBsYWNlaG9sZGVyJ107XG4gICAgQElucHV0KCkgcHVibGljIGlucHV0VmFsdWU6IFN3ZWV0QWxlcnRPcHRpb25zWydpbnB1dFZhbHVlJ107XG4gICAgQElucHV0KCkgcHVibGljIGlucHV0T3B0aW9uczogU3dlZXRBbGVydE9wdGlvbnNbJ2lucHV0T3B0aW9ucyddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpbnB1dEF1dG9UcmltOiBTd2VldEFsZXJ0T3B0aW9uc1snaW5wdXRBdXRvVHJpbSddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpbnB1dEF0dHJpYnV0ZXM6IFN3ZWV0QWxlcnRPcHRpb25zWydpbnB1dEF0dHJpYnV0ZXMnXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaW5wdXRWYWxpZGF0b3I6IFN3ZWV0QWxlcnRPcHRpb25zWydpbnB1dFZhbGlkYXRvciddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZXR1cm5JbnB1dFZhbHVlT25EZW55OiBTd2VldEFsZXJ0T3B0aW9uc1sncmV0dXJuSW5wdXRWYWx1ZU9uRGVueSddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0aW9uTWVzc2FnZTogU3dlZXRBbGVydE9wdGlvbnNbJ3ZhbGlkYXRpb25NZXNzYWdlJ107XG4gICAgQElucHV0KCkgcHVibGljIHByb2dyZXNzU3RlcHM6IFN3ZWV0QWxlcnRPcHRpb25zWydwcm9ncmVzc1N0ZXBzJ107XG4gICAgQElucHV0KCkgcHVibGljIGN1cnJlbnRQcm9ncmVzc1N0ZXA6IFN3ZWV0QWxlcnRPcHRpb25zWydjdXJyZW50UHJvZ3Jlc3NTdGVwJ107XG4gICAgQElucHV0KCkgcHVibGljIHByb2dyZXNzU3RlcHNEaXN0YW5jZTogU3dlZXRBbGVydE9wdGlvbnNbJ3Byb2dyZXNzU3RlcHNEaXN0YW5jZSddO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzY3JvbGxiYXJQYWRkaW5nOiBTd2VldEFsZXJ0T3B0aW9uc1snc2Nyb2xsYmFyUGFkZGluZyddO1xuXG4gICAgLyoqXG4gICAgICogQW4gb2JqZWN0IG9mIFN3ZWV0QWxlcnQyIG5hdGl2ZSBvcHRpb25zLCB1c2VmdWwgaWY6XG4gICAgICogIC0geW91IGRvbid0IHdhbnQgdG8gdXNlIHRoZSBASW5wdXRzIGZvciBwcmFjdGljYWwvcGhpbG9zb3BoaWNhbCByZWFzb25zIDtcbiAgICAgKiAgLSB0aGVyZSBhcmUgbWlzc2luZyBASW5wdXRzIGJlY2F1c2Ugbmd4LXN3ZWV0YWxlcnQyIGlzbid0IHVwLXRvLWRhdGUgd2l0aCBTd2VldEFsZXJ0MidzIGxhdGVzdCBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogLyFcXCBQbGVhc2Ugbm90ZSB0aGF0IHNldHRpbmcgdGhpcyBwcm9wZXJ0eSBkb2VzIE5PVCBlcmFzZSB3aGF0IGhhcyBiZWVuIHNldCBiZWZvcmUgdW5sZXNzIHlvdSBzcGVjaWZ5IHRoZVxuICAgICAqICAgICBwcmV2aW91cyBwcm9wZXJ0aWVzIHlvdSB3YW50IHRvIGVyYXNlIGFnYWluLlxuICAgICAqICAgICBJZS4gc2V0dGluZyB7IHRpdGxlOiAnVGl0bGUnIH0gYW5kIHRoZW4geyB0ZXh0OiAnVGV4dCcgfSB3aWxsIGdpdmUgeyB0aXRsZTogJ1RpdGxlJywgdGV4dDogJ1RleHQnIH0uXG4gICAgICpcbiAgICAgKiAvIVxcIEJlIGF3YXJlIHRoYXQgdGhlIG9wdGlvbnMgZGVmaW5lZCBpbiB0aGlzIG9iamVjdCB3aWxsIG92ZXJyaWRlIHRoZSBASW5wdXRzIG9mIHRoZSBzYW1lIG5hbWUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHN3YWxPcHRpb25zKG9wdGlvbnM6IFN3ZWV0QWxlcnRPcHRpb25zKSB7XG4gICAgICAgIC8vPT4gVXBkYXRlIHByb3BlcnRpZXNcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICAvLz0+IE1hcmsgY2hhbmdlZCBwcm9wZXJ0aWVzIGFzIHRvdWNoZWRcbiAgICAgICAgY29uc3QgdG91Y2hlZEtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKSBhcyBBcnJheTxrZXlvZiBTd2VldEFsZXJ0T3B0aW9ucz47XG4gICAgICAgIHRvdWNoZWRLZXlzLmZvckVhY2godGhpcy5tYXJrVG91Y2hlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgdGhlIG9wdGlvbnMgb2JqZWN0IHRoYXQgd2lsbCBnZXQgcGFzc2VkIHRvIFN3ZWV0QWxlcnQyLlxuICAgICAqIE9ubHkgdGhlIHByb3BlcnRpZXMgdGhhdCBoYXZlIGJlZW4gc2V0IGF0IGxlYXN0IG9uY2Ugb24gdGhpcyBjb21wb25lbnQgd2lsbCBiZSByZXR1cm5lZC5cbiAgICAgKiBNb3N0bHkgZm9yIGludGVybmFsIHVzYWdlLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc3dhbE9wdGlvbnMoKTogU3dlZXRBbGVydE9wdGlvbnMge1xuICAgICAgICAvLz0+IFdlIHdpbGwgY29tcHV0ZSB0aGUgb3B0aW9ucyBvYmplY3QgYmFzZWQgb24gdGhlIG9wdGlvbiBrZXlzIHRoYXQgYXJlIGtub3duIHRvIGhhdmUgY2hhbmdlZC5cbiAgICAgICAgLy8gICBUaGF0IGF2b2lkcyBwYXNzaW5nIGEgZ2lnYW50aWMgb2JqZWN0IHRvIFN3ZWV0QWxlcnQyLCBtYWtpbmcgZGVidWdnaW5nIGVhc2llciBhbmQgcG90ZW50aWFsbHlcbiAgICAgICAgLy8gICBhdm9pZGluZyBzaWRlIGVmZmVjdHMuXG4gICAgICAgIHJldHVybiBbLi4udGhpcy50b3VjaGVkUHJvcHNdLnJlZHVjZTxTd2VldEFsZXJ0T3B0aW9ucz4oXG4gICAgICAgICAgICAob2JqLCBrZXkpID0+ICh7IC4uLm9iaiwgW2tleV06IHRoaXNba2V5IGFzIGtleW9mIHRoaXNdIH0pLFxuICAgICAgICAgICAge30pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZmlyZSB0aGUgbW9kYWwgYXMgc29vbiBhcyB0aGUgPHN3YWw+IGNvbXBvbmVudCBpcyBjcmVhdGVkIGFuZCBpbml0aWFsaXplZCBpbiB0aGUgdmlldy5cbiAgICAgKiBXaGVuIGxlZnQgdW5kZWZpbmVkIChkZWZhdWx0KSwgdGhlIHZhbHVlIHdpbGwgYmUgaW5oZXJpdGVkIGZyb20gdGhlIG1vZHVsZSBjb25maWd1cmF0aW9uLCB3aGljaCBpcyBgZmFsc2VgLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKiAgICAgPHN3YWwgKm5nSWY9XCJlcnJvclwiIFt0aXRsZV09XCJlcnJvci50aXRsZVwiIFt0ZXh0XT1cImVycm9yLnRleHRcIiBpY29uPVwiZXJyb3JcIiBbc3dhbEZpcmVPbkluaXRdPVwidHJ1ZVwiPjwvc3dhbD5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzd2FsRmlyZU9uSW5pdD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc21pc3MgdGhlIG1vZGFsIHdoZW4gdGhlIDxzd2FsPiBjb21wb25lbnQgaXMgZGVzdHJveWVkIGJ5IEFuZ3VsYXIgKGZvciBhbnkgcmVhc29uKSBvciBub3QuXG4gICAgICogV2hlbiBsZWZ0IHVuZGVmaW5lZCAoZGVmYXVsdCksIHRoZSB2YWx1ZSB3aWxsIGJlIGluaGVyaXRlZCBmcm9tIHRoZSBtb2R1bGUgY29uZmlndXJhdGlvbiwgd2hpY2ggaXMgYHRydWVgLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHN3YWxEaXNtaXNzT25EZXN0cm95PzogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBzd2FsVmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKSB7XG4gICAgICAgIHZpc2libGUgPyB0aGlzLmZpcmUoKSA6IHRoaXMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN3YWxWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0N1cnJlbnRseVNob3duO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vZGFsIGxpZmVjeWNsZSBob29rLiBTeW5jaHJvbm91c2x5IHJ1bnMgYmVmb3JlIHRoZSBtb2RhbCBpcyBzaG93biBvbiBzY3JlZW4uXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbGxPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxldmVudHMuV2lsbE9wZW5FdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIE1vZGFsIGxpZmVjeWNsZSBob29rLiBTeW5jaHJvbm91c2x5IHJ1bnMgYmVmb3JlIHRoZSBtb2RhbCBpcyBzaG93biBvbiBzY3JlZW4uXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZE9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGV2ZW50cy5EaWRPcGVuRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBNb2RhbCBsaWZlY3ljbGUgaG9vay4gU3luY2hyb25vdXNseSBydW5zIGFmdGVyIHRoZSBwb3B1cCBET00gaGFzIGJlZW4gdXBkYXRlZCAoaWUuIGp1c3QgYmVmb3JlIHRoZSBtb2RhbCBpc1xuICAgICAqIHJlcGFpbnRlZCBvbiB0aGUgc2NyZWVuKS5cbiAgICAgKiBUeXBpY2FsbHksIHRoaXMgd2lsbCBoYXBwZW4gYWZ0ZXIgYFN3YWwuZmlyZSgpYCBvciBgU3dhbC51cGRhdGUoKWAuXG4gICAgICogSWYgeW91IHdhbnQgdG8gcGVyZm9ybSBjaGFuZ2VzIGluIHRoZSBwb3B1cCdzIERPTSwgdGhhdCBzdXJ2aXZlIGBTd2FsLnVwZGF0ZSgpYCwgcHJlZmVyIHtAbGluayBkaWRSZW5kZXJ9IG92ZXJcbiAgICAgKiB7QGxpbmsgd2lsbE9wZW59LlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWRSZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGV2ZW50cy5EaWRSZW5kZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIE1vZGFsIGxpZmVjeWNsZSBob29rLiBTeW5jaHJvbm91c2x5IHJ1bnMgd2hlbiB0aGUgcG9wdXAgY2xvc2VzIGJ5IHVzZXIgaW50ZXJhY3Rpb24gKGFuZCBub3QgZHVlIHRvIGFub3RoZXIgcG9wdXBcbiAgICAgKiBiZWluZyBmaXJlZCkuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbGxDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8ZXZlbnRzLldpbGxDbG9zZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogTW9kYWwgbGlmZWN5Y2xlIGhvb2suIEFzeW5jaHJvbm91c2x5IHJ1bnMgYWZ0ZXIgdGhlIHBvcHVwIGhhcyBiZWVuIGRpc3Bvc2VkIGJ5IHVzZXIgaW50ZXJhY3Rpb24gKGFuZCBub3QgZHVlIHRvXG4gICAgICogYW5vdGhlciBwb3B1cCBiZWluZyBmaXJlZCkuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZENsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogTW9kYWwgbGlmZWN5Y2xlIGhvb2suIFN5bmNocm9ub3VzbHkgcnVucyBhZnRlciBwb3B1cCBoYXMgYmVlbiBkZXN0cm95ZWQgZWl0aGVyIGJ5IHVzZXIgaW50ZXJhY3Rpb24gb3IgYnkgYW5vdGhlclxuICAgICAqIHBvcHVwLlxuICAgICAqIElmIHlvdSBoYXZlIGNsZWFudXAgb3BlcmF0aW9ucyB0aGF0IHlvdSBuZWVkIHRvIHJlbGlhYmx5IGV4ZWN1dGUgZWFjaCB0aW1lIGEgbW9kYWwgaXMgY2xvc2VkLCBwcmVmZXJcbiAgICAgKiB7QGxpbmsgZGlkRGVzdHJveX0gb3ZlciB7QGxpbmsgZGlkQ2xvc2V9LlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWREZXN0cm95ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgd2hlbiB0aGUgdXNlciBjbGlja3MgXCJDb25maXJtXCIuXG4gICAgICogVGhlIGV2ZW50IHZhbHVlICgkZXZlbnQpIGNhbiBiZSBlaXRoZXI6XG4gICAgICogIC0gYnkgZGVmYXVsdCwganVzdCBgdHJ1ZWAsXG4gICAgICogIC0gd2hlbiB1c2luZyB7QGxpbmsgaW5wdXR9LCB0aGUgaW5wdXQgdmFsdWUsXG4gICAgICogIC0gd2hlbiB1c2luZyB7QGxpbmsgcHJlQ29uZmlybX0sIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhpcyBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICogICAgIDxzd2FsIChjb25maXJtKT1cImhhbmRsZUNvbmZpcm0oJGV2ZW50KVwiPjwvc3dhbD5cbiAgICAgKlxuICAgICAqICAgICBwdWJsaWMgaGFuZGxlQ29uZmlybShlbWFpbDogc3RyaW5nKTogdm9pZCB7XG4gICAgICogICAgICAgICAvLyAuLi4gc2F2ZSB1c2VyIGVtYWlsXG4gICAgICogICAgIH1cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29uZmlybSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgd2hlbiB0aGUgdXNlciBjbGlja3MgXCJEZW55XCIuXG4gICAgICogVGhpcyBldmVudCBiZWFycyBubyB2YWx1ZS5cbiAgICAgKiBVc2UgYChkZW55KWAgKGFsb25nIHdpdGgge0BsaW5rIHNob3dEZW55QnV0dG9ufSkgd2hlbiB5b3Ugd2FudCBhIG1vZGFsIHdpdGggdGhyZWUgYnV0dG9ucyAoY29uZmlybSwgZGVueSBhbmRcbiAgICAgKiBjYW5jZWwpLCBhbmQvb3Igd2hlbiB5b3Ugd2FudCB0byBoYW5kbGUgY2xlYXIgcmVmdXNhbCBpbiBhIHNlcGFyYXRlIHdheSB0aGFuIHNpbXBsZSBkaXNtaXNzYWwuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqICAgICA8c3dhbCAoZGVueSk9XCJoYW5kbGVEZW55KClcIj48L3N3YWw+XG4gICAgICpcbiAgICAgKiAgICAgcHVibGljIGhhbmRsZURlbnkoKTogdm9pZCB7XG4gICAgICogICAgIH1cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGVueSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHdoZW4gdGhlIHVzZXIgY2xpY2tzIFwiQ2FuY2VsXCIsIG9yIGRpc21pc3NlcyB0aGUgbW9kYWwgYnkgYW55IG90aGVyIGFsbG93ZWQgd2F5LlxuICAgICAqIFRoZSBldmVudCB2YWx1ZSAoJGV2ZW50KSBpcyBhIHN0cmluZyB0aGF0IGV4cGxhaW5zIGhvdyB0aGUgbW9kYWwgd2FzIGRpc21pc3NlZC4gSXQgaXMgYHVuZGVmaW5lZGAgd2hlblxuICAgICAqIHRoZSBtb2RhbCB3YXMgcHJvZ3JhbW1hdGljYWxseSBjbG9zZWQgKHRocm91Z2gge0BsaW5rIGNsb3NlfSBmb3IgZXhhbXBsZSkuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqICAgICA8c3dhbCAoZGlzbWlzcyk9XCJoYW5kbGVEaXNtaXNzKCRldmVudClcIj48L3N3YWw+XG4gICAgICpcbiAgICAgKiAgICAgcHVibGljIGhhbmRsZURpc21pc3MocmVhc29uOiBEaXNtaXNzUmVhc29uIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgICogICAgICAgICAvLyByZWFzb24gY2FuIGJlICdjYW5jZWwnLCAnb3ZlcmxheScsICdjbG9zZScsICd0aW1lcicgb3IgdW5kZWZpbmVkLlxuICAgICAqICAgICAgICAgLy8gLi4uIGRvIHNvbWV0aGluZ1xuICAgICAqICAgICB9XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpc21pc3MgPSBuZXcgRXZlbnRFbWl0dGVyPFN3YWwuRGlzbWlzc1JlYXNvbiB8IHVuZGVmaW5lZD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgU2V0IHJldGFpbnMgdGhlIHByb3BlcnRpZXMgdGhhdCBoYXZlIGJlZW4gY2hhbmdlZCBmcm9tIEBJbnB1dHMsIHNvIHdlIGNhbiBrbm93IHByZWNpc2VseVxuICAgICAqIHdoYXQgb3B0aW9ucyB3ZSBoYXZlIHRvIHNlbmQgdG8ge0BsaW5rIFN3YWwuZmlyZX0uXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWFkb25seSB0b3VjaGVkUHJvcHMgPSBuZXcgU2V0PGtleW9mIFN3ZWV0QWxlcnRPcHRpb25zPigpO1xuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiBvZiBzaWduYXR1cmUgYChwcm9wTmFtZTogc3RyaW5nKTogdm9pZGAgdGhhdCBhZGRzIGEgZ2l2ZW4gcHJvcGVydHkgbmFtZSB0byB0aGUgbGlzdCBvZlxuICAgICAqIHRvdWNoZWQgcHJvcGVydGllcywgaWUuIHtAbGluayB0b3VjaGVkUHJvcHN9LlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWFya1RvdWNoZWQgPSB0aGlzLnRvdWNoZWRQcm9wcy5hZGQuYmluZCh0aGlzLnRvdWNoZWRQcm9wcyk7XG5cbiAgICAvKipcbiAgICAgKiBJcyB0aGUgU3dlZXRBbGVydDIgbW9kYWwgcmVwcmVzZW50ZWQgYnkgdGhpcyBjb21wb25lbnQgY3VycmVudGx5IG9wZW5lZD9cbiAgICAgKi9cbiAgICBwcml2YXRlIGlzQ3VycmVudGx5U2hvd24gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBzd2VldEFsZXJ0MkxvYWRlcjogU3dlZXRBbGVydDJMb2FkZXJTZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KGZpcmVPbkluaXRUb2tlbikgcHJpdmF0ZSByZWFkb25seSBtb2R1bGVMZXZlbEZpcmVPbkluaXQ6IGJvb2xlYW4sXG4gICAgICAgIEBJbmplY3QoZGlzbWlzc09uRGVzdHJveVRva2VuKSBwcml2YXRlIHJlYWRvbmx5IG1vZHVsZUxldmVsRGlzbWlzc09uRGVzdHJveTogYm9vbGVhbikge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2suXG4gICAgICogQXNrcyB0aGUgU3dlZXRBbGVydDIgbG9hZGVyIHNlcnZpY2UgdG8gcHJlbG9hZCB0aGUgU3dlZXRBbGVydDIgbGlicmFyeSwgc28gaXQgYmVnaW5zIHRvIGJlIGxvYWRlZCBvbmx5IGlmIHRoZXJlXG4gICAgICogaXMgYSA8c3dhbD4gY29tcG9uZW50IHNvbWV3aGVyZSwgYW5kIGlzIHByb2JhYmx5IGZ1bGx5IGxvYWRlZCB3aGVuIHRoZSBtb2RhbCBoYXMgdG8gYmUgZGlzcGxheWVkLFxuICAgICAqIGNhdXNpbmcgbm8gZGVsYXkuXG4gICAgICovXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLz0+IFByZWxvYWQgU3dlZXRBbGVydDIgbGlicmFyeSBpbiBjYXNlIHRoaXMgY29tcG9uZW50IGlzIGFjdGl2YXRlZC5cbiAgICAgICAgdGhpcy5zd2VldEFsZXJ0MkxvYWRlci5wcmVsb2FkU3dlZXRBbGVydExpYnJhcnkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbmd1bGFyIGxpZmVjeWNsZSBob29rLlxuICAgICAqIEZpcmVzIHRoZSBtb2RhbCwgaWYgdGhlIGNvbXBvbmVudCBvciBtb2R1bGUgaXMgY29uZmlndXJlZCB0byBkbyBzby5cbiAgICAgKi9cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaXJlT25Jbml0ID0gdGhpcy5zd2FsRmlyZU9uSW5pdCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMubW9kdWxlTGV2ZWxGaXJlT25Jbml0XG4gICAgICAgICAgICA6IHRoaXMuc3dhbEZpcmVPbkluaXQ7XG5cbiAgICAgICAgZmlyZU9uSW5pdCAmJiB0aGlzLmZpcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbmd1bGFyIGxpZmVjeWNsZSBob29rLlxuICAgICAqIFVwZGF0ZXMgdGhlIFN3ZWV0QWxlcnQgb3B0aW9ucywgYW5kIGlmIHRoZSBtb2RhbCBpcyBvcGVuZWQsIGFza3MgU3dlZXRBbGVydCB0byByZW5kZXIgaXQgYWdhaW4uXG4gICAgICovXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgLy89PiBGb3IgZWFjaCBjaGFuZ2VkIEBJbnB1dCB0aGF0IG1hdGNoZXMgYSBTd2VldEFsZXJ0MiBvcHRpb24sIG1hcmsgYXMgdG91Y2hlZCBzbyB3ZSBjYW5cbiAgICAgICAgLy8gICBzZW5kIGl0IHdpdGggdGhlIG5leHQgZmlyZSgpIG9yIHVwZGF0ZSgpIGNhbGxzLlxuICAgICAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKVxuICAgICAgICAgICAgLy89PiBJZiB0aGUgZmlsdGVyaW5nIGxvZ2ljIGJlY29tZXMgbW9yZSBjb21wbGV4IGhlcmUsIHdlIGNhbiB1c2UgU3dhbC5pc1ZhbGlkUGFyYW1ldGVyXG4gICAgICAgICAgICAuZmlsdGVyKChrZXkpOiBrZXkgaXMga2V5b2YgU3dlZXRBbGVydE9wdGlvbnMgPT4gIWtleS5zdGFydHNXaXRoKCdzd2FsJykpXG4gICAgICAgICAgICAuZm9yRWFjaCh0aGlzLm1hcmtUb3VjaGVkKTtcblxuICAgICAgICAvLz0+IEV2ZW50dWFsbHkgdHJpZ2dlciByZS1yZW5kZXIgaWYgdGhlIG1vZGFsIGlzIG9wZW4uXG4gICAgICAgIHZvaWQgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbmd1bGFyIGxpZmVjeWNsZSBob29rLlxuICAgICAqIENsb3NlcyB0aGUgU3dlZXRBbGVydCB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy89PiBSZWxlYXNlIHRoZSBtb2RhbCBpZiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZCBhbmQgaWYgdGhhdCBiZWhhdmlvdXIgaXMgbm90IGRpc2FibGVkLlxuICAgICAgICBjb25zdCBkaXNtaXNzT25EZXN0cm95ID0gdGhpcy5zd2FsRGlzbWlzc09uRGVzdHJveSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMubW9kdWxlTGV2ZWxEaXNtaXNzT25EZXN0cm95XG4gICAgICAgICAgICA6IHRoaXMuc3dhbERpc21pc3NPbkRlc3Ryb3k7XG5cbiAgICAgICAgZGlzbWlzc09uRGVzdHJveSAmJiB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIFN3ZWV0QWxlcnQuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIHRoZSBTd2VldEFsZXJ0MiBwcm9taXNlIGZvciBjb252ZW5pZW5jZSBhbmQgdXNlIGluIGNvZGUgYmVoaW5kIHRlbXBsYXRlcy5cbiAgICAgKiBPdGhlcndpc2UsIChjb25maXJtKT1cIm15SGFuZGxlcigkZXZlbnQpXCIgYW5kIChkaXNtaXNzKT1cIm15SGFuZGxlcigkZXZlbnQpXCIgY2FuIGJlIHVzZWQgaW4gdGVtcGxhdGVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBmaXJlKCk6IFByb21pc2U8U3dlZXRBbGVydFJlc3VsdD4ge1xuICAgICAgICBjb25zdCBzd2FsID0gYXdhaXQgdGhpcy5zd2VldEFsZXJ0MkxvYWRlci5zd2FsO1xuXG4gICAgICAgIGNvbnN0IHVzZXJPcHRpb25zID0gdGhpcy5zd2FsT3B0aW9ucztcblxuICAgICAgICAvLz0+IEJ1aWxkIHRoZSBTd2VldEFsZXJ0MiBvcHRpb25zXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IFN3ZWV0QWxlcnRPcHRpb25zID0ge1xuICAgICAgICAgICAgLy89PiBNZXJnZSB3aXRoIGNhbGN1bGF0ZWQgb3B0aW9ucyBzZXQgZm9yIHRoYXQgc3BlY2lmaWMgc3dhbFxuICAgICAgICAgICAgLi4udXNlck9wdGlvbnMsXG5cbiAgICAgICAgICAgIC8vPT4gSGFuZGxlIG1vZGFsIGxpZmVjeWNsZSBldmVudHNcbiAgICAgICAgICAgIHdpbGxPcGVuOiBjb21wb3NlSG9vayh1c2VyT3B0aW9ucy53aWxsT3BlbiwgKG1vZGFsRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2lsbE9wZW4uZW1pdCh7IG1vZGFsRWxlbWVudCB9KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZGlkT3BlbjogY29tcG9zZUhvb2sodXNlck9wdGlvbnMuZGlkT3BlbiwgKG1vZGFsRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50bHlTaG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWRPcGVuLmVtaXQoeyBtb2RhbEVsZW1lbnQgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGRpZFJlbmRlcjogY29tcG9zZUhvb2sodXNlck9wdGlvbnMuZGlkUmVuZGVyLCAobW9kYWxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWRSZW5kZXIuZW1pdCh7IG1vZGFsRWxlbWVudCB9KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgd2lsbENsb3NlOiBjb21wb3NlSG9vayh1c2VyT3B0aW9ucy53aWxsQ2xvc2UsIChtb2RhbEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ3VycmVudGx5U2hvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLndpbGxDbG9zZS5lbWl0KHsgbW9kYWxFbGVtZW50IH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBkaWRDbG9zZTogY29tcG9zZUhvb2sodXNlck9wdGlvbnMuZGlkQ2xvc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZENsb3NlLmVtaXQoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZGlkRGVzdHJveTogY29tcG9zZUhvb2sodXNlck9wdGlvbnMuZGlkRGVzdHJveSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlkRGVzdHJveS5lbWl0KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vPT4gU2hvdyB0aGUgU3dhbCEgQW5kIHdhaXQgZm9yIGNvbmZpcm1hdGlvbiBvciBkaW1pc3NhbC5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3dhbC5maXJlKG9wdGlvbnMpO1xuXG4gICAgICAgIC8vPT4gRW1pdCBvbiAoY29uZmlybSksIChkZW55KSBvciAoZGlzbWlzcylcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIHJlc3VsdC5pc0NvbmZpcm1lZDogdGhpcy5jb25maXJtLmVtaXQocmVzdWx0LnZhbHVlKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHJlc3VsdC5pc0RlbmllZDogdGhpcy5kZW55LmVtaXQoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHJlc3VsdC5pc0Rpc21pc3NlZDogdGhpcy5kaXNtaXNzLmVtaXQocmVzdWx0LmRpc21pc3MpOyBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgZnVuY3Rpb24gY29tcG9zZUhvb2s8VCBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD4oXG4gICAgICAgICAgICB1c2VySG9vazogVCB8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGxpYkhvb2s6IFQpOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gdm9pZCB7XG5cbiAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4gKGxpYkhvb2soLi4uYXJncyksIHVzZXJIb29rPy4oLi4uYXJncykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBtb2RhbCwgaWYgb3BlbmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc3VsdCBUaGUgdmFsdWUgdGhhdCB0aGUgbW9kYWwgd2lsbCByZXNvbHZlIHdpdGgsIHRyaWdnZXJpbmcgZWl0aGVyIChjb25maXJtKSwgKGRlbnkpIG9yIChkaXNtaXNzKS5cbiAgICAgKiAgICAgICAgICAgICAgIElmIHRoZSBhcmd1bWVudCBpcyBub3QgcGFzc2VkLCBpdCBpcyAoZGlzbWlzcykgdGhhdCB3aWxsIGVtaXQgYW4gYHVuZGVmaW5lZGAgcmVhc29uLlxuICAgICAqICAgICAgICAgICAgICAge0BzZWUgU3dhbC5jbG9zZX0uXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGNsb3NlKHJlc3VsdD86IFN3ZWV0QWxlcnRSZXN1bHQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ3VycmVudGx5U2hvd24pIHJldHVybjtcblxuICAgICAgICBjb25zdCBzd2FsID0gYXdhaXQgdGhpcy5zd2VldEFsZXJ0MkxvYWRlci5zd2FsO1xuICAgICAgICBzd2FsLmNsb3NlKHJlc3VsdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBTd2VldEFsZXJ0MiBvcHRpb25zIHdoaWxlIHRoZSBtb2RhbCBpcyBvcGVuZWQsIGNhdXNpbmcgdGhlIG1vZGFsIHRvIHJlLXJlbmRlci5cbiAgICAgKiBJZiB0aGUgbW9kYWwgaXMgbm90IG9wZW5lZCwgdGhlIGNvbXBvbmVudCBvcHRpb25zIHdpbGwgc2ltcGx5IGJlIHVwZGF0ZWQgYW5kIHRoYXQncyBpdC5cbiAgICAgKlxuICAgICAqIC8hXFwgUGxlYXNlIG5vdGUgdGhhdCBub3QgYWxsIFN3ZWV0QWxlcnQyIG9wdGlvbnMgYXJlIHVwZGF0YWJsZSB3aGlsZSB0aGUgbW9kYWwgaXMgb3BlbmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKG9wdGlvbnM/OiBQaWNrPFN3ZWV0QWxlcnRPcHRpb25zLCBTd2VldEFsZXJ0VXBkYXRhYmxlUGFyYW1ldGVycz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhbE9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ3VycmVudGx5U2hvd24pIHJldHVybjtcblxuICAgICAgICBjb25zdCBzd2FsID0gYXdhaXQgdGhpcy5zd2VldEFsZXJ0MkxvYWRlci5zd2FsO1xuXG4gICAgICAgIGNvbnN0IGFsbE9wdGlvbnMgPSB0aGlzLnN3YWxPcHRpb25zO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0YWJsZU9wdGlvbnMgPSBPYmplY3Qua2V5cyhhbGxPcHRpb25zKVxuICAgICAgICAgICAgLmZpbHRlcihzd2FsLmlzVXBkYXRhYmxlUGFyYW1ldGVyKVxuICAgICAgICAgICAgLnJlZHVjZTxQaWNrPFN3ZWV0QWxlcnRPcHRpb25zLCBTd2VldEFsZXJ0VXBkYXRhYmxlUGFyYW1ldGVycz4+KFxuICAgICAgICAgICAgICAgIChvYmosIGtleSkgPT4gKHsgLi4ub2JqLCBba2V5XTogYWxsT3B0aW9uc1trZXldIH0pLFxuICAgICAgICAgICAgICAgIHt9KTtcblxuICAgICAgICBzd2FsLnVwZGF0ZSh1cGRhdGFibGVPcHRpb25zKTtcbiAgICB9XG59XG4iXX0=