class Message {
  constructor() {
    this.headers = {};
    this.payload = new Uint8Array(0); // Initialize an empty payload
  }
}

class MessageCodec {
  encode(message) {
    const headerCount = Object.keys(message.headers).length;

    // Ensure the number of headers is within the allowed limit
    if (headerCount > 63) {
      throw new Error('Exceeded maximum header count');
    }

    // Encode headers
    let encodedHeaders = '';
    for (const [name, value] of Object.entries(message.headers)) {
      encodedHeaders += String.fromCharCode(name.length >> 8, name.length & 0xFF);
      encodedHeaders += name;
      encodedHeaders += String.fromCharCode(value.length >> 8, value.length & 0xFF);
      encodedHeaders += value;
    }

    // Ensure the payload size is within the allowed limit
    if (message.payload.length > 256 * 1024) {
      throw new Error('Exceeded maximum payload size');
    }

    // Combine headers and payload
    const encodedMessage = encodedHeaders + String.fromCharCode((headerCount << 2) | (message.payload.length >> 16)) +
      String.fromCharCode((message.payload.length >> 8) & 0xFF, message.payload.length & 0xFF) +
      String.fromCharCode(...message.payload);

    return encodedMessage;
  }

  decode(data) {
    const message = new Message();
    let index = 0;

    // Decode headers
    while (index < data.length) {
      const nameLength = (data.charCodeAt(index) << 8) | data.charCodeAt(index + 1);
      index += 2;
      const name = data.substr(index, nameLength);
      index += nameLength;

      const valueLength = (data.charCodeAt(index) << 8) | data.charCodeAt(index + 1);
      index += 2;
      const value = data.substr(index, valueLength);
      index += valueLength;

      message.headers[name] = value;
    }

    // Decode payload size
    const payloadSize = (data.charCodeAt(index) << 16) | (data.charCodeAt(index + 1) << 8) | data.charCodeAt(index + 2);
    index += 3;

    // Decode payload
    message.payload = new Uint8Array(data.slice(index, index + payloadSize).split('').map(c => c.charCodeAt(0)));

    return message;
  }
}

// Example usage:
const codec = new MessageCodec();

// Creating a message
const originalMessage = new Message();
originalMessage.headers = { "Content-Type": "application/json", "Authorization": "Bearer token" };
originalMessage.payload = new TextEncoder().encode("Hello, world!");

// Encoding the message 🔥
const encodedData = codec.encode(originalMessage);
console.log("Encoded Data:", encodedData);

// Decoding the message 🐰
const decodedMessage = codec.decode(encodedData);
console.log("Decoded Message:", decodedMessage);