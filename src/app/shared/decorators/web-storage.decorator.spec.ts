import * as StorageUtil from "./utils";
import { SimpleListItem } from "../models/SimpleListItem";
import { combineObjects } from "./property-mapper";
import { DoubleStorage, LocalStorage, SessionStorage } from "./web-storage.decorator";

describe("WebStorage decorator", () => {
  let testInstance: Test;

  class Test {
    @LocalStorage("key1")
    public local: string;

    @SessionStorage("key2")
    public session: number;

    @LocalStorage()
    public localNoKey: any;

    @SessionStorage()
    public sessionNoKey: any;

    @DoubleStorage()
    public doubleStorage: string;

    @DoubleStorage("doubleStorageKey")
    public doubleStorageWithCustomKey: SimpleListItem;
  }

  beforeEach(() => {
    testInstance = new Test();
  });

  afterEach(() => {
    StorageUtil.clear(localStorage);
    StorageUtil.clear(sessionStorage);
  });

  it("should set local storage value with specified key", () => {
    testInstance.local = "testValue";
    expect(localStorage[StorageUtil.toStorageKey("key1")]).toEqual("testValue");
  });

  it("should set session storage value with specified key", () => {
    testInstance.session = 12345;
    expect(sessionStorage[StorageUtil.toStorageKey("key2")]).toEqual("12345");
  });

  it("should set local storage value with attribute name as key", () => {
    const expected = {
      foo: 123,
      bar: "bar",
    };

    testInstance.localNoKey = expected;
    expect(localStorage[StorageUtil.toStorageKey("localNoKey")]).toEqual(JSON.stringify(expected));
  });

  it("should set session storage value with attribute name as key", () => {
    const expected = {
      foo: 3434,
      bar: "bar",
    };

    testInstance.sessionNoKey = expected;
    expect(sessionStorage[StorageUtil.toStorageKey("sessionNoKey")]).toEqual(JSON.stringify(expected));
  });

  it("should get value from local storage", () => {
    const instance2 = new Test();
    testInstance.local = "testValue";
    const expected = {
      foo: 123,
      bar: "bar",
    };
    testInstance.localNoKey = expected;

    expect(instance2.local).toEqual("testValue");
    expect(instance2.localNoKey).toEqual(expected);
  });

  it("should get value from session storage", () => {
    const instance2 = new Test();
    testInstance.session = 2324;
    const expected = {
      foo: 123,
      bar: "bar",
    };
    testInstance.sessionNoKey = expected;

    expect(instance2.session).toEqual(2324);
    expect(instance2.sessionNoKey).toEqual(expected);
  });

  describe("double storage", () => {
    it("should get data from both local ans session storage with session storage as primary", () => {
      localStorage[StorageUtil.toStorageKey("doubleStorage")] = "local";
      expect(new Test().doubleStorage).toEqual("local");

      sessionStorage[StorageUtil.toStorageKey("doubleStorage")] = "session";
      expect(new Test().doubleStorage).toEqual("session");
    });

    it("should set data in both session and local storage", () => {
      testInstance.doubleStorage = "test";
      expect(sessionStorage[StorageUtil.toStorageKey("doubleStorage")]).toEqual("test");
      expect(localStorage[StorageUtil.toStorageKey("doubleStorage")]).toEqual("test");
    });

    it("should map stored value to specified class", () => {
      const storageVal = {
        name: " test",
        id: "test_id",
      };
      sessionStorage.setItem("doubleStorageKey", JSON.stringify(storageVal));
      localStorage.setItem("doubleStorageKey", JSON.stringify(storageVal));

      expect(new Test().doubleStorageWithCustomKey).toEqual(combineObjects(new SimpleListItem(), storageVal));
    });

    it("should set value with custom key", () => {
      testInstance.doubleStorageWithCustomKey = combineObjects(new SimpleListItem(), {
        id: "test_set",
        name: "test_set_id",
      });

      expect(sessionStorage[StorageUtil.toStorageKey("doubleStorageKey")]).toEqual(
        '{"id":"test_set","name":"test_set_id"}',
      );
      expect(localStorage[StorageUtil.toStorageKey("doubleStorageKey")]).toEqual(
        '{"id":"test_set","name":"test_set_id"}',
      );
    });
  });
});
