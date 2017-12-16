export class TestHelper {
    static mockResponseAsync(body) {
      return Promise.resolve(
              { 
                  json: () => Promise.resolve(body) 
              });
    }
  }
  