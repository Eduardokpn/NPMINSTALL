import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, EventEmitter, Component, ChangeDetectionStrategy, Input, Output, Directive, HostListener, Host, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

const swalProviderToken = new InjectionToken('@sweetalert2/ngx-sweetalert2#swalProvider');
const fireOnInitToken = new InjectionToken('@sweetalert2/ngx-sweetalert2#fireOnInit');
const dismissOnDestroyToken = new InjectionToken('@sweetalert2/ngx-sweetalert2#dismissOnDestroy');

class SweetAlert2LoaderService {
    // Using any because Angular metadata generator does not understand a pure TS type here
    constructor(swalProvider) {
        this.swalProvider = swalProvider;
    }
    get swal() {
        if (!this.swalPromiseCache) {
            this.preloadSweetAlertLibrary();
        }
        return this.swalPromiseCache;
    }
    preloadSweetAlertLibrary() {
        if (this.swalPromiseCache)
            return;
        const libPromise = isLoader(this.swalProvider)
            ? this.swalProvider()
            : Promise.resolve(this.swalProvider);
        this.swalPromiseCache = libPromise.then(value => isDefaultExport(value) ? value : value.default);
        function isLoader(value) {
            return typeof value === 'function' && value.version === undefined;
        }
        function isDefaultExport(value) {
            return typeof value === 'function';
        }
    }
}
SweetAlert2LoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SweetAlert2LoaderService, deps: [{ token: swalProviderToken }], target: i0.ɵɵFactoryTarget.Injectable });
SweetAlert2LoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SweetAlert2LoaderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SweetAlert2LoaderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [swalProviderToken]
                }] }]; } });

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
class SwalComponent {
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
SwalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalComponent, deps: [{ token: SweetAlert2LoaderService }, { token: fireOnInitToken }, { token: dismissOnDestroyToken }], target: i0.ɵɵFactoryTarget.Component });
SwalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.4", type: SwalComponent, selector: "swal", inputs: { title: "title", titleText: "titleText", text: "text", html: "html", footer: "footer", icon: "icon", iconColor: "iconColor", iconHtml: "iconHtml", backdrop: "backdrop", toast: "toast", target: "target", input: "input", width: "width", padding: "padding", background: "background", position: "position", grow: "grow", showClass: "showClass", hideClass: "hideClass", customClass: "customClass", timer: "timer", timerProgressBar: "timerProgressBar", heightAuto: "heightAuto", allowOutsideClick: "allowOutsideClick", allowEscapeKey: "allowEscapeKey", allowEnterKey: "allowEnterKey", stopKeydownPropagation: "stopKeydownPropagation", keydownListenerCapture: "keydownListenerCapture", showConfirmButton: "showConfirmButton", showDenyButton: "showDenyButton", showCancelButton: "showCancelButton", confirmButtonText: "confirmButtonText", denyButtonText: "denyButtonText", cancelButtonText: "cancelButtonText", confirmButtonColor: "confirmButtonColor", denyButtonColor: "denyButtonColor", cancelButtonColor: "cancelButtonColor", confirmButtonAriaLabel: "confirmButtonAriaLabel", denyButtonAriaLabel: "denyButtonAriaLabel", cancelButtonAriaLabel: "cancelButtonAriaLabel", buttonsStyling: "buttonsStyling", reverseButtons: "reverseButtons", focusConfirm: "focusConfirm", focusDeny: "focusDeny", focusCancel: "focusCancel", showCloseButton: "showCloseButton", closeButtonHtml: "closeButtonHtml", closeButtonAriaLabel: "closeButtonAriaLabel", loaderHtml: "loaderHtml", showLoaderOnConfirm: "showLoaderOnConfirm", preConfirm: "preConfirm", preDeny: "preDeny", imageUrl: "imageUrl", imageWidth: "imageWidth", imageHeight: "imageHeight", imageAlt: "imageAlt", inputLabel: "inputLabel", inputPlaceholder: "inputPlaceholder", inputValue: "inputValue", inputOptions: "inputOptions", inputAutoTrim: "inputAutoTrim", inputAttributes: "inputAttributes", inputValidator: "inputValidator", returnInputValueOnDeny: "returnInputValueOnDeny", validationMessage: "validationMessage", progressSteps: "progressSteps", currentProgressStep: "currentProgressStep", progressStepsDistance: "progressStepsDistance", scrollbarPadding: "scrollbarPadding", swalOptions: "swalOptions", swalFireOnInit: "swalFireOnInit", swalDismissOnDestroy: "swalDismissOnDestroy", swalVisible: "swalVisible" }, outputs: { willOpen: "willOpen", didOpen: "didOpen", didRender: "didRender", willClose: "willClose", didClose: "didClose", didDestroy: "didDestroy", confirm: "confirm", deny: "deny", dismiss: "dismiss" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'swal',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: SweetAlert2LoaderService }, { type: undefined, decorators: [{
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

/**
 * [swal] directive. It takes a value that defines the SweetAlert and can be of three types:
 *
 * 1) A simple array of two or three strings defining [title, text, icon] - the icon being optional, ex:
 *
 *    <button [swal]="['Title', 'Text']">Click me</button>
 *
 * 2) A native SweetAlert2 options object, ex:
 *
 *    <button [swal]="{ title: 'Title', text: 'Text' }">Click me</button>
 *
 * 3) A reference to an existing SwalComponent instance for more advanced uses, ex:
 *
 *    <button [swal]="mySwal">Click me</button>
 *    <swal #mySwal title="Title" text="Text"></swal>
 */
class SwalDirective {
    constructor(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
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
         * the modal was programmatically closed (through {@link dismiss} for example).
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
    }
    /**
     * SweetAlert2 options or a SwalComponent instance.
     * See the class doc block for more informations.
     */
    set swal(options) {
        if (options instanceof SwalComponent) {
            this.swalInstance = options;
        }
        else if (isArrayOptions(options)) {
            this.swalOptions = {};
            [this.swalOptions.title, this.swalOptions.text, this.swalOptions.icon] = options;
        }
        else {
            this.swalOptions = options;
        }
        function isArrayOptions(value) {
            return Array.isArray(options);
        }
    }
    /**
     * OnInit lifecycle handler.
     * Creates a SwalComponent instance if the user didn't provided one and binds on that component (confirm),
     * (deny) and (dismiss) outputs to reemit on the directive.
     */
    ngOnInit() {
        if (!this.swalInstance) {
            const factory = this.resolver.resolveComponentFactory(SwalComponent);
            this.swalRef = this.viewContainerRef.createComponent(factory);
            this.swalInstance = this.swalRef.instance;
        }
    }
    /**
     * OnDestroy lifecycle handler.
     * Destroys the dynamically-created SwalComponent.
     */
    ngOnDestroy() {
        if (this.swalRef) {
            this.swalRef.destroy();
        }
    }
    /**
     * Click handler.
     * The directive listens for onclick events on its host element.
     * When this happens, it shows the <swal> attached to this directive.
     */
    onClick(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        if (!this.swalInstance)
            return;
        if (this.swalOptions) {
            this.swalInstance.swalOptions = this.swalOptions;
        }
        const swalClosed = new Subject();
        this.swalInstance.confirm.asObservable().pipe(takeUntil(swalClosed)).subscribe(v => this.confirm.emit(v));
        this.swalInstance.deny.asObservable().pipe(takeUntil(swalClosed)).subscribe(v => this.deny.emit(v));
        this.swalInstance.dismiss.asObservable().pipe(takeUntil(swalClosed)).subscribe(v => this.dismiss.emit(v));
        this.swalInstance.fire().then(() => swalClosed.next());
    }
}
SwalDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Directive });
SwalDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.4", type: SwalDirective, selector: "[swal]", inputs: { swal: "swal" }, outputs: { confirm: "confirm", deny: "deny", dismiss: "dismiss" }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[swal]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { swal: [{
                type: Input
            }], confirm: [{
                type: Output
            }], deny: [{
                type: Output
            }], dismiss: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/**
 * @internal
 * Holds a consumer's Angular template and displays it on a Sweet Alert.
 * See SwalPortalDirective for info about the covered feature.
 */
class SwalPortalComponent {
    constructor() {
        this.template = null;
    }
}
SwalPortalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SwalPortalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.4", type: SwalPortalComponent, selector: "swal-portal", inputs: { template: "template" }, ngImport: i0, template: '<ng-container *ngTemplateOutlet="template"></ng-container>', isInline: true, dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'swal-portal',
                    template: '<ng-container *ngTemplateOutlet="template"></ng-container>',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { template: [{
                type: Input
            }] } });

/**
 * Represents an object of targets for <swal> portals (use with *swalPortal directive).
 * We must use thunks to access the Swal.* functions listed below, because they get created after the first modal is
 * shown, so this object lets us reference those functions safely and in a statically-typed manner.
 */
class SwalPortalTargets {
    constructor() {
        /**
         * Targets the modal close button block contents.
         */
        this.closeButton = {
            element: swal => swal.getCloseButton(),
            options: { showCloseButton: true }
        };
        /**
         * Targets the modal title block contents.
         */
        this.title = {
            element: swal => swal.getTitle(),
            // Empty text that will never be shown but necessary so SweetAlert2 makes the div visible.
            options: { title: ' ' }
        };
        /**
         * Targets the modal text block contents (that is another block inside the first content block, so you can still
         * use other modal features like Swal inputs, that are situated inside that parent content block).
         */
        this.content = {
            element: swal => swal.getHtmlContainer(),
            // Empty text that will never be shown but necessary so SweetAlert2 makes the div visible.
            options: { text: ' ' }
        };
        /**
         * Targets the actions block contents, where are the confirm and cancel buttons in a normal time.
         * /!\ WARNING: using this target destroys some of the native SweetAlert2 modal's DOM, therefore, if you use this
         *     target, do not update the modal via <swal> @Inputs while the modal is open, or you'll get an error.
         *     We could workaround that inconvenient inside this integration, but that'd be detrimental to memory and
         *     performance of everyone, for a relatively rare use case.
         */
        this.actions = {
            element: swal => swal.getActions(),
            // The button will never exist, but SweetAlert2 shows the actions block only if there is at least one button.
            options: { showConfirmButton: true }
        };
        /**
         * Targets the confirm button contents, replacing the text inside it (not the button itself)
         */
        this.confirmButton = {
            element: swal => swal.getConfirmButton(),
            options: { showConfirmButton: true }
        };
        /**
         * Targets the deny button contents, replacing the text inside it (not the button itself)
         */
        this.denyButton = {
            element: swal => swal.getDenyButton(),
            options: { showDenyButton: true }
        };
        /**
         * Targets the cancel button contents, replacing the text inside it (not the button itself)
         */
        this.cancelButton = {
            element: swal => swal.getCancelButton(),
            options: { showCancelButton: true }
        };
        /**
         * Targets the modal footer contents.
         */
        this.footer = {
            element: swal => swal.getFooter(),
            // Empty text that will never be shown but necessary so SweetAlert2 makes the div visible.
            options: { footer: ' ' }
        };
    }
}
SwalPortalTargets.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalTargets, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SwalPortalTargets.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalTargets, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalTargets, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * A structural directive that lets you use Angular templates inside of SweetAlerts.
 * There are different targetable zones provided by {@link SwalPortalTargets}: title, content, confirmButton, etc, but
 * you can also make your own target by implementing {@link SwalPortalTarget} and giving it to this directive.
 * The default target is the alert text content zone.
 *
 * Usage in your component's TypeScript (if you use another target than {@link SwalPortalTargets.content}):
 *
 *     @Component({ ... })
 *     export class MyComponent {
 *         public constructor(public readonly swalTargets: SwalPortalTargets) {
 *         }
 *     }
 *
 * Usage in the template:
 *
 *     <swal title="Fill the form" (confirm)="confirmHandler()">
 *         <!-- This form will be displayed as the alert main content
 *              Targets the alert's main content zone by default -->
 *         <form *swalPortal [formControl]="myForm">
 *             ...
 *         </form>
 *
 *         <!-- This targets the confirm button's inner content
 *              Notice the usage of ng-container to avoid creating an useless DOM element inside the button -->
 *         <ng-container *swalPortal="swalTargets.confirmButton">
 *              Send ({{ secondsLeft }} seconds left)
 *         </ng-container>
 *     <swal>
 */
class SwalPortalDirective {
    constructor(resolver, injector, app, templateRef, sweetAlert2Loader, swalTargets, swalComponent) {
        this.resolver = resolver;
        this.injector = injector;
        this.app = app;
        this.templateRef = templateRef;
        this.sweetAlert2Loader = sweetAlert2Loader;
        this.swalTargets = swalTargets;
        this.swalComponent = swalComponent;
        this.destroyed = new Subject();
    }
    /**
     * Subscribes to the the SweetAlert appearance/disappearance events to create/destroy the SwalPortalComponent
     * that will receive the consumer's template.
     */
    ngOnInit() {
        // Can't be set in a default property value, if the customer lets *swalPortal empty, the value we get is undef.
        this.target = this.target || this.swalTargets.content;
        //=> Apply the options provided by the target definition
        void this.swalComponent.update(this.target.options);
        //=> Subscribe to a few hooks frm the parent SwalComponent.
        this.swalComponent.didRender.pipe(takeUntil(this.destroyed)).subscribe(this.didRenderHook.bind(this));
        this.swalComponent.willOpen.pipe(takeUntil(this.destroyed)).subscribe(this.willOpenHook.bind(this));
        this.swalComponent.didDestroy.pipe(takeUntil(this.destroyed)).subscribe(this.didDestroyHook.bind(this));
    }
    /**
     * Signal any {@link destroyed} consumer that this is over, so they can unsubscribe from the
     * parent SwalComponent events.
     */
    ngOnDestroy() {
        this.destroyed.next();
    }
    /**
     * This didRender hook runs 1..n times (per modal instance), just before the modal is shown (and also before the
     * {@link willOpenHook}), or after Swal.update() is called.
     * This is a good place to render, or re-render, our portal contents.
     */
    async didRenderHook() {
        //=> Ensure the portal component is created
        if (!this.portalComponentRef) {
            this.portalComponentRef = this.createPortalComponent();
        }
        //=> SweetAlert2 created the modal or just erased all of our content, so we need to install/reinstall it.
        // Swal.update() is synchronous, this observable too, and mountComponentOnTarget too (the promise inside
        // this function is already resolved at this point), so the whole process of re-rendering and re-mounting
        // the portal component is fully synchronous, causing no blinks in the modal contents.
        const swal = await this.sweetAlert2Loader.swal;
        //=> Find target element
        const targetEl = this.target.element(swal);
        if (!targetEl)
            return;
        //=> Replace target's contents with our component
        // https://jsperf.com/innerhtml-vs-removechild/15
        while (targetEl.firstChild) {
            targetEl.removeChild(targetEl.firstChild);
        }
        targetEl.appendChild(this.portalComponentRef.location.nativeElement);
    }
    /**
     * This willOpen hook runs once (per modal instance), just before the modal is shown on the screen.
     * This is a good place to declare our detached view to the Angular app.
     */
    willOpenHook() {
        if (!this.portalComponentRef)
            return;
        //=> Make the Angular app aware of that detached view so rendering and change detection can happen
        this.app.attachView(this.portalComponentRef.hostView);
    }
    /**
     * This didDestroy hook runs once (per modal instance), just after the modal closing animation terminated.
     * This is a good place to detach and destroy our content, that is not visible anymore.
     */
    didDestroyHook() {
        if (!this.portalComponentRef)
            return;
        //=> Detach the portal component from the app and destroy it
        this.app.detachView(this.portalComponentRef.hostView);
        this.portalComponentRef.destroy();
        this.portalComponentRef = void 0;
    }
    /**
     * Creates the {@link SwalPortalComponent} and gives it the customer's template ref.
     */
    createPortalComponent() {
        //=> Create the SwalPortalComponent that will hold our content
        const factory = this.resolver.resolveComponentFactory(SwalPortalComponent);
        // Yes, we do not use the third argument that would directly use the target as the component's view
        // (unfortunately, because that would give a cleaner DOM and would avoid dirty and direct DOM manipulations)
        // That's because we want to keep our component safe from SweetAlert2's operations on the DOM, and to be
        // able to restore it at any moment, ie. after the modal has been re-rendered.
        const componentRef = factory.create(this.injector, []);
        //=> Apply the consumer's template on the component
        componentRef.instance.template = this.templateRef;
        return componentRef;
    }
}
SwalPortalDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalDirective, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }, { token: i0.TemplateRef }, { token: SweetAlert2LoaderService }, { token: SwalPortalTargets }, { token: SwalComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive });
SwalPortalDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.4", type: SwalPortalDirective, selector: "[swalPortal]", inputs: { target: ["swalPortal", "target"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[swalPortal]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: i0.TemplateRef }, { type: SweetAlert2LoaderService }, { type: SwalPortalTargets }, { type: SwalComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { target: [{
                type: Input,
                args: ['swalPortal']
            }] } });

function provideDefaultSwal() {
    return import('sweetalert2');
}
class SweetAlert2Module {
    static forRoot(options = {}) {
        return {
            ngModule: SweetAlert2Module,
            providers: [
                SweetAlert2LoaderService,
                { provide: swalProviderToken, useValue: options.provideSwal || provideDefaultSwal },
                { provide: fireOnInitToken, useValue: options.fireOnInit || false },
                { provide: dismissOnDestroyToken, useValue: options.dismissOnDestroy || true }
            ]
        };
    }
    static forChild(options = {}) {
        return {
            ngModule: SweetAlert2Module,
            providers: [
                ...options.provideSwal ? [
                    SweetAlert2LoaderService,
                    { provide: swalProviderToken, useValue: options.provideSwal }
                ] : [],
                ...options.fireOnInit !== undefined ? [
                    { provide: fireOnInitToken, useValue: options.fireOnInit }
                ] : [],
                ...options.dismissOnDestroy !== undefined ? [
                    { provide: dismissOnDestroyToken, useValue: options.dismissOnDestroy }
                ] : []
            ]
        };
    }
}
SweetAlert2Module.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SweetAlert2Module, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SweetAlert2Module.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.4", ngImport: i0, type: SweetAlert2Module, declarations: [SwalDirective, SwalComponent, SwalPortalDirective, SwalPortalComponent], imports: [CommonModule], exports: [SwalComponent, SwalPortalDirective, SwalDirective] });
SweetAlert2Module.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SweetAlert2Module, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SweetAlert2Module, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SwalDirective, SwalComponent, SwalPortalDirective, SwalPortalComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        SwalComponent, SwalPortalDirective, SwalDirective
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { SwalComponent, SwalDirective, SwalPortalDirective, SwalPortalTargets, SweetAlert2LoaderService, SweetAlert2Module };
//# sourceMappingURL=sweetalert2-ngx-sweetalert2.mjs.map
