import { jsonProperty } from "./json-property";
import { deserialize } from "./property-mapper";

class Bar {
  @jsonProperty()
  public date: Date;

  @jsonProperty({
    type: Date,
  })
  public dateArr: Date[];

  @jsonProperty({
    externalName: "extId",
  })
  public id: string;
}

class Baaz extends Bar {
  @jsonProperty()
  public additional: number;

  @jsonProperty()
  public id: string;
}

class Foo {
  @jsonProperty()
  public number: number;

  @jsonProperty({
    type: Number,
  })
  public numberArr: number[];

  @jsonProperty()
  public string: string;
  @jsonProperty({
    type: String,
  })
  public stringArr: string[];

  @jsonProperty()
  public boolean: boolean;
  @jsonProperty({
    type: Boolean,
  })
  public booleanArr: boolean[];

  @jsonProperty()
  public complex: Bar;
  @jsonProperty({
    type: Bar,
  })
  public complexArr: Bar[];

  @jsonProperty({
    externalName: "external",
  })
  public internal: string;
}

describe("deserialize()", () => {
  it("should deserialize string", () => {
    const json = {
      string: "test",
      stringArr: ["item1", "item2"],
    };
    const obj = deserialize(Foo, json);

    expect(obj).toBeInstanceOf(Foo);
    expect(obj.string).toEqual(json.string);
    expect(obj.stringArr).toEqual(json.stringArr);
  });

  it("should deserialize number", () => {
    const json = {
      number: 123,
      numberArr: [1, 2],
    };
    const obj = deserialize(Foo, json);

    expect(obj).toBeInstanceOf(Foo);
    expect(obj.number).toEqual(json.number);
    expect(obj.numberArr).toEqual(json.numberArr);
  });

  it("should deserialize boolean", () => {
    const json = {
      boolean: true,
      booleanArr: [true, false],
    };
    const obj = deserialize(Foo, json);

    expect(obj).toBeInstanceOf(Foo);
    expect(obj.boolean).toEqual(json.boolean);
    expect(obj.booleanArr).toEqual(json.booleanArr);
  });

  it("should deserialize date", () => {
    const json = {
      date: "2011",
      dateArr: ["2012", "2013"],
    };
    const obj = deserialize(Bar, json);

    expect(obj).toBeInstanceOf(Bar);
    expect(obj.date).toEqual(new Date(json.date));
    expect(obj.dateArr).toEqual(json.dateArr.map((i) => new Date(i)));
  });

  it("should deserialize complex types", () => {
    const json = {
      complex: {
        date: "2018",
      },
      complexArr: [
        {
          date: "2019",
        },
        {
          date: "2020",
        },
      ],
    };
    const obj = deserialize(Foo, json);

    expect(obj).toBeInstanceOf(Foo);
    expect(obj.complex).toEqual({ ...json.complex, date: new Date("2018") });
    expect(obj.complexArr).toEqual(json.complexArr.map((item) => deserialize(Bar, item)));
  });

  it("should deserialize extended class", () => {
    const json = {
      date: "2011",
      additional: 123,
    };
    const obj = deserialize(Baaz, json);

    expect(obj).toBeInstanceOf(Baaz);
    expect(obj).toEqual({ ...json, date: new Date(json.date) });
  });

  it("should deserialize externalName", () => {
    const json = {
      external: "external",
      internal: "should ignore",
    };
    const obj = deserialize(Foo, json);

    expect(obj).toBeInstanceOf(Foo);
    expect(obj.internal).toEqual(json.external);
  });

  it("should allow property override", () => {
    const barJson = { extId: "barId" };
    const bazzJson = { id: "barId" };

    const bar = deserialize(Bar, barJson);
    const bazz = deserialize(Baaz, bazzJson);

    expect(bar.id).toEqual(bazz.id);
  });
});
