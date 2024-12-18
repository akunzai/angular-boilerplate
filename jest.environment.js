import Environment from "jest-environment-jsdom";

export default class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
        this.global.Response = Response;
        this.global.Request = Request;
        this.global.ReadableStream = ReadableStream;
        this.global.TransformStream = TransformStream;
        this.global.BroadcastChannel = BroadcastChannel;
    }
};
