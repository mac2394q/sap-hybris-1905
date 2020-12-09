import { Payload } from 'smarteditcommons/dtos';
export interface IConfiguration extends Payload {
    defaultToolingLanguage: string;
    domain: string;
    previewTicketURI: string;
    smarteditroot: string;
    whiteListedStorefronts: string[];
    storefrontPreviewRoute: string;
}
