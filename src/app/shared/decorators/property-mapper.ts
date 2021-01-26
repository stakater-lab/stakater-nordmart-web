import { IInternalPropertyMetaData, METADATA_KEY } from "./json-property";
import { Similar } from "../../typings";

export type IConstructable<T = any> = new (obj?: any) => T;

export interface IIndexable {
  [key: string]: any;

  [key: number]: any;
}

function isPrimitive(obj: any) {
  switch (typeof obj) {
    case "string":
    case "number":
    case "boolean":
      return true;
  }
  return (
    obj instanceof String ||
    obj === String ||
    obj instanceof Number ||
    obj === Number ||
    obj instanceof Boolean ||
    obj === Boolean
  );
}

export function deserialize<T>(type: IConstructable<T>, json: Similar<T>): T {
  if (!type || !json) {
    return json as any;
  }

  if (isPrimitive(type)) {
    return ((type as unknown) as (arg: any) => T)(json);
  }

  const deserializeObj: IIndexable = new type();
  const metadataMap: { [key: string]: IInternalPropertyMetaData<any> } = deserializeObj[METADATA_KEY];

  if (!metadataMap) {
    return new type(json);
  }

  for (const property of Object.keys(metadataMap)) {
    const propertyMetadata: IInternalPropertyMetaData<any> = metadataMap[property];
    const propertyJson: any = json[propertyMetadata.externalName];

    if (propertyJson === undefined) {
      continue;
    }

    if (propertyMetadata.deserializer) {
      deserializeObj[propertyMetadata.key] = propertyMetadata.deserializer(propertyJson);
    } else if (propertyMetadata.isArray) {
      deserializeObj[propertyMetadata.key] = (propertyJson || []).map((value: any) =>
        deserialize(propertyMetadata.type, value),
      );
    } else {
      deserializeObj[propertyMetadata.key] = deserialize(propertyMetadata.type, propertyJson);
    }
  }

  return deserializeObj as T;
}

export function initialize<T>(type: IConstructable<T>): T {
  if (!type) {
    throw new Error("Type error: Cannot initialize none constructable type parameter");
  }

  if (isPrimitive(type)) {
    return ((type as unknown) as (arg?: any) => T)();
  }

  const deserializeObj: IIndexable = new type();
  const metadataMap: { [key: string]: IInternalPropertyMetaData<any> } = deserializeObj[METADATA_KEY];

  if (!metadataMap) {
    return new type();
  }

  for (const property of Object.keys(metadataMap)) {
    const propertyMetadata: IInternalPropertyMetaData<any> = metadataMap[property];

    if (propertyMetadata.deserializer) {
      deserializeObj[propertyMetadata.key] = propertyMetadata.deserializer(undefined);
    } else if (propertyMetadata.isArray) {
      deserializeObj[propertyMetadata.key] = [];
    } else {
      deserializeObj[propertyMetadata.key] = initialize(propertyMetadata.type);
    }
  }

  return deserializeObj as T;
}

export function serialize(inObj: any) {
  const json: any = {};
  if (!inObj) {
    return inObj;
  }

  const classMetadata: { [key: string]: IInternalPropertyMetaData<any> } = inObj[METADATA_KEY];
  if (isPrimitive(inObj) || !classMetadata) {
    return inObj;
  }

  for (const property of Object.keys(classMetadata)) {
    const propertyMetadata: IInternalPropertyMetaData<any> = classMetadata[property];
    const propertyValue = inObj[propertyMetadata.key];

    if (propertyMetadata.serializer) {
      json[propertyMetadata.externalName] = propertyMetadata.serializer(propertyValue);
    } else if (propertyMetadata.isArray) {
      json[propertyMetadata.externalName] = (propertyValue || []).map((itemValue: any) => serialize(itemValue));
    } else {
      json[propertyMetadata.externalName] = serialize(propertyValue);
    }
  }

  return json;
}
