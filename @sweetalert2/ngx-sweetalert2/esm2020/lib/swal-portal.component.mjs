import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * @internal
 * Holds a consumer's Angular template and displays it on a Sweet Alert.
 * See SwalPortalDirective for info about the covered feature.
 */
export class SwalPortalComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhbC1wb3J0YWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXN3ZWV0YWxlcnQyL3NyYy9saWIvc3dhbC1wb3J0YWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7QUFFdkY7Ozs7R0FJRztBQU1ILE1BQU0sT0FBTyxtQkFBbUI7SUFMaEM7UUFPVyxhQUFRLEdBQTRCLElBQUksQ0FBQztLQUNuRDs7Z0hBSFksbUJBQW1CO29HQUFuQixtQkFBbUIscUZBSGxCLDREQUE0RDsyRkFHN0QsbUJBQW1CO2tCQUwvQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsNERBQTREO29CQUN0RSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQ7OEJBR1UsUUFBUTtzQkFEZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQGludGVybmFsXG4gKiBIb2xkcyBhIGNvbnN1bWVyJ3MgQW5ndWxhciB0ZW1wbGF0ZSBhbmQgZGlzcGxheXMgaXQgb24gYSBTd2VldCBBbGVydC5cbiAqIFNlZSBTd2FsUG9ydGFsRGlyZWN0aXZlIGZvciBpbmZvIGFib3V0IHRoZSBjb3ZlcmVkIGZlYXR1cmUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc3dhbC1wb3J0YWwnLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+JyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTd2FsUG9ydGFsQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwgPSBudWxsO1xufVxuIl19