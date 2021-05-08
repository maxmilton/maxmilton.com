describe('app static export', () => {
  it('generates blog.json correctly', () => {
    expect.assertions(3);
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, global-require, import/no-unresolved
    const json = require('../__sapper__/export/blog.json');
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBeGreaterThan(0);
    expect(json[0]).toMatchObject({
      metadata: {
        title: expect.stringMatching(/^.+$/),
        description: expect.stringMatching(/^.+$/),
        pubdate: expect.stringMatching(/^.+$/),
        date: expect.stringMatching(/^.+$/),
      },
      slug: expect.stringMatching(/^.+$/),
    });
  });
});

// keep TS happy
// eslint-disable-next-line jest/no-export
export {};
