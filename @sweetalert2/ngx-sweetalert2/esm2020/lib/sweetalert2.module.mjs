import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { dismissOnDestroyToken, fireOnInitToken, swalProviderToken } from './di';
import { SwalPortalComponent } from './swal-portal.component';
import { SwalPortalDirective } from './swal-portal.directive';
import { SwalComponent } from './swal.component';
import { SwalDirective } from './swal.directive';
import { SweetAlert2LoaderService } from './sweetalert2-loader.service';
import * as i0 from "@angular/core";
export function provideDefaultSwal() {
    return import('sweetalert2');
}
export class SweetAlert2Module {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dlZXRhbGVydDIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXN3ZWV0YWxlcnQyL3NyYy9saWIvc3dlZXRhbGVydDIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFnQix3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQVF0RixNQUFNLFVBQVUsa0JBQWtCO0lBQzlCLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFhRCxNQUFNLE9BQU8saUJBQWlCO0lBQ25CLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBbUMsRUFBRTtRQUN2RCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1Asd0JBQXdCO2dCQUN4QixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsRUFBRTtnQkFDbkYsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssRUFBRTtnQkFDbkUsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7YUFDakY7U0FDSixDQUFDO0lBQ04sQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBbUMsRUFBRTtRQUN4RCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1AsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDckIsd0JBQXdCO29CQUN4QixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRTtpQkFDaEUsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDTixHQUFHLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFO2lCQUM3RCxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNOLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7aUJBQ3pFLENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDVDtTQUNKLENBQUM7SUFDTixDQUFDOzs4R0E3QlEsaUJBQWlCOytHQUFqQixpQkFBaUIsaUJBVHRCLGFBQWEsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLGFBR3RFLFlBQVksYUFHWixhQUFhLEVBQUUsbUJBQW1CLEVBQUUsYUFBYTsrR0FHNUMsaUJBQWlCLFlBTnRCLFlBQVk7MkZBTVAsaUJBQWlCO2tCQVg3QixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixhQUFhLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQjtxQkFDekU7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxhQUFhO3FCQUNwRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzbWlzc09uRGVzdHJveVRva2VuLCBmaXJlT25Jbml0VG9rZW4sIHN3YWxQcm92aWRlclRva2VuIH0gZnJvbSAnLi9kaSc7XG5pbXBvcnQgeyBTd2FsUG9ydGFsQ29tcG9uZW50IH0gZnJvbSAnLi9zd2FsLXBvcnRhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3dhbFBvcnRhbERpcmVjdGl2ZSB9IGZyb20gJy4vc3dhbC1wb3J0YWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IFN3YWxDb21wb25lbnQgfSBmcm9tICcuL3N3YWwuY29tcG9uZW50JztcbmltcG9ydCB7IFN3YWxEaXJlY3RpdmUgfSBmcm9tICcuL3N3YWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IFN3YWxQcm92aWRlciwgU3dlZXRBbGVydDJMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zd2VldGFsZXJ0Mi1sb2FkZXIuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dlZXRhbGVydDJNb2R1bGVDb25maWcge1xuICAgIHByb3ZpZGVTd2FsPzogU3dhbFByb3ZpZGVyO1xuICAgIGZpcmVPbkluaXQ/OiBib29sZWFuO1xuICAgIGRpc21pc3NPbkRlc3Ryb3k/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZURlZmF1bHRTd2FsKCkge1xuICAgIHJldHVybiBpbXBvcnQoJ3N3ZWV0YWxlcnQyJyk7XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFN3YWxEaXJlY3RpdmUsIFN3YWxDb21wb25lbnQsIFN3YWxQb3J0YWxEaXJlY3RpdmUsIFN3YWxQb3J0YWxDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFN3YWxDb21wb25lbnQsIFN3YWxQb3J0YWxEaXJlY3RpdmUsIFN3YWxEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN3ZWV0QWxlcnQyTW9kdWxlIHtcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3Qob3B0aW9uczogU3dlZXRhbGVydDJNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3dlZXRBbGVydDJNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTd2VldEFsZXJ0Mk1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIFN3ZWV0QWxlcnQyTG9hZGVyU2VydmljZSxcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IHN3YWxQcm92aWRlclRva2VuLCB1c2VWYWx1ZTogb3B0aW9ucy5wcm92aWRlU3dhbCB8fCBwcm92aWRlRGVmYXVsdFN3YWwgfSxcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IGZpcmVPbkluaXRUb2tlbiwgdXNlVmFsdWU6IG9wdGlvbnMuZmlyZU9uSW5pdCB8fCBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogZGlzbWlzc09uRGVzdHJveVRva2VuLCB1c2VWYWx1ZTogb3B0aW9ucy5kaXNtaXNzT25EZXN0cm95IHx8IHRydWUgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQob3B0aW9uczogU3dlZXRhbGVydDJNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3dlZXRBbGVydDJNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTd2VldEFsZXJ0Mk1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMucHJvdmlkZVN3YWwgPyBbXG4gICAgICAgICAgICAgICAgICAgIFN3ZWV0QWxlcnQyTG9hZGVyU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgeyBwcm92aWRlOiBzd2FsUHJvdmlkZXJUb2tlbiwgdXNlVmFsdWU6IG9wdGlvbnMucHJvdmlkZVN3YWwgfVxuICAgICAgICAgICAgICAgIF0gOiBbXSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zLmZpcmVPbkluaXQgIT09IHVuZGVmaW5lZCA/IFtcbiAgICAgICAgICAgICAgICAgICAgeyBwcm92aWRlOiBmaXJlT25Jbml0VG9rZW4sIHVzZVZhbHVlOiBvcHRpb25zLmZpcmVPbkluaXQgfVxuICAgICAgICAgICAgICAgIF0gOiBbXSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zLmRpc21pc3NPbkRlc3Ryb3kgIT09IHVuZGVmaW5lZCA/IFtcbiAgICAgICAgICAgICAgICAgICAgeyBwcm92aWRlOiBkaXNtaXNzT25EZXN0cm95VG9rZW4sIHVzZVZhbHVlOiBvcHRpb25zLmRpc21pc3NPbkRlc3Ryb3kgfVxuICAgICAgICAgICAgICAgIF0gOiBbXVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==