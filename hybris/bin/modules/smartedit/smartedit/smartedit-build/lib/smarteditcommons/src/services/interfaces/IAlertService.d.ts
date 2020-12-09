export declare enum IAlertServiceType {
    INFO = "information",
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "error"
}
export interface IAlertConfig {
    message?: string;
    type?: IAlertServiceType;
    messagePlaceholders?: {
        [key: string]: any;
    };
    template?: string;
    templateUrl?: string;
    closeable?: boolean;
    timeout?: number;
    successful?: boolean;
    id?: string;
}
export declare abstract class IAlertService {
    showAlert(alertConf: IAlertConfig | string): void;
    showInfo(alertConf: IAlertConfig | string): void;
    showDanger(alertConf: IAlertConfig | string): void;
    showWarning(alertConf: IAlertConfig | string): void;
    showSuccess(alertConf: IAlertConfig | string): void;
    /**
     * @deprecated since 1905
     */
    pushAlerts(alerts: any): void;
    /**
     * @deprecated since 1905
     */
    removeAlertById(id: string): void;
}
