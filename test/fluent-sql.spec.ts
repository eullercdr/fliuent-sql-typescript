import FluentSQLBuilder from "../src/fluent-sql";

const data = [
  {
    id: 1,
    name: "euller cristian",
    category: "developer",
  },
  {
    id: 3,
    name: "maria silva",
    category: "manager",
  },
  {
    id: 2,
    name: "joao silva",
    category: "developer",
  },
];

describe("Fluent SQL", () => {
  test("#for should return a FluentSqlBuilder instance", () => {
    const result = FluentSQLBuilder.for(data);
    expect(result).toBeInstanceOf(FluentSQLBuilder);
  });

  test("#build should return the empty object instance", () => {
    const result = FluentSQLBuilder.for(data);
    expect(result.build()).toEqual(data);
  });

  test("#limit give a collection if should limit result", () => {
    const result = FluentSQLBuilder.for(data).limit(1).build();
    expect(result).toEqual([data[0]]);
  });

  test("#where given a collect it should filter data", () => {
    const result = FluentSQLBuilder.for(data)
      .where({
        category: "/manager/",
      })
      .build();
    const expected = data.filter(
      (item) => item.category.slice(0, 3) === "manager"
    );
    expect(result).toEqual(expected);
  });

  test("#select given a collection if should return only specified fields", () => {
    const result = FluentSQLBuilder.for(data).select(["id", "name"]).build();
    const expected = data.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    expect(result).toEqual(expected);
  });

  test("#orderBy given a collection it should order results by field", () => {
    const result = FluentSQLBuilder.for(data).orderBy("name").build();
    const dataOrdered = [
      {
        id: 1,
        name: "euller cristian",
        category: "developer",
      },
      {
        id: 2,
        name: "joao silva",
        category: "developer",
      },
      {
        id: 3,
        name: "maria silva",
        category: "manager",
      },
    ];
    expect(result).toEqual(dataOrdered);
  });

  test("#pipeline", () => {
    const result = FluentSQLBuilder.for(data)
      .where({ category: "developer" })
      .where({ name: "joao silva" })
      .select(["id", "name"])
      .orderBy("name")
      .build();
    console.log(result);
  });
});
