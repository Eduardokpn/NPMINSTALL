import { Directive, Host, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwalPortalComponent } from './swal-portal.component';
import * as i0 from "@angular/core";
import * as i1 from "./sweetalert2-loader.service";
import * as i2 from "./swal-portal-targets.service";
import * as i3 from "./swal.component";
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
export class SwalPortalDirective {
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
SwalPortalDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalDirective, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i0.ApplicationRef }, { token: i0.TemplateRef }, { token: i1.SweetAlert2LoaderService }, { token: i2.SwalPortalTargets }, { token: i3.SwalComponent, host: true }], target: i0.ɵɵFactoryTarget.Directive });
SwalPortalDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.4", type: SwalPortalDirective, selector: "[swalPortal]", inputs: { target: ["swalPortal", "target"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.4", ngImport: i0, type: SwalPortalDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[swalPortal]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: i0.TemplateRef }, { type: i1.SweetAlert2LoaderService }, { type: i2.SwalPortalTargets }, { type: i3.SwalComponent, decorators: [{
                    type: Host
                }] }]; }, propDecorators: { target: [{
                type: Input,
                args: ['swalPortal']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhbC1wb3J0YWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXN3ZWV0YWxlcnQyL3NyYy9saWIvc3dhbC1wb3J0YWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDcUQsU0FBUyxFQUFFLElBQUksRUFBWSxLQUFLLEVBRTNGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztBQUk5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFJSCxNQUFNLE9BQU8sbUJBQW1CO0lBaUI1QixZQUNxQixRQUFrQyxFQUNsQyxRQUFrQixFQUNsQixHQUFtQixFQUNuQixXQUE2QixFQUM3QixpQkFBMkMsRUFDM0MsV0FBOEIsRUFDdEIsYUFBNEI7UUFOcEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQUMzQyxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFUeEMsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFVakQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDWCwrR0FBK0c7UUFDL0csSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBRXRELHdEQUF3RDtRQUN4RCxLQUFLLElBQUks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UUFFdkQsbURBQW1EO1FBQ25ELFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFbEQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQzs7Z0hBM0hRLG1CQUFtQjtvR0FBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBSC9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7aUJBQzNCOzswQkF5QlEsSUFBSTs0Q0FoQkYsTUFBTTtzQkFEWixLQUFLO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBIb3N0LCBJbmplY3RvciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3dhbFBvcnRhbFRhcmdldCwgU3dhbFBvcnRhbFRhcmdldHMgfSBmcm9tICcuL3N3YWwtcG9ydGFsLXRhcmdldHMuc2VydmljZSc7XG5pbXBvcnQgeyBTd2FsUG9ydGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zd2FsLXBvcnRhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3dhbENvbXBvbmVudCB9IGZyb20gJy4vc3dhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3dlZXRBbGVydDJMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zd2VldGFsZXJ0Mi1sb2FkZXIuc2VydmljZSc7XG5cbi8qKlxuICogQSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSB0aGF0IGxldHMgeW91IHVzZSBBbmd1bGFyIHRlbXBsYXRlcyBpbnNpZGUgb2YgU3dlZXRBbGVydHMuXG4gKiBUaGVyZSBhcmUgZGlmZmVyZW50IHRhcmdldGFibGUgem9uZXMgcHJvdmlkZWQgYnkge0BsaW5rIFN3YWxQb3J0YWxUYXJnZXRzfTogdGl0bGUsIGNvbnRlbnQsIGNvbmZpcm1CdXR0b24sIGV0YywgYnV0XG4gKiB5b3UgY2FuIGFsc28gbWFrZSB5b3VyIG93biB0YXJnZXQgYnkgaW1wbGVtZW50aW5nIHtAbGluayBTd2FsUG9ydGFsVGFyZ2V0fSBhbmQgZ2l2aW5nIGl0IHRvIHRoaXMgZGlyZWN0aXZlLlxuICogVGhlIGRlZmF1bHQgdGFyZ2V0IGlzIHRoZSBhbGVydCB0ZXh0IGNvbnRlbnQgem9uZS5cbiAqXG4gKiBVc2FnZSBpbiB5b3VyIGNvbXBvbmVudCdzIFR5cGVTY3JpcHQgKGlmIHlvdSB1c2UgYW5vdGhlciB0YXJnZXQgdGhhbiB7QGxpbmsgU3dhbFBvcnRhbFRhcmdldHMuY29udGVudH0pOlxuICpcbiAqICAgICBAQ29tcG9uZW50KHsgLi4uIH0pXG4gKiAgICAgZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzd2FsVGFyZ2V0czogU3dhbFBvcnRhbFRhcmdldHMpIHtcbiAqICAgICAgICAgfVxuICogICAgIH1cbiAqXG4gKiBVc2FnZSBpbiB0aGUgdGVtcGxhdGU6XG4gKlxuICogICAgIDxzd2FsIHRpdGxlPVwiRmlsbCB0aGUgZm9ybVwiIChjb25maXJtKT1cImNvbmZpcm1IYW5kbGVyKClcIj5cbiAqICAgICAgICAgPCEtLSBUaGlzIGZvcm0gd2lsbCBiZSBkaXNwbGF5ZWQgYXMgdGhlIGFsZXJ0IG1haW4gY29udGVudFxuICogICAgICAgICAgICAgIFRhcmdldHMgdGhlIGFsZXJ0J3MgbWFpbiBjb250ZW50IHpvbmUgYnkgZGVmYXVsdCAtLT5cbiAqICAgICAgICAgPGZvcm0gKnN3YWxQb3J0YWwgW2Zvcm1Db250cm9sXT1cIm15Rm9ybVwiPlxuICogICAgICAgICAgICAgLi4uXG4gKiAgICAgICAgIDwvZm9ybT5cbiAqXG4gKiAgICAgICAgIDwhLS0gVGhpcyB0YXJnZXRzIHRoZSBjb25maXJtIGJ1dHRvbidzIGlubmVyIGNvbnRlbnRcbiAqICAgICAgICAgICAgICBOb3RpY2UgdGhlIHVzYWdlIG9mIG5nLWNvbnRhaW5lciB0byBhdm9pZCBjcmVhdGluZyBhbiB1c2VsZXNzIERPTSBlbGVtZW50IGluc2lkZSB0aGUgYnV0dG9uIC0tPlxuICogICAgICAgICA8bmctY29udGFpbmVyICpzd2FsUG9ydGFsPVwic3dhbFRhcmdldHMuY29uZmlybUJ1dHRvblwiPlxuICogICAgICAgICAgICAgIFNlbmQgKHt7IHNlY29uZHNMZWZ0IH19IHNlY29uZHMgbGVmdClcbiAqICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gKiAgICAgPHN3YWw+XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3N3YWxQb3J0YWxdJ1xufSlcbmV4cG9ydCBjbGFzcyBTd2FsUG9ydGFsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFRha2VzIGEgcG9ydGFsIHRhcmdldCBvciBub3RoaW5nICh0aGVuIGl0IHdpbGwgdGFyZ2V0IHRoZSB0ZXh0IGNvbnRlbnQgem9uZSBieSBkZWZhdWx0KS5cbiAgICAgKlxuICAgICAqIFNlZSB0aGUge0BsaW5rIFN3YWxQb3J0YWxUYXJnZXRzfSBzZXJ2aWNlIHRvIHNlZSB0aGUgYXZhaWxhYmxlIHRhcmdldHMuXG4gICAgICogU2VlIHRoZSBjbGFzcyBkb2MgYmxvY2sgZm9yIG1vcmUgaW5mb3JtYXRpb25zLlxuICAgICAqL1xuICAgIEBJbnB1dCgnc3dhbFBvcnRhbCcpXG4gICAgcHVibGljIHRhcmdldD86IFN3YWxQb3J0YWxUYXJnZXQ7XG5cbiAgICAvKipcbiAgICAgKiBIb2xkcyB0aGUgY29tcG9uZW50IHJlZmVyZW5jZSBvZiB0aGUgY29udHJvbGxlZCBTd2FsUG9ydGFsQ29tcG9uZW50IHRvIGRlc3Ryb3kgaXQgd2hlbiBubyBsb25nZXIgbmVlZGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgcG9ydGFsQ29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPFN3YWxQb3J0YWxDb21wb25lbnQ+O1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGFwcDogQXBwbGljYXRpb25SZWYsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgc3dlZXRBbGVydDJMb2FkZXI6IFN3ZWV0QWxlcnQyTG9hZGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBzd2FsVGFyZ2V0czogU3dhbFBvcnRhbFRhcmdldHMsXG4gICAgICAgIEBIb3N0KCkgcHJpdmF0ZSByZWFkb25seSBzd2FsQ29tcG9uZW50OiBTd2FsQ29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byB0aGUgdGhlIFN3ZWV0QWxlcnQgYXBwZWFyYW5jZS9kaXNhcHBlYXJhbmNlIGV2ZW50cyB0byBjcmVhdGUvZGVzdHJveSB0aGUgU3dhbFBvcnRhbENvbXBvbmVudFxuICAgICAqIHRoYXQgd2lsbCByZWNlaXZlIHRoZSBjb25zdW1lcidzIHRlbXBsYXRlLlxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gQ2FuJ3QgYmUgc2V0IGluIGEgZGVmYXVsdCBwcm9wZXJ0eSB2YWx1ZSwgaWYgdGhlIGN1c3RvbWVyIGxldHMgKnN3YWxQb3J0YWwgZW1wdHksIHRoZSB2YWx1ZSB3ZSBnZXQgaXMgdW5kZWYuXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy50YXJnZXQgfHwgdGhpcy5zd2FsVGFyZ2V0cy5jb250ZW50O1xuXG4gICAgICAgIC8vPT4gQXBwbHkgdGhlIG9wdGlvbnMgcHJvdmlkZWQgYnkgdGhlIHRhcmdldCBkZWZpbml0aW9uXG4gICAgICAgIHZvaWQgdGhpcy5zd2FsQ29tcG9uZW50LnVwZGF0ZSh0aGlzLnRhcmdldC5vcHRpb25zKTtcblxuICAgICAgICAvLz0+IFN1YnNjcmliZSB0byBhIGZldyBob29rcyBmcm0gdGhlIHBhcmVudCBTd2FsQ29tcG9uZW50LlxuICAgICAgICB0aGlzLnN3YWxDb21wb25lbnQuZGlkUmVuZGVyLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKHRoaXMuZGlkUmVuZGVySG9vay5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zd2FsQ29tcG9uZW50LndpbGxPcGVuLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKHRoaXMud2lsbE9wZW5Ib29rLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnN3YWxDb21wb25lbnQuZGlkRGVzdHJveS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpLnN1YnNjcmliZSh0aGlzLmRpZERlc3Ryb3lIb29rLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpZ25hbCBhbnkge0BsaW5rIGRlc3Ryb3llZH0gY29uc3VtZXIgdGhhdCB0aGlzIGlzIG92ZXIsIHNvIHRoZXkgY2FuIHVuc3Vic2NyaWJlIGZyb20gdGhlXG4gICAgICogcGFyZW50IFN3YWxDb21wb25lbnQgZXZlbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZGlkUmVuZGVyIGhvb2sgcnVucyAxLi5uIHRpbWVzIChwZXIgbW9kYWwgaW5zdGFuY2UpLCBqdXN0IGJlZm9yZSB0aGUgbW9kYWwgaXMgc2hvd24gKGFuZCBhbHNvIGJlZm9yZSB0aGVcbiAgICAgKiB7QGxpbmsgd2lsbE9wZW5Ib29rfSksIG9yIGFmdGVyIFN3YWwudXBkYXRlKCkgaXMgY2FsbGVkLlxuICAgICAqIFRoaXMgaXMgYSBnb29kIHBsYWNlIHRvIHJlbmRlciwgb3IgcmUtcmVuZGVyLCBvdXIgcG9ydGFsIGNvbnRlbnRzLlxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZGlkUmVuZGVySG9vaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy89PiBFbnN1cmUgdGhlIHBvcnRhbCBjb21wb25lbnQgaXMgY3JlYXRlZFxuICAgICAgICBpZiAoIXRoaXMucG9ydGFsQ29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBvcnRhbENvbXBvbmVudFJlZiA9IHRoaXMuY3JlYXRlUG9ydGFsQ29tcG9uZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLz0+IFN3ZWV0QWxlcnQyIGNyZWF0ZWQgdGhlIG1vZGFsIG9yIGp1c3QgZXJhc2VkIGFsbCBvZiBvdXIgY29udGVudCwgc28gd2UgbmVlZCB0byBpbnN0YWxsL3JlaW5zdGFsbCBpdC5cbiAgICAgICAgLy8gU3dhbC51cGRhdGUoKSBpcyBzeW5jaHJvbm91cywgdGhpcyBvYnNlcnZhYmxlIHRvbywgYW5kIG1vdW50Q29tcG9uZW50T25UYXJnZXQgdG9vICh0aGUgcHJvbWlzZSBpbnNpZGVcbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiBpcyBhbHJlYWR5IHJlc29sdmVkIGF0IHRoaXMgcG9pbnQpLCBzbyB0aGUgd2hvbGUgcHJvY2VzcyBvZiByZS1yZW5kZXJpbmcgYW5kIHJlLW1vdW50aW5nXG4gICAgICAgIC8vIHRoZSBwb3J0YWwgY29tcG9uZW50IGlzIGZ1bGx5IHN5bmNocm9ub3VzLCBjYXVzaW5nIG5vIGJsaW5rcyBpbiB0aGUgbW9kYWwgY29udGVudHMuXG4gICAgICAgIGNvbnN0IHN3YWwgPSBhd2FpdCB0aGlzLnN3ZWV0QWxlcnQyTG9hZGVyLnN3YWw7XG5cbiAgICAgICAgLy89PiBGaW5kIHRhcmdldCBlbGVtZW50XG4gICAgICAgIGNvbnN0IHRhcmdldEVsID0gdGhpcy50YXJnZXQhLmVsZW1lbnQoc3dhbCk7XG4gICAgICAgIGlmICghdGFyZ2V0RWwpIHJldHVybjtcblxuICAgICAgICAvLz0+IFJlcGxhY2UgdGFyZ2V0J3MgY29udGVudHMgd2l0aCBvdXIgY29tcG9uZW50XG4gICAgICAgIC8vIGh0dHBzOi8vanNwZXJmLmNvbS9pbm5lcmh0bWwtdnMtcmVtb3ZlY2hpbGQvMTVcbiAgICAgICAgd2hpbGUgKHRhcmdldEVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0RWwuYXBwZW5kQ2hpbGQodGhpcy5wb3J0YWxDb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsT3BlbiBob29rIHJ1bnMgb25jZSAocGVyIG1vZGFsIGluc3RhbmNlKSwganVzdCBiZWZvcmUgdGhlIG1vZGFsIGlzIHNob3duIG9uIHRoZSBzY3JlZW4uXG4gICAgICogVGhpcyBpcyBhIGdvb2QgcGxhY2UgdG8gZGVjbGFyZSBvdXIgZGV0YWNoZWQgdmlldyB0byB0aGUgQW5ndWxhciBhcHAuXG4gICAgICovXG4gICAgcHJpdmF0ZSB3aWxsT3Blbkhvb2soKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wb3J0YWxDb21wb25lbnRSZWYpIHJldHVybjtcblxuICAgICAgICAvLz0+IE1ha2UgdGhlIEFuZ3VsYXIgYXBwIGF3YXJlIG9mIHRoYXQgZGV0YWNoZWQgdmlldyBzbyByZW5kZXJpbmcgYW5kIGNoYW5nZSBkZXRlY3Rpb24gY2FuIGhhcHBlblxuICAgICAgICB0aGlzLmFwcC5hdHRhY2hWaWV3KHRoaXMucG9ydGFsQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGRpZERlc3Ryb3kgaG9vayBydW5zIG9uY2UgKHBlciBtb2RhbCBpbnN0YW5jZSksIGp1c3QgYWZ0ZXIgdGhlIG1vZGFsIGNsb3NpbmcgYW5pbWF0aW9uIHRlcm1pbmF0ZWQuXG4gICAgICogVGhpcyBpcyBhIGdvb2QgcGxhY2UgdG8gZGV0YWNoIGFuZCBkZXN0cm95IG91ciBjb250ZW50LCB0aGF0IGlzIG5vdCB2aXNpYmxlIGFueW1vcmUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkaWREZXN0cm95SG9vaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvcnRhbENvbXBvbmVudFJlZikgcmV0dXJuO1xuXG4gICAgICAgIC8vPT4gRGV0YWNoIHRoZSBwb3J0YWwgY29tcG9uZW50IGZyb20gdGhlIGFwcCBhbmQgZGVzdHJveSBpdFxuICAgICAgICB0aGlzLmFwcC5kZXRhY2hWaWV3KHRoaXMucG9ydGFsQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgdGhpcy5wb3J0YWxDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnBvcnRhbENvbXBvbmVudFJlZiA9IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSB7QGxpbmsgU3dhbFBvcnRhbENvbXBvbmVudH0gYW5kIGdpdmVzIGl0IHRoZSBjdXN0b21lcidzIHRlbXBsYXRlIHJlZi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVBvcnRhbENvbXBvbmVudCgpOiBDb21wb25lbnRSZWY8U3dhbFBvcnRhbENvbXBvbmVudD4ge1xuICAgICAgICAvLz0+IENyZWF0ZSB0aGUgU3dhbFBvcnRhbENvbXBvbmVudCB0aGF0IHdpbGwgaG9sZCBvdXIgY29udGVudFxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShTd2FsUG9ydGFsQ29tcG9uZW50KTtcblxuICAgICAgICAvLyBZZXMsIHdlIGRvIG5vdCB1c2UgdGhlIHRoaXJkIGFyZ3VtZW50IHRoYXQgd291bGQgZGlyZWN0bHkgdXNlIHRoZSB0YXJnZXQgYXMgdGhlIGNvbXBvbmVudCdzIHZpZXdcbiAgICAgICAgLy8gKHVuZm9ydHVuYXRlbHksIGJlY2F1c2UgdGhhdCB3b3VsZCBnaXZlIGEgY2xlYW5lciBET00gYW5kIHdvdWxkIGF2b2lkIGRpcnR5IGFuZCBkaXJlY3QgRE9NIG1hbmlwdWxhdGlvbnMpXG4gICAgICAgIC8vIFRoYXQncyBiZWNhdXNlIHdlIHdhbnQgdG8ga2VlcCBvdXIgY29tcG9uZW50IHNhZmUgZnJvbSBTd2VldEFsZXJ0MidzIG9wZXJhdGlvbnMgb24gdGhlIERPTSwgYW5kIHRvIGJlXG4gICAgICAgIC8vIGFibGUgdG8gcmVzdG9yZSBpdCBhdCBhbnkgbW9tZW50LCBpZS4gYWZ0ZXIgdGhlIG1vZGFsIGhhcyBiZWVuIHJlLXJlbmRlcmVkLlxuICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yLCBbXSk7XG5cbiAgICAgICAgLy89PiBBcHBseSB0aGUgY29uc3VtZXIncyB0ZW1wbGF0ZSBvbiB0aGUgY29tcG9uZW50XG4gICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVSZWY7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgICB9XG59XG4iXX0=