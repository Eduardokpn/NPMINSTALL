import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Everything a toast needs to launch
 */
export class ToastPackage {
    toastId;
    config;
    message;
    title;
    toastType;
    toastRef;
    _onTap = new Subject();
    _onAction = new Subject();
    constructor(toastId, config, message, title, toastType, toastRef) {
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this.toastRef.afterClosed().subscribe(() => {
            this._onAction.complete();
            this._onTap.complete();
        });
    }
    /** Fired on click */
    triggerTap() {
        this._onTap.next();
        if (this.config.tapToDismiss) {
            this._onTap.complete();
        }
    }
    onTap() {
        return this._onTap.asObservable();
    }
    /** available for use in custom toast */
    triggerAction(action) {
        this._onAction.next(action);
    }
    onAction() {
        return this._onAction.asObservable();
    }
}
export const DefaultNoComponentGlobalConfig = {
    maxOpened: 0,
    autoDismiss: false,
    newestOnTop: true,
    preventDuplicates: false,
    countDuplicates: false,
    resetTimeoutOnDuplicate: false,
    includeTitleDuplicates: false,
    iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
    },
    // Individual
    closeButton: false,
    disableTimeOut: false,
    timeOut: 5000,
    extendedTimeOut: 1000,
    enableHtml: false,
    progressBar: false,
    toastClass: 'ngx-toastr',
    positionClass: 'toast-top-right',
    titleClass: 'toast-title',
    messageClass: 'toast-message',
    easing: 'ease-in',
    easeTime: 300,
    tapToDismiss: true,
    onActivateTick: false,
    progressAnimation: 'decreasing',
};
export const TOAST_CONFIG = new InjectionToken('ToastConfig');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdG9hc3RyL3RvYXN0ci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBeUozQzs7R0FFRztBQUNILE1BQU0sT0FBTyxZQUFZO0lBS2Q7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBVEQsTUFBTSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFDN0IsU0FBUyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7SUFFdkMsWUFDUyxPQUFlLEVBQ2YsTUFBdUMsRUFDdkMsT0FBa0MsRUFDbEMsS0FBeUIsRUFDekIsU0FBaUIsRUFDakIsUUFBdUI7UUFMdkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFdBQU0sR0FBTixNQUFNLENBQWlDO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQTJCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUU5QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixVQUFVO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLGFBQWEsQ0FBQyxNQUFZO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Q0FDRjtBQVNELE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFpQjtJQUMxRCxTQUFTLEVBQUUsQ0FBQztJQUNaLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsZUFBZSxFQUFFLEtBQUs7SUFDdEIsdUJBQXVCLEVBQUUsS0FBSztJQUM5QixzQkFBc0IsRUFBRSxLQUFLO0lBRTdCLFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRSxhQUFhO1FBQ3BCLElBQUksRUFBRSxZQUFZO1FBQ2xCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxlQUFlO0tBQ3pCO0lBRUQsYUFBYTtJQUNiLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLE9BQU8sRUFBRSxJQUFJO0lBQ2IsZUFBZSxFQUFFLElBQUk7SUFDckIsVUFBVSxFQUFFLEtBQUs7SUFDakIsV0FBVyxFQUFFLEtBQUs7SUFDbEIsVUFBVSxFQUFFLFlBQVk7SUFDeEIsYUFBYSxFQUFFLGlCQUFpQjtJQUNoQyxVQUFVLEVBQUUsYUFBYTtJQUN6QixZQUFZLEVBQUUsZUFBZTtJQUM3QixNQUFNLEVBQUUsU0FBUztJQUNqQixRQUFRLEVBQUUsR0FBRztJQUNiLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLGlCQUFpQixFQUFFLFlBQVk7Q0FDaEMsQ0FBQztBQU9GLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBYSxhQUFhLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJy4uL3BvcnRhbC9wb3J0YWwnO1xuaW1wb3J0IHsgVG9hc3RSZWYgfSBmcm9tICcuL3RvYXN0LXJlZic7XG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzQW5pbWF0aW9uVHlwZSA9ICdpbmNyZWFzaW5nJyB8ICdkZWNyZWFzaW5nJztcbmV4cG9ydCB0eXBlIERpc2FibGVUaW1vdXRUeXBlID0gYm9vbGVhbiB8ICd0aW1lT3V0JyB8ICdleHRlbmRlZFRpbWVPdXQnO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGFuIGluZGl2aWR1YWwgdG9hc3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5kaXZpZHVhbENvbmZpZzxDb25maWdQYXlsb2FkID0gYW55PiB7XG4gIC8qKlxuICAgKiBkaXNhYmxlIGJvdGggdGltZU91dCBhbmQgZXh0ZW5kZWRUaW1lT3V0XG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBkaXNhYmxlVGltZU91dDogRGlzYWJsZVRpbW91dFR5cGU7XG4gIC8qKlxuICAgKiB0b2FzdCB0aW1lIHRvIGxpdmUgaW4gbWlsbGlzZWNvbmRzXG4gICAqIGRlZmF1bHQ6IDUwMDBcbiAgICovXG4gIHRpbWVPdXQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIHRvYXN0IHNob3cgY2xvc2UgYnV0dG9uXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBjbG9zZUJ1dHRvbjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIHRpbWUgdG8gY2xvc2UgYWZ0ZXIgYSB1c2VyIGhvdmVycyBvdmVyIHRvYXN0XG4gICAqIGRlZmF1bHQ6IDEwMDBcbiAgICovXG4gIGV4dGVuZGVkVGltZU91dDogbnVtYmVyO1xuICAvKipcbiAgICogc2hvdyB0b2FzdCBwcm9ncmVzcyBiYXJcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHByb2dyZXNzQmFyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBjaGFuZ2VzIHRvYXN0IHByb2dyZXNzIGJhciBhbmltYXRpb25cbiAgICogZGVmYXVsdDogZGVjcmVhc2luZ1xuICAgKi9cbiAgcHJvZ3Jlc3NBbmltYXRpb246IFByb2dyZXNzQW5pbWF0aW9uVHlwZTtcblxuICAvKipcbiAgICogcmVuZGVyIGh0bWwgaW4gdG9hc3QgbWVzc2FnZSAocG9zc2libHkgdW5zYWZlKVxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgZW5hYmxlSHRtbDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCBjb21wb25lbnRcbiAgICogZGVmYXVsdDogbmd4LXRvYXN0clxuICAgKi9cbiAgdG9hc3RDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogY3NzIGNsYXNzIG9uIHRvYXN0IGNvbnRhaW5lclxuICAgKiBkZWZhdWx0OiB0b2FzdC10b3AtcmlnaHRcbiAgICovXG4gIHBvc2l0aW9uQ2xhc3M6IHN0cmluZztcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCB0aXRsZVxuICAgKiBkZWZhdWx0OiB0b2FzdC10aXRsZVxuICAgKi9cbiAgdGl0bGVDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogY3NzIGNsYXNzIG9uIHRvYXN0IG1lc3NhZ2VcbiAgICogZGVmYXVsdDogdG9hc3QtbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZUNsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBhbmltYXRpb24gZWFzaW5nIG9uIHRvYXN0XG4gICAqIGRlZmF1bHQ6IGVhc2UtaW5cbiAgICovXG4gIGVhc2luZzogc3RyaW5nO1xuICAvKipcbiAgICogYW5pbWF0aW9uIGVhc2UgdGltZSBvbiB0b2FzdFxuICAgKiBkZWZhdWx0OiAzMDBcbiAgICovXG4gIGVhc2VUaW1lOiBzdHJpbmcgfCBudW1iZXI7XG4gIC8qKlxuICAgKiBjbGlja2luZyBvbiB0b2FzdCBkaXNtaXNzZXMgaXRcbiAgICogZGVmYXVsdDogdHJ1ZVxuICAgKi9cbiAgdGFwVG9EaXNtaXNzOiBib29sZWFuO1xuICAvKipcbiAgICogQW5ndWxhciB0b2FzdCBjb21wb25lbnQgdG8gYmUgc2hvd25cbiAgICogZGVmYXVsdDogVG9hc3RcbiAgICovXG4gIHRvYXN0Q29tcG9uZW50PzogQ29tcG9uZW50VHlwZTxhbnk+O1xuICAvKipcbiAgICogSGVscHMgc2hvdyB0b2FzdCBmcm9tIGEgd2Vic29ja2V0IG9yIGZyb20gZXZlbnQgb3V0c2lkZSBBbmd1bGFyXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBvbkFjdGl2YXRlVGljazogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE5ldyB0b2FzdCBwbGFjZW1lbnRcbiAgICogZGVmYXVsdDogdHJ1ZVxuICAgKi9cbiAgbmV3ZXN0T25Ub3A6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFBheWxvYWQgdG8gcGFzcyB0byB0aGUgdG9hc3QgY29tcG9uZW50XG4gICAqL1xuICBwYXlsb2FkPzogQ29uZmlnUGF5bG9hZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb2FzdHJJY29uQ2xhc3NlcyB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGluZm86IHN0cmluZztcbiAgc3VjY2Vzczogc3RyaW5nO1xuICB3YXJuaW5nOiBzdHJpbmc7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuLyoqXG4gKiBHbG9iYWwgVG9hc3QgY29uZmlndXJhdGlvblxuICogSW5jbHVkZXMgYWxsIEluZGl2aWR1YWxDb25maWdcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHbG9iYWxDb25maWcgZXh0ZW5kcyBJbmRpdmlkdWFsQ29uZmlnIHtcbiAgLyoqXG4gICAqIG1heCB0b2FzdHMgb3BlbmVkLiBUb2FzdHMgd2lsbCBiZSBxdWV1ZWRcbiAgICogWmVybyBpcyB1bmxpbWl0ZWRcbiAgICogZGVmYXVsdDogMFxuICAgKi9cbiAgbWF4T3BlbmVkOiBudW1iZXI7XG4gIC8qKlxuICAgKiBkaXNtaXNzIGN1cnJlbnQgdG9hc3Qgd2hlbiBtYXggaXMgcmVhY2hlZFxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgYXV0b0Rpc21pc3M6IGJvb2xlYW47XG4gIGljb25DbGFzc2VzOiBQYXJ0aWFsPFRvYXN0ckljb25DbGFzc2VzPjtcbiAgLyoqXG4gICAqIGJsb2NrIGR1cGxpY2F0ZSBtZXNzYWdlc1xuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgcHJldmVudER1cGxpY2F0ZXM6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBkaXNwbGF5IHRoZSBudW1iZXIgb2YgZHVwbGljYXRlIG1lc3NhZ2VzXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBjb3VudER1cGxpY2F0ZXM6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBSZXNldCB0b2FzdCB0aW1lb3V0IHdoZW4gdGhlcmUncyBhIGR1cGxpY2F0ZSAocHJldmVudER1cGxpY2F0ZXMgbmVlZHMgdG8gYmUgc2V0IHRvIHRydWUpXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICByZXNldFRpbWVvdXRPbkR1cGxpY2F0ZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGNvbnNpZGVyIHRoZSB0aXRsZSBvZiBhIHRvYXN0IHdoZW4gY2hlY2tpbmcgaWYgZHVwbGljYXRlXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBpbmNsdWRlVGl0bGVEdXBsaWNhdGVzOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgYSB0b2FzdCBuZWVkcyB0byBsYXVuY2hcbiAqL1xuZXhwb3J0IGNsYXNzIFRvYXN0UGFja2FnZTxDb25maWdQYXlsb2FkID0gYW55PiB7XG4gIHByaXZhdGUgX29uVGFwID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfb25BY3Rpb24gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRvYXN0SWQ6IG51bWJlcixcbiAgICBwdWJsaWMgY29uZmlnOiBJbmRpdmlkdWFsQ29uZmlnPENvbmZpZ1BheWxvYWQ+LFxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyB0b2FzdFR5cGU6IHN0cmluZyxcbiAgICBwdWJsaWMgdG9hc3RSZWY6IFRvYXN0UmVmPGFueT4sXG4gICkge1xuICAgIHRoaXMudG9hc3RSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fb25BY3Rpb24uY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX29uVGFwLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogRmlyZWQgb24gY2xpY2sgKi9cbiAgdHJpZ2dlclRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRhcC5uZXh0KCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRhcFRvRGlzbWlzcykge1xuICAgICAgdGhpcy5fb25UYXAuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBvblRhcCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb25UYXAuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKiogYXZhaWxhYmxlIGZvciB1c2UgaW4gY3VzdG9tIHRvYXN0ICovXG4gIHRyaWdnZXJBY3Rpb24oYWN0aW9uPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25BY3Rpb24ubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgb25BY3Rpb24oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX29uQWN0aW9uLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG5cbi8qKiBAZGVwcmVjYXRlZCB1c2UgR2xvYmFsQ29uZmlnICovXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbFRvYXN0ckNvbmZpZyBleHRlbmRzIEdsb2JhbENvbmZpZyB7fVxuLyoqIEBkZXByZWNhdGVkIHVzZSBJbmRpdmlkdWFsQ29uZmlnICovXG5leHBvcnQgaW50ZXJmYWNlIEluZGl2aWR1YWxUb2FzdHJDb25maWcgZXh0ZW5kcyBJbmRpdmlkdWFsQ29uZmlnIHt9XG4vKiogQGRlcHJlY2F0ZWQgdXNlIEluZGl2aWR1YWxDb25maWcgKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RyQ29uZmlnIGV4dGVuZHMgSW5kaXZpZHVhbENvbmZpZyB7fVxuXG5leHBvcnQgY29uc3QgRGVmYXVsdE5vQ29tcG9uZW50R2xvYmFsQ29uZmlnOiBHbG9iYWxDb25maWcgPSB7XG4gIG1heE9wZW5lZDogMCxcbiAgYXV0b0Rpc21pc3M6IGZhbHNlLFxuICBuZXdlc3RPblRvcDogdHJ1ZSxcbiAgcHJldmVudER1cGxpY2F0ZXM6IGZhbHNlLFxuICBjb3VudER1cGxpY2F0ZXM6IGZhbHNlLFxuICByZXNldFRpbWVvdXRPbkR1cGxpY2F0ZTogZmFsc2UsXG4gIGluY2x1ZGVUaXRsZUR1cGxpY2F0ZXM6IGZhbHNlLFxuXG4gIGljb25DbGFzc2VzOiB7XG4gICAgZXJyb3I6ICd0b2FzdC1lcnJvcicsXG4gICAgaW5mbzogJ3RvYXN0LWluZm8nLFxuICAgIHN1Y2Nlc3M6ICd0b2FzdC1zdWNjZXNzJyxcbiAgICB3YXJuaW5nOiAndG9hc3Qtd2FybmluZycsXG4gIH0sXG5cbiAgLy8gSW5kaXZpZHVhbFxuICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gIGRpc2FibGVUaW1lT3V0OiBmYWxzZSxcbiAgdGltZU91dDogNTAwMCxcbiAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxuICBlbmFibGVIdG1sOiBmYWxzZSxcbiAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICB0b2FzdENsYXNzOiAnbmd4LXRvYXN0cicsXG4gIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC10b3AtcmlnaHQnLFxuICB0aXRsZUNsYXNzOiAndG9hc3QtdGl0bGUnLFxuICBtZXNzYWdlQ2xhc3M6ICd0b2FzdC1tZXNzYWdlJyxcbiAgZWFzaW5nOiAnZWFzZS1pbicsXG4gIGVhc2VUaW1lOiAzMDAsXG4gIHRhcFRvRGlzbWlzczogdHJ1ZSxcbiAgb25BY3RpdmF0ZVRpY2s6IGZhbHNlLFxuICBwcm9ncmVzc0FuaW1hdGlvbjogJ2RlY3JlYXNpbmcnLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUb2FzdFRva2VuIHtcbiAgZGVmYXVsdDogR2xvYmFsQ29uZmlnO1xuICBjb25maWc6IFBhcnRpYWw8R2xvYmFsQ29uZmlnPjtcbn1cblxuZXhwb3J0IGNvbnN0IFRPQVNUX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxUb2FzdFRva2VuPignVG9hc3RDb25maWcnKTtcbiJdfQ==