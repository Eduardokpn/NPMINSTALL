import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Represents an object of targets for <swal> portals (use with *swalPortal directive).
 * We must use thunks to access the Swal.* functions listed below, because they get created after the first modal is
 * shown, so this object lets us reference those functions safely and in a statically-typed manner.
 */
export class SwalPortalTargets {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhbC1wb3J0YWwtdGFyZ2V0cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXN3ZWV0YWxlcnQyL3NyYy9saWIvc3dhbC1wb3J0YWwtdGFyZ2V0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNDOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8saUJBQWlCO0lBRDlCO1FBRUk7O1dBRUc7UUFDYSxnQkFBVyxHQUFxQjtZQUM1QyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RDLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUU7U0FDckMsQ0FBQztRQUVGOztXQUVHO1FBQ2EsVUFBSyxHQUFxQjtZQUN0QyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLDBGQUEwRjtZQUMxRixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1NBQzFCLENBQUM7UUFFRjs7O1dBR0c7UUFDYSxZQUFPLEdBQXFCO1lBQ3hDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QywwRkFBMEY7WUFDMUYsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtTQUN6QixDQUFDO1FBRUY7Ozs7OztXQU1HO1FBQ2EsWUFBTyxHQUFxQjtZQUN4QyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xDLDZHQUE2RztZQUM3RyxPQUFPLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUU7U0FDdkMsQ0FBQztRQUVGOztXQUVHO1FBQ2Esa0JBQWEsR0FBcUI7WUFDOUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3hDLE9BQU8sRUFBRSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRTtTQUN2QyxDQUFDO1FBRUY7O1dBRUc7UUFDYSxlQUFVLEdBQXFCO1lBQzNDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckMsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtTQUNwQyxDQUFDO1FBRUY7O1dBRUc7UUFDYSxpQkFBWSxHQUFxQjtZQUM3QyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRTtTQUN0QyxDQUFDO1FBRUY7O1dBRUc7UUFDYSxXQUFNLEdBQXFCO1lBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakMsMEZBQTBGO1lBQzFGLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7U0FDM0IsQ0FBQztLQUNMOzs4R0F6RVksaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FESixNQUFNOzJGQUNuQixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFN3YWwsIHsgU3dlZXRBbGVydE9wdGlvbnMgfSBmcm9tICdzd2VldGFsZXJ0Mic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dhbFBvcnRhbFRhcmdldCB7XG4gICAgb3B0aW9ucz86IFN3ZWV0QWxlcnRPcHRpb25zO1xuICAgIGVsZW1lbnQoc3dhbDogdHlwZW9mIFN3YWwpOiBIVE1MRWxlbWVudCB8IG51bGw7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBvYmplY3Qgb2YgdGFyZ2V0cyBmb3IgPHN3YWw+IHBvcnRhbHMgKHVzZSB3aXRoICpzd2FsUG9ydGFsIGRpcmVjdGl2ZSkuXG4gKiBXZSBtdXN0IHVzZSB0aHVua3MgdG8gYWNjZXNzIHRoZSBTd2FsLiogZnVuY3Rpb25zIGxpc3RlZCBiZWxvdywgYmVjYXVzZSB0aGV5IGdldCBjcmVhdGVkIGFmdGVyIHRoZSBmaXJzdCBtb2RhbCBpc1xuICogc2hvd24sIHNvIHRoaXMgb2JqZWN0IGxldHMgdXMgcmVmZXJlbmNlIHRob3NlIGZ1bmN0aW9ucyBzYWZlbHkgYW5kIGluIGEgc3RhdGljYWxseS10eXBlZCBtYW5uZXIuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgU3dhbFBvcnRhbFRhcmdldHMge1xuICAgIC8qKlxuICAgICAqIFRhcmdldHMgdGhlIG1vZGFsIGNsb3NlIGJ1dHRvbiBibG9jayBjb250ZW50cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgY2xvc2VCdXR0b246IFN3YWxQb3J0YWxUYXJnZXQgPSB7XG4gICAgICAgIGVsZW1lbnQ6IHN3YWwgPT4gc3dhbC5nZXRDbG9zZUJ1dHRvbigpLFxuICAgICAgICBvcHRpb25zOiB7IHNob3dDbG9zZUJ1dHRvbjogdHJ1ZSB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRhcmdldHMgdGhlIG1vZGFsIHRpdGxlIGJsb2NrIGNvbnRlbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSB0aXRsZTogU3dhbFBvcnRhbFRhcmdldCA9IHtcbiAgICAgICAgZWxlbWVudDogc3dhbCA9PiBzd2FsLmdldFRpdGxlKCksXG4gICAgICAgIC8vIEVtcHR5IHRleHQgdGhhdCB3aWxsIG5ldmVyIGJlIHNob3duIGJ1dCBuZWNlc3Nhcnkgc28gU3dlZXRBbGVydDIgbWFrZXMgdGhlIGRpdiB2aXNpYmxlLlxuICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiAnICcgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYXJnZXRzIHRoZSBtb2RhbCB0ZXh0IGJsb2NrIGNvbnRlbnRzICh0aGF0IGlzIGFub3RoZXIgYmxvY2sgaW5zaWRlIHRoZSBmaXJzdCBjb250ZW50IGJsb2NrLCBzbyB5b3UgY2FuIHN0aWxsXG4gICAgICogdXNlIG90aGVyIG1vZGFsIGZlYXR1cmVzIGxpa2UgU3dhbCBpbnB1dHMsIHRoYXQgYXJlIHNpdHVhdGVkIGluc2lkZSB0aGF0IHBhcmVudCBjb250ZW50IGJsb2NrKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgY29udGVudDogU3dhbFBvcnRhbFRhcmdldCA9IHtcbiAgICAgICAgZWxlbWVudDogc3dhbCA9PiBzd2FsLmdldEh0bWxDb250YWluZXIoKSxcbiAgICAgICAgLy8gRW1wdHkgdGV4dCB0aGF0IHdpbGwgbmV2ZXIgYmUgc2hvd24gYnV0IG5lY2Vzc2FyeSBzbyBTd2VldEFsZXJ0MiBtYWtlcyB0aGUgZGl2IHZpc2libGUuXG4gICAgICAgIG9wdGlvbnM6IHsgdGV4dDogJyAnIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFyZ2V0cyB0aGUgYWN0aW9ucyBibG9jayBjb250ZW50cywgd2hlcmUgYXJlIHRoZSBjb25maXJtIGFuZCBjYW5jZWwgYnV0dG9ucyBpbiBhIG5vcm1hbCB0aW1lLlxuICAgICAqIC8hXFwgV0FSTklORzogdXNpbmcgdGhpcyB0YXJnZXQgZGVzdHJveXMgc29tZSBvZiB0aGUgbmF0aXZlIFN3ZWV0QWxlcnQyIG1vZGFsJ3MgRE9NLCB0aGVyZWZvcmUsIGlmIHlvdSB1c2UgdGhpc1xuICAgICAqICAgICB0YXJnZXQsIGRvIG5vdCB1cGRhdGUgdGhlIG1vZGFsIHZpYSA8c3dhbD4gQElucHV0cyB3aGlsZSB0aGUgbW9kYWwgaXMgb3Blbiwgb3IgeW91J2xsIGdldCBhbiBlcnJvci5cbiAgICAgKiAgICAgV2UgY291bGQgd29ya2Fyb3VuZCB0aGF0IGluY29udmVuaWVudCBpbnNpZGUgdGhpcyBpbnRlZ3JhdGlvbiwgYnV0IHRoYXQnZCBiZSBkZXRyaW1lbnRhbCB0byBtZW1vcnkgYW5kXG4gICAgICogICAgIHBlcmZvcm1hbmNlIG9mIGV2ZXJ5b25lLCBmb3IgYSByZWxhdGl2ZWx5IHJhcmUgdXNlIGNhc2UuXG4gICAgICovXG4gICAgcHVibGljIHJlYWRvbmx5IGFjdGlvbnM6IFN3YWxQb3J0YWxUYXJnZXQgPSB7XG4gICAgICAgIGVsZW1lbnQ6IHN3YWwgPT4gc3dhbC5nZXRBY3Rpb25zKCksXG4gICAgICAgIC8vIFRoZSBidXR0b24gd2lsbCBuZXZlciBleGlzdCwgYnV0IFN3ZWV0QWxlcnQyIHNob3dzIHRoZSBhY3Rpb25zIGJsb2NrIG9ubHkgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGJ1dHRvbi5cbiAgICAgICAgb3B0aW9uczogeyBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRhcmdldHMgdGhlIGNvbmZpcm0gYnV0dG9uIGNvbnRlbnRzLCByZXBsYWNpbmcgdGhlIHRleHQgaW5zaWRlIGl0IChub3QgdGhlIGJ1dHRvbiBpdHNlbGYpXG4gICAgICovXG4gICAgcHVibGljIHJlYWRvbmx5IGNvbmZpcm1CdXR0b246IFN3YWxQb3J0YWxUYXJnZXQgPSB7XG4gICAgICAgIGVsZW1lbnQ6IHN3YWwgPT4gc3dhbC5nZXRDb25maXJtQnV0dG9uKCksXG4gICAgICAgIG9wdGlvbnM6IHsgc2hvd0NvbmZpcm1CdXR0b246IHRydWUgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYXJnZXRzIHRoZSBkZW55IGJ1dHRvbiBjb250ZW50cywgcmVwbGFjaW5nIHRoZSB0ZXh0IGluc2lkZSBpdCAobm90IHRoZSBidXR0b24gaXRzZWxmKVxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBkZW55QnV0dG9uOiBTd2FsUG9ydGFsVGFyZ2V0ID0ge1xuICAgICAgICBlbGVtZW50OiBzd2FsID0+IHN3YWwuZ2V0RGVueUJ1dHRvbigpLFxuICAgICAgICBvcHRpb25zOiB7IHNob3dEZW55QnV0dG9uOiB0cnVlIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFyZ2V0cyB0aGUgY2FuY2VsIGJ1dHRvbiBjb250ZW50cywgcmVwbGFjaW5nIHRoZSB0ZXh0IGluc2lkZSBpdCAobm90IHRoZSBidXR0b24gaXRzZWxmKVxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBjYW5jZWxCdXR0b246IFN3YWxQb3J0YWxUYXJnZXQgPSB7XG4gICAgICAgIGVsZW1lbnQ6IHN3YWwgPT4gc3dhbC5nZXRDYW5jZWxCdXR0b24oKSxcbiAgICAgICAgb3B0aW9uczogeyBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFyZ2V0cyB0aGUgbW9kYWwgZm9vdGVyIGNvbnRlbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBmb290ZXI6IFN3YWxQb3J0YWxUYXJnZXQgPSB7XG4gICAgICAgIGVsZW1lbnQ6IHN3YWwgPT4gc3dhbC5nZXRGb290ZXIoKSxcbiAgICAgICAgLy8gRW1wdHkgdGV4dCB0aGF0IHdpbGwgbmV2ZXIgYmUgc2hvd24gYnV0IG5lY2Vzc2FyeSBzbyBTd2VldEFsZXJ0MiBtYWtlcyB0aGUgZGl2IHZpc2libGUuXG4gICAgICAgIG9wdGlvbnM6IHsgZm9vdGVyOiAnICcgfVxuICAgIH07XG59XG4iXX0=