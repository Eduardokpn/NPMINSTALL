import { ApplicationRef, ComponentFactoryResolver, Injector, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SwalPortalTarget, SwalPortalTargets } from './swal-portal-targets.service';
import { SwalComponent } from './swal.component';
import { SweetAlert2LoaderService } from './sweetalert2-loader.service';
import * as i0 from "@angular/core";
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
export declare class SwalPortalDirective implements OnInit, OnDestroy {
    private readonly resolver;
    private readonly injector;
    private readonly app;
    private readonly templateRef;
    private readonly sweetAlert2Loader;
    private readonly swalTargets;
    private readonly swalComponent;
    /**
     * Takes a portal target or nothing (then it will target the text content zone by default).
     *
     * See the {@link SwalPortalTargets} service to see the available targets.
     * See the class doc block for more informations.
     */
    target?: SwalPortalTarget;
    /**
     * Holds the component reference of the controlled SwalPortalComponent to destroy it when no longer needed.
     */
    private portalComponentRef?;
    private readonly destroyed;
    constructor(resolver: ComponentFactoryResolver, injector: Injector, app: ApplicationRef, templateRef: TemplateRef<any>, sweetAlert2Loader: SweetAlert2LoaderService, swalTargets: SwalPortalTargets, swalComponent: SwalComponent);
    /**
     * Subscribes to the the SweetAlert appearance/disappearance events to create/destroy the SwalPortalComponent
     * that will receive the consumer's template.
     */
    ngOnInit(): void;
    /**
     * Signal any {@link destroyed} consumer that this is over, so they can unsubscribe from the
     * parent SwalComponent events.
     */
    ngOnDestroy(): void;
    /**
     * This didRender hook runs 1..n times (per modal instance), just before the modal is shown (and also before the
     * {@link willOpenHook}), or after Swal.update() is called.
     * This is a good place to render, or re-render, our portal contents.
     */
    private didRenderHook;
    /**
     * This willOpen hook runs once (per modal instance), just before the modal is shown on the screen.
     * This is a good place to declare our detached view to the Angular app.
     */
    private willOpenHook;
    /**
     * This didDestroy hook runs once (per modal instance), just after the modal closing animation terminated.
     * This is a good place to detach and destroy our content, that is not visible anymore.
     */
    private didDestroyHook;
    /**
     * Creates the {@link SwalPortalComponent} and gives it the customer's template ref.
     */
    private createPortalComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwalPortalDirective, [null, null, null, null, null, null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SwalPortalDirective, "[swalPortal]", never, { "target": "swalPortal"; }, {}, never, never, false>;
}
