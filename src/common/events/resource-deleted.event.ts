import { ResourceTypeEnum } from '../enums/resource-type.enum';

export class ResourceDeletedEvent {
  storagePath: string;
  resourceType: ResourceTypeEnum;

  constructor (storagePath: string, resourceType: ResourceTypeEnum) {
    this.storagePath = storagePath;
    this.resourceType = resourceType;
  }
}