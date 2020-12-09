import { TypedMap } from "smarteditcommons/dtos/TypedMap";
export interface IURIBuilder {
    build(): string;
    replaceParams(params: TypedMap<string>): IURIBuilder;
}
