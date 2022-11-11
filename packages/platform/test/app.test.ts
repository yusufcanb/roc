import { Environment } from "@roc/core";

describe("core.environment.entity.Environment", () => {
    test('it can be construct with no parameters', () => {
        var e = new Environment();
        expect(e).not.toBe(null);
    });
})
