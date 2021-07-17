import {Type} from "core/models";

export class DomainConverter {
    static fromDto<T>(domain: Type<T>, dto: any) {
        const instance = Object.create(domain.prototype);
        instance._object = dto;
        return instance as T;
    }

    static fromDtoArray<T>(domain: Type<T>, bulkDto: Array<any>) {
        const dModels: Array<T> = [];
        bulkDto.forEach(dto => {
            dModels.push(DomainConverter.fromDto(domain, dto));
        })
        return dModels;
    }

    static toDto<T>(domain: any) {
        return domain._object as T;
    }
}