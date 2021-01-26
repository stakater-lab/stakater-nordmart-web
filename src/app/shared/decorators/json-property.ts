import "reflect-metadata";
import { IConstructable } from "./property-mapper";

export const METADATA_KEY = "___json__metadata";

interface IExternalPropertyMetadata<T> {
  externalName?: string;
  type?: IConstructable<T>;
  serializer?: (arg: any) => any;
  deserializer?: (arg: any) => any;
}

export interface IInternalPropertyMetaData<T> extends IExternalPropertyMetadata<T> {
  key: string;
  externalName: string;
  type: IConstructable<T>;
  isArray: boolean;
  serializer?: (arg: any) => any;
  deserializer?: (arg: any) => any;
}

export function jsonProperty<T>(propertyMetadata: IExternalPropertyMetadata<T> = {}) {
  return (target: any, propertyKey: string) => {
    // Static cannot be serialized
    if (typeof target === "function") {
      throw new TypeError(`@Serialize cannot be used on a static property ('${propertyKey}').`);
    }

    // Methods cannot be serialized.
    if (typeof target[propertyKey] === "function") {
      throw new TypeError(`@Serialize cannot be used on a method property ('${propertyKey}').`);
    }

    const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
    if (typeof propertyType === "undefined") {
      throw new TypeError(`@JsonMember: type detected for '${propertyKey}' is undefined.`);
    }

    const metadata: IInternalPropertyMetaData<T> = {
      ...propertyMetadata,
      key: propertyKey,
      externalName: propertyMetadata.externalName || propertyKey,
      type: propertyMetadata.type || propertyType,
      isArray: (propertyType as any) === Array,
    };

    if (target[METADATA_KEY]) {
      target[METADATA_KEY] = { ...target[METADATA_KEY] };
      target[METADATA_KEY][metadata.key] = metadata;
    } else {
      Object.defineProperty(target, METADATA_KEY, {
        enumerable: false,
        configurable: false,
        writable: true,
        value: { [metadata.key]: metadata },
      });
    }
  };
}
