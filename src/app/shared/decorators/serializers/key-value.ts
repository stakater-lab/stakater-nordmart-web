import { IInternalPropertyMetaData } from "../json-property";
import { deserialize, IConstructable, serialize } from "../property-mapper";

export class KeyValueSignature<T = any> {
  [key: string]: T;
}

export function KeyValuePropertyConfig<T>(
  constructor: IConstructable<T>,
  isArray = false,
): Partial<IInternalPropertyMetaData<T>> {
  return {
    serializer: (internalValue: any) => {
      if (!internalValue) {
        return internalValue;
      }

      const retVal: any = {};
      for (const key of Object.keys(internalValue)) {
        retVal[key] =
          isArray && internalValue[key] instanceof Array
            ? internalValue[key].map((elem: any) => serialize(elem))
            : serialize(internalValue[key]);
      }

      return retVal;
    },
    deserializer: (externalValue: any) => {
      if (!externalValue) {
        return externalValue;
      }

      const mapped: KeyValueSignature<T> = {};
      for (const key of Object.keys(externalValue)) {
        mapped[key] =
          isArray && externalValue[key] instanceof Array
            ? externalValue[key].map((elem: any) => deserialize(constructor, elem))
            : deserialize(constructor, externalValue[key]);
      }
      return mapped;
    },
  };
}

export function KeyValuePropertyConfigWithMapper<T>(
  constructorMapper: (arg: any) => IConstructable<T>,
  isArray = false,
): Partial<IInternalPropertyMetaData<T>> {
  return {
    serializer: (internalValue: any) => {
      if (!internalValue) {
        return internalValue;
      }

      const retVal: any = {};
      for (const key of Object.keys(internalValue)) {
        retVal[key] =
          isArray && internalValue[key] instanceof Array
            ? internalValue[key].map((elem: any) => serialize(elem))
            : serialize(internalValue[key]);
      }

      return retVal;
    },
    deserializer: (externalValue: any) => {
      if (!externalValue) {
        return externalValue;
      }

      const mapped: KeyValueSignature<T> = {};
      for (const key of Object.keys(externalValue)) {
        mapped[key] =
          isArray && externalValue[key] instanceof Array
            ? externalValue[key].map((elem: any) => deserialize(constructorMapper(elem), elem))
            : deserialize(constructorMapper(externalValue[key]), externalValue[key]);
      }
      return mapped;
    },
  };
}
