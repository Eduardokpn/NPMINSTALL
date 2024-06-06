import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwalComponent } from './swal.component';
import * as i0 from "@angular/core";
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
export class SwalDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc3dlZXRhbGVydDIvc3JjL2xpYi9zd2FsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ3FDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUVsSCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUlILE1BQU0sT0FBTyxhQUFhO0lBd0Z0QixZQUNxQixnQkFBa0MsRUFDbEMsUUFBa0M7UUFEbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQXJFdkQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUVhLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRWxEOzs7Ozs7Ozs7OztXQVdHO1FBRWEsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFaEQ7Ozs7Ozs7Ozs7OztXQVlHO1FBRWEsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBd0I3RSxDQUFDO0lBMUZEOzs7T0FHRztJQUNILElBQ1csSUFBSSxDQUFDLE9BQW1FO1FBQy9FLElBQUksT0FBTyxZQUFZLGFBQWEsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztTQUMvQjthQUFNLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FB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cG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgU3dhbCwgeyBTd2VldEFsZXJ0QXJyYXlPcHRpb25zLCBTd2VldEFsZXJ0T3B0aW9ucyB9IGZyb20gJ3N3ZWV0YWxlcnQyJztcbmltcG9ydCB7IFN3YWxDb21wb25lbnQgfSBmcm9tICcuL3N3YWwuY29tcG9uZW50JztcblxuLyoqXG4gKiBbc3dhbF0gZGlyZWN0aXZlLiBJdCB0YWtlcyBhIHZhbHVlIHRoYXQgZGVmaW5lcyB0aGUgU3dlZXRBbGVydCBhbmQgY2FuIGJlIG9mIHRocmVlIHR5cGVzOlxuICpcbiAqIDEpIEEgc2ltcGxlIGFycmF5IG9mIHR3byBvciB0aHJlZSBzdHJpbmdzIGRlZmluaW5nIFt0aXRsZSwgdGV4dCwgaWNvbl0gLSB0aGUgaWNvbiBiZWluZyBvcHRpb25hbCwgZXg6XG4gKlxuICogICAgPGJ1dHRvbiBbc3dhbF09XCJbJ1RpdGxlJywgJ1RleHQnXVwiPkNsaWNrIG1lPC9idXR0b24+XG4gKlxuICogMikgQSBuYXRpdmUgU3dlZXRBbGVydDIgb3B0aW9ucyBvYmplY3QsIGV4OlxuICpcbiAqICAgIDxidXR0b24gW3N3YWxdPVwieyB0aXRsZTogJ1RpdGxlJywgdGV4dDogJ1RleHQnIH1cIj5DbGljayBtZTwvYnV0dG9uPlxuICpcbiAqIDMpIEEgcmVmZXJlbmNlIHRvIGFuIGV4aXN0aW5nIFN3YWxDb21wb25lbnQgaW5zdGFuY2UgZm9yIG1vcmUgYWR2YW5jZWQgdXNlcywgZXg6XG4gKlxuICogICAgPGJ1dHRvbiBbc3dhbF09XCJteVN3YWxcIj5DbGljayBtZTwvYnV0dG9uPlxuICogICAgPHN3YWwgI215U3dhbCB0aXRsZT1cIlRpdGxlXCIgdGV4dD1cIlRleHRcIj48L3N3YWw+XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3N3YWxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTd2FsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFN3ZWV0QWxlcnQyIG9wdGlvbnMgb3IgYSBTd2FsQ29tcG9uZW50IGluc3RhbmNlLlxuICAgICAqIFNlZSB0aGUgY2xhc3MgZG9jIGJsb2NrIGZvciBtb3JlIGluZm9ybWF0aW9ucy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgc3dhbChvcHRpb25zOiBTd2FsQ29tcG9uZW50IHwgU3dlZXRBbGVydE9wdGlvbnMgfCBTd2VldEFsZXJ0QXJyYXlPcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zIGluc3RhbmNlb2YgU3dhbENvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5zd2FsSW5zdGFuY2UgPSBvcHRpb25zO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXlPcHRpb25zKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aGlzLnN3YWxPcHRpb25zID0ge307XG4gICAgICAgICAgICBbdGhpcy5zd2FsT3B0aW9ucy50aXRsZSwgdGhpcy5zd2FsT3B0aW9ucy50ZXh0LCB0aGlzLnN3YWxPcHRpb25zLmljb25dID0gb3B0aW9ucztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3dhbE9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNBcnJheU9wdGlvbnModmFsdWU6IGFueSk6IHZhbHVlIGlzIFN3ZWV0QWxlcnRBcnJheU9wdGlvbnMge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB3aGVuIHRoZSB1c2VyIGNsaWNrcyBcIkNvbmZpcm1cIi5cbiAgICAgKiBUaGUgZXZlbnQgdmFsdWUgKCRldmVudCkgY2FuIGJlIGVpdGhlcjpcbiAgICAgKiAgLSBieSBkZWZhdWx0LCBqdXN0IGB0cnVlYCxcbiAgICAgKiAgLSB3aGVuIHVzaW5nIHtAbGluayBpbnB1dH0sIHRoZSBpbnB1dCB2YWx1ZSxcbiAgICAgKiAgLSB3aGVuIHVzaW5nIHtAbGluayBwcmVDb25maXJtfSwgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGlzIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKiAgICAgPHN3YWwgKGNvbmZpcm0pPVwiaGFuZGxlQ29uZmlybSgkZXZlbnQpXCI+PC9zd2FsPlxuICAgICAqXG4gICAgICogICAgIHB1YmxpYyBoYW5kbGVDb25maXJtKGVtYWlsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgKiAgICAgICAgIC8vIC4uLiBzYXZlIHVzZXIgZW1haWxcbiAgICAgKiAgICAgfVxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBjb25maXJtID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB3aGVuIHRoZSB1c2VyIGNsaWNrcyBcIkRlbnlcIi5cbiAgICAgKiBUaGlzIGV2ZW50IGJlYXJzIG5vIHZhbHVlLlxuICAgICAqIFVzZSBgKGRlbnkpYCAoYWxvbmcgd2l0aCB7QGxpbmsgc2hvd0RlbnlCdXR0b259KSB3aGVuIHlvdSB3YW50IGEgbW9kYWwgd2l0aCB0aHJlZSBidXR0b25zIChjb25maXJtLCBkZW55IGFuZFxuICAgICAqIGNhbmNlbCksIGFuZC9vciB3aGVuIHlvdSB3YW50IHRvIGhhbmRsZSBjbGVhciByZWZ1c2FsIGluIGEgc2VwYXJhdGUgd2F5IHRoYW4gc2ltcGxlIGRpc21pc3NhbC5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICogICAgIDxzd2FsIChkZW55KT1cImhhbmRsZURlbnkoKVwiPjwvc3dhbD5cbiAgICAgKlxuICAgICAqICAgICBwdWJsaWMgaGFuZGxlRGVueSgpOiB2b2lkIHtcbiAgICAgKiAgICAgfVxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkZW55ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgd2hlbiB0aGUgdXNlciBjbGlja3MgXCJDYW5jZWxcIiwgb3IgZGlzbWlzc2VzIHRoZSBtb2RhbCBieSBhbnkgb3RoZXIgYWxsb3dlZCB3YXkuXG4gICAgICogVGhlIGV2ZW50IHZhbHVlICgkZXZlbnQpIGlzIGEgc3RyaW5nIHRoYXQgZXhwbGFpbnMgaG93IHRoZSBtb2RhbCB3YXMgZGlzbWlzc2VkLiBJdCBpcyBgdW5kZWZpbmVkYCB3aGVuXG4gICAgICogdGhlIG1vZGFsIHdhcyBwcm9ncmFtbWF0aWNhbGx5IGNsb3NlZCAodGhyb3VnaCB7QGxpbmsgZGlzbWlzc30gZm9yIGV4YW1wbGUpLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKiAgICAgPHN3YWwgKGRpc21pc3MpPVwiaGFuZGxlRGlzbWlzcygkZXZlbnQpXCI+PC9zd2FsPlxuICAgICAqXG4gICAgICogICAgIHB1YmxpYyBoYW5kbGVEaXNtaXNzKHJlYXNvbjogRGlzbWlzc1JlYXNvbiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgICAqICAgICAgICAgLy8gcmVhc29uIGNhbiBiZSAnY2FuY2VsJywgJ292ZXJsYXknLCAnY2xvc2UnLCAndGltZXInIG9yIHVuZGVmaW5lZC5cbiAgICAgKiAgICAgICAgIC8vIC4uLiBkbyBzb21ldGhpbmdcbiAgICAgKiAgICAgfVxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaXNtaXNzID0gbmV3IEV2ZW50RW1pdHRlcjxTd2FsLkRpc21pc3NSZWFzb24gfCB1bmRlZmluZWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSB1c2VyIGRvZXMgbm90IHByb3ZpZGVzIGEgU3dhbENvbXBvbmVudCBpbnN0YW5jZSwgd2UgY3JlYXRlIGl0IG9uLXRoZS1mbHkgYW5kIGFzc2lnbiB0aGUgcGxhaW4tb2JqZWN0XG4gICAgICogb3B0aW9ucyB0byBpdC5cbiAgICAgKiBUaGlzIGZpZWxkcyBrZWVwcyBhIHJlZmVyZW5jZSB0byB0aGUgZHluYW1pY2FsbHktY3JlYXRlZCA8c3dhbD4sIHRvIGRlc3Ryb3kgaXQgYWxvbmcgdGhpcyBkaXJlY3RpdmUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzd2FsUmVmPzogQ29tcG9uZW50UmVmPFN3YWxDb21wb25lbnQ+O1xuXG4gICAgLyoqXG4gICAgICogQW4gaW5zdGFuY2Ugb2YgdGhlIDxzd2FsPiBjb21wb25lbnQgdGhhdCB0aGlzIGRpcmVjdGl2ZSBjb250cm9scy5cbiAgICAgKiBDb3VsZCBiZSBhbiBpbnN0YW5jZSBwYXNzZWQgYnkgdGhlIHVzZXIsIG90aGVyd2lzZSBpdCdzIHRoZSBpbnN0YW5jZSB3ZSd2ZSBkeW5hbWljYWxseSBjcmVhdGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3dhbEluc3RhbmNlPzogU3dhbENvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIEhvbGRzIHRoZSBuYXRpdmUgU3dlZXRBbGVydDIgb3B0aW9ucy5cbiAgICAgKiBFbXB0eSB3aGVuIHRoZSB1c2VyIHBhc3NlZCBhbiBleGlzdGluZyBTd2FsQ29tcG9uZW50IGluc3RhbmNlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3dhbE9wdGlvbnM/OiBTd2VldEFsZXJ0T3B0aW9ucztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbkluaXQgbGlmZWN5Y2xlIGhhbmRsZXIuXG4gICAgICogQ3JlYXRlcyBhIFN3YWxDb21wb25lbnQgaW5zdGFuY2UgaWYgdGhlIHVzZXIgZGlkbid0IHByb3ZpZGVkIG9uZSBhbmQgYmluZHMgb24gdGhhdCBjb21wb25lbnQgKGNvbmZpcm0pLFxuICAgICAqIChkZW55KSBhbmQgKGRpc21pc3MpIG91dHB1dHMgdG8gcmVlbWl0IG9uIHRoZSBkaXJlY3RpdmUuXG4gICAgICovXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc3dhbEluc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShTd2FsQ29tcG9uZW50KTtcblxuICAgICAgICAgICAgdGhpcy5zd2FsUmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgICAgIHRoaXMuc3dhbEluc3RhbmNlID0gdGhpcy5zd2FsUmVmLmluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT25EZXN0cm95IGxpZmVjeWNsZSBoYW5kbGVyLlxuICAgICAqIERlc3Ryb3lzIHRoZSBkeW5hbWljYWxseS1jcmVhdGVkIFN3YWxDb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zd2FsUmVmKSB7XG4gICAgICAgICAgICB0aGlzLnN3YWxSZWYuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgaGFuZGxlci5cbiAgICAgKiBUaGUgZGlyZWN0aXZlIGxpc3RlbnMgZm9yIG9uY2xpY2sgZXZlbnRzIG9uIGl0cyBob3N0IGVsZW1lbnQuXG4gICAgICogV2hlbiB0aGlzIGhhcHBlbnMsIGl0IHNob3dzIHRoZSA8c3dhbD4gYXR0YWNoZWQgdG8gdGhpcyBkaXJlY3RpdmUuXG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIHB1YmxpYyBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoIXRoaXMuc3dhbEluc3RhbmNlKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuc3dhbE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhbEluc3RhbmNlLnN3YWxPcHRpb25zID0gdGhpcy5zd2FsT3B0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN3YWxDbG9zZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgICAgIHRoaXMuc3dhbEluc3RhbmNlLmNvbmZpcm0uYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlVW50aWwoc3dhbENsb3NlZCkpLnN1YnNjcmliZSh2ID0+IHRoaXMuY29uZmlybS5lbWl0KHYpKTtcbiAgICAgICAgdGhpcy5zd2FsSW5zdGFuY2UuZGVueS5hc09ic2VydmFibGUoKS5waXBlKHRha2VVbnRpbChzd2FsQ2xvc2VkKSkuc3Vic2NyaWJlKHYgPT4gdGhpcy5kZW55LmVtaXQodikpO1xuICAgICAgICB0aGlzLnN3YWxJbnN0YW5jZS5kaXNtaXNzLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZVVudGlsKHN3YWxDbG9zZWQpKS5zdWJzY3JpYmUodiA9PiB0aGlzLmRpc21pc3MuZW1pdCh2KSk7XG5cbiAgICAgICAgdGhpcy5zd2FsSW5zdGFuY2UuZmlyZSgpLnRoZW4oKCkgPT4gc3dhbENsb3NlZC5uZXh0KCkpO1xuICAgIH1cbn1cbiJdfQ==