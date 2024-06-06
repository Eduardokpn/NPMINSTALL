import { Inject, Injectable } from '@angular/core';
import { swalProviderToken } from './di';
import * as i0 from "@angular/core";
export class SweetAlert2LoaderService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dlZXRhbGVydDItbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc3dlZXRhbGVydDIvc3JjL2xpYi9zd2VldGFsZXJ0Mi1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBU3pDLE1BQU0sT0FBTyx3QkFBd0I7SUFLakMsdUZBQXVGO0lBQ3ZGLFlBQThDLFlBQWlCO1FBQzNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3hCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ25DO1FBRUQsT0FBTyxJQUFJLENBQUMsZ0JBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUVNLHdCQUF3QjtRQUMzQixJQUFJLElBQUksQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPO1FBRWxDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakcsU0FBUyxRQUFRLENBQUMsS0FBbUI7WUFDakMsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVLElBQUssS0FBYSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7UUFDL0UsQ0FBQztRQUVELFNBQVMsZUFBZSxDQUFDLEtBQWlCO1lBQ3RDLE9BQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDO1FBQ3ZDLENBQUM7SUFDTCxDQUFDOztxSEFsQ1Esd0JBQXdCLGtCQU1OLGlCQUFpQjt5SEFObkMsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVU7OzBCQU9hLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgU3dhbERlZmF1bHQsICogYXMgU3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XG5pbXBvcnQgeyBzd2FsUHJvdmlkZXJUb2tlbiB9IGZyb20gJy4vZGknO1xuXG5leHBvcnQgdHlwZSBTd2FsTW9kdWxlID0gdHlwZW9mIFN3YWxEZWZhdWx0IHwgdHlwZW9mIFN3YWw7XG5cbmV4cG9ydCB0eXBlIFN3YWxQcm92aWRlciA9IFN3YWxNb2R1bGVMb2FkZXIgfCBTd2FsTW9kdWxlO1xuXG5leHBvcnQgdHlwZSBTd2FsTW9kdWxlTG9hZGVyID0gKCkgPT4gUHJvbWlzZTxTd2FsTW9kdWxlPjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN3ZWV0QWxlcnQyTG9hZGVyU2VydmljZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzd2FsUHJvdmlkZXI6IFN3YWxQcm92aWRlcjtcblxuICAgIHByaXZhdGUgc3dhbFByb21pc2VDYWNoZT86IFByb21pc2U8dHlwZW9mIFN3YWxEZWZhdWx0PjtcblxuICAgIC8vIFVzaW5nIGFueSBiZWNhdXNlIEFuZ3VsYXIgbWV0YWRhdGEgZ2VuZXJhdG9yIGRvZXMgbm90IHVuZGVyc3RhbmQgYSBwdXJlIFRTIHR5cGUgaGVyZVxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihASW5qZWN0KHN3YWxQcm92aWRlclRva2VuKSBzd2FsUHJvdmlkZXI6IGFueSkge1xuICAgICAgICB0aGlzLnN3YWxQcm92aWRlciA9IHN3YWxQcm92aWRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN3YWwoKTogUHJvbWlzZTx0eXBlb2YgU3dhbERlZmF1bHQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLnN3YWxQcm9taXNlQ2FjaGUpIHtcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZFN3ZWV0QWxlcnRMaWJyYXJ5KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zd2FsUHJvbWlzZUNhY2hlITtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlbG9hZFN3ZWV0QWxlcnRMaWJyYXJ5KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zd2FsUHJvbWlzZUNhY2hlKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbGliUHJvbWlzZSA9IGlzTG9hZGVyKHRoaXMuc3dhbFByb3ZpZGVyKVxuICAgICAgICAgICAgPyB0aGlzLnN3YWxQcm92aWRlcigpXG4gICAgICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh0aGlzLnN3YWxQcm92aWRlcik7XG5cbiAgICAgICAgdGhpcy5zd2FsUHJvbWlzZUNhY2hlID0gbGliUHJvbWlzZS50aGVuKHZhbHVlID0+IGlzRGVmYXVsdEV4cG9ydCh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlLmRlZmF1bHQpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGlzTG9hZGVyKHZhbHVlOiBTd2FsUHJvdmlkZXIpOiB2YWx1ZSBpcyBTd2FsTW9kdWxlTG9hZGVyIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgKHZhbHVlIGFzIGFueSkudmVyc2lvbiA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNEZWZhdWx0RXhwb3J0KHZhbHVlOiBTd2FsTW9kdWxlKTogdmFsdWUgaXMgdHlwZW9mIFN3YWxEZWZhdWx0IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=